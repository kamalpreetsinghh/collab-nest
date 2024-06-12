import { getCurrentUser } from "@/lib/session";
import ProjectCard from "@/components/project/ProjectCard";
import { getUserProfile } from "@/lib/actions/user.action";
import Profile from "@/components/profile/Profile";

type ProfilePageProps = {
  params: {
    id: string;
  };
};

const ProfilePage = async ({ params: { id } }: ProfilePageProps) => {
  const session = await getCurrentUser();
  const user = await getUserProfile(id);
  const projects = user?.projects;

  if (!user) return <p className="no-result-text">Failed to fetch user info</p>;

  return (
    <section className="flex flex-col w-full mx-auto paddings">
      <Profile
        userProfile={user}
        loggedInUserId={session && session?.user?.id ? session?.user?.id : null}
      />

      {projects && projects.length > 0 && (
        <section className="flex-start flex-col lg:mt-28 mt-4 w-full">
          <p className="w-full text-left text-lg font-semibold sm:px-4">
            Recent Work
          </p>

          <div className="projects-grid mb-16">
            {projects.map(({ id, image, title }) => (
              <ProjectCard
                key={`${id}`}
                id={id}
                image={image}
                title={title}
                name={user.name}
                userImage={user.image ? user.image : undefined}
                userId={user.id}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ProfilePage;
