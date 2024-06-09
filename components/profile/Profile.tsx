"use client";

import ProfileInfo from "./ProfileInfo";
import Connections from "./Connections";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "./FollowButton";
import { motion } from "framer-motion";
import { fade } from "@/lib/motion";
import { anton } from "@/app/fonts";
import { UserProfile } from "@/common.types";

type ProfileProps = {
  userProfile: UserProfile;
  loggedInUserId: string | null;
};

const Profile = ({ userProfile, loggedInUserId }: ProfileProps) => {
  const isFollowing = userProfile.followers.some(
    (follower) => follower.id === loggedInUserId
  );

  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between md:px-8">
      <div className="flex flex-col items-center md:items-start">
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
            className="rounded-button bg-primary mt-4 flex justify-center w-full"
            href="/signin"
          >
            Follow
          </Link>
        )}
      </div>

      {userProfile.projects && userProfile.projects.length > 0 ? (
        <div className="w-1/2 hidden lg:flex justify-end">
          <motion.div className="w-[525px] h-[350px] relative" {...fade}>
            <Image
              src={userProfile.projects[0].image}
              className="rounded-2xl"
              alt="project image"
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center text-2xl sm:text-3xl md:text-4xl"
          {...fade}
        >
          <p className="pt-16 lg:pt-8 pb-8">Share your work on</p>
          <p
            className={`${anton.className} text-primary pb-4 font-black text-5xl sm:text-7xl`}
          >
            Collab Nest
          </p>
          <p className="py-4">and showcase it to a</p>
          <p>community of creators.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
