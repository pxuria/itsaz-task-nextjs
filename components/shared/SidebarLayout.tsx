import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ImHome } from "react-icons/im";

const navItems = [
  {
    title: "صفحه اصلی",
    url: "/",
    icon: <ImHome className="w-10 h-10" />,
  },
];

const SidebarLayout = () => {
  return (
    <Sidebar className="h-[95%] my-4">
      <SidebarHeader>
        <h2 className="font-bold text-2xl">LOGO</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title} className="rounded-md">
                  <SidebarMenuButton
                    asChild
                    className="bg-[#fff] text-[#111] hover:!bg-[#f9f9f9] transition-all h-10 gap-4"
                  >
                    <Link href={item.url}>
                      {item.icon}
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarLayout;
