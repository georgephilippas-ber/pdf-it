export type navigation_panel_item_type =
    {
        title?: string;
        href?: string;
        children?: navigation_panel_item_type[];
    }
export const main_navigation_panel_items: navigation_panel_item_type[] =
    [
        {
            title: "Home",
            href: "/"
        },
    ];
