import { db } from "@/db"
import { products } from "@/db/schema/app"
import { ProductCard } from "./product-card"
import { SectionContainer } from "./section-container"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export const RecommendProducts = async () => {
  try {
    const productsOutput = await db.select().from(products).limit(12)

    if (!productsOutput.length) {
      return (
        <SectionContainer>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="mb-4 text-xl font-bold">สินค้าแนะนำ</h2>
            <p className="text-muted-foreground">ไม่พบสินค้าแนะนำในขณะนี้</p>
          </div>
        </SectionContainer>
      )
    }

    return (
      <SectionContainer>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">สินค้าแนะนำ</h2>
          {productsOutput.length > 6 && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products" className="flex items-center gap-1">
                ดูทั้งหมด
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <Carousel
          className="w-full mt-6"
          opts={{
            align: "start",
            loop: productsOutput.length > 4,
          }}
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {productsOutput.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div className="h-full">
                  <ProductCard {...item} className="h-full" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-2 mt-4">
            <CarouselPrevious className="static translate-y-0 mr-2" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </SectionContainer>
    )
  } catch (error) {
    console.error("Error fetching recommended products:", error)
    return (
      <SectionContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-4 text-xl font-bold">สินค้าแนะนำ</h2>
          <p className="text-muted-foreground">ไม่สามารถโหลดสินค้าแนะนำได้ในขณะนี้</p>
        </div>
      </SectionContainer>
    )
  }
}
