import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { ProjectInterface } from "@/common.types";
import { getProjectDetails } from "@/lib/actions";

import Modal from "@/components/Modal";
import RelatedProjects from "@/components/RelatedProjects";
import ProjectActions from "@/components/ProjectActions";

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 items-center flex gap-5 w-full ">
          <Link className="flex w-14 h-14 relative" href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.image}
              fill
              style={{ objectFit: "cover" }}
              alt="profile"
              className="rounded-full"
            />
          </Link>
          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold max-w-[240px] sm:max-w-xl truncate">
              {projectDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="my-14">
        <Image
          src={projectDetails?.image}
          className="object-cover rounded-2xl"
          width={1064}
          height={798}
          style={{ objectFit: "contain" }}
          alt="poster"
        />
      </section>

      <section className="flexCenter flex-col">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>
        <div className="flex flex-wrap gap-5 mt-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥<span>Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀<span>Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flex justify-between items-center w-full gap-8 mt-16">
        <span className="flex-1 h-0.5 border border-nav-border" />
        <Link className="flex w-14 h-14 relative" href={renderLink()}>
          <Image
            src={projectDetails?.createdBy?.image}
            fill
            style={{ objectFit: "cover" }}
            alt="profile"
            className="rounded-full"
          />
        </Link>
        <span className="flex-1 h-0.5 border border-nav-border" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  );
};

export default ProjectPage;
