import Booking from "@/components/booking/Booking";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="col-span-1">
          <Booking/>
        </div>
        <div className="col-span-2 border order-first md:order-last">Map</div>
      </div>
    </div>
  );
}
