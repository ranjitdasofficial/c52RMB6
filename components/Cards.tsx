"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Icon from "./SVGLed"
import { useAppDispatch } from "@/Redux/hooks/hooks"
import { setComponentsInfo } from "@/Redux/reducers/academicReducer"

export function Cards({ data }: {
    data: {
        name?: string,
        description?: string,
        value?: number,
        color?: string,
        image?: string
    }
}) {

    const dispatch = useAppDispatch();
    return (
        <Card onClick={() => dispatch(setComponentsInfo({
            data: {
                name: data.name,
                description: data.description,
                value: data.value,
            },
            open: true
        }))} className="w-full md:w-[350px]">
            <CardHeader>

            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col items-center">
                        {
                            data.name === "Led" ?
                                <Icon /> : <img className="w-[100px] h-[100px] " src={data.image ? data.image : "/bulb.svg"} alt="" />
                        }
                        <p className="text-xl font-bold pt-2">{data.name}</p>
                        <p>{data.description}</p>

                    </div>
                </form>
            </CardContent>

        </Card>
    )
}
