import React, { useState } from "react";
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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

export default function OverviewIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { data: devices, isLoading } = useDevices();
  if (isLoading) return <div>Loading...</div>;

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
    if (!device) return {
      battery: {
        options: {
          chart: {
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#2563eb'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: Array.from({ length: 8 }, (_, i) => `Day ${i + 1}`),
            labels: {
              style: {
                colors: '#64748b'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "%"
              },
              style: {
                colors: '#64748b'
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "%"
              }
            }
          },
          grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
          }
        },
        series: [{
          name: 'Battery Level',
          data: []
        }]
      },
      temperature: {
        options: {
          chart: {
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#dc2626'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: Array.from({ length: 8 }, (_, i) => `Day ${i + 1}`),
            labels: {
              style: {
                colors: '#64748b'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "°C"
              },
              style: {
                colors: '#64748b'
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "°C"
              }
            }
          },
          grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
          }
        },
        series: [{
          name: 'Temperature',
          data: []
        }]
      }
    };

    // Tarih hesaplama
    const dates = Array.from({ length: 8 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      return i === 7 ? 'Today' : date.toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: '2-digit'
      });
    });

    return {
      battery: {
        options: {
          chart: {
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#2563eb'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                colors: '#64748b'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "%"
              },
              style: {
                colors: '#64748b'
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "%"
              }
            }
          },
          grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
          }
        },
        series: [{
          name: 'Battery Level',
          data: device.battery_history
        }]
      },
      temperature: {
        options: {
          chart: {
            type: 'area',
            toolbar: {
              show: false
            }
          },
          colors: ['#dc2626'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.2,
              stops: [0, 90, 100]
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: dates,
            labels: {
              style: {
                colors: '#64748b'
              }
            }
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return val + "°C"
              },
              style: {
                colors: '#64748b'
              }
            }
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "°C"
              }
            }
          },
          grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
          }
        },
        series: [{
          name: 'Temperature',
          data: device.temperature_history
        }]
      }
    };
  };

  return (
    <div className="grid gap-6 p-6">
      {/* row-1 */}
      <div className="bg-white  rounded-lg p-5">
        <div className="flex items-center">
          <p>Selected Edge Location</p>
          <MdArrowOutward  />
          <div>
            <Select>
              <SelectTrigger  className="w-[180px]">
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
        <div className="  cursor-pointer bg-white  rounded-2xl p-4  ">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Total Edge Location</p>
            <CiLocationOn className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">{totalLocations}</p>
          </div>
        </div>

        <div className="bg-blue-400 cursor-pointer  rounded-2xl p-4 text-white ">
          <div className=" flex items-center justify-between">
            <p className="">Acive/Total gNBs</p>
            <BsBox className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">
              {onlineDevices}/{totalDevices}
            </p>
          </div>
        </div>

        <div className="bg-gray-400 cursor-pointer  rounded-2xl p-4  text-white ">
          <div className="flex items-center justify-between">
            <p className="">Connected Devices</p>
            <TbWorldCheck className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">{totalDevices}</p>
          </div>
        </div>

        <div className="bg-gray-600 cursor-pointer  rounded-2xl p-4 text-white  ">
          <div className="flex items-center justify-between">
            <p className="">Total SIMs</p>
            <RxDashboard className="text-2xl" />
          </div>
          <div>
            <p className="text-2xl">1</p>
          </div>
        </div>

        <div className="bg-orange-400  cursor-pointer rounded-2xl p-4 text-white  ">
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
      <div className="grid grid-cols-[420px_1fr] gap-6">
        <div className="bg-white rounded-2xl p-7">
          <div className="flex items-center gap-3">
            <BsCardList />
            <p>Device list</p>
          </div>
          <div className="space-y-3">
            {devices?.map((device) => (
              <div
                key={device.id}
                onClick={() => handleClick(device)}
                className="p-3 border rounded lg-hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{device.name}</span>

                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      device.status === "online"
                        ? "bg-green-100 text-green-900"
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
          <div className="h-[400px] rounded-lg overflow-hidden relative z-[1]">
            <MapContainer
              center={[49.3988, 8.6724]}
              zoom={10}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                        <Button onClick={()=>handleClick(device)} className=" flex items-center p-2 text-m" variant="outline">
                          More Info
                          <FcInfo className="text-wxl"  />
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
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen} className="z-[100]">
        <DialogContent className="z-[100] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[900px] max-w-[95vw]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl gap-2 mb-2">
              {selectedDevice?.name} 
              <p className={`text-xl ${
                selectedDevice?.status === "online"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                ({selectedDevice?.status})
              </p>
            </DialogTitle>
            <DialogDescription>
              <div className="flex text-lg items-center gap-2 border-b pb-2 mb-4">
                <p className="text-lg font-medium">{selectedDevice?.location.name}</p>
              </div>                
              <div className="grid grid-cols-2 gap-4">
                <div className="h-[200px] bg-white p-4 rounded-xl shadow-sm border">
                  <p className="text-base font-medium mb-2">Battery History</p>
                  <ReactApexChart
                    options={prepareChartData(selectedDevice).battery.options}
                    series={prepareChartData(selectedDevice).battery.series}
                    type="area"
                    height="100%"
                  />
                </div>

                <div className="h-[200px] bg-white p-4 rounded-xl shadow-sm border">
                  <p className="text-base font-medium mb-2">Temperature History</p>
                  <ReactApexChart
                    options={prepareChartData(selectedDevice).temperature.options}
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
