"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState, useContext } from "react";
import Camera from "@/components/Survey/Camera";
import CustomerInfo from "@/components/Survey/CustomerInfo";
import CheckInfo from "@/components/Survey/CheckInfo";
import { OCRResponse } from "../../../modules/ocrSchema";
import { CustomerProps } from "@/modules/customerSchema";
import { useRouter } from "next/navigation";
import ax from "@/conf/ax";
import conf from "@/conf/main";
import { AuthContext } from "@/contexts/Auth.context";

const steps = ["ถ่ายรูป", "ข้อมูล", "ตรวจสอบข้อมูล"];

export default function HorizontalLinearAlternativeLabelStepper() {
  const router = useRouter();
  const context = useContext(AuthContext);
  const ContextState = context ? context.state : null;
  console.log(ContextState);
  const [activeStep, setActiveStep] = useState(0);
  const [customerData, setCustomerData] = useState<OCRResponse | null>(null);
  const [customerDatatoCheck, setCustomerDatatoCheck] =
    useState<CustomerProps | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsFinished(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOCRProcessed = (ocrData: OCRResponse) => {
    setCustomerData(ocrData);
  };
  const handleCustomerDataUpdate = (updatedData: CustomerProps) => {
    setCustomerDatatoCheck(updatedData);
  };

  const PostCustomer = async () => {
    try {
      if (!customerDatatoCheck) return;

      const requestData = {
        data: {
          Id_Number: customerDatatoCheck.Id_Number,
          NameTitle: customerDatatoCheck.NameTitle,
          Name_Th: customerDatatoCheck.Name_Th,
          Name_Eng: customerDatatoCheck.Name_Eng,
          Address: /*customerDatatoCheck.Address*/ "2024-11-10",
          birthdate: customerDatatoCheck.birthdate,
          // Assessor: ContextState?.user?.documentId, ตรงนี้ๆ
          // business_with: ContextState?.user?.r,
          estimate: customerDatatoCheck.estimate,
          sub_district: customerDatatoCheck.Address,
          Pic: customerDatatoCheck.Pic, // อาจต้องคอมเม้นตรงนี้ไปก่อนถ้าจะใช้ ax.post
        },
      };
      console.log(requestData);

      // await ax.post(`${conf.apiUrlPrefix}/customers`, requestData);
      setShowPopup(true);
    } catch (error) {
      console.error("Error posting customer data:", error);
    }
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
            {/* <Camera /> */}
            <Camera onOCRProcessed={handleOCRProcessed} />
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
            {customerData && (
              <CustomerInfo
                customerData={customerData}
                onDataUpdate={handleCustomerDataUpdate}
              />
            )}
            {/* <CustomerInfo /> */}
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
            {customerDatatoCheck && (
              <CheckInfo customerData={customerDatatoCheck} />
            )}

            <div className="mt-auto flex space-x-4 justify-between px-4 mb-4">
              {activeStep <= steps.length - 1 && (
                <button
                  onClick={() => {
                    handleNext();
                    PostCustomer();
                  }}
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
            {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg text-center">
                  <p>Created successfully</p>
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      router.push("/dashboard");
                    }}
                    className="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Ok, Thank!
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Box>
  );
}
