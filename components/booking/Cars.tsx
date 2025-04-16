import CarsList from "@/data/CarsList";
import Image from "next/image";
import React from "react";

const Cars = () => {
  const [selectedCar, setSelectedCar] = React.useState<any>();
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {CarsList.map((item, index) => (
          <div key={index} className={`w-full p-2 border-1 border-gray-300 rounded-md hover:border-yellow-400 ${index === selectedCar ? "border-yellow-400 bg-yellow-200" : null}  cursor-pointer`} onClick={() => setSelectedCar(index)}>
            <Image src={item.image} alt="Cars" width={90} height={40} className="h-[40px]"/>
            <h6 className="text-[12px] mt-2">{item.name}<span className="float-right text-gray-500">${item.charges * 8}</span></h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
