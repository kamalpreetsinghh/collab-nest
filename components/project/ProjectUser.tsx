"use client";

import Image from "next/image";
import Link from "next/link";
import NameIcon from "../NameIcon";
import { GoDotFill } from "react-icons/go";
import ProjectActions from "./ProjectActions";
import SendRequest from "./SendRequest";
import { useRef } from "react";
import { Session } from "next-auth";
import { MdEmail } from "react-icons/md";

type ProjectUserProps = {
  id: string;
  name: string;
  email: string;
  image: string;
  projectId: string;
  category: string;
  session: Session | null;
};

const ProjectUser = ({
  id,
  name,
  email,
  image,
  projectId,
  category,
  session,
}: ProjectUserProps) => {
  const isLoggedInUser = session?.user.email === email;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
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
    <div className="flex-between gap-y-8 w-full">
      <div className="flex-1 items-center flex gap-3 md:gap-5 w-full ">
        <Link className="flex w-14 h-14 relative" href={`/profile/${id}`}>
          {image ? (
            <Image
              src={image}
              fill
              style={{ objectFit: "cover" }}
              alt="profile"
              className="rounded-full"
            />
          ) : (
            <NameIcon name={name[0]} className="w-14 h-14 text-3xl" />
          )}
        </Link>
        <div className="flex-1 flex-start flex-col gap-1">
          <Link
            href={`/profile/${id}`}
            className="self-start text-lg font-semibold max-w-[240px] sm:max-w-xl truncate"
          >
            {name}
          </Link>
          <div className="user-info">
            <span className="text-gray-500">Available for work</span>

            <GoDotFill className="text-gray-500 hidden md:flex" />
            <Link
              href={`/?category=${category}`}
              className="text-primary font-semibold hidden md:flex"
            >
              {category}
            </Link>
          </div>
        </div>
      </div>

      {isLoggedInUser ? (
        <div className="flex justify-end items-center gap-2">
          <ProjectActions projectId={projectId} />
        </div>
      ) : (
        <>
          {session ? (
            <button
              className="rounded-button bg-primary"
              onClick={() => {
                openDialog();
              }}
            >
              <span className="hidden md:flex">Get in touch</span>
              <span className="flex md:hidden">
                <MdEmail className="w-6 h-6" />
              </span>
            </button>
          ) : (
            <Link href="/signin" className="rounded-button bg-primary">
              <span className="hidden md:flex">Get in touch</span>
              <span className="flex md:hidden">
                <MdEmail className="w-6 h-6" />
              </span>
            </Link>
          )}
        </>
      )}

      <SendRequest
        dialogRef={dialogRef}
        closeDialog={closeDialog}
        image={image}
        email={email}
        loggedInUserEmail={session?.user.email}
      />
    </div>
  );
};

export default ProjectUser;
