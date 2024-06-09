"use client";

import { UserProfile } from "@/common.types";
import UploadImage from "../UploadImage";
import UserWebsites from "../UserWebsites";
import { motion } from "framer-motion";
import { fade } from "@/lib/motion";

type ProfileInfoProps = {
  userProfile: UserProfile;
  canEdit: boolean;
};

const ProfileInfo = ({ userProfile, canEdit }: ProfileInfoProps) => {
  return (
    <motion.div
      className="flex flex-col items-center sm:items-start mt-6 w-full max-w-[600px]"
      {...fade}
    >
      <UploadImage
        userImage={userProfile.image}
        canEdit={canEdit}
        name={userProfile.name[0]}
        userId={userProfile.id}
      />

      <p className="text-2xl text-grey-color mt-8">{userProfile.username}</p>
      <p className="text-4xl font-bold mt-4">{userProfile.name}</p>
      <p className="desc text-grey-color max-w-lg">
        {userProfile.description || "Hi I’m a Software Engineer 👋"}
      </p>

      <UserWebsites
        githubUrl={userProfile.githubUrl}
        linkedInUrl={userProfile.linkedInUrl}
        websiteUrl={userProfile.websiteUrl}
      />
    </motion.div>
  );
};

export default ProfileInfo;
