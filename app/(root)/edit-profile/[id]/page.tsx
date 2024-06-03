import { UserProfile } from "@/common.types";
import Modal from "@/components/Modal";
import ProfileForm from "@/components/ProfileForm";
import { getUserProjects } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const EditProfile = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getUserProjects(id, 100)) as { user: UserProfile };

  if (!result?.user)
    return <p className="no-result-text">Failed to fetch user info</p>;

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Profile</h3>
      <ProfileForm user={result?.user} />
    </Modal>
  );
};

export default EditProfile;
