"use client"

import { useTheme } from "next-themes"
import { Switch } from "./ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme()
    const isDark = theme === "dark";
  return (
    <div className="flex gap-2 items-center">
      <Sun className={`h-5 w-5 ${isDark ? "text-red-500" : ""}`} />
      <Switch
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <Moon className={`h-5 w-5 ${isDark ? "text-red-500" : ""}`} />
    </div>
  );
}

export default ThemeToggle