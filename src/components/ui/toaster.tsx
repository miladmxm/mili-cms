"use client";

import type { ToasterProps } from "sonner";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group font-display!"
      theme={theme as ToasterProps["theme"]}
      style={
        {
          "--normal-bg": "var(--white)",
          "--normal-text": "var(--primary-900)",
          "--normal-border": "var(--primary-50)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
