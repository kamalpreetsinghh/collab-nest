import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

type SearchParams = {
  category?: string;
};

type HomeProps = {
  searchParams: SearchParams;
};

const Home = async ({ searchParams: { category } }: HomeProps) => {
  const data = (await getAllProjects(category)) as ProjectSearch;
  const projects = data?.projectSearch?.edges || [];

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">
          No projects found, go create some first.
        </p>
      </section>
    );
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projects.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      <h1>Pagination</h1>
    </section>
  );
};

export default Home;
