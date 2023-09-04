import { ProjectForm, UpdateProfile, UserProfile } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  getProjectsQuery,
  updateUserMutation,
  updateProjectMutation,
  getAllProjectsQuery,
  getUsernamesWithSameNameQuery,
  getUserWithForgotPasswordTokenQuery,
  getUserFollowersQuery,
  getUserFollowingQuery,
  addUserFollowingMutation,
  addUserFollowerMutation,
  removeUserFollowingMutation,
  removeUserFollowerMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import bcryptjs from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (
  image: string,
  type: "project" | "profile"
) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        image,
        type,
      }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = async (
  name: string,
  email: string,
  image: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  const result: any = await makeGraphQLRequest(getUsernamesWithSameNameQuery, {
    name,
  });

  const resultEdges = result.userSearch.edges;
  const existingUsernames = resultEdges.map((edge: any) => edge.node.username);

  const username = createUsername(name, existingUsernames);

  const variables = {
    input: {
      name,
      email,
      image,
      username,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const createUserWithCredentials = async (
  name: string,
  email: string,
  password: string
) => {
  client.setHeader("x-api-key", apiKey);

  // hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const result: any = await makeGraphQLRequest(getUsernamesWithSameNameQuery, {
    name,
  });

  const resultEdges = result.userSearch.edges;
  const existingUsernames = resultEdges.map((edge: any) => edge.node.username);

  const username = createUsername(name, existingUsernames);

  const variables = {
    input: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image, "project");

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const getAllProjects = (
  category?: string | null,
  endCursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  if (category) {
    return makeGraphQLRequest(getProjectsQuery, { category, endCursor });
  }

  return makeGraphQLRequest(getAllProjectsQuery, { endCursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  function isBase64DataURL(value: string): boolean {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isNewImage = isBase64DataURL(form.image);

  if (isNewImage) {
    const imageUrl = await uploadImage(form.image, "project");

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: projectId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateUserProfile = (
  userProfile: UpdateProfile,
  userId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: userId,
    input: userProfile,
  };

  return makeGraphQLRequest(updateUserMutation, variables);
};

export const updateProfileImage = (
  userId: string,
  image: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: userId,
    input: { image },
  };

  console.log(variables);

  return makeGraphQLRequest(updateUserMutation, variables);
};

export const updateForgetPasswordToken = (
  userId: string,
  forgotPasswordToken: string,
  forgotPasswordTokenExpiry: Date
) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    id: userId,
    input: { forgotPasswordToken, forgotPasswordTokenExpiry },
  };

  return makeGraphQLRequest(updateUserMutation, variables);
};

export const updateUserPassword = async (token: string, password: string) => {
  client.setHeader("x-api-key", apiKey);

  const result: any = await makeGraphQLRequest(
    getUserWithForgotPasswordTokenQuery,
    {
      token,
    }
  );

  const resultEdges = result.userSearch.edges;
  const user = resultEdges.map((edge: any) => edge.node.id);
  console.log(user);

  if (result && user.length > 0) {
    const userId = user[0];
    const variables = {
      id: userId,
      input: {
        password,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
      },
    };

    await makeGraphQLRequest(updateUserMutation, variables);
    return user;
  }

  return null;
};

export const uploadProfileImage = async (
  userId: string,
  image: string,
  token: string
) => {
  const uploadedImage = await uploadImage(image, "profile");
  const result = updateProfileImage(userId, uploadedImage.url, token);
  return result;
};

export const getUserFollowersList = (userId: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getUserFollowersQuery, { userId });
};

export const getUserFollowingList = (userId: string) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(getUserFollowingQuery, { userId });
};

export const addUserFollowing = async (
  id: string,
  followingId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  await makeGraphQLRequest(addUserFollowingMutation, { id, followingId });

  return makeGraphQLRequest(addUserFollowerMutation, { id, followingId });
};

export const removeUserFollowing = async (
  id: string,
  followingId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  await makeGraphQLRequest(removeUserFollowingMutation, { id, followingId });

  return makeGraphQLRequest(removeUserFollowerMutation, { id, followingId });
};

export const removeUserFollower = async (
  id: string,
  followingId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  await makeGraphQLRequest(removeUserFollowingMutation, { id, followingId });

  return makeGraphQLRequest(removeUserFollowerMutation, { id, followingId });
};

const createUsername = (name: string, usernames: string[]): string => {
  let username = name.trim().toLowerCase().replace(/\s/g, "");

  let count = 1;
  while (usernames.includes(username)) {
    username = `${username}${count}`;
    count++;
  }
  return username;
};
