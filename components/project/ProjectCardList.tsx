"use client";

import { motion } from "framer-motion";
import { container } from "../../lib/motion";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "./ProjectCard";

type ProjectCardListProps = {
  projects: ProjectInterface[];
};

const ProjectCardList = ({ projects }: ProjectCardListProps) => {
  return (
    <motion.section
      className="projects-grid"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project: ProjectInterface) => (
        <ProjectCard
          key={project?.id}
          id={project?.id}
          image={project?.image}
          title={project?.title}
          name={project?.createdBy.name}
          userImage={project?.createdBy.image}
          userId={project?.createdBy.id}
        />
      ))}
    </motion.section>
  );
};

export default ProjectCardList;
