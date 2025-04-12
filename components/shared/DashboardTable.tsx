"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingSpinner from "./LoadingSpinner";
import DashboardDialog from "./DashboardDialog";
import { IProducts } from "@/types";
import { dashboardTableHeaders } from "@/constants";
import DashboardTableRow from "./DashboardTableRow";

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
  const [openProduct, setOpenProduct] = useState<IProducts | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleRowDoubleClick = (product: IProducts) => {
    setOpenProduct(product);
    setIsDialogOpen(true);
  };

  if (isLoading) return <LoadingSpinner loading={isLoading} />;
  if (error) return <p className="error_text">خطایی رخ داده است</p>;

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
            <DashboardTableRow
              key={index}
              handleRowDoubleClick={handleRowDoubleClick}
              item={item}
              resetFilters={resetFilters}
              refetch={refetch}
            />
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
