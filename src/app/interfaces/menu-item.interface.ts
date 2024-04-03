export interface IMenu {
    title: string;
    icon: string;
    subMenu: ISubMenu[];
}

export interface ISubMenu {
    title: string;
    url: string;
}