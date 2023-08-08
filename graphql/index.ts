export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
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
	}
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
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
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
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
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
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

export const getAllProjectsQuery = `
  query getAllProjects($endcursor: String) {
    projectCollection(first: 8, after: $endcursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            image
          }
        }
      }
    }
  }
`;

export const getProjectsQuery = `
  query getProjects($category: String, $endCursor: String) {
    projectSearch(first: 8, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          description
          image
          githubUrl          
          liveSiteUrl
          category
          createdBy {
            id
            email
            name
            image
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      githubUrl
      liveSiteUrl
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

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      image
      githubUrl
      linkedInUrl
      websiteUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;

export const updateUserMutation = `
	mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
		userUpdate(by: { id: $id }, input: $input) {
			user {
        id
      }
		}
	}
`;

export const getUsernamesWithSameName = `
  query GetUsernamesWithSameName($name: String! ) {
    userSearch(first: 10, filter: { name: {eq: $name } }) {
      edges {
        node {
          username
        }
      }
    }
  }
`;
