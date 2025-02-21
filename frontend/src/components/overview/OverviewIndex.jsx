import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { TbWorldCheck } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { PiBellRinging } from "react-icons/pi";
import { BsCardList } from "react-icons/bs";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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


  delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

  const totalDevices = devices?.length || 0;
  const onlineDevices = devices?.filter(device => device.status === "online").length || 0;
  const totalLocations = devices ? [...new Set(devices.map(device => device.location.name))].length : 0;
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
            <p className="text-2xl">{totalLocations}</p>
          </div>
        </div>

        <div className="bg-blue-400  rounded-2xl p-4 text-white ">
          <div className="flex items-center justify-between">
            <p className="">Acive/Total gNBs</p>
            <BsBox className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">{onlineDevices}/{totalDevices}</p>
          </div>
        </div>

        <div className="bg-gray-400  rounded-2xl p-4  text-white ">
          <div className="flex items-center justify-between">
            <p className="">Connected Devices</p>
            <TbWorldCheck className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">{totalDevices}</p>
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

      {/* row-3 */}
      <div className="grid grid-cols-[350px_1fr] gap-6">
        <div className="bg-white rounded-2xl p-7">
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
                  >
                    {device.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <span className="font-bold">Location:</span>{" "}
                  {device.location.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-7 h-full">
          <div className="mb-4">
            <p className="font-medium">Edge Locations Map</p>
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <MapContainer 
              center={[48.1351, 11.5820]}
              zoom={11} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {devices?.map((device) => (
                <Marker 
                  key={device.id} 
                  position={[device.location.lat, device.location.lng]}
                >
                  <Popup>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className={`text-sm ${
                        device.status === "online" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        Status: {device.status}
                        <br />
                        Last Battery: %{ device.battery_history[7]}
                        <br />
                        Last Tempraturay: {device.temperature_history[7]}°C 
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
