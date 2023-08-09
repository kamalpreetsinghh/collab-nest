import React from "react";
import UploadImage from "./UploadImage";
import Link from "next/link";
import Button from "./Button";
import UserWebsites from "./UserWebsites";
import { UserProfile } from "@/common.types";

type ProfileInfoProps = {
  user: UserProfile;
  canEdit: boolean;
};

const ProfileInfo = ({ user, canEdit }: ProfileInfoProps) => {
  return (
    <div className="flex items-start flex-col w-full">
      <UploadImage
        userImage={user?.image}
        canEdit={canEdit}
        name={user?.name[0]}
        userId={user?.id}
      />

      <p className="text-2xl text-grey-color mt-8">{user.username}</p>
      <p className="text-4xl font-bold text-grey-color mt-4">{user?.name}</p>
      <p className="desc max-w-lg">
        {user.description || "Hi I’m a Software Engineer 👋"}
      </p>

      <div className="flex mt-4 gap-5 w-full flex-wrap">
        {canEdit ? (
          <div className="flex gap-2">
            <Link className="primary-button" href={`/edit-profile/${user.id}`}>
              Edit Profile
            </Link>
          </div>
        ) : (
          <>
            <Button title="Follow" leftIcon="/plus-round.svg" />
            <Link href={`mailto:${user?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </>
        )}
      </div>
      <UserWebsites
        githubUrl={user?.githubUrl}
        linkedInUrl={user?.linkedInUrl}
        websiteUrl={user?.websiteUrl}
      />
    </div>
  );
};

export default ProfileInfo;
