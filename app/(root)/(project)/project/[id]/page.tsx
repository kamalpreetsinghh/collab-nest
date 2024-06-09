import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import RelatedProjects from "@/components/RelatedProjects";
import NameIcon from "@/components/NameIcon";
import ProjectActions from "@/components/project/ProjectActions";
import { getCurrentUser } from "@/lib/session";
import { getProjectById } from "@/lib/actions/project.action";
import { GoDotFill } from "react-icons/go";

const ProjectPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const project = await getProjectById(id);
  const creatorId = project?.createdBy.id;

  return (
    <>
      {project ? (
        <Modal>
          <section className="flex-between gap-y-8 max-w-4xl max-xs:flex-col w-full">
            <div className="flex-1 items-center flex gap-5 w-full ">
              <Link
                className="flex w-14 h-14 relative"
                href={`/profile/${creatorId}`}
              >
                {project.createdBy.image ? (
                  <Image
                    src={project.createdBy?.image}
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
              <div className="flex-1 flex-start flex-col gap-1">
                <p className="self-start text-lg font-semibold max-w-[240px] sm:max-w-xl truncate">
                  {project.title}
                </p>
                <div className="user-info">
                  <Link href={`/profile/${creatorId}`}>
                    {project.createdBy.name}
                  </Link>
                  <GoDotFill className="text-gray-500" />
                  <Link
                    href={`/?category=${project.category}`}
                    className="text-primary font-semibold"
                  >
                    {project?.category}
                  </Link>
                </div>
              </div>
            </div>

            {session?.user?.email === project.createdBy.email && (
              <div className="flex justify-end items-center gap-2">
                <ProjectActions projectId={project.id} />
              </div>
            )}
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
                🖥<span>Github</span>
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
