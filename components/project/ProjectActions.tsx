"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "@/lib/actions/project.action";

type ProjectActionsProps = {
  projectId: string;
};

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (dialogRef.current) {
    dialogRef.current.addEventListener("click", (e) => {
      if (dialogRef.current) {
        const dialogDimensions = dialogRef.current.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialogRef.current.close();
        }
      }
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <Link
          href={`/edit-project/${projectId}`}
          className="icon-btn bg-primary/[.2] text-white"
        >
          <EditIcon className="text-primary" />
        </Link>

        <button
          className="icon-btn bg-red-600/[.2] text-white"
          type="button"
          onClick={showModal}
        >
          <DeleteIcon className="text-red-600" />
        </button>
      </div>

      <dialog
        className="rounded-2xl w-[90vw] max-w-md p-4 
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        ref={dialogRef}
      >
        <div className="flex flex-col gap-2 items-center">
          <p className="text-2xl font-bold text-center py-3">Confirm Delete?</p>
          <p>Are you sure you want to delete this design?</p>
          <div className="flex w-full gap-4 justify-center py-3">
            <button
              type="button"
              onClick={handleDeleteProject}
              className="rounded-button bg-primary w-24"
            >
              {isDeleting ? (
                <div className="h-5 flex items-center justify-center">
                  <span className="loader bottom-3 mx-4"></span>
                </div>
              ) : (
                "Delete"
              )}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-button bg-red-800 w-24"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProjectActions;
