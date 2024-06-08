"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";

const ToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme !== "dark" ? "dark" : "light")}
      className="toggle-btn"
    >
      {theme === "dark" ? (
        <FaMoon className="w-6 h-6 text-primary" />
      ) : (
        <MdLightMode className="w-6 h-6 text-primary" />
      )}
    </button>
  );
};

export default ToggleSwitch;
