import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";

const fetchProducts = async (queries: string) => {
  const { data } = await axiosInstance.get(`products${queries}`);
  return data;
};

export const useProducts = (queries: string) => {
  return useQuery({
    queryKey: ["products", queries],
    queryFn: () => fetchProducts(queries),
  });
};
