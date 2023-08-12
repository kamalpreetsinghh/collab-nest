import React from "react";
import UploadImage from "./UploadImage";
import UserWebsites from "./UserWebsites";
import { UserProfile } from "@/common.types";
import ProfileActions from "./ProfileActions";

type ProfileInfoProps = {
  user: UserProfile;
  isLoggedInUser: boolean;
  loggedInUserId: string;
};

const ProfileInfo = ({
  user,
  isLoggedInUser,
  loggedInUserId,
}: ProfileInfoProps) => {
  return (
    <div className="flex flex-col mt-10 w-full max-w-[500px]">
      <UploadImage
        userImage={user?.image}
        canEdit={isLoggedInUser}
        name={user?.name[0]}
        userId={user?.id}
      />

      <p className="text-2xl text-grey-color mt-8">{user.username}</p>
      <p className="text-4xl font-bold text-grey-color mt-4">{user?.name}</p>
      <p className="desc max-w-lg">
        {user.description || "Hi I’m a Software Engineer 👋"}
      </p>

      <ProfileActions
        isLoggedInUser={isLoggedInUser}
        email={user.email}
        userId={user.id}
        loggedInUserId={loggedInUserId}
      />

      <UserWebsites
        githubUrl={user?.githubUrl}
        linkedInUrl={user?.linkedInUrl}
        websiteUrl={user?.websiteUrl}
      />
    </div>
  );
};

export default ProfileInfo;
