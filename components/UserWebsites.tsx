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
    <div className="my-6 flex gap-4">
      {githubUrl && (
        <Link href={githubUrl}>
          <GitHubIcon />
        </Link>
      )}
      {linkedInUrl && (
        <Link href={linkedInUrl}>
          <LinkedInIcon />
        </Link>
      )}
      {websiteUrl && (
        <Link href={websiteUrl}>
          <LanguageIcon />
        </Link>
      )}
    </div>
  );
};

export default UserWebsites;
