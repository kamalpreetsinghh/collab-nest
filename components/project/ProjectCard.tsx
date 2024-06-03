"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { item } from "@/lib/motion";
import UserNameIcon from "../UserNameIcon";

type ProjectCardProps = {
  id: string;
  image: string;
  title: string;
  name: string;
  userImage?: string;
  userId: string;
};
const ProjectCard = ({
  id,
  image,
  title,
  name,
  userImage,
  userId,
}: ProjectCardProps) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      className="flexCenter flex-col rounded-2xl w-full sm:w-[298px]"
    >
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-60 sm:h-56"
      >
        <Image
          src={image}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
          alt="project image"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm gap-1">
        <Link className="flex items-center gap-2" href={`/profile/${userId}`}>
          <div className="flex w-8 h-8 relative">
            {userImage ? (
              <Image
                src={userImage}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                alt="profile image"
              />
            ) : (
              <UserNameIcon name={name[0]} className="w-8 h-8 text-lg" />
            )}
          </div>
          <p>{name}</p>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={12} height={9} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
