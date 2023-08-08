export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  avatarUrl: string;
};

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  description: string | null;
  image: string | null;
  githubUrl: string | null;
  linkedInUrl: string | null;
  websiteUrl: string | null;
  projects: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface UpdateProfile {
  description: string | null;
  githubUrl: string | null;
  linkedInUrl: string | null;
  websiteUrl: string | null;
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export type SignUp = {
  name: string;
  email: string;
  password: string;
};
