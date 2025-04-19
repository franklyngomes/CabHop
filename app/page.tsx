"use client";
import React from "react";
import Booking from "@/components/booking/Booking";
import MapBox from "@/components/map/MapBox";
import {
  DirectionDataContext,
  UserLocationContext,
  DestinationContext,
} from "@/context/UserLocation.Context";
import { AmountContext } from "@/context/AmountContext";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  const [userLocation, setUserLocation] = React.useState({
    lat: 0,
    lon: 0,
  });
  const [destinationLocation, setDestinationLocation] = React.useState({
    lat: 0,
    lon: 0,
  });
  const [directionData, setDirectionData] = React.useState({
    distance: 0,
    time: 0,
  });
  const [carAmount, setCarAmount] = React.useState();
  const [loading, setLoading] = React.useState<boolean>(true);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        toast.error('Enable location services from your device for better experience', {
          style: {
            background:"#f8c853",
            padding: '10px',
            color: '#000',
          },
          iconTheme: {
            primary: '##f8c853',
            secondary: '#000',
          },
        });
        console.warn("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Optional: max wait time
        maximumAge: 0, // Optional: don't use cached position
      }
    );
  };
  React.useEffect(() => {
    getUserLocation();
    setLoading(false)
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center m-auto mt-5">
        <Image src="/assets/loader.gif" width={50} height={50} alt="Loader" />
        </div>
      ) : (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
          <DestinationContext.Provider
            value={{ destinationLocation, setDestinationLocation }}
          >
            <DirectionDataContext.Provider
              value={{ directionData, setDirectionData }}
            >
              <AmountContext.Provider value={{ carAmount, setCarAmount }}>
                <div className="grid grid-cols-1 md:grid-cols-3 ">
                  <div className="col-span-1">
                    <Booking />
                  </div>
                  <div className="col-span-2 order-first md:order-last">
                    <MapBox />
                  </div>
                </div>
              </AmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestinationContext.Provider>
        </UserLocationContext.Provider>
      )}
    </div>
  );
}
