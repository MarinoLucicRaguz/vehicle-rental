import { BadgePlus, CarFront, ChevronUp, House, MapPin, MapPinned, MapPinPlus, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";


interface CollapsibleKey {
  name: string;
  key: CollapsibleKeys;
  icon: React.ComponentType<any>;
}

enum CollapsibleKeys {
  Vozila,
  Lokacija,
  TipNajma,
  None,
}

const Map: CollapsibleKey[] = [
  {
    name: "Vozila",
    key: CollapsibleKeys.Vozila,
    icon: CarFront,
  },
  {
    name: "Lokacija",
    key: CollapsibleKeys.Lokacija,
    icon: MapPin,
  },
  {
    name: "Tip najma",
    key: CollapsibleKeys.TipNajma,
    icon: MapPinned,
  },
  {
    name: "None",
    key: CollapsibleKeys.None,
    icon: House,
  },
];

interface NavmenuItem {
  collapsible: CollapsibleKeys;
  title: string;
  url: string;
  icon: React.ComponentType<any>;
}

const NavmenuItems: NavmenuItem[] = [
  {
    collapsible: CollapsibleKeys.None,
    title: "Početna",
    url: "/",
    icon: House,
  },
  {
    collapsible: CollapsibleKeys.Vozila,
    title: "Popis vozila",
    url: "/vehicles",
    icon: CarFront,
  },
  {
    collapsible: CollapsibleKeys.Vozila,
    title: "Novo vozilo",
    url: "/vehicles/add",
    icon: BadgePlus,
  },
  {
    collapsible: CollapsibleKeys.Lokacija,
    title: "Nova lokacija",
    url: "/locations/add",
    icon: MapPinPlus,
  },
  {
    collapsible: CollapsibleKeys.Lokacija,
    title: "Popis lokacija",
    url: "/locations",
    icon: MapPinned,
  },
  {
    collapsible: CollapsibleKeys.TipNajma,
    title: "Novi tip najma",
    url: "/rentalTypes/add",
    icon: MapPinPlus,
  },
  {
    collapsible: CollapsibleKeys.TipNajma,
    title: "Popis najmova",
    url: "/rentalTypes",
    icon: MapPinned,
  },
];

function groupByCollapsible(items: NavmenuItem[]): Record<number, NavmenuItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.collapsible]) {
      acc[item.collapsible] = [];
    }
    acc[item.collapsible].push(item);
    return acc;
  }, {} as Record<number, NavmenuItem[]>);
}

export function AppSidebar() {
  const groupedNavMenuItems = groupByCollapsible(NavmenuItems);
  const noneItems = groupedNavMenuItems[CollapsibleKeys.None] ?? [];
  const collapsibleEntries = Object.entries(groupedNavMenuItems).filter(([key]) => parseInt(key, 10) !== CollapsibleKeys.None) as [
    string,
    NavmenuItem[]
  ][];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gray-300 text-black">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {noneItems.map((item: NavmenuItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {collapsibleEntries.map(([keyAsString, items]) => {
                const collapsibleKey = parseInt(keyAsString, 10) as CollapsibleKeys;
                return (
                  <Collapsible key={keyAsString} defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>{CollapsibleKeys[collapsibleKey]}</SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {items.map((subItem: NavmenuItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url} className="flex gap-2">
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gray-400">
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 />
                Username
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Account</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
