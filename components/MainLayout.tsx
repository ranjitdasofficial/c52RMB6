"use client"
import React from 'react'
import { Cards } from './Cards'
import { DialogBox } from './Dialog'
import { useAppSelector } from '@/Redux/hooks/hooks'



const cardDetails = [
    {
        name: "Bulb",
        description: "Click to turn on or off the bulb",
        // value:1,
        image: "/bulboff.svg",
    },
    {
        name: "Led",
        description: "Click to change the color of the led",
        // color:"#0004994",
        image: "/led.svg",

    },
    {
        name: "Fan",
        description: "Click to control the fan speed",
        image: "/fan.svg",

    },
    {
        name: "Ac",
        description: "Click to control the AC",
        image: "/ac.svg"

    }
]


const MainLayout = () => {
    const data = useAppSelector((state) => state.AcademicSlice.data);
    return (
        <div>
            <DialogBox />
                <h1 className='text-center mt-5 text-2xl font-bold'>Team Shadow-KONNEXWEB</h1>
                <p className='text-center mb-5 text-gray-400'>Control Your Smart Home Appliances</p>
            <div className='grid  grid-cols-1 p-2 gap-3 md:grid-cols-4 pt-16'>

                {cardDetails.map((cardDetail, index) => (
                    <Cards key={index} data={
                        {
                            name: cardDetail.name,
                            description: cardDetail.description,

                            image: index === 0 ? data.bulb === 1 ? "/bulbon.svg" : "/bulboff.svg" : index === 3 ? data.ac?.state === 0 ? "/acoff.svg" : "/ac.svg" : cardDetail.image
                        }
                    } />
                ))}
            </div>

          
        </div>
    )
}

export default MainLayout