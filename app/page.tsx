"use client"
import React from "react";
import Booking from "@/components/booking/Booking";
import MapBox from "@/components/map/MapBox";
import { UserLocationContext } from "@/context/UserLocation.Context";


export default function Home() {
    const [userLocation, setUserLocation] = React.useState({
      lat: 0,
      lon:0
    });
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(function(position){
        setUserLocation({
          lat:position.coords.latitude,
          lon:position.coords.longitude
        })
        console.log(position)
      })
    }
    React.useEffect(() => {
      getUserLocation()
    },[])
  return (
    <div>
      <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="col-span-1">
          <Booking/>
        </div>
        <div className="col-span-2 order-first md:order-last">
          <MapBox/>
        </div>
      </div>
      </UserLocationContext.Provider>
    </div>
  );
}
