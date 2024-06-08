import { gql } from "@apollo/client";

export const GET_PROJECTS_QUERY = gql`
  query Projects($page: Int!, $limit: Int!, $category: String!) {
    projects(page: $page, limit: $limit, category: $category) {
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
  }
`;

export const GET_USER_PROJECTS_QUERY = gql`
  query GetUserProjects($id: ID!, $limit: Int) {
    getUserProjects(id: $id, limit: $limit) {
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

export const GET_USER_WITH_PROJECTS_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      username
      name
      email
      description
      image
      linkedInUrl
      githubUrl
      websiteUrl
      projects {
        id
        image
        title
        websiteUrl
        description
        category
        githubUrl
      }
      followers {
        id
        username
        name
        image
      }
      following {
        id
        username
        name
        image
      }
    }
  }
`;

export const GET_USER_BY_EMAIL_QUERY = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
      password
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

export const GET_FOLLOWERS = gql`
  query GetFollowers($userId: ID!) {
    followers(userId: $userId) {
      id
      name
    }
  }
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($userId: ID!) {
    following(userId: $userId) {
      id
      name
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!, $followId: ID!) {
    followUser(userId: $userId, followId: $followId) {
      id
      following {
        id
        name
      }
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!, $unfollowId: ID!) {
    unfollowUser(userId: $userId, unfollowId: $unfollowId) {
      id
      following {
        id
        name
      }
    }
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
