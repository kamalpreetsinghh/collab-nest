export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  singinUrlParams?: Record<string, string> | null;
};

export type Providers = Record<string, Provider>;

export type FormState = {
  title: string;
  description: string;
  image: string;
  websiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  id: string;
  title: string;
  description: string;
  image: string;
  websiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export type ProjectSearch = {
  projectSearch?: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
  projectCollection?: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string | null;
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
  websiteUrl: string;
  githubUrl: string;
  category: string;
}

export type SignUp = {
  name: string;
  email: string;
  password: string;
};

export enum ModalType {
  "Following",
  "Followers",
}

export type FollowerUser = {
  id: string;
  username: string;
  name: string;
  image?: string;
};

export type CreateProjectInput = {
  title: string;
  description: string;
  image: string;
  websiteUrl: string;
  githubUrl: string;
  category: string;
  createdBy: string;
};

export type ProjectPagination = {
  projects: [ProjectInterface];
  totalProjects: number;
  totalPages: number;
  currentPage: number;
};
