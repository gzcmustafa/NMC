import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { TbWorldCheck } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { PiBellRinging } from "react-icons/pi";
import { BsCardList } from "react-icons/bs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDevices } from "@/hooks/useDevice";

export default function OverviewIndex() {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-6 p-6">
      {/* row-1 */}
      <div className="bg-white  rounded-lg p-5">
        <div className="flex items-center">
          <p>Selected Edge Location</p>
          <MdArrowOutward />
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Edge Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Kocaeli</SelectItem>
                <SelectItem value="dark">Munich</SelectItem>
                <SelectItem value="system">Heidelberg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* row-2 */}
      <div className="  grid grid-cols-5 gap-4 ">
        <div className="bg-white  rounded-2xl p-4  ">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Total Edge Location</p>
            <CiLocationOn className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1</p>
          </div>
        </div>

        <div className="bg-blue-400  rounded-2xl p-4 text-white ">
          <div className="flex items-center justify-between">
            <p className="">Acive/Total gNBs</p>
            <BsBox className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1/1</p>
          </div>
        </div>

        <div className="bg-gray-400  rounded-2xl p-4  text-white ">
          <div className="flex items-center justify-between">
            <p className="">Connected Devices</p>
            <TbWorldCheck className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1</p>
          </div>
        </div>

        <div className="bg-gray-600  rounded-2xl p-4 text-white  ">
          <div className="flex items-center justify-between">
            <p className="">Total SIMs</p>
            <RxDashboard className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1</p>
          </div>
        </div>

        <div className="bg-orange-400  rounded-2xl p-4 text-white  ">
          <div className="flex items-center justify-between">
            <p className="">Total Alarm</p>
            <PiBellRinging className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white  rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <BsCardList />
            <p>Device list</p>
          </div>
          <div className="space-y-3">
            {devices?.map((device) => (
              <div
                key={device.id}
                className="p-3 border rounded lg-hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{device.name}</span>

                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      device.status === "online"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >{device.status}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">

                    <span className="font-bold">Location:</span> {device.location.name}

                  </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white  rounded-2xl p-7">
          <div className="">
            <p>Edge Locations list</p>
          </div>
          <div></div>
        </div>

        <div className="bg-white  rounded-2xl p-7">
          <div className="">
            <p>Edge Locations list</p>
          </div>
          <div></div>
        </div>

        <div className="bg-white  rounded-2xl p-7">
          <div className="">
            <p>Edge Locations list</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
