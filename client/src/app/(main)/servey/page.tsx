"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState } from "react";
import Camera from "@/components/Servey/Camera";

const steps = ["ถ่ายรูป", "ข้อมูล", "เช็คข้อมูล"];

export default function HorizontalLinearAlternativeLabelStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }} className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="step-content flex flex-col h-full justify-between">
        {activeStep === 0 && (
          <div>
            <Camera />
            <div className="mt-auto flex justify-between px-4 mb-4">
              <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mx-auto"
              >
                ถัดไป
              </button>
            </div>
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <div className="mt-auto flex space-x-4 justify-between px-4 mb-4">
              {activeStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mx-auto"
                >
                  ถัดไป
                </button>
              )}
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mx-auto"
                >
                  ย้อนกลับ
                </button>
              )}
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div className="mt-auto flex space-x-4 justify-between px-4 mb-4">
              {activeStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mx-auto"
                >
                  ถัดไป
                </button>
              )}
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mx-auto"
                >
                  ย้อนกลับ
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
