import Categories from "@/components/Categories";
import Pagination from "@/components/Pagination";
import ProjectCardList from "@/components/project/ProjectCardList";
import { getProjects } from "@/lib/actions/project.action";

type HomeProps = {
  searchParams: {
    category?: string;
    endcursor?: string;
  };
};

const HomePage = async ({
  searchParams: { category, endcursor },
}: HomeProps) => {
  const paginatedProjects = await getProjects(1, 8);
  const { projects, currentPage, totalPages } = paginatedProjects;

  return (
    <section className="flex-center flex-col paddings mb-16">
      <Categories />
      {projects.length > 0 ? (
        <>
          <ProjectCardList projects={projects} />

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <>
          <p className="mt-56 text-xl text-center text-grey-color">
            Currently there are no posts.
          </p>
          <p className="mt-4 text-xl text-center text-grey-color">
            Create and share your creative designs with the community.
          </p>
        </>
      )}
    </section>
  );
};

export default HomePage;
