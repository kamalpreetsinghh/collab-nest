"use client";

import Link from "next/link";
import React from "react";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

type UserWebsitesProps = {
  githubUrl: string | null;
  linkedInUrl: string | null;
  websiteUrl: string | null;
};

const UserWebsites = ({
  githubUrl,
  linkedInUrl,
  websiteUrl,
}: UserWebsitesProps) => {
  return (
    <div className="flex gap-4">
      {githubUrl && (
        <Link
          href={githubUrl}
          target="_blank"
          className="mt-4 mb-2 hover:text-primary-purple"
        >
          <GitHubIcon />
        </Link>
      )}
      {linkedInUrl && (
        <Link
          href={linkedInUrl}
          target="_blank"
          className="mt-4 mb-2 hover:text-primary-purple"
        >
          <LinkedInIcon />
        </Link>
      )}
      {websiteUrl && (
        <Link
          href={websiteUrl}
          target="_blank"
          className="mt-4 mb-2 hover:text-primary-purple"
        >
          <LanguageIcon />
        </Link>
      )}
    </div>
  );
};

export default UserWebsites;
