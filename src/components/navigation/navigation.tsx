import {Logo, LogoFake} from "@/components/logo/logo";
import Link from "next/link";

import {GiHamburgerMenu} from "react-icons/gi";
import {navigation_panel_item_type} from "@/configuration/navigation/main-navigation";
import {useEffect, useState} from "react";
import {FaHome} from "react-icons/fa";

export function Navigation({items}: {
    items: navigation_panel_item_type[]
})
{
    const [itemsState, set_items] = useState<navigation_panel_item_type[]>([]);

    const [hamburgerMenuToggle, set_hamburgerMenuToggle] = useState<boolean>(false);


    useEffect(() =>
    {
        set_items(items);

        const clickEvent = (ev: MouseEvent) => set_hamburgerMenuToggle(false);

        document.addEventListener("click", clickEvent);

        return () =>
        {
            document.removeEventListener("click", clickEvent);
        }
    }, []);

    return (
        <>
            <div className={"sticky flex items-center top-2 p-2 z-20"}>
                <div className={"p-1 ml-4 h-full"}>
                    <Link href={"/"}>
                        <LogoFake/>
                    </Link>
                </div>
                <nav className={"navigation-panel hidden md:flex"}>
                    {itemsState.map((value, index) =>
                        <div className={"relative group"} key={index}>
                            {value.href ?
                                <Link href={value.href}>
                                    <div className={"navigation-panel-item"}>
                                        {value.title}
                                    </div>
                                </Link> :
                                <div
                                    className={"navigation-panel-item"}>
                                    {value.title}
                                </div>}
                            {value.children && value.children.length > 0 ?
                                <div
                                    className={"navigation-panel-dropdown-container transition-all hidden group-hover:flex-col group-hover:flex"}>

                                    {value.children && value.children.map((value, index) => <div key={index}
                                                                                                 className={"whitespace-nowrap m-1 duration-700 transition-colors hover:text-gray-600"}>
                                        <Link
                                            href={value.href || "/"}>{value.title}</Link></div>)}
                                </div> : null}
                        </div>)}
                </nav>
                <div className={"ml-auto md:hidden mx-6 select-none cursor-pointer"}>
                    <div className={"relative"}>
                        <div className={"text-2xl"} onClick={event =>
                        {
                            set_hamburgerMenuToggle(prevState => !prevState);
                            event.stopPropagation();
                        }}>
                            <GiHamburgerMenu/>
                        </div>
                        <div
                            className={["navigation-panel-dropdown-container translate-y-2", hamburgerMenuToggle ? "flex flex-col" : "hidden"].filter(value => value).join(" ")}>

                            {itemsState.map((value, index) =>
                            {
                                return <Link key={index} className={"block mobile-navigation-panel-item"}
                                             href={value.href || ""}>{value.title}</Link>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
