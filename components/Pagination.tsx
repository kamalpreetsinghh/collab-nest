"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search);

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      <Button
        title="First Page"
        handleClick={() => handleNavigation("prev")}
      ></Button>

      <Button
        title="Next Page"
        handleClick={() => handleNavigation("next")}
      ></Button>
    </div>
  );
};

export default Pagination;
