"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import axiosInstance from "@/lib/axiosInstance";
import { LuTrash2 } from "react-icons/lu";

interface PopupProps {
  itemId: number;
  refetch: () => void;
  resetFilters: () => void;
  openPopoverId: number | null;
  setOpenPopoverId: (val: number | null) => void;
}

export default function DashboardPopover({
  openPopoverId,
  itemId,
  setOpenPopoverId,
  refetch,
  resetFilters,
}: PopupProps) {
  const handleDelete = async () => {
    try {
      //   const { data } = await axiosInstance.delete(`products/${itemId}`);
      //   console.log(data);

      resetFilters();
      refetch();
      setOpenPopoverId(null); // Close the popover
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <Popover
      open={openPopoverId === itemId}
      onOpenChange={(open) => setOpenPopoverId(open ? itemId : null)}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="bg-[rgb(255,64,64,0.3)] p-2 rounded w-fit"
        >
          <LuTrash2 className="w-4 h-4 text-[#FF4040]" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="max-w-[90%] relative overflow-hidden border-0">
        <div className="absolute bg-[#FF4040] w-full top-0 left-0 h-1" />
        <h4 className="text-base text-[#54555D] text-center font-medium">
          آیا از حذف محصول {itemId} اطمینان دارید؟
        </h4>

        <div className="flex_center flex-nowrap gap-2 mt-3">
          <button
            type="button"
            onClick={() => setOpenPopoverId(null)}
            className="rounded text-sm text-nowrap font-medium py-1 px-4 text-white bg-[#AEAEB1]"
          >
            انصراف
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded text-sm text-nowrap font-medium py-1 px-4 text-white bg-[#FF4040]"
          >
            حذف
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
