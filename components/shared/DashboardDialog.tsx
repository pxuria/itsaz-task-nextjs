"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaStar } from "react-icons/fa";
import { IProducts } from "@/types";

interface DialogProps {
  open: boolean;
  product: IProducts | null;
  onOpenChange: (open: boolean) => void;
}

export default function DashboardDialog({
  open,
  onOpenChange,
  product,
}: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-lg">
            جزئیات محصول
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="flex items-center justify-start gap-2">
            <strong>شناسه:</strong> {product?.id}
          </div>
          <div className="flex items-center justify-start gap-2">
            <strong>عنوان:</strong> {product?.title}
          </div>
          <div className="flex items-center justify-start gap-2">
            <strong>برند:</strong> {product?.brand || "-"}
          </div>
          <div className="flex items-center justify-start gap-2">
            <strong>دسته:</strong> {product?.category}
          </div>
          <div className="flex items-center justify-start gap-2">
            <strong>قیمت:</strong> {product?.price}
          </div>
          <div className="flex items-center justify-start gap-2">
            <strong>امتیاز:</strong> {product?.rating}{" "}
            <FaStar className="text-[#ffe440] w-4 h-4" />
          </div>
        </div>

        <div className="flex items-start justify-start flex-wrap gap-4">
          {product?.images?.map((img, index) => (
            <Image
              src={img}
              key={index}
              width={120}
              height={120}
              loading="lazy"
              alt={product.title}
              className="w-30 h-30 rounded-lg bg-[#F7F7F8]"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
