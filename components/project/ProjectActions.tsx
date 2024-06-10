"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "@/lib/actions/project.action";

type ProjectActionsProps = {
  projectId: string;
};

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    try {
      await deleteProject(projectId);

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="icon-btn bg-purple-500 text-white"
      >
        <EditIcon />
      </Link>

      <button
        className="icon-btn bg-red-600 text-white"
        type="button"
        disabled={isDeleting}
        onClick={handleDeleteProject}
      >
        <DeleteIcon />
      </button>
    </>
  );
};

export default ProjectActions;
