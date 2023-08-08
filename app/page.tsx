import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import Pagination from "@/components/Pagination";

type ProjectSearch = {
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

type SearchParams = {
  category?: string;
  endcursor?: string;
};

type HomeProps = {
  searchParams: SearchParams;
};

const HomePage = async ({
  searchParams: { category, endcursor },
}: HomeProps) => {
  const data = (await getAllProjects(
    category || null,
    endcursor || null
  )) as ProjectSearch;

  const projects =
    (category ? data?.projectSearch?.edges : data?.projectCollection?.edges) ||
    [];
  const pagination = category
    ? data?.projectSearch?.pageInfo
    : data?.projectCollection?.pageInfo;

  return (
    <section className="flexCenter flex-col paddings mb-16">
      <Categories />
      {projects.length > 0 ? (
        <>
          <section className="projects-grid">
            {projects.map(({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={node?.id}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={node?.createdBy.name}
                userImage={node?.createdBy.image}
                userId={node?.createdBy.id}
              />
            ))}
          </section>
          {pagination && (
            <Pagination
              startCursor={pagination?.startCursor}
              endCursor={pagination?.endCursor}
              hasPreviousPage={pagination?.hasPreviousPage}
              hasNextPage={pagination?.hasNextPage}
            />
          )}
        </>
      ) : (
        <>
          <p className="mt-56 text-xl text-center text-grey-color">
            Currently there are no posts.
          </p>
          <p className="mt-4 text-xl text-center text-grey-color">
            Create and share your creative projects to the community.
          </p>
        </>
      )}
    </section>
  );
};

export default HomePage;
