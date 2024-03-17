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
import { loadToast, updateToast } from "@/lib/lib"
import { UpdateDataToDb, getData } from "@/serverActions/actions"
import { toast } from "react-toastify"
const fanMap = {
    1: "duration-1000",
    2: "duration-800",
    3: "duration-700",
    4: "duration-600",
    5: "duration-500",
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




    const updateData = async (data: any, event: string) => {
        console.log(data)
        const toastId = loadToast(`Processing Request:${event}`);
        try {

            const updateD = await UpdateDataToDb(data);
            if (updateD.status === 200) {
                return updateToast(toastId, `Successfully Updated:${event}`, "success");
            }

            return updateToast(toastId, updateD.message, "error");


        } catch (error) {
            return updateToast(toastId, "Internal Server Error", "error");

        }





    }


    const getDatas = async () => {
        const res = await getData();
        if (res.status === 200) {
            return dispatch(setData(res.data));
        }

        return toast.error(res.message)
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

                            }, "Bulb"
                        )
                    }} className={`flex justify-center items-center font-bold w-[50px] h-[50px] ${data.bulb === 0 ? "bg-gray-600" : "bg-green-600"} rounded-full`}>
                        {
                            data.bulb === 0 ? "Off" : "On"
                        }
                    </div>
                </div >
            case "Led":
                return <div className="flex w-full  flex-col justify-center items-center">

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
                        }, "LED")
                        // getData();

                    }} color={data.led as string} />
                </div>
            case "Fan":
                return <div className="w-full flex gap-2 flex-col justify-center items-center">
                    <img src="/fan.svg" className={`w-[200px] animate-spin h-[200px] ${fanMap[data.fan as keyof typeof fanMap]}`} alt="" />
                    <div className="w-full  flex gap-2 items-center justify-center">{fanSpeed.map((v) => {
                        return <span  onClick={() => {
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
                            }, "Fan")

                        }} className={`rounded-full cursor-pointer ${data.fan === v ? "bg-green-600" : "bg-red-600"} p-3`}>{v}</span>
                    })}</div>
                </div>
            case "Ac":
                return <div className="w-full h-full bg-[#111111]  items-center flex-col flex justify-center relative">
                    <div className="w-full flex justify-center items-center">
                        <p className="absolute">{data.ac?.temp}&deg; C</p>
                        <CircularSlider
                            size={200}
                            trackWidth={4}
                            minValue={17}
                            disabled={data.ac?.state === 0}
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
                                    }, "AC")
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

                            }, "AC"
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
        getDatas();
    }, [componentInfo.open])
    return (
        <Dialog  open={componentInfo?.open} onOpenChange={handleOnCloseDialog}>

            <DialogContent className="w-screen bg-[#111111]" >
                <DialogHeader>
                    <DialogTitle>{componentInfo.data?.name}</DialogTitle>
                    <DialogDescription>
                       Control your {componentInfo.data?.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full">
                    {
                        data && maps(componentInfo?.data?.name as string)
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
