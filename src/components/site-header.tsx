"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Logo } from "./logo";
import { Carts } from "./carts";
import ThemeToggle from "./mode-toggle";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
        <div className="flex items-center justify-between md:justify-start md:gap-10">
          <Logo />
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-between gap-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="flex items-center gap-3">
              <Carts />
              {/* <ThemeToggle /> */}
              <AuthButton variant="desktop" />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 px-2">
            <SearchBar />
            <Carts />
            <ThemeToggle />
            <AuthButton variant="mobile" />
          </div>
        )}
      </div>
    </header>
  );
};
