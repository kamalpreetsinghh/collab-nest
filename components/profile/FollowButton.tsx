"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeAnimation } from "@/lib/motion";
import { addFollower, removeFollower } from "@/lib/actions/user.action";
type FollowButtonProps = {
  userId: string;
  followId: string;
  isFollowing: boolean;
};

const FollowButton = ({
  userId,
  followId,
  isFollowing: isFollowingUser,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnClick = async () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
    try {
      setIsSubmitting(true);
      if (isFollowing) {
        await removeFollower(userId, followId);
      } else {
        await addFollower(userId, followId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleOnClick}
      className="rounded-button bg-primary mt-4 w-full"
      {...fadeAnimation}
    >
      {isSubmitting ? (
        <div className="h-6 flex items-center justify-center">
          <span className="loader bottom-3"></span>
        </div>
      ) : (
        <>{isFollowing ? "Following" : "Follow"}</>
      )}
    </motion.button>
  );
};

export default FollowButton;
