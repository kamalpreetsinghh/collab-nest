import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ProfileInfo from "@/components/ProfileInfo";

type ProfilePageProps = {
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params: { id } }: ProfilePageProps) => {
  const session = await getCurrentUser();
  const result = (await getUserProjects(id, 100)) as { user: UserProfile };
  const user = result?.user;
  if (!user) return <p className="no-result-text">Failed to fetch user info</p>;

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <ProfileInfo
          user={user}
          isLoggedInUser={(session && session?.user?.id === user.id) || false}
          loggedInUserId={session?.user?.id}
        />

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt="project image"
            width={739}
            height={554}
            style={{ objectFit: "cover" }}
            className="rounded-xl hidden sm:flex"
          />
        ) : (
          <div className="w-full flexCenter flex-col text-3xl sm:text-5xl font-pacifico">
            <p className="my-8">Share your work on</p>
            <p className="text-primary-purple my-4">Flexibbble</p>
            <p className="my-4">and showcase it to a</p>
            <p>community of creators.</p>
          </div>
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-4 w-full">
        {user?.projects?.edges?.length > 0 && (
          <p className="w-full text-left text-lg font-semibold">Recent Work</p>
        )}

        <div className="projects-grid">
          {user?.projects?.edges?.map(
            ({ node }: { node: ProjectInterface }) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                userImage={user.image ? user.image : undefined}
                userId={user.id}
              />
            )
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
