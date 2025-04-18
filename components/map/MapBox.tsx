"use client";
import { Map, Marker } from "react-map-gl/maplibre";
import Image from "next/image";
import {
  DestinationContext,
  DirectionDataContext,
  UserLocationContext,
} from "@/context/UserLocation.Context";
import { useContext, useState, useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from "maplibre-gl";
import axios from "axios";
import { Source, Layer } from "react-map-gl/maplibre";
import RouteData from "./RouteData";
import toast from "react-hot-toast";

const MapBox = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { destinationLocation, setDestinationLocation } =
    useContext(DestinationContext);
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [viewState, setViewState] = useState({
    latitude: userLocation.lat,
    longitude: userLocation.lon,
    zoom: 15,
  });
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lon, userLocation.lat],
        zoom: 15,
        speed: 1.2,
        curve: 1.4,
        essential: true,
      });
    }
  }, [userLocation]);

  // Fetch route only when both points and map is loaded
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/routing?waypoints=${userLocation.lat},${userLocation.lon}|${destinationLocation.lat},${destinationLocation.lon}&mode=drive&apiKey=${process.env.NEXT_PUBLIC_AUTOCOMPLETE_API_KEY}`
        );

        const route = res.data;

        if (route && route.features?.length) {
          const geojson = route.features[0];
          setRouteGeoJSON({
            type: "FeatureCollection",
            features: [geojson],
          });
          setDirectionData({
            distance: geojson.properties.distance,
            time: geojson.properties.time,
          });
          if (geojson.properties.distance > 250000) {
            toast.error('Distance should not exceed more than 250 km', {
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
            setDirectionData({
              distance: 0,
              time: 0,
            });
            return null;
          } else {
            const coords = geojson.geometry.coordinates;

            if (!coords || coords.length < 2) return;

            const bounds = new maplibregl.LngLatBounds(
              [coords[0][0], coords[0][1]], // safely init with [lng, lat]
              [coords[0][0], coords[0][1]]
            );

            coords.forEach(([lng, lat]: number[]) => {
              bounds.extend([lng, lat]);
            });

            if (mapRef.current) {
              mapRef.current.fitBounds(bounds, {
                padding: 60,
                duration: 1000,
              });
            }
          }
        }
      } catch (err: any) {
        console.error("Routing error:", err.response?.data || err.message);
      }
    };

    if (
      userLocation?.lat &&
      userLocation?.lon &&
      destinationLocation?.lat &&
      destinationLocation?.lon &&
      isMapLoaded
    ) {
      fetchRoute();
    }
  }, [userLocation, destinationLocation, isMapLoaded]);

  useEffect(() => {
    if(directionData.distance == 0){
      return
    }else if (
      userLocation &&
      destinationLocation &&
      mapRef.current &&
      destinationLocation.lat !== 0 &&
      destinationLocation.lon !== 0
    ) {
      const bounds = new maplibregl.LngLatBounds();

      bounds.extend([userLocation.lon, userLocation.lat]);
      bounds.extend([destinationLocation.lon, destinationLocation.lat]);

      mapRef.current.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 50, right: 50 },
        maxZoom: 15,
        duration: 1000,
      });
    }
  }, [userLocation, destinationLocation, isMapLoaded]);
  return (
    <div className="p-3">
      {userLocation ? (
        <Map
          onLoad={() => setIsMapLoaded(true)}
          ref={(ref) => {
            if (ref) mapRef.current = ref.getMap(); // get raw maplibre-gl instance
          }}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: 500, borderRadius: "10px" }}
          mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_API_KEY}`}
        >
          <Marker
            longitude={userLocation.lon}
            latitude={userLocation.lat}
            anchor="bottom"
          >
            <Image src="/assets/pin.png" height={48} width={48} alt="Pin" />
          </Marker>
          {destinationLocation.lat !== 0 && destinationLocation.lon !== 0 ? (
            <Marker
              longitude={destinationLocation.lon}
              latitude={destinationLocation.lat}
              anchor="bottom"
            >
              <Image
                src="/assets/location.png"
                height={50}
                width={50}
                alt="Destination Pin"
              />
            </Marker>
          ) : null}
          {routeGeoJSON && (
            <Source id="route" type="geojson" data={routeGeoJSON}>
              <Layer
                id="route-line"
                type="line"
                source="route"
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
                paint={{
                  "line-color": "#1F75FE",
                  "line-width": 7,
                }}
              />
            </Source>
          )}
        </Map>
      ) : null}
      {directionData.distance > 0 && directionData.time > 0 ? (
        <div className="absolute bottom-[40px] z-20">
          <RouteData />
        </div>
      ) : null}
    </div>
  );
};

export default MapBox;
