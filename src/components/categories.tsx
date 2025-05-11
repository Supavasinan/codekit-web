import { db } from "@/db"
import { category } from "@/db/schema/app"
import Image from "next/image"
import { SectionContainer } from "./section-container"
import { Card } from "./ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

export const Categories = async () => {
  const categories = await db.select().from(category)

  return (
    <SectionContainer>
      <h2 className="font-bold text-xl mb-4">หมวดหมู่</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <Card className="overflow-hidden h-full bg-background border-none shadow-sm hover:shadow transition-shadow duration-200">
                  <div className="flex flex-col items-center p-3 gap-2">
                    <div className="relative aspect-square w-full max-w-[100px] bg-foreground/5 rounded-full flex items-center justify-center p-4">
                      <Image
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={`${item.name} category`}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-center text-sm font-medium line-clamp-2 min-h-[2.5rem]">{item.name}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 -translate-x-1/2 bg-background/80 backdrop-blur-sm border hover:bg-background/90" />
          <CarouselNext className="absolute right-0 translate-x-1/2 bg-background/80 backdrop-blur-sm border hover:bg-background/90" />
        </Carousel>
      </div>
    </SectionContainer>
  )
}
