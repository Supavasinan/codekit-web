import { SiteHeader } from "@/components/site-header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <SiteHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MarketingLayout;
