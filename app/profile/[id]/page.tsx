import { ProjectInterface, UserProfile } from "@/common.types";
import { getUserProjects } from "@/lib/actions";

import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import UserWebsites from "@/components/UserWebsites";
import ProjectCard from "@/components/ProjectCard";

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
        <div className="flex items-start flex-col w-full">
          {user && user.image && (
            <Image
              src={user.image}
              width={100}
              height={100}
              className="rounded-full"
              alt="user image"
            />
          )}

          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {user.description || "Hi I’m a Software Engineer 👋"}
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            {session?.user?.email === user?.email ? (
              <Link href={`/edit-profile/${user.id}`}>
                <Button title="Edit"></Button>
              </Link>
            ) : (
              <>
                <Button
                  title="Follow"
                  leftIcon="/plus-round.svg"
                  bgColor="bg-light-white-400 !w-max"
                  textColor="text-black-100"
                />
                <Link href={`mailto:${user?.email}`}>
                  <Button title="Hire Me" leftIcon="/email.svg" />
                </Link>
              </>
            )}
          </div>
          <UserWebsites
            githubUrl={user?.githubUrl}
            linkedInUrl={user?.linkedInUrl}
            websiteUrl={user?.websiteUrl}
          />
        </div>

        {user?.projects?.edges?.length > 0 ? (
          <Image
            src={user?.projects?.edges[0]?.node?.image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <div className="w-full flexCenter flex-col text-5xl font-pacifico">
            <p className="my-8">Share your work on</p>
            <p className="text-primary-purple my-4">Flexibbble</p>
            <p className="my-4">and showcase it to a</p>
            <p>community of creators.</p>
          </div>
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        {user?.projects?.edges?.length > 0 && (
          <p className="w-full text-left text-lg font-semibold">Recent Work</p>
        )}

        <div className="profile_projects">
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
