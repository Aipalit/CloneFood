"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculeteProductTotalPrice, formartCurrency } from "../_helps/price";
import DiscountBadge from "./discount-badge";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className=" text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 text-xl font-semibold">{product.name}</h1>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">
            {formartCurrency(calculeteProductTotalPrice(product))}
          </h2>
          {product.discountPercentage > 0 && (
            <DiscountBadge product={product} />
          )}
        </div>
        {product.discountPercentage > 0 && (
          <p className="text-xs text-muted-foreground line-through">
            De {formartCurrency(Number(product.price))}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
