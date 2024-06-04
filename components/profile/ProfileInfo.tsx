import { UserProfile } from "@/common.types";
import ProfileActions from "./ProfileActions";
import UploadImage from "../UploadImage";
import UserWebsites from "../UserWebsites";

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
    <div className="flex flex-col items-center sm:items-start mt-10 w-full max-w-[500px]">
      <UploadImage
        userImage={user?.image}
        canEdit={isLoggedInUser}
        name={user?.name[0]}
        userId={user?.id}
      />

      <p className="text-2xl mt-8">{user.username}</p>
      <p className="text-4xl font-bold mt-4">{user?.name}</p>
      <p className="desc text-grey-color max-w-lg">
        {user.description || "Hi I’m a Software Engineer 👋"}
      </p>

      <UserWebsites
        githubUrl={user?.githubUrl}
        linkedInUrl={user?.linkedInUrl}
        websiteUrl={user?.websiteUrl}
      />

      <ProfileActions
        isLoggedInUser={isLoggedInUser}
        email={user.email}
        userId={user.id}
        loggedInUserId={loggedInUserId}
      />
    </div>
  );
};

export default ProfileInfo;
