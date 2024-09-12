import { LucideIcon, Star } from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active: boolean;
};

type Menu = {
    href: string;
    label: string;
    active: boolean;
    icon: LucideIcon
    submenus: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/app",
                    label: "นำเข้าเป้า commission (เป้าสาขา)",
                    active: pathname.includes("/app"),
                    icon: Star,
                    submenus: []
                }
            ]
        }
    ];
}