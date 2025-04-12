"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import DashboardTable from "@/components/shared/DashboardTable";
import { useSidebar } from "@/components/ui/sidebar";
import DashboardPagination from "@/components/shared/DashboardPagination";
import Topbar from "@/components/shared/Topbar";
import DashboardFilter from "@/components/shared/DashboardFilter";
import SelectBox from "@/components/shared/SelectBox";
import { DASHBOARD_DEFAULT_LIMIT } from "@/constants";

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open: isSidebarOpen } = useSidebar();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const limit = parseInt(
    searchParams.get("limit") || `${DASHBOARD_DEFAULT_LIMIT}`,
    10
  );

  const [validLimit, setValidLimit] = useState<number>(
    isNaN(limit) || limit < 1 ? DASHBOARD_DEFAULT_LIMIT : limit
  );
  const validSkip = isNaN(skip) || skip < 0 ? 0 : skip;

  const currentPage = useMemo(
    () => Math.floor(validSkip / validLimit) + 1,
    [validSkip, validLimit]
  );

  const categoryPath = useMemo(
    () => (selectedCategory ? `/category/${selectedCategory}` : ""),
    [selectedCategory]
  );
  const queryParams = useMemo(
    () => `?limit=${validLimit}&skip=${validSkip}`,
    [validLimit, validSkip]
  );

  const { data, error, isLoading, refetch } = useProducts(
    `${categoryPath}${queryParams}`
  );

  const totalPages = useMemo(
    () => (data?.total ? Math.ceil(data.total / validLimit) : 1),
    [data?.total, validLimit]
  );

  const updateSearchParams = useCallback(
    (params: Record<string, string | null>) => {
      const query = new URLSearchParams();

      if (params.limit) query.set("limit", params.limit);
      if (params.skip) query.set("skip", params.skip);
      if (params.category) query.set("category", params.category);

      router.push(`/?${query.toString()}`);
    },
    [router]
  );

  const categoryHandle = useCallback(
    (cat: string) => {
      updateSearchParams({
        limit: validLimit.toString(),
        skip: "0",
        category: cat,
      });
      setSelectedCategory(cat);
    },
    [updateSearchParams, validLimit]
  );

  const resetFilters = useCallback(() => {
    setSelectedCategory(null);
    updateSearchParams({
      limit: DASHBOARD_DEFAULT_LIMIT.toString(),
      skip: "0",
      category: null,
    });
  }, [updateSearchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newSkip = (page - 1) * validLimit;
      updateSearchParams({
        // searchParams:searchParams.toString(),
        limit: validLimit.toString(),
        skip: newSkip.toString(),
        category: selectedCategory,
      });
      // const params = new URLSearchParams(searchParams.toString());
    },
    [validLimit, selectedCategory, updateSearchParams]
  );

  const handleApplyFilter = useCallback(() => {
    updateSearchParams({
      limit: validLimit.toString(),
      skip: "0",
      category: selectedCategory,
    });
  }, [selectedCategory, updateSearchParams, validLimit]);

  const handleClearFilter = useCallback(() => {
    setSelectedCategory(null);
    updateSearchParams({
      limit: validLimit.toString(),
      skip: "0",
      category: null,
    });
  }, [updateSearchParams, validLimit]);

  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategory(cat);

    const hasLimit = searchParams.has("limit");
    const hasSkip = searchParams.has("skip");

    if (!hasLimit || !hasSkip) {
      updateSearchParams({
        limit: hasLimit
          ? searchParams.get("limit")
          : DASHBOARD_DEFAULT_LIMIT.toString(),
        skip: hasSkip ? searchParams.get("skip") : "0",
        category: cat,
      });
    }
  }, [searchParams, updateSearchParams]);

  return (
    <main
      className={`transition-all duration-300 ${
        isSidebarOpen ? "w-full md:w-[calc(100%-16rem)]" : "w-full"
      }`}
    >
      <section className={`px-9 mt-8 w-full`}>
        {/* topbar */}
        <Topbar />

        {/* filters */}
        <div className="flex_center_between flex-wrap md:flex-nowrap gap-4 mt-11">
          <DashboardFilter
            handleClearFilter={handleClearFilter}
            handleApplyFilter={handleApplyFilter}
            setSelectedCategory={categoryHandle}
            selectedCategory={selectedCategory}
          />
        </div>

        {/* table */}
        <div className="mt-6">
          <DashboardTable
            products={data?.products}
            error={error}
            isLoading={isLoading}
            refetch={refetch}
            resetFilters={resetFilters}
          />
        </div>

        {/* pagination */}
        <div className="flex_center_between w-full my-4">
          <SelectBox
            placeholder="انتخاب دسته بندی"
            value={validLimit.toString()}
            onValueChange={(value) => setValidLimit(Number(value))}
            triggerClass="w-fit"
            data={["10", "15", "20", "25", "35", "50"]}
          />

          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </main>
  );
}
