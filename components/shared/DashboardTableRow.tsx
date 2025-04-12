import { TableCell, TableRow } from "@/components/ui/table";
import { BiDetail } from "react-icons/bi";
import DashboardPopover from "./DashboardPopover";
import { IProducts } from "@/types";
import { useState } from "react";

interface TableRowProps {
  item: IProducts;
  handleRowDoubleClick: (item: IProducts) => void;
  refetch: () => void;
  resetFilters: () => void;
}

const DashboardTableRow = ({
  item,
  handleRowDoubleClick,
  refetch,
  resetFilters,
}: TableRowProps) => {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(
    Number(item.id)
  );

  return (
    <TableRow
      className="h-16 w-full even:!bg-[#E8E8E8]"
      onDoubleClick={() => handleRowDoubleClick(item)}
    >
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>{item.brand || "-"}</TableCell>
      <TableCell className="">
        <button
          type="button"
          className="bg-[#E0EEFF] p-2 rounded"
          onClick={() => handleRowDoubleClick(item)}
        >
          <BiDetail className="text-[#1E1E6E]" />
        </button>
      </TableCell>

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
  );
};

export default DashboardTableRow;
