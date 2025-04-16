"use client"
import React from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import Cards from './Cards'

const Booking = () => {
  return (
    <div className='p-5' >
      <h2 className='text-[20px] font-semibold'>Booking</h2>
       <div className='border border-gray-300 p-2 rounded-md h-full'>
      <AutoCompleteAddress/>
      <Cars/>
      <Cards/>
      <button className='w-full bg-yellow-400 p-1 rounded-md mt-4'>
        Book
      </button>
      </div>
    </div>
  )
}

export default Booking