"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
const TOGGLE_THEME_KEYBOARD_SHORTCUT = "d";

import { Button } from "@/components/dashboard/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import { useEffect, useEffectEvent } from "react";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (
      event.key === TOGGLE_THEME_KEYBOARD_SHORTCUT &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault();
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipContent>
          <KbdGroup dir="ltr">
            <Kbd>CTRL</Kbd>
            <span>+</span>
            <Kbd className="uppercase">{TOGGLE_THEME_KEYBOARD_SHORTCUT}</Kbd>
          </KbdGroup>
        </TooltipContent>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          روشن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          خاموش
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          سیستم
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
