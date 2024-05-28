"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";

import {
  calculeteProductTotalPrice,
  formartCurrency,
} from "@/app/_helps/price";
import ProductList from "@/app/product-list";

import { Prisma } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDreaseQuantityClick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-7 w-7 ">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="px-5 text-xs text-foreground">
          {product.restaurant.name}
        </p>
      </div>
      {/* Nome do produto */}
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      {/* Preço  */}
      <div className=" flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2>{formartCurrency(calculeteProductTotalPrice(product))}</h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>
          {/* preeço original */}
          {product.discountPercentage > 0 && (
            <p className="text-xs text-muted-foreground line-through">
              De: {formartCurrency(Number(product.price))}
            </p>
          )}
        </div>
        {/* Quantidade */}
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className=" border border-solid border-muted-foreground"
            onClick={handleDreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div>
        <div className="px-5">
          <Card className=" mt-6 flex justify-around py-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2  text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>

              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p className="text-xs font-semibold">
                  {formartCurrency(Number(product.restaurant.deliveryFee))}
                </p>
              ) : (
                <p className="text-xs font-semibold">Grátis</p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2  text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <TimerIcon size={14} />
              </div>
              <span className="text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} Min
              </span>
            </div>
          </Card>
        </div>

        <div className=" mt-6 space-y-3 px-5">
          <h3 className=" font-semibold">Descrição</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className=" px-5 font-semibold">Sucos</h3>
          <ProductList products={complementaryProducts} />
        </div>
      </div>
      <div className="mt-5 px-6 ">
        <Button className="w-full gap-2 font-semibold">
          Adicionar a sacola
          <ShoppingBagIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
