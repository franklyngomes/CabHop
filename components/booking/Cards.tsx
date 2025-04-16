import CardsList from '@/data/CardsList'
import Image from 'next/image'
import React from 'react'

const Cards = () => {
  const [activeIndex, setActiveIndex] = React.useState<any> ()
  return (
    <div className='py-4'>
      <h2 className='font-semibold'>Payment Methods</h2>
      <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-3'>
        {
          CardsList.map((item, index) => (
            <div className={`w-[50px] border-1 border-gray-300 flex items-center justify-center rounded-md cursor-pointer hover:border-yellow-400 ${activeIndex === index ? 'border-yellow-400 bg-yellow-200' : ""} transition-all`} key={index} onClick={() => setActiveIndex(index)}>
              <Image src={item.image} alt={item.name} width={30} height={30}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Cards