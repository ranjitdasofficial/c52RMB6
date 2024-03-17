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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/hooks"
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


    const stateData = useAppSelector(state => state.AcademicSlice.data);


    const mapStatus = (event: string) => {

        switch (event) {
            case "Bulb":
                return <div className="w-full border border-gray-500 py-2 px-2 rounded-2xl flex justify-center">
                    <h1 className="font-bold text-slate-300">Status: <span className={`text-slate-400`}>{stateData.bulb === 0 ? "OFF" : <span className="text-green-600">ON</span> }</span> </h1>
                </div>
            case "Led":
                return <div className="w-full border border-gray-500 py-2 px-2 rounded-2xl flex justify-center">
                    <h1 className="font-bold text-slate-300">ColorHex: <span className={`text-gray-500`}>{stateData.led}</span> </h1>
                </div>

            case "Fan":
                return <div className="w-full border border-gray-500 py-2 px-2 rounded-2xl flex justify-center">
                    <h1 className="font-bold text-slate-300">Speed: <span className={`text-slate-400`}>{stateData.fan}</span> </h1>
                </div>
            case "Ac":
                return <div className="w-full border border-gray-500 py-2 px-2 rounded-2xl flex justify-center">
                    <h1 className="font-bold text-slate-300">Status: <span className={`text-slate-400`}>{stateData.ac?.state === 0 ? "OFF" : <span className="text-green-600">ON</span>}</span> <span className="pl-2">{stateData.ac?.state === 1 && <span>{stateData.ac.temp}&deg;C</span>}</span> </h1>
                </div>
            default:
                return <div>

                </div>
        }

    }
    const dispatch = useAppDispatch();
    const datas = useAppSelector(state => state.AcademicSlice.data);
    return (
        <Card onClick={() => dispatch(setComponentsInfo({
            data: {
                name: data.name,
                description: data.description,
                value: data.value,
            },
            open: true
        }))} className="w-full cursor-pointer md:w-[350px] border-cyan-700 rounded-[7px]">
            <CardHeader>

            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-center items-center">
                    {
                        data.name === "Led" ?
                            <Icon val={datas.led as any} /> : <img className="w-[100px] h-[100px] " src={data.image ? data.image : "/bulb.svg"} alt="" />
                    }
                    <p className="text-xl font-bold pt-2">{data.name}</p>
                    <p className="text-[12px] text-slate-300">{data.description}</p>

                    <div className="w-full pt-3">
                        {stateData && mapStatus(data.name as string)}
                    </div>
                </div>

            </CardContent>

        </Card>
    )
}
