import { SearchBar } from "@/components/search-bar";
import { Logo } from "./logo";
import { Carts } from "./carts";
import ThemeToggle from "./mode-toggle";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";

export const SiteHeader = () => {
  return (
    <header className="w-full bg-background">
      <div className="max-w-7xl mx-auto px-10 py-5">
        <div className="flex flex-col gap-3">
          <div className="ml-auto">
            <AuthButton />
          </div>
          <div className="flex gap-10 items-center justify-center">
            <Logo />
            <SearchBar />
            <Carts />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
