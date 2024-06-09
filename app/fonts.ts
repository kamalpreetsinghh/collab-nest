import { Poppins, Anton } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  display: "swap",
});
