import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};
export const SectionContainer = ({ className, children }: Props) => {
  return <section className={cn(className, "mx-auto px-6 md:px-12 py-8 md:py-6 container max-w-6xl")}>{children}</section>;
};
