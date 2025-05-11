import Image from "next/image";
import { Card } from "./ui/card";
import { db } from "@/db";
import { category } from "@/db/schema/app";
import { SectionContainer } from "./section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const Categories = async () => {
  const categories = await db.select().from(category);

  // return (
  //   <SectionContainer>
  //     {/* <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
  //       {categories.map((item, index) => (
  //         <Card key={index} className="max-w-sm bg-background">
  //             <Image className="w-24 rounded-full p-2 mx-auto" src={item.imageUrl} alt="category icon" width={500} height={500}/>
  //           <p className="p-2 text-center ">{item.name}</p>
  //         </Card>
  //       ))}
  //     </div> */
  //    }

  // );
  return (
    <SectionContainer>
      <h2 className="font-bold text-xl mb-4">หมวดหมู่</h2>
      <Carousel>
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/6">
              <Card className="max-w-sm bg-background">
                <Image
                  className="w-24 h-24 rounded-full p-2 mx-auto"
                  src={item.imageUrl}
                  alt="category img"
                  width={500}
                  height={500}
                />
                <p className="pt-1 px-2 text-center text-sm">{item.name}</p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
};
