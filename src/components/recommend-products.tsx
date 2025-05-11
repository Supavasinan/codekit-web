import { db } from "@/db";
import { products } from "@/db/schema/app";
import { ProductCard } from "./product-card";
import { SectionContainer } from "./section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const RecommendProducts = async () => {
  const productsOutput = await db.select().from(products);

  return (
    <SectionContainer className="">
      <h2 className="font-bold text-xl">สินค้าแนะนำ</h2>

      <Carousel className="w-full mt-10">
        <CarouselContent className="-ml-1">
          {productsOutput.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/6"
            >
              <ProductCard {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
};
