"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fade } from "@/lib/motion";
import Image from "next/image";

type FormProps = {
  children: ReactNode;
  image: string;
  imageDesc: string;
};

const Form = ({ children, image, imageDesc }: FormProps) => {
  return (
    <section className="w-full flex justify-center lg:justify-between items-center form-padding">
      <motion.div className="w-full lg:w-3/5 lg:pr-24" {...fade}>
        {children}
      </motion.div>
      <motion.div className="hidden lg:flex w-2/5" {...fade}>
        <div className="flex w-full justify-center relative">
          <Image
            className="object-cover"
            src={image}
            width={0}
            height={0}
            sizes="100vw"
            alt={imageDesc}
            priority
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Form;
