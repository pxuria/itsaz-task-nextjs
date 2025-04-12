"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "./LoadingSpinner";
import DashboardPopover from "./DashboardPopover";
import DashboardDialog from "./DashboardDialog";
import { IProducts } from "@/types";
import { dashboardTableHeaders } from "@/constants";

interface TableProps {
  products: IProducts[];
  error: Error | null;
  isLoading: boolean;
  refetch: () => void;
  resetFilters: () => void;
}

export default function DashboardTable({
  products,
  error,
  isLoading,
  refetch,
  resetFilters,
}: TableProps) {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const [openProduct, setOpenProduct] = useState<IProducts | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleRowDoubleClick = (product: IProducts) => {
    setOpenProduct(product);
    setIsDialogOpen(true);
  };

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  if (error)
    return (
      <p className="text-sm font-medium text-red-500">خطایی رخ داده است</p>
    );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="!bg-[#1E1E6E] h-16">
            {dashboardTableHeaders.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="max-h-[70vh]">
          {products.map((item: IProducts, index: number) => (
            <TableRow
              key={index}
              className="h-16 w-full even:!bg-[#E8E8E8]"
              onDoubleClick={() => handleRowDoubleClick(item)}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.brand || "-"}</TableCell>
              <TableCell className="flex_center">
                <DashboardPopover
                  openPopoverId={openPopoverId}
                  itemId={Number(item.id)}
                  setOpenPopoverId={setOpenPopoverId}
                  refetch={refetch}
                  resetFilters={resetFilters}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DashboardDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={openProduct}
      />
    </>
  );
}
