import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import ProjectCard from "@/components/project/ProjectCard";
import { getUserProfile } from "@/lib/actions/user.action";
import Profile from "@/components/profile/Profile";
import { anton } from "@/app/fonts";

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
    <section className="flex-center flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flex-between max-lg:flex-col gap-10 w-full sm:px-4">
        <Profile
          userProfile={user}
          loggedInUserId={
            session && session?.user?.id ? session?.user?.id : null
          }
        />

        {projects && projects.length > 0 ? (
          <div className=" w-[600px] h-[400px] relative hidden lg:flex">
            <Image
              className="rounded-2xl"
              src={projects[0].image}
              alt="project image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="w-full flex-center flex-col text-3xl sm:text-5xl">
            <p className="py-8">Share your work on</p>
            <p
              className={`${anton.className} text-primary pb-4 font-black text-5xl sm:text-7xl`}
            >
              Collab Nest
            </p>
            <p className="py-4">and showcase it to a</p>
            <p>community of creators.</p>
          </div>
        )}
      </section>

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
