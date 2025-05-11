import { products } from "@/db/schema/app";
import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";

export type ProductsType = InferSelectModel<typeof products>;

export const ProductCard = ({ imageUrl, name, description }: ProductsType) => {
  return (
    <div className="h-[200px] w-[248px] border rounded-lg p-2">
      <div className="relative w-full aspect-square">
        <Image src={imageUrl} alt={name} fill priority className="rounded-xl" />
      </div>
      <div className="mt-3">
        <h2 className="font-semibold">{name}</h2>
        <h3 className="opacity-55 text-x mt-2">{description}</h3>
      </div>
    </div>
  );
};
