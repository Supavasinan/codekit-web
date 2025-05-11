import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter/>
    </div>
  );
};

export default MarketingLayout;
