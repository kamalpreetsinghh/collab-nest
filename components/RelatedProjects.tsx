import { getUserProjects } from "@/lib/actions/project.action";
import Image from "next/image";
import Link from "next/link";

type RelatedProjectsProps = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: RelatedProjectsProps) => {
  const userProjects = await getUserProjects(userId, 8);

  const filteredProjects = userProjects.filter(
    (project) => project.id !== projectId
  );

  if (filteredProjects.length === 0) return null;

  return (
    <section className="flex flex-col mt-16 w-full">
      <div className="flex-between">
        <Link href={`/profile/${userId}`} className="text-primary text-base">
          View All
        </Link>
      </div>
      <div className="related_projects-grid">
        {filteredProjects.map(({ id, image, title }) => (
          <div className="flex-center related_project-card drop-shadow-card">
            <Link
              href={`/project/${id}`}
              className="flex-center group relative w-full h-full"
            >
              <Image
                src={image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
