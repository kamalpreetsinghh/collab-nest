"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FollowerUser, ModalType } from "@/common.types";
import FollowerList from "./FollowerList";
import {
  addUserFollowing,
  fetchToken,
  getUserFollowersList,
  getUserFollowingList,
  removeUserFollowing,
} from "@/lib/actions";

type ProfileActionsProps = {
  isLoggedInUser: boolean;
  email: string;
  userId: string;
  loggedInUserId: string;
};

const ProfileActions = ({
  isLoggedInUser,
  email,
  userId,
  loggedInUserId,
}: ProfileActionsProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<FollowerUser[]>([]);
  const [modalType, setModalType] = useState(ModalType.Followers);

  useEffect(() => {
    if (isLoggedInUser || loggedInUserId) {
      const fetchFollowing = async () => {
        const result: any = await getUserFollowingList(loggedInUserId);
        const followingEdges = result.user.following.edges;
        if (followingEdges.length > 0) {
          const followingUsers = followingEdges.map((edge: any) => edge.node);
          if (isLoggedInUser) {
            setFollowing(followingUsers);
          } else {
            const followingUserIds: string[] = followingUsers.map(
              (followingUser: FollowerUser) => followingUser.id
            );

            if (followingUserIds.includes(userId)) {
              setIsFollowing(true);
            }
          }
        }
      };

      fetchFollowing().catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (isLoggedInUser) {
      const fetchFollowers = async () => {
        const result: any = await getUserFollowersList(loggedInUserId);
        const followerEdges = result.user.followers.edges;
        if (followerEdges.length > 0) {
          const followerUsers = followerEdges.map((edge: any) => edge.node);
          setFollowers(followerUsers);
        }
      };

      fetchFollowers().catch((error) => console.log(error));
    }
  }, []);

  const showFollowingModal = () => {
    setModalType(ModalType.Following);
    showModal();
  };

  const showFollowersModal = () => {
    setModalType(ModalType.Followers);
    showModal();
  };

  const showModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleOnClick = async () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);

    try {
      if (isFollowing) {
        const { token } = await fetchToken();
        const response = await removeUserFollowing(
          loggedInUserId,
          userId,
          token
        );
      } else {
        const { token } = await fetchToken();
        const response = await addUserFollowing(loggedInUserId, userId, token);
      }
    } catch (error) {
      console.log(error);
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
      {isLoggedInUser ? (
        <div className="flex gap-2 mt-4">
          <Link className="primary-button" href={`/edit-profile/${userId}`}>
            Edit Profile
          </Link>
          <Button title="Followers" handleClick={showFollowersModal} />
          <Button title="Following" handleClick={showFollowingModal} />
        </div>
      ) : (
        loggedInUserId && (
          <div className="flex gap-2 mt-4">
            <Button
              title={isFollowing ? "Following" : "Follow"}
              handleClick={handleOnClick}
            />
            <Link href={`mailto:${email}`}>
              <Button title="Hire Me" />
            </Link>
          </div>
        )
      )}

      {isLoggedInUser && (
        <div className="w-full h-screen -z-50 fixed top-0 left-0">
          <dialog
            className="rounded-2xl w-full max-w-md mx-auto my-auto"
            ref={dialogRef}
          >
            <div className="flex-col flexCenter py-2 px-4">
              <h1 className="mt-2 mb-4 font-bold flexCenter">
                {ModalType[modalType]}
              </h1>
              <div
                className="border-t border-nav-border w-full 
              h-96 overflow-y-scroll overflow-x-scroll"
              >
                {modalType === ModalType.Following &&
                  following.length === 0 && (
                    <h1 className="my-4 flexCenter">No Following</h1>
                  )}
                {modalType === ModalType.Followers &&
                  followers.length === 0 && (
                    <h1 className="my-4 flexCenter">No Followers</h1>
                  )}
                <FollowerList
                  modalType={modalType}
                  userId={userId}
                  followers={
                    modalType === ModalType.Following ? following : followers
                  }
                />
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
