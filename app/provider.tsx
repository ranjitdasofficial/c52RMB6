
"use client"
import { ReactNode, useEffect } from "react";


import { store } from "@/Redux/store/store";
import { Provider } from "react-redux";



interface Props {
    children: ReactNode
}

export function Providers(props: Props) {





    return <Provider store={store}>
        {props.children}

    </Provider>
}