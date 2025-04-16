"use client";
import { Map, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { UserLocationContext } from "@/context/UserLocation.Context";
import { useContext } from "react";
import 'maplibre-gl/dist/maplibre-gl.css';


const MapBox = () => {
  const {userLocation, setUserLocation}  = useContext(UserLocationContext)
  console.log(userLocation)
  return (
    <div className="p-3">
      {
        userLocation ?
        <Map
        initialViewState={{
          longitude: userLocation?.lon,
          latitude: userLocation?.lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: 500, borderRadius: "10px" }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
      >
        <Marker longitude={userLocation.lon} latitude={userLocation.lat} anchor="bottom">
          <Image src="/assets/pin.png" height={40} width={40} alt="Pin" />
        </Marker>
      </Map>
      : null
  }
    </div>
  );
};

export default MapBox;
