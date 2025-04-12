"use client";

import { useCategories } from "@/hooks/use-category";
import SelectBox from "./SelectBox";

interface FilterProps {
  selectedCategory: string | null;
  handleClearFilter: () => void;
  handleApplyFilter: () => void;
  setSelectedCategory: (value: string) => void;
}

export default function DashboardFilter({
  handleClearFilter,
  handleApplyFilter,
  selectedCategory,
  setSelectedCategory,
}: FilterProps) {
  const { data, error, isLoading } = useCategories();

  const buttonBaseStyle =
    "text-white text-base font-semibold py-2 px-6 rounded w-full text-center text-nowrap";

  return (
    <>
      <SelectBox
        placeholder="انتخاب دسته بندی"
        label="دسته بندی"
        value={selectedCategory || ""}
        onValueChange={(value) => setSelectedCategory(value as string)}
        data={data || []}
        error={error}
        isLoading={isLoading}
      />

      <div className="flex items-center flex-wrap w-full md:w-fit lg:flex-nowrap gap-2">
        <button
          type="button"
          onClick={handleApplyFilter}
          className={`${buttonBaseStyle} bg-[#FF7B2D] md:min-w-[250px]`}
        >
          اعمال فیلتر
        </button>

        <button
          type="button"
          onClick={handleClearFilter}
          className={`${buttonBaseStyle} bg-[#FF4040] md:min-w-[80px]`}
        >
          حذف فیلتر
        </button>
      </div>
    </>
  );
}
