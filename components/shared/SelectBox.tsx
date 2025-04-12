"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  value: string;
  label?: string;
  data: string[];
  placeholder: string;
  isLoading?: boolean;
  error?: Error | null;
  triggerClass?: string;
  onValueChange: (value: string | number) => void;
}

export default function SelectBox({
  label,
  placeholder,
  value,
  onValueChange,
  data,
  triggerClass = "w-[220px]",
  isLoading,
  error,
}: Props) {
  if (isLoading) return <LoadingSpinner color="#F67C2D" loading={isLoading} />;
  if (error) return <p className="error_text">خطایی رخ داده است</p>;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={label}
          className="text-sm font-medium text-[#3C3D45] text-nowrap"
        >
          {label}
        </label>
      )}

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={triggerClass} id={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {data.length > 0 ? (
              data.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                هیچ گزینه‌ای موجود نیست
              </div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
