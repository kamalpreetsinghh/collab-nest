"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { item } from "@/lib/motion";
import NameIcon from "../NameIcon";
import { FaEye, FaHeart } from "react-icons/fa6";

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
      className="flex-center flex-col rounded-2xl w-full sm:w-[312px]"
    >
      <Link
        href={`/project/${id}`}
        className="flex-center group relative w-full h-60 sm:h-56"
      >
        <Image
          src={image}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="rounded-2xl"
          alt="project image"
          priority
        />

        <div className="hidden group-hover:flex profile-card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flex-between w-full px-2 mt-3 font-semibold text-sm gap-1">
        <Link className="flex items-center gap-2" href={`/profile/${userId}`}>
          <div className="flex w-8 h-8 relative">
            {userImage ? (
              <Image
                src={userImage}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
                alt="profile image"
                sizes="(max-width: 600px) 32px, 
                  (max-width: 1200px) 32px, 
                  32px"
              />
            ) : (
              <NameIcon name={name[0]} className="w-8 h-8 text-lg" />
            )}
          </div>
          <p>{name}</p>
        </Link>

        <div className="flex-center gap-3">
          <div className="flex-center gap-2">
            <FaHeart />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flex-center gap-2">
            <FaEye />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
