"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
import { SectionContainer } from "./section-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const BannersClient = ({
  banners,
}: {
  banners: {
    id: string;
    imageUrl: string;
    display: boolean;
  }[];
}) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <SectionContainer className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-screen-xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((value, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Image
                  src={value.imageUrl}
                  alt=""
                  className="w-full p-0 rounded-xl"
                  priority
                  width={1500}
                  height={1500}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionContainer>
  );
};
