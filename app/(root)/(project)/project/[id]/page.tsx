import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import RelatedProjects from "@/components/RelatedProjects";
import NameIcon from "@/components/NameIcon";
import { getCurrentUser } from "@/lib/session";
import { getProjectById } from "@/lib/actions/project.action";
import { GoDotFill } from "react-icons/go";
import { FaGithub } from "react-icons/fa6";
import ProjectUser from "@/components/project/ProjectUser";

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const project = await getProjectById(id);
  const creatorId = project?.createdBy.id;

  return (
    <>
      {project ? (
        <Modal>
          <section className="max-w-[1064px] max-xs:flex-col w-full">
            <h3 className="text-3xl font-bold pb-4">{project.title}</h3>
            <ProjectUser
              projectId={project.id}
              category={project.category}
              id={project.createdBy.id}
              name={project.createdBy.name}
              email={project.createdBy.email}
              image={project.createdBy.image}
              session={session}
            />
          </section>

          <section className="my-14">
            <Image
              src={project.image}
              className="object-cover rounded-2xl"
              width={1064}
              height={798}
              style={{ objectFit: "contain" }}
              alt="poster"
            />
          </section>

          <section className="flex-center flex-col">
            <p className="max-w-5xl text-xl font-normal">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-5 mt-5 items-center">
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-center gap-2 tex-sm font-medium text-primary"
              >
                <FaGithub className="text-black dark:text-white" />
                <span>Github</span>
              </Link>
              <GoDotFill className="text-gray-500" />
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-center gap-2 tex-sm font-medium text-primary"
              >
                🚀<span>Live Site</span>
              </Link>
            </div>
          </section>

          <section className="flex justify-between items-center w-full gap-8 mt-16">
            <span className="flex-1 h-0.5 border border-nav-border" />
            <Link
              className="flex w-14 h-14 relative"
              href={`/profile/${creatorId}`}
            >
              {project.createdBy.image ? (
                <Image
                  src={project.createdBy.image}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="profile"
                  className="rounded-full"
                />
              ) : (
                <NameIcon
                  name={project.createdBy.name[0]}
                  className="w-14 h-14 text-3xl"
                />
              )}
            </Link>
            <span className="flex-1 h-0.5 border border-nav-border" />
          </section>

          <RelatedProjects
            userId={project.createdBy.id}
            projectId={project.id}
          />
        </Modal>
      ) : (
        <p className="no-result-text">Failed to fetch project info</p>
      )}
    </>
  );
};

export default ProjectPage;
