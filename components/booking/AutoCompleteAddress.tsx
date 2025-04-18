import {
  DestinationContext,
  UserLocationContext,
} from "@/context/UserLocation.Context";
import React from "react";

const AutoCompleteAddress = () => {
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [sourceChange, setSourceChange] = React.useState<boolean>(false);
  const [destinationChange, setDestinationChange] =
    React.useState<boolean>(false);
  const [sourceAddressList, setSourceAddressList] = React.useState<any>([]);
  const [destinationAddressList, setDestinationAddressList] =
    React.useState<any>([]);
  const { userLocation, setUserLocation } =
    React.useContext(UserLocationContext);
  const { destinationLocation, setDestinationLocation } =
    React.useContext(DestinationContext);
  const getSourceAddressList = async () => {
    if (source !== null) {
      const response = await fetch("/api/search-address?text=" + source, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setSourceAddressList(result);
    }
  };
  const getDestinationAddressList = async () => {
    if (destination !== null) {
      const response = await fetch("/api/search-address?text=" + destination, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setDestinationAddressList(result);
    }
  };
  React.useEffect(() => {
    if (sourceChange && source.trim() !== "") {
      getSourceAddressList();
    }
  }, [source, userLocation]);
  React.useEffect(() => {
    if (destinationChange && destination.trim() !== "") {
      getDestinationAddressList();
    }
  }, [destination]);
  return (
    <div className="mt-3">
      <div>
        <label htmlFor="" className="text-gray-500">
          From Where?
        </label>
        <input
          type="text"
          name=" "
          id=""
          className="bg-white border-[1px] border-gray-300 w-full rounded-md outline-none focus:border-yellow-300"
          value={source || ""}
          placeholder={!source ? "Your Location" : ""}
          onChange={(e) => {
            setSource(e.target.value || "");
            setSourceChange(true);
            setDestinationChange(false);
          }}
        />
        {sourceAddressList?.features?.length > 0 && (
          <div className="shadow-md p-1 rounded-md bg-white">
            {sourceAddressList.features.map((item: any, index: number) => (
              <h6
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSource(item.properties.name);
                  setSourceAddressList([]);
                  setSourceChange(false);
                  setUserLocation({
                    lat: item.properties.lat,
                    lon: item.properties.lon,
                  });
                }}
              >
                {item.properties.name}
              </h6>
            ))}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="" className="text-gray-500">
          Where To?
        </label>
        <input
          type="text"
          name=" "
          id=""
          className="bg-white border-[1px] border-gray-300 w-full rounded-md outline-none focus:border-yellow-300"
          value={destination || ""}
          onChange={(e) => {
            setDestination(e.target.value || "");
            setDestinationChange(true);
            setSourceChange(false);
          }}
        />
        {destinationAddressList?.features?.length > 0 && (
          <div className="shadow-md p-1 rounded-md bg-white">
            {destinationAddressList.features.map((item: any, index: number) => (
              <h6
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setDestination(item.properties.name);
                  setDestinationAddressList([]);
                  setDestinationChange(false);
                  setDestinationLocation({
                    lat: item.properties.lat,
                    lon: item.properties.lon,
                  });
                }}
              >
                {item.properties.name}
              </h6>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteAddress;
