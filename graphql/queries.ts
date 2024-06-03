import { gql } from "@apollo/client";

export const GET_PROJECTS_QUERY = gql`
  query Projects($page: Int!, $limit: Int!) {
    projects(page: $page, limit: $limit) {
      projects {
        id
        title
        description
        image
        websiteUrl
        githubUrl
        category
        createdBy {
          id
          name
          email
          image
        }
      }
      totalProjects
      totalPages
      currentPage
    }
  }
`;

export const GET_PROJECT_BY_ID_QUERY = gql`
  query GetProjectById($id: ID!) {
    project(id: $id) {
      id
      title
      description
      image
      githubUrl
      websiteUrl
      category
      createdBy {
        id
        name
        email
        image
      }
    }
  }
`;

export const GET_USER_PROJECTS_QUERY = gql`
  query getUserProjects($userId: ID!) {
    getUserProjects(userId: $userId) {
      id
      title
      image
    }
  }
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      title
      description
      image
      websiteUrl
      githubUrl
      category
      createdBy {
        id
        email
        name
      }
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      title
      description
      createdBy {
        id
        email
        name
      }
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

export const GET_USER_BY_EMAIL_QUERY = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      image
      description
      githubUrl
      linkedInUrl
      websiteUrl
      password
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      image
      description
      githubUrl
      linkedInUrl
      websiteUrl
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

export const GET_USERNAMES_BY_NAME_QUERY = gql`
  query GetUsernamesByName($name: String!) {
    usernamesByName(name: $name)
  }
`;

export const getUserWithForgotPasswordTokenQuery = gql`
  query GetUserWithForgotPasswordToken($token: String!) {
    userSearch(first: 10, filter: { forgotPasswordToken: { eq: $token } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const getUserFollowersQuery = gql`
  query GetUserFollowers($userId: ID!) {
    user(by: { id: $userId }) {
      followers(first: 100) {
        edges {
          node {
            id
            username
            name
            image
          }
        }
      }
    }
  }
`;

export const getUserFollowingQuery = gql`
  query GetUserFollowing($userId: ID!) {
    user(by: { id: $userId }) {
      following(first: 100) {
        edges {
          node {
            id
            username
            name
            image
          }
        }
      }
    }
  }
`;

export const addUserFollowingMutation = gql`
  mutation AddUserFollowing($id: ID!, $followingId: ID!) {
    userUpdate(by: { id: $id }, input: { following: { link: $followingId } }) {
      user {
        id
      }
    }
  }
`;

export const addUserFollowerMutation = gql`
  mutation AddUserFollowers($id: ID!, $followingId: ID!) {
    userUpdate(by: { id: $id }, input: { followers: { link: $followingId } }) {
      user {
        id
      }
    }
  }
`;

export const removeUserFollowingMutation = gql`
  mutation RemoveUserFollowing($id: ID!, $followingId: ID!) {
    userUpdate(
      by: { id: $id }
      input: { following: { unlink: $followingId } }
    ) {
      user {
        id
      }
    }
  }
`;

export const removeUserFollowerMutation = gql`
  mutation RemoveUserFollowers($id: ID!, $followingId: ID!) {
    userUpdate(
      by: { id: $followingId }
      input: { followers: { unlink: $id } }
    ) {
      user {
        id
      }
    }
  }
`;
