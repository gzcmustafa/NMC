import React, { useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { BsBox } from "react-icons/bs";
import { TbWorldCheck } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { PiBellRinging } from "react-icons/pi";
import { BsCardList } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { FaBatteryThreeQuarters } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { FcInfo } from "react-icons/fc";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReactApexChart from "react-apexcharts";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDevices } from "@/hooks/useDevice";
import { Button } from "../ui/button";
import { DeviceAnalysis } from "../analysis/DeviceAnalysis";

export default function OverviewIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { data: devices, isLoading } = useDevices();

  useEffect(() => {
    if (devices && devices.length > 0) {
      console.log("All devices:", devices);
      console.log("First device data:", {
        name: devices[0].name,
        battery: devices[0].battery,
        battery_history: devices[0].battery_history,
        temperature: devices[0].temperature,
        temperature_history: devices[0].temperature_history,
      });
      setSelectedDevice(devices[0]);
    }
  }, [devices]);

  const handleClick = (device) => {
    setSelectedDevice(device);
    setIsOpen(true);
  };

  const totalDevices = devices?.length || 0;
  const onlineDevices =
    devices?.filter((device) => device.status === "online").length || 0;
  const totalLocations = devices
    ? [...new Set(devices.map((device) => device.location.name))].length
    : 0;

  const createCustomIcon = (status) => {
    const iconHtml = renderToStaticMarkup(
      <div
        className={`  p-2  ${
          status === "online"
            ? "bg-transparent text-green-700 text-4xl "
            : "bg-transparent text-red-500 text-4xl"
        }`}
      >
        <FaWifi className=" " />
      </div>
    );

    return new L.DivIcon({
      html: iconHtml,
      className: "custom-div-icon",
      iconSize: [50, 50],
      iconAnchor: [15, 40],
      popupAnchor: [0, -20],
    });
  };

  const prepareChartData = (device) => {
    if (!device)
      return {
        battery: {
          options: {
            chart: {
              type: "area",
              toolbar: {
                show: false,
              },
            },
            colors: ["#2563eb"],
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100],
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              categories: Array.from({ length: 8 }, (_, i) => `Day ${i + 1}`),
              labels: {
                style: {
                  colors: "#64748b",
                },
              },
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val + "%";
                },
                style: {
                  colors: "#64748b",
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
            grid: {
              borderColor: "#f1f5f9",
              strokeDashArray: 4,
            },
          },
          series: [
            {
              name: "Battery Level",
              data: [],
            },
          ],
        },
        temperature: {
          options: {
            chart: {
              type: "area",
              toolbar: {
                show: false,
              },
            },
            colors: ["#dc2626"],
            fill: {
              type: "gradient",
              gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.2,
                stops: [0, 90, 100],
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              categories: Array.from({ length: 8 }, (_, i) => `Day ${i + 1}`),
              labels: {
                style: {
                  colors: "#64748b",
                },
              },
            },
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val + "°C";
                },
                style: {
                  colors: "#64748b",
                },
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "°C";
                },
              },
            },
            grid: {
              borderColor: "#f1f5f9",
              strokeDashArray: 4,
            },
          },
          series: [
            {
              name: "Temperature",
              data: [],
            },
          ],
        },
      };

 
    const dates = Array.from({ length: 8 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      return i === 7
        ? "Today"
        : date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
          });
    });

    return {
      battery: {
        options: {
          chart: {
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: ["#2563eb"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100],
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                colors: "#64748b",
              },
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "%";
              },
              style: {
                colors: "#64748b",
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          grid: {
            borderColor: "#f1f5f9",
            strokeDashArray: 4,
          },
        },
        series: [
          {
            name: "Battery Level",
            data: device.battery_history,
          },
        ],
      },
      temperature: {
        options: {
          chart: {
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: ["#dc2626"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100],
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            width: 3,
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                colors: "#64748b",
              },
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "°C";
              },
              style: {
                colors: "#64748b",
              },
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "°C";
              },
            },
          },
          grid: {
            borderColor: "#f1f5f9",
            strokeDashArray: 4,
          },
        },
        series: [
          {
            name: "Temperature",
            data: device.temperature_history,
          },
        ],
      },
    };
  };

  return (
    <div className="grid gap-4 p-4 md:p-6 dark:bg-gray-700 ">
      {/* row-1 */}
      <div className="bg-white dark:bg-gray-800  rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">
            Selected Edge Location
          </p>
          <MdArrowOutward className="hidden sm:block text-gray-600 dark:text-gray-300" />
          <div>
            <Select className="">
              <SelectTrigger className="w-full sm:w-[180px] dark:bg-gray-500">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 ">
        <div className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-3 md:p-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Total Edge Location
            </p>
            <CiLocationOn className="text-xl md:text-2xl text-gray-600 dark:text-gray-300" />
          </div>
          <div>
            <p className="text-xl md:text-2xl mt-2 text-gray-800 dark:text-gray-200">
              {totalLocations}
            </p>
          </div>
        </div>

        <div className="bg-blue-400 cursor-pointer rounded-xl p-3 md:p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">Active/Total gNBs</p>
            <BsBox className="text-xl md:text-2xl" />
          </div>
          <div>
            <p className="text-xl md:text-2xl mt-2">
              {onlineDevices}/{totalDevices}
            </p>
          </div>
        </div>

        <div className="bg-gray-400 cursor-pointer rounded-xl p-3 md:p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">Connected Devices</p>
            <TbWorldCheck className="text-xl md:text-2xl" />
          </div>
          <div>
            <p className="text-xl md:text-2xl mt-2">{totalDevices}</p>
          </div>
        </div>

        <div className="bg-gray-600 cursor-pointer rounded-xl p-3 md:p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">Total SIMs</p>
            <RxDashboard className="text-xl md:text-2xl" />
          </div>
          <div>
            <p className="text-xl md:text-2xl mt-2">1</p>
          </div>
        </div>

        <div className="bg-orange-400 cursor-pointer rounded-xl p-3 md:p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base">Total Alarm</p>
            <PiBellRinging className="text-xl md:text-2xl" />
          </div>
          <div>
            <p className="text-xl md:text-2xl mt-2">1</p>
          </div>
        </div>
      </div>

      {/* row-3 */}
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-4 md:gap-6 ">
        <div className="bg-white rounded-xl p-4 md:p-6 dark:bg-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <BsCardList className="text-lg md:text-xl" />
            <p className="text-sm md:text-base">Device list</p>
            <div className="grid grid-cols-2 gap-4 mb-4"></div>
          </div>
          <div className="space-y-3 ">
            {devices?.map((device) => (
              <div
                key={device.id}
                onClick={() => handleClick(device)}
                className="p-3 space-y-3 dark:border-white  border rounded hover:bg-gray-200  dark:hover:bg-gray-500  cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between ">
                  <span className="font-medium text-sm md:text-base">
                    {device.name}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                      device.status === "online"
                        ? "bg-green-300 text-green-900"
                        : "bg-red-300 text-red-800"
                    }`}
                  >
                    {device.status}
                  </span>
                </div>
                <div className="flex items-center gap-8 ">
                  <div className="flex items-center gap-2">
                    <FaBatteryThreeQuarters className="text-xl text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Battery
                      </p>
                      <p className="font-semibold dark:text-white">
                        {device.battery}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbTemperatureCelsius className="text-xl text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Temperature
                      </p>
                      <p className="font-semibold dark:text-white">
                        {device.temperature}°C
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1 dark:text-gray-200">
                  <span className="font-bold dark:text-gray-300">
                    Location:
                  </span>{" "}
                  {device.location.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 md:p-6 dark:bg-gray-800 ">
          <div className="mb-4">
            <p className="font-medium text-sm md:text-base dark:text-gray-200">
              Edge Locations Map
            </p>
          </div>
          <div className="h-[300px] md:h-[400px] rounded-lg overflow-hidden relative z-[1]">
            <div className="absolute inset-0 bg-white dark:bg-gray-700 z-0"></div>
            <MapContainer
              center={[49.3988, 8.6724]}
              zoom={9}
              style={{ height: "100%", width: "100%" }}
              className="relative z-10"
            >
              <TileLayer
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                className="dark:opacity-80 dark:contrast-100 dark:invert"
              />
              {devices?.map((device) => (
                <Marker
                  key={device.id}
                  position={[device.location.lat, device.location.lng]}
                  icon={createCustomIcon(device.status)}
                >
                  <Popup>
                    <div>
                      <div className="flex flex-col">
                        <p className="font-medium text-xl">{device.name}</p>
                        <Button
                          onClick={() => handleClick(device)}
                          className=" flex items-center p-2 text-m dark:text-white"
                          variant="outline"
                        >
                          More Info
                          <FcInfo className="text-wxl" />
                        </Button>
                      </div>
                      <p
                        className={`text-sm ${
                          device.status === "online"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        Status: {device.status}
                        <br />
                        <div className="flex ites-center items-center gap-2">
                          Last Battery: %{device.battery_history[7]}{" "}
                          <FaBatteryThreeQuarters className="text-xl" />
                        </div>
                        <div className="flex items-center">
                          Last Temperature: {device.temperature_history[7]}{" "}
                          <TbTemperatureCelsius className="text-xl" />
                        </div>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <div className="">
            {devices?.map((device) => (
              <DeviceAnalysis key={device.id} device={device} />
            ))}
          </div>
        </div>
  
       
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen} className="z-[100] ">
        <DialogContent className=" dark:bg-gray-800 z-[100] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95vw] md:w-[900px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg md:text-xl gap-2 mb-2">
              {selectedDevice?.name}
              <p
                className={`text-lg md:text-xl ${
                  selectedDevice?.status === "online"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ({selectedDevice?.status})
              </p>
            </DialogTitle>
            <DialogDescription>
              <div className="flex text-base md:text-lg items-center gap-2 border-b pb-2 mb-4">
                <p className="font-medium">{selectedDevice?.location.name}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[200px] bg-white p-4 rounded-xl shadow-sm border dark:bg-gray-800 ">
                  <p className="text-sm md:text-base font-medium mb-2 dark:text-white">
                    Battery History
                  </p>
                  <ReactApexChart
                    className=""
                    options={prepareChartData(selectedDevice).battery.options}
                    series={prepareChartData(selectedDevice).battery.series}
                    type="area"
                    height="100%"
                  />
                </div>

                <div className="h-[200px] bg-white p-4 rounded-xl shadow-sm border dark:bg-gray-800">
                  <p className="text-sm md:text-base font-medium mb-2 dark:text-white">
                    Temperature History
                  </p>
                  <ReactApexChart
                    options={
                      prepareChartData(selectedDevice).temperature.options
                    }
                    series={prepareChartData(selectedDevice).temperature.series}
                    type="area"
                    height="100%"
                  />
                </div>
                 

              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
