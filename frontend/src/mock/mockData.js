import { v4 as uuidv4 } from "uuid";

export const mockDevices = [
  {
    id: uuidv4(),
    name: "Munich Sensor 1", // Berlin yerine Münih
    status: "online",
    location: { lat: 48.1351, lng: 11.5820,name: "Muncih, Germany" }, // Münih - Gerçek enlem ve boylam
    battery: 85,
    temperature: 22.5,
    temperature_history: [22.1, 22.3, 22.5, 22.8, 23.0, 22.9, 22.6, 22.4],
    battery_history: [100, 98, 96, 94, 91, 89, 86, 85]
  },
  {
    id: uuidv4(),
    name: "Mannheim Sensor 2",
    status: "online",
    location: { lat: 49.4875, lng: 8.4660, name: "Mannheim, Germany" }, // Mannheim - Gerçek enlem ve boylam
    battery: 40,
    temperature: 19.8,
    temperature_history: [19.5, 19.7, 19.8, 20.1, 20.3, 20.0, 19.9, 19.8],
    battery_history: [60, 58, 55, 53, 50, 48, 45, 40]
  },
  {
    id: uuidv4(),
    name: "Istanbul Sensor 3",
    status: "online",
    location: { lat: 41.0082, lng: 28.9784, name: "Istanbul, Turkey"}, // İstanbul - Gerçek enlem ve boylam
    battery: 70,
    temperature: 25.3,
    temperature_history: [24.8, 25.0, 25.3, 25.7, 26.0, 25.6, 25.4, 25.3],
    battery_history: [80, 78, 75, 73, 72, 71, 70, 70]
  },
  {
    id: uuidv4(),
    name: "Heidelberg Sensor 4",
    status: "offline",
    location: { lat: 49.3988, lng: 8.6724,name: "Heidelberg, Germany" }, // Heidelberg - Gerçek enlem ve boylam
    battery: 60,
    temperature: 21.7,
    temperature_history: [21.3, 21.5, 21.7, 22.0, 22.1, 21.9, 21.6, 21.4],
    battery_history: [90, 88, 85, 83, 80, 78, 75, 60]
  },
  {
    id: uuidv4(),
    name: "Kocaeli Sensor 5",
    status: "online",
    location: { lat: 40.8533, lng: 29.8815,name: "Kocaeli, Turkey" }, // Kocaeli - Gerçek enlem ve boylam
    battery: 50,
    temperature: 23.2,
    temperature_history: [22.8, 23.0, 23.2, 23.5, 23.8, 23.6, 23.4, 23.2],
    battery_history: [70, 68, 65, 63, 60, 58, 55, 50]
  }
];
