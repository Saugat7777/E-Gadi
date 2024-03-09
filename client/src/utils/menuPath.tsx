import {
  CarOutlined,
  PieChartOutlined,
  TagOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ref2 } from "../container/dashboard/profile";

export const headerMenuItem = [
  {
    label: "Home",
    key: "home",
    routepath: "home",
  },
  {
    label: "New Cars",
    key: "/salesground/new-cars",
    routepath: "/salesground/new-cars",
  },
  {
    label: "Used Cars",
    key: "/salesground/used-cars",

    routepath: "/salesground/used-cars",
  },
  {
    label: "Compare Cars",
    routepath: "/salesground/compare-cars",
    key: "/salesground/compare-cars",
  },
];

export const sidebarMenuItem = [
  {
    label: "Dashboard",
    key: "/dashboard",
    guard: "admin",
    icon: <PieChartOutlined />,
    // children : [{label, key, ...same}]
  },
  {
    label: "Users",
    key: "/dashboard/users",
    guard: "admin",
    icon: <TeamOutlined />,
  },
  {
    label: "New Electric Car",
    key: "/dashboard/new-electric-car",
    guard: "admin",
    icon: <CarOutlined />,
  },

  {
    label: "Used Cars",
    key: "/dashboard/used-cars",
    guard: "admin",
    icon: <TagOutlined />,
  },
  {
    label: <span ref={ref2}>Profile</span>,
    key: "/dashboard/profile",
    guard: "user",
    icon: <TagOutlined />,
  },
  {
    label: "Sell Your Car",
    key: "/dashboard/sell-your-car",
    guard: "user",
    icon: <TagOutlined />,
  },
];
