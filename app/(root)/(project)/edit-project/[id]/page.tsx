import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/project/ProjectForm";
import { getProjectById } from "@/lib/actions/project.action";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const project = (await getProjectById(id)) as ProjectInterface | null;

  if (!project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm type="edit" userId={session?.user?.id} project={project} />
    </Modal>
  );
};

export default EditProject;
