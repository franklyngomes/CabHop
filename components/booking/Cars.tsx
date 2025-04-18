import { AmountContext } from "@/context/AmountContext";
import { DirectionDataContext } from "@/context/UserLocation.Context";
import CarsList from "@/data/CarsList";
import Image from "next/image";
import { useContext, useState } from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<any>();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const getCost = (charges: number) => {
    const newCharges = (directionData.distance / 1000) * charges;
    return newCharges.toFixed(2);
  };
  const {carAmount, setCarAmount} = useContext(AmountContext)
  console.log(carAmount)

  return (
    <div className="mt-3">
      <h2 className="font-semibold text-gray-700">Select Car</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((item, index) => (
          <div
            key={index}
            className={`w-full p-2 border-1 border-gray-300 rounded-md hover:border-yellow-400 ${
              index === selectedCar ? "border-yellow-400 bg-yellow-200" : null
            }  cursor-pointer`}
            onClick={() => {
              setSelectedCar(index)
              setCarAmount(getCost(item.charges))
            }}
          >
            <Image
              src={item.image}
              alt="Cars"
              width={90}
              height={40}
              className="h-[40px]"
            />
            <h6 className="text-[12px] mt-2">
              {item.name}
              <span className="float-right text-gray-700 font-semibold">
                $
                {directionData.distance > 0 && directionData.time > 0
                  ? getCost(item.charges)
                  : item.charges}
              </span>
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
