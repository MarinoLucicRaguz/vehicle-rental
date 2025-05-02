import { BadgePlus, Car, CarFront, ChevronUp, House, MapPin, MapPinned, MapPinPlus, User2 } from "lucide-react";
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

enum CollapsibleKeys {
  None = "none",
  Vozila = "vozila",
  Lokacija = "lokacija",
  TipNajma = "tipNajma",
}

interface CollapsibleMetadata {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const collapsibleSections: Record<CollapsibleKeys, CollapsibleMetadata> = {
  [CollapsibleKeys.Vozila]: { name: "Vozila", icon: CarFront },
  [CollapsibleKeys.Lokacija]: { name: "Lokacije", icon: MapPin },
  [CollapsibleKeys.TipNajma]: { name: "Tipovi najma", icon: MapPinned },
  [CollapsibleKeys.None]: { name: "", icon: House },
};

interface NavmenuItem {
  collapsible: CollapsibleKeys;
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navMenuItems: NavmenuItem[] = [
  { collapsible: CollapsibleKeys.None, title: "Početna", url: "/", icon: House },
  { collapsible: CollapsibleKeys.Vozila, title: "Popis vozila", url: "/vehicles", icon: CarFront },
  { collapsible: CollapsibleKeys.Vozila, title: "Novo vozilo", url: "/vehicles/add", icon: BadgePlus },
  { collapsible: CollapsibleKeys.Lokacija, title: "Nova lokacija", url: "/locations/add", icon: MapPinPlus },
  { collapsible: CollapsibleKeys.Lokacija, title: "Popis lokacija", url: "/locations", icon: MapPinned },
  { collapsible: CollapsibleKeys.TipNajma, title: "Novi tip najma", url: "/rentalTypes/add", icon: MapPinPlus },
  { collapsible: CollapsibleKeys.TipNajma, title: "Popis najmova", url: "/rentalTypes", icon: MapPinned },
];

function groupByCollapsible(items: NavmenuItem[]): Record<CollapsibleKeys, NavmenuItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.collapsible]) acc[item.collapsible] = [];
    acc[item.collapsible].push(item);
    return acc;
  }, {} as Record<CollapsibleKeys, NavmenuItem[]>);
}

export function AppSidebar() {
  const groupedNav = groupByCollapsible(navMenuItems);
  const noneItems = groupedNav[CollapsibleKeys.None] ?? [];

  const collapsibleEntries = Object.entries(groupedNav)
    .filter(([key]) => key !== CollapsibleKeys.None)
    .map(([key, items]) => [key as CollapsibleKeys, items] as const);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-gray-300 text-black">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {noneItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {collapsibleEntries.map(([sectionKey, items]) => {
                const section = collapsibleSections[sectionKey];
                return (
                  <Collapsible key={sectionKey} defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="flex items-center gap-2">
                        <section.icon />
                        <span>{section.name}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {items.map(subItem => (
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
