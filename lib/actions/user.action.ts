"use server";

import { UpdateProfile, UserProfile } from "@/common.types";
import {
  CREATE_USER_MUTATION,
  FOLLOW_USER,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_USERNAMES_BY_NAME_QUERY,
  GET_USER_BY_EMAIL_QUERY,
  GET_USER_WITH_PROJECTS_QUERY,
  UNFOLLOW_USER,
  UPDATE_USER_MUTATION,
} from "../../graphql/queries";
import bcryptjs from "bcryptjs";
import { uploadImage } from "./image.action";
import client from "../apolloClient";

export const getUserProfile = async (
  id: string
): Promise<UserProfile | null> => {
  const { data } = await client.query({
    query: GET_USER_WITH_PROJECTS_QUERY,
    variables: { id },
  });

  return data.user;
};

export const getUserByEmail = async (
  email: string
): Promise<UserProfile | null> => {
  const { data } = await client.query({
    query: GET_USER_BY_EMAIL_QUERY,
    variables: { email },
  });

  return data.userByEmail;
};

export const createUser = async (
  name: string,
  email: string,
  image: string | null
) => {
  const { data: usernamesData } = await client.query({
    query: GET_USERNAMES_BY_NAME_QUERY,
    variables: { name },
  });

  const username = createUsername(name, usernamesData.usernamesByName);

  const variables = {
    input: {
      name,
      email,
      image,
      username,
    },
  };

  const result = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables,
  });
  return result.data;
};

export const createUserWithCredentials = async (
  name: string,
  email: string,
  password: string
) => {
  // hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const { data: usernamesData } = await client.query({
    query: GET_USERNAMES_BY_NAME_QUERY,
    variables: { name },
  });

  const username = createUsername(name, usernamesData.usernamesByName);

  const variables = {
    input: {
      name,
      email,
      password: hashedPassword,
      username,
    },
  };

  const result = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables,
  });

  return result.data;
};

export const updateUserProfile = async (
  userProfile: UpdateProfile,
  userId: string
) => {
  await client.mutate({
    mutation: UPDATE_USER_MUTATION,
    variables: {
      id: userId,
      input: userProfile,
    },
  });
};

export const updateProfileImage = async (userId: string, image: string) => {
  const variables = {
    id: userId,
    input: { image },
  };

  const result = await client.mutate({
    mutation: CREATE_USER_MUTATION,
    variables,
  });

  return result;
};

export const updateForgetPasswordToken = async (
  userId: string,
  forgotPasswordToken: string,
  forgotPasswordTokenExpiry: Date
) => {
  const variables = {
    id: userId,
    input: { forgotPasswordToken, forgotPasswordTokenExpiry },
  };

  // return makeGraphQLRequest(updateUserMutation, variables);
};

export const updateUserPassword = async (token: string, password: string) => {
  // const result: any = await makeGraphQLRequest(
  //   getUserWithForgotPasswordTokenQuery,
  //   {
  //     token,
  //   }
  // );
  // const resultEdges = result.userSearch.edges;
  // const user = resultEdges.map((edge: any) => edge.node.id);
  // console.log(user);
  // if (result && user.length > 0) {
  //   const userId = user[0];
  //   const variables = {
  //     id: userId,
  //     input: {
  //       password,
  //       forgotPasswordToken: null,
  //       forgotPasswordTokenExpiry: null,
  //     },
  //   };
  //   await makeGraphQLRequest(updateUserMutation, variables);
  //   return user;
  // }
  // return null;
};

export const uploadProfileImage = async (
  userId: string,
  image: string,
  token: string
) => {
  const uploadedImage = await uploadImage(image, "profile");
  const result = updateProfileImage(userId, uploadedImage);
  return result;
};

export const getUserFollowersList = async (userId: string) => {
  const { data } = await client.query({
    query: GET_FOLLOWERS,
    variables: { userId },
  });
};

export const getUserFollowingList = async (userId: string) => {
  const { data } = await client.query({
    query: GET_FOLLOWING,
    variables: { userId },
  });
};

export const addFollower = async (userId: string, followId: string) => {
  const { data } = await client.mutate({
    mutation: FOLLOW_USER,
    variables: { userId, followId },
  });
};

export const removeFollower = async (userId: string, unfollowId: string) => {
  const { data } = await client.mutate({
    mutation: UNFOLLOW_USER,
    variables: { userId, unfollowId },
  });
};

export const removeUserFollower = async (
  id: string,
  followingId: string,
  token: string
) => {
  // await makeGraphQLRequest(removeUserFollowingMutation, { id, followingId });
  // return makeGraphQLRequest(removeUserFollowerMutation, { id, followingId });
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
