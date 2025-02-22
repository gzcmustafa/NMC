import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

export default function CustomerJourney() {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 13;

  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const getNumberStyle = (step) => {
    if (step === activeStep) {
      return "bg-purple-700 text-white w-6 h-6 rounded-full flex items-center justify-center"; // Aktif adım mor
    }
    if (step < activeStep) {
      return "bg-gray-300 text-gray-500 w-6 h-6 rounded-full flex items-center justify-center opacity-60"; // Önceki adımlar soluk gri
    }
    return "bg-gray-100 text-gray-400 w-6 h-6 rounded-full flex items-center justify-center opacity-40"; // Gelecek adımlar daha soluk
  };

  const getTextStyle = (step) => {
    if (step === activeStep) {
      return "text-black";
    }
    if (step < activeStep) {
      return "text-gray-500 opacity-60";
    }
    return "text-gray-400 opacity-40";
  };

  return (
    <div className="space-y-9 text-sm">
      <div>
        <h1 className="text-2xl">Customer Journey</h1>
        <br />
        <p>
          Users can click through various Edge Locations. <br /> skip steps at
          their discretion and update their deployment status <br />
          seamlessly with the 'Run' button or progress using the 'Next' button.
        </p>
      </div>

      <div className="bg-white p-4 space-y-6 font-th dark:bg-gray-800">
        <div>
          <p className="text-2xl">Selected Branch:</p>
        </div>
        <div className="text-[12px] flex items-center justify-between">
          {[...Array(13)].map((_, index) => {
            const stepNumber = index + 1;
            const stepLabels = [
              "Planned",
              "Spectrum Applied",
              "Spectrum Approved",
              "IMSI List Applied",
              "IMSI List Approved",
              "Shipped",
              "Edge Location Available",
              "Infrastructure Deployed",
              "RAN Deployed",
              "Core Config Ready",
              "SIM Provisioned",
              "SIM Activated",
              "EasyDeploy Ready",
            ];
            return (
              <div
                key={stepNumber}
                className="flex flex-col items-center space-y-2 "
              >
                <div className={getNumberStyle(stepNumber)}>
                  <span>{stepNumber}</span>
                </div>
                {[3, 5, 7, 12].includes(stepNumber) && (
                  <GoPerson
                    className={stepNumber === activeStep ? "" : "opacity-40"}
                  />
                )}
                <p className={`whitespace-nowrap ${getTextStyle(stepNumber)} dark:text-white`}>
                  {stepLabels[stepNumber - 1]}
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <p className="text-sm">Planned Step for</p>
          <div className="flex space-x-5">
            <Button className="bg-purple-700 text-white hover:bg-purple-900">
              <IoIosArrowRoundForward /> Skip
            </Button>
            <Button
              className="bg-purple-700 text-white hover:bg-purple-900"
              onClick={handleNext}
              disabled={activeStep === totalSteps}
            >
              <IoIosArrowForward /> Next
            </Button>
          </div>
          <div>
            <Button className="bg-purple-700 hover:bg-purple-900  text-white">
              <FaCheck /> Save
            </Button>
          </div>
        </div>
      </div>

      <div className=" space-y-7">
        <Button className="bg-purple-700 text-white hover:bg-purple-900">
          <FaPlus /> Add Edge Location
        </Button>

        <div className="bg-gray-100 h-[60px] dark:bg-gray-800"> <HiDotsHorizontal/></div>
      </div>
    </div>
  );
}
