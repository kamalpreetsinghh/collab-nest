"use client";

import Pagination from "@mui/material/Pagination";
import { ThemeProvider, styled } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/lib/muiTheme";
import { useTheme } from "next-themes";
import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type StyledPaginationProps = {
  page: number;
  count: number;
};

const CustomizedPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.mode === "dark" ? "white" : "black",
  },
}));

const StyledPagination = ({ page, count }: StyledPaginationProps) => {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CustomizedPagination
        color="primary"
        className="my-6"
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </ThemeProvider>
  );
};

export default StyledPagination;
