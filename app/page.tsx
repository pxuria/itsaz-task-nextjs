import { Metadata } from "next";
import Dashboard from "@/components/pages/Dashboard";

export const metadata: Metadata = {
  title: "داشبورد محصولات",
  description: "مدیریت محصولات، فیلتر و جستجو در پنل",
};

export default function page() {
  return <Dashboard />;
}
