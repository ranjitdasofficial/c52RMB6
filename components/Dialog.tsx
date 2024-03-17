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
import { useEffect } from "react"
import { Switch } from "./ui/switch"



export function DialogBox() {
    const componentInfo = useAppSelector(state => state.AcademicSlice.componentsInfo);
    const dispatch = useAppDispatch();
    const handleOnCloseDialog = () => {
        dispatch(setComponentsInfo({
            data: null,
            open: false
        }))
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


const maps = (event: string, data: any) => {

    switch (event) {
        case "Bulb":
            return <div className="w-full flex justify-center flex-col items-center gap-5">
                {data.bulb === 0 ? <img src="/bulboff.svg" alt="bulb" className="w-[100px] h-[100px]" /> : <img src="/bulbon.svg" alt="bulb" className="w-[100px] h-[100px]" />}

                <div onClick={()=>{
                    
                }} className={`flex justify-center items-center font-bold w-[50px] h-[50px] ${data.bulb===0?"bg-gray-600":"bg-green-600"} rounded-full`}>
                    {
                        data.bulb === 0 ? "Off" : "On"
                    }
                </div>
            </div>
        case "Led":
            return "/led.svg"
        case "Fan":
            return "/fan.svg"
        case "Ac":
            return "/ac.svg"
    }
}

    useEffect(() => {
        getData();

    }, [componentInfo.open])
    return (
        <Dialog open={componentInfo?.open} onOpenChange={handleOnCloseDialog}>

            <DialogContent className="sm:max-w-[425px]">
                {/* <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader> */}

                {maps(componentInfo?.data?.name as string, componentInfo?.data)}
            </DialogContent>
        </Dialog>
    )
}
