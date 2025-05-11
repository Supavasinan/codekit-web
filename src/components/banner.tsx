export const dynamic = "force-static";

import { db } from "@/db";
import { banner } from "@/db/schema/app";
import { BannersClient } from "./banners-client";

export const Banner = async () => {
  const banners = await db.select().from(banner);

  return <BannersClient banners={banners} />;
};
