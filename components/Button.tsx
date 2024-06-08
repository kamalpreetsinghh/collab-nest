"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";

type ButtonProps = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean | false;
  type?: "button" | "submit";
  className?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  type,
  className = "",
}: ButtonProps) => (
  <button
    type={type || "button"}
    disabled={isSubmitting || false}
    className={`primary-button gap-3 ${className}`}
    onClick={handleClick}
  >
    {isSubmitting ? (
      <div className="h-5 flex items-center justify-center">
        <span className="loader bottom-3 mx-4"></span>
      </div>
    ) : (
      <>
        {leftIcon && (
          <Image src={leftIcon} width={14} height={14} alt="left icon" />
        )}
        {title}
        {rightIcon && (
          <Image src={rightIcon} width={14} height={14} alt="right icon" />
        )}
      </>
    )}
  </button>
);

export default Button;
