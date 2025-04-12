"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardFilter from "@/components/shared/DashboardFilter";
import DashboardPagination from "@/components/shared/DashboardPagination";
import DashboardTable from "@/components/shared/DashboardTable";
import SelectBox from "@/components/shared/SelectBox";
import Topbar from "@/components/shared/Topbar";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DASHBOARD_DEFAULT_LIMIT } from "@/constants";
import { useProducts } from "@/hooks/use-products";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
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

  // const queryParams = useMemo(() => {
  //   const params = new URLSearchParams();
  //   params.set("limit", validLimit.toString());
  //   params.set("skip", validSkip.toString());
  //   if (selectedCategory) params.set("category", selectedCategory);
  //   return params.toString();
  // }, [validLimit, validSkip, selectedCategory]);

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);
  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const { data, error, isLoading, refetch } = useProducts(
    `${categoryPath}${queryParams}`
  );

  const totalPages = useMemo(
    () => (data?.total ? Math.ceil(data.total / validLimit) : 1),
    [data?.total, validLimit]
  );

  // const setSearchParams = useCallback(
  //   (params: URLSearchParams) => {
  //     router.push(`${pathname}?${params.toString()}`);
  //   },
  //   [pathname, router]
  // );

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);
  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("limit", DASHBOARD_DEFAULT_LIMIT.toString());
    params.set("skip", "0");
    setSelectedCategory(null);
    // setSearchParams(params);
    router.push(pathname + "?" + params.toString());
  }, [pathname, router]);

  const handlePageChange = useCallback(
    (page: number) => {
      const newSkip = (page - 1) * validLimit;
      const params = new URLSearchParams(searchParams.toString());
      params.set("skip", newSkip.toString());
      params.set("limit", validLimit.toString());
      if (selectedCategory) params.set("category", selectedCategory);
      // setSearchParams(params);
      router.push(pathname + "?" + params.toString());
    },
    [validLimit, searchParams, pathname, router, selectedCategory]
  );

  const handleApplyFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");
    params.set("skip", "0");
    // setSearchParams(params);
    router.push(pathname + "?" + params.toString());
  }, [searchParams, selectedCategory, pathname, router]);

  const handleClearFilter = useCallback(() => {
    setSelectedCategory(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.set("skip", "0");
    // setSearchParams(params);
    router.push(pathname + "?" + params.toString());
  }, [searchParams, pathname, router]);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));

    const params = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;
    if (!searchParams.has("limit")) {
      params.set("limit", DASHBOARD_DEFAULT_LIMIT.toString());
      needsUpdate = true;
    }
    if (!searchParams.has("skip")) {
      params.set("skip", "0");
      needsUpdate = true;
    }
    // if (needsUpdate) setSearchParams(params);
    if (needsUpdate) router.push(pathname + "?" + params.toString());
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const categoryInParams = searchParams.get("category");
    if (selectedCategory !== categoryInParams) {
      const params = new URLSearchParams(searchParams.toString());
      if (selectedCategory) {
        params.set("category", selectedCategory);
      } else {
        params.delete("category");
      }
      params.set("skip", "0");
      // setSearchParams(params);
      router.push(pathname + "?" + params.toString());
    }
  }, [searchParams, pathname, router, selectedCategory]);

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
            setSelectedCategory={setSelectedCategory}
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
