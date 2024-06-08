import { UserProfile } from "@/common.types";
import ProfileInfo from "./ProfileInfo";
import Connections from "./Connections";
import Link from "next/link";
import FollowButton from "./FollowButton";

type ProfileProps = {
  userProfile: UserProfile;
  loggedInUserId: string | null;
};

const Profile = ({ userProfile, loggedInUserId }: ProfileProps) => {
  const isFollowing = userProfile.followers.some(
    (follower) => follower.id === loggedInUserId
  );

  return (
    <div className="flex flex-col items-center sm:items-start mt-10 w-full max-w-[500px]">
      <ProfileInfo
        userProfile={userProfile}
        canEdit={userProfile.id === loggedInUserId}
      />
      {loggedInUserId ? (
        <>
          {userProfile.id === loggedInUserId ? (
            <Connections
              userId={loggedInUserId}
              followers={userProfile.followers}
              following={userProfile.following}
            />
          ) : (
            <FollowButton
              userId={loggedInUserId}
              followId={userProfile.id}
              isFollowing={isFollowing}
            />
          )}
        </>
      ) : (
        <Link
          className="rounded-button bg-primary mt-4 flex w-full justify-center"
          href="/signin"
        >
          Follow
        </Link>
      )}
    </div>
  );
};

export default Profile;
