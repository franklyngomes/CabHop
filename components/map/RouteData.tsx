import { DirectionDataContext } from '@/context/UserLocation.Context';
import React from 'react'

const RouteData = () => {
  const { directionData, setDirectionData } = React.useContext(DirectionDataContext);
  const distance = (directionData.distance /1000).toFixed(1)
  const minutes = Math.floor(directionData.time / 60)
  const remainingSeconds = Math.floor(directionData.time % 60)
  // const time = `${minutes} min ${remainingSeconds} sec`
  const formatDuration = (seconds: number): string => {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
  
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };
  return (
    <div className='bg-yellow-400 p-2 rounded-r-md transition-all ease-in'>
      <h2 className='text-black font-semibold text-[15px]'>Distance: <span className='font-bold mr-3 text-black'>
        {distance} km</span></h2>
        <h2 className='text-black font-semibold text-[15px]'>ETA: <span className='font-bold mr-3 text-black'>
        {formatDuration(directionData.time)}</span></h2>
    </div>
  )
}

export default RouteData