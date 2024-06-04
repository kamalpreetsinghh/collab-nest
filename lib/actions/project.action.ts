"use server";

import client from "../apolloClient";
import {
  ProjectForm,
  ProjectInterface,
  ProjectPagination,
} from "@/common.types";
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  GET_PROJECTS_QUERY,
  GET_PROJECT_BY_ID_QUERY,
  GET_USER_PROJECTS_QUERY,
  UPDATE_PROJECT_MUTATION,
} from "../../graphql/queries";
import { uploadImage } from "./image.action";
import { isBase64DataURL } from "../utils";

export const getProjects = async (
  page: number,
  limit: number
): Promise<ProjectPagination> => {
  const { data } = await client.query({
    query: GET_PROJECTS_QUERY,
    variables: { page, limit },
  });

  return data.projects;
};

export const getProjectById = async (
  id: string
): Promise<ProjectInterface | null> => {
  try {
    const { data } = await client.query({
      query: GET_PROJECT_BY_ID_QUERY,
      variables: { id },
    });

    return data.project;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserProjects = async (
  userId: string
): Promise<ProjectInterface[]> => {
  const { data } = await client.query({
    query: GET_USER_PROJECTS_QUERY,
    variables: { userId },
  });

  return data.projects;
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string
) => {
  const imageUrl = await uploadImage(form.image, "project");

  if (imageUrl) {
    const variables = {
      input: {
        ...form,
        image: imageUrl,
        createdBy: creatorId,
      },
    };

    const result = await client.mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: variables,
    });
  }
};

export const updateProject = async (form: ProjectForm, projectId: string) => {
  let updatedForm = { ...form };

  const isNewImage = isBase64DataURL(form.image);

  if (isNewImage) {
    const imageUrl = await uploadImage(form.image, "project");

    if (imageUrl) {
      updatedForm = { ...updatedForm, image: imageUrl };
    }
  }

  const variables = {
    id: projectId,
    input: updatedForm,
  };
  const result = await client.mutate({
    mutation: UPDATE_PROJECT_MUTATION,
    variables: variables,
  });
};

export const deleteProject = async (id: string) => {
  const result = await client.mutate({
    mutation: DELETE_PROJECT_MUTATION,
    variables: { id },
  });
};
