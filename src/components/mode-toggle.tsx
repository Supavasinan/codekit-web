"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      className={`w-full flex items-center md:justify-center justify-start gap-3 md:gap-0 rounded-md md:size-10 md:rounded-full ${className}`}
    >
      <div className="flex items-center justify-center w-5 h-5 relative">
        {/* Only render icons after mount to avoid SSR mismatch */}
        {mounted && (
          <>
            <MoonIcon
              size={16}
              className={`transition-all ${
                theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
            <SunIcon
              size={16}
              className={`absolute transition-all ${
                theme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
            />
          </>
        )}
      </div>
      <span className="md:hidden text-sm font-medium">เปลี่ยนธีม</span>
    </Button>
  );
};

export default ThemeToggle;
