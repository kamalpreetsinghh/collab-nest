"use client";

import { useQuery } from "@apollo/client";
import Categories from "../Categories";
import ProjectCardList from "./ProjectCardList";
import { GET_PROJECTS_QUERY } from "@/graphql/queries";
import QueryResult from "../QueryResult";
import StyledPagination from "../StyledPagination";

type FeedProps = {
  page: number;
  category: string;
};

const Feed = ({ page, category }: FeedProps) => {
  const { loading, error, data } = useQuery(GET_PROJECTS_QUERY, {
    variables: { page, limit: 8, category },
  });

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <section className="flex-center flex-col paddings mb-16">
        <Categories />
        {data?.projects.projects.length > 0 ? (
          <>
            <ProjectCardList projects={data?.projects.projects} />

            <StyledPagination count={data?.projects.totalPages} page={page} />
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
    </QueryResult>
  );
};

export default Feed;
