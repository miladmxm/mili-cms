import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Image } from "lucide-react";

import type { AdminNavMain } from "@/types/adminNavs";

export const NavDictionary: Record<string, string> = {
  admin: "داشبورد",
  blog: "مقالات",
  media: "مدیا",
  add: "افزودن",
  edit: "ویرایش",
};
export const navMain: AdminNavMain[] = [
  {
    title: "داشبورد",
    url: "/admin",
    icon: IconDashboard,
    haveChild: false,
  },
  {
    title: "وبلاگ",
    icon: IconListDetails,
    base: "/admin/blog",
    haveChild: true,
    items: [
      {
        title: "مشاهده همه",
        url: "/admin/blog",
      },
      {
        title: "افزودن",
        url: "/admin/blog/add",
      },
    ],
  },
  {
    haveChild: true,
    title: "مدیا",
    url: "/admin/media",
    icon: Image,
  },
  {
    haveChild: false,
    title: "Projects",
    url: "#",
    icon: IconFolder,
  },
  {
    haveChild: false,
    title: "Team",
    url: "#",
    icon: IconUsers,
  },
];
export const AdminNavLinks = {
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};
