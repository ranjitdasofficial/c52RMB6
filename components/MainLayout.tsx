"use client"
import React from 'react'
import { Cards } from './Cards'
import { DialogBox } from './Dialog'
import { useAppSelector } from '@/Redux/hooks/hooks'



const cardDetails = [
    {
        name: "Bulb",
        description: "This is a bulb",
        // value:1,
        image: "/bulboff.svg",
    },
    {
        name: "Led",
        description: "This is a led",
        // color:"#0004994",
        image: "/led.svg",

    },
    {
        name: "Fan",
        description: "This is a fan",
        image: "/fan.svg",

    },
    {
        name: "Ac",
        description: "This is a Ac",
        image: "/ac.svg"

    }
]
const MainLayout = () => {
    const data = useAppSelector((state)=>state.AcademicSlice.data);
    return (
        <div>
            <DialogBox />
            <div className='grid  grid-cols-1 gap-2 md:grid-cols-4'>

                {cardDetails.map((cardDetail, index) => (
                    <Cards key={index} data={
                        {
                            name: cardDetail.name,
                            description: cardDetail.description,

                            image: index===0?data.bulb===1?"/bulbon.svg":"/bulboff.svg":cardDetail.image
                        }
                    } />
                ))}
            </div>
        </div>
    )
}

export default MainLayout