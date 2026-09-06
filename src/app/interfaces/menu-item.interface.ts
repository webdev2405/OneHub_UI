export interface MenuItemSuperAdmin {
    label?: string,
    icon?: string,
    route?: string,
    submenu?: MenuItemSuperAdmin[],
    isHeader?: boolean
}

export interface MenuItemAdmin {
    label?: string,
    icon?: string,
    route?: string,
    submenu?: MenuItemAdmin[],
    isHeader?: boolean
}

export interface MenuItemInternal {
    label?: string,
    icon?: string,
    route?: string,
    submenu?: MenuItemInternal[],
    isHeader?: boolean
}

export interface MenuItemExternal {
    label?: string,
    icon?: string,
    route?: string,
    submenu?: MenuItemExternal[],
    isHeader?: boolean
}
