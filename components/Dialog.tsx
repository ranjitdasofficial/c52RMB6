import { useAppDispatch, useAppSelector } from "@/Redux/hooks/hooks"
import { setComponentsInfo, setData } from "@/Redux/reducers/academicReducer"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Switch } from "./ui/switch"

import { SketchPicker, SliderPicker } from 'react-color'
import SVGLed from "./SVGLed"
import CircularSlider from "react-circular-slider-svg";
const fanMap = {
    1: "duration-1000",
    2: "duration-900",
    3: "duration-800",
    4: "duration-700",
    5: "duration-600",
}

const fanSpeed = [1, 2, 3, 4, 5];

export function DialogBox() {
    const componentInfo = useAppSelector(state => state.AcademicSlice.componentsInfo);
    const data = useAppSelector(state => state.AcademicSlice.data);
    const [currentColor, setCurrenColor] = useState(data.led ?? "#fffff");
    const dispatch = useAppDispatch();
    const handleOnCloseDialog = () => {
        dispatch(setComponentsInfo({
            data: null,
            open: false
        }))
    }




    const updateData = async (data: any) => {
        console.log(data)
        const res = await fetch('https://kodessphere-api.vercel.app/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            getData();
        }


    }

    const getData = async () => {
        const res = await fetch('https://kodessphere-api.vercel.app/devices/c52RMB6', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            dispatch(setData(data))
        }
        // console.log(data);

        console.log("error", res)

    }


    const maps = (event: string,) => {

        switch (event) {
            case "Bulb":
                return <div className="w-full flex justify-center flex-col items-center gap-5">
                    {data.bulb === 0 ? <img src="/bulboff.svg" alt="bulb" className="w-[100px] h-[100px]" /> : <img src="/bulbon.svg" alt="bulb" className="w-[100px] h-[100px]" />}

                    <div onClick={() => {
                        dispatch(setData({
                            ac: data.ac,
                            bulb: data.bulb === 0 ? 1 : 0,
                            fan: data.fan,
                            led: data.led,
                            teamName: data.teamName,
                            teamid: data.teamid
                        }))
                        updateData(
                            {

                                teamid: "c52RMB6",
                                value: data.bulb === 0 ? 1 : 0,
                                device: "bulb",

                            }
                        )
                    }} className={`flex justify-center items-center font-bold w-[50px] h-[50px] ${data.bulb === 0 ? "bg-gray-600" : "bg-green-600"} rounded-full`}>
                        {
                            data.bulb === 0 ? "Off" : "On"
                        }
                    </div>
                </div >
            case "Led":
                return <div>

                    <SVGLed val={data.led as any} />

                    <SliderPicker className="w-full mt-5" onChange={(v) => {
                        console.log(v)
                    }} onChangeComplete={(val) => {
                        // setCurrenColor(val.hex)
                        dispatch(setData({
                            ac: data.ac,
                            bulb: data.bulb,
                            fan: data.fan,
                            led: val.hex,
                            teamName: data.teamName,
                            teamid: data.teamid
                        }))
                        console.log(val.hex)
                        updateData({
                            teamid: "c52RMB6",
                            value: val.hex,
                            device: "led",
                        })
                        // getData();

                    }} color={data.led as string} />
                </div>
            case "Fan":
                return <div className="w-full flex gap-2 flex-col justify-center items-center">
                    <img src="/fan.svg" className={`w-[200px] animate-spin h-[200px] ${fanMap[data.fan as keyof typeof fanMap]}`} alt="" />
                    <div className="w-full  flex gap-2 items-center justify-center">{fanSpeed.map((v) => {
                        return <span onClick={() => {
                            dispatch(setData({
                                ac: data.ac,
                                bulb: data.bulb,
                                fan: v,
                                led: data.led,
                                teamName: data.teamName,
                                teamid: data.teamid
                            }))
                            console.log(v)
                            updateData({
                                teamid: "c52RMB6",
                                value: v,
                                device: "fan",
                            })

                        }} className={`rounded-full ${data.fan === v ? "bg-green-600" : "bg-red-600"} p-3`}>{v}</span>
                    })}</div>
                </div>
            case "Ac":
                return <div className="w-full h-full  items-center flex-col flex justify-center relative">
                    <div className="w-full flex justify-center items-center">
                        <p className="absolute">{data.ac?.temp}&deg; C</p>
                        <CircularSlider
                            size={200}
                            trackWidth={4}
                            minValue={17}
                            disabled={data.ac?.state===0}
                            maxValue={29}
                            startAngle={40}
                            endAngle={320}

                            angleType={{
                                direction: "cw",
                                axis: "-y"
                            }}
                            handle1={{
                                value: data.ac?.temp ?? 20,
                                onChange: v => {
                                    dispatch(setData({
                                        ac: {
                                            state: data.ac?.state,
                                            temp: Math.round(v)
                                        },
                                        bulb: data.bulb,
                                        fan: data.fan,
                                        led: data.led,
                                        teamName: data.teamName,
                                        teamid: data.teamid
                                    }))

                                    updateData({
                                        teamid: "c52RMB6",
                                        value: {
                                            temp: Math.round(v),
                                            state: data.ac?.state
                                        },
                                        device: "ac",
                                    })
                                }
                            }}

                            arcColor="#690"
                            arcBackgroundColor="#aaa"
                        />
                    </div>

                    <div onClick={() => {
                        dispatch(setData({
                            ac: {
                                state: data.ac?.state == 0 ? 1 : 0,
                                temp: data.ac?.temp  
                            },
                            bulb: data.bulb,
                            fan: data.fan,
                            led: data.led,
                            teamName: data.teamName,
                            teamid: data.teamid
                        }))
                        updateData(
                            {

                                teamid: "c52RMB6",
                                value: {
                                    state: data.ac?.state == 0 ? 1 : 0,
                                    temp: data.ac?.temp
                                },
                                device: "ac",

                            }
                        )
                    }} className={`flex justify-center items-center font-bold w-[50px] h-[50px] ${data.ac?.state === 0 ? "bg-gray-600" : "bg-green-600"} rounded-full`}>
                        {
                            data.ac?.state === 0 ? "Off" : "On"
                        }
                    </div>
                </div>
        }
    }

    useEffect(() => {
        getData();
    }, [componentInfo.open])
    return (
        <Dialog open={componentInfo?.open} onOpenChange={handleOnCloseDialog}>

            <DialogContent className="w-screen" >
                {/* <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader> */}

                <div className="w-full">
                    {
                        data && maps(componentInfo?.data?.name as string)
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
