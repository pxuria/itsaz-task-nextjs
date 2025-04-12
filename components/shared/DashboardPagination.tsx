"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function DashboardPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pagesArray = [...Array(totalPages)].map((_, i) => i + 1);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* next page */}
        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageClick(currentPage + 1)}
              className="cursor-pointer flex_center"
            />
          </PaginationItem>
        )}

        {/* pages */}
        {pagesArray.reverse().map((page) => {
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageClick(page)}
                  isActive={page === currentPage}
                  className={`${
                    page === currentPage
                      ? "bg-[#3C3D45] text-white"
                      : "bg-[#F7F7F8] hover:bg-[#efefef] text-[#6D6D74] transition-all ease-in"
                  } flex_center rounded w-8 h-8 cursor-pointer font-normal text-sm`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (page === 2 && currentPage > 3) {
            return (
              <PaginationItem key="ellipsis-start">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          if (page === totalPages - 1 && currentPage < totalPages - 2) {
            return (
              <PaginationItem key="ellipsis-end">
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        {/* prev page */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageClick(currentPage - 1)}
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
