"use server"

import { revalidateTag } from "next/cache";

export const getData = async () => {
   
  try {
    const res = await fetch('https://kodessphere-api.vercel.app/devices/c52RMB6', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next:{
            tags:['fetchData']
        }
    });

    if (res.status === 200) {
        const data = await res.json();
        return {
            status:200,
            message:"Successfully Executed",
            data:data
        };
    }
    return {
        status:res.status,
        message:res.statusText
    }

  } catch (error) {
   return{
    status:500,
    message:"Internal Server Error"
   }
    
  }
    // console.log(data);


}


export const UpdateDataToDb=async(data:any)=>{
    try {
        const res = await fetch('https://kodessphere-api.vercel.app/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });


        if(res.status===200){
            revalidateTag("fetchData")
        }
        console.log(res.status)
            return {
                status:res.status,
                message:res.statusText
            };
        
    } catch (error) {
        return {
            status:500,
            message:"Internal Server Error"
        }
    }
}