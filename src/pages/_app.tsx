import '@/styles/globals.css'

import type {AppProps} from 'next/app'
import {Navigation} from "@/components/navigation/navigation";

import {main_navigation_panel_items} from "@/configuration/navigation/main-navigation";

export default function App({Component, pageProps}: AppProps)
{
    return <>
        <Navigation items={main_navigation_panel_items}/>
        <main className={"page-container"}>
            <Component {...pageProps} />
        </main>
    </>
}
