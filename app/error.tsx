'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen  w-full h-full justify-center flex ">
     <div className='  w-full rounded-md justify-center items-center  full flex '>
    <div className='w-[30rem] p-5 h-auto   rounded-md bg-slate-800'>
        <h1  className='text-xl'>Error Occured!</h1>
        <p className='pt-6'>{error.message}</p>
        {/* <p style={paragraph.style} className='pt-6'>{error.message}</p> */}
       
    </div>
        </div>

    </div>
  )
}