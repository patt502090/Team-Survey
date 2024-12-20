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
  console.log("ck", ContextState);
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
          NameTitle: "Mr." /* customerDatatoCheck.NameTitle */,
          Name_Th: customerDatatoCheck.Name_Th,
          Name_Eng: customerDatatoCheck.Name_Eng,
          Address: customerDatatoCheck.Address,
          birthdate: "2024-11-10",
          Assessor: ContextState?.user?.documentId,
          business_with: ContextState?.user?.my_team?.documentId,
          estimate: customerDatatoCheck.estimate,
          sub_district: "z0djf7s3ekitgvsw6afp9ctq",
          // Pic: customerDatatoCheck.Pic, // อาจต้องคอมเม้นตรงนี้ไปก่อนถ้าจะใช้ ax.post
        },
      };
      // http://localhost:1337/api/sub-districts

      //   {"data":{
      //     "Id_Number": "123456789dasdsa0123",
      //     "NameTitle": "Mr.",
      //     "Name_Th": "มไย ตัวอย่างdddd นามรอง สาธิตสกุล",
      //     "Name_Eng": "Sample MiddleNameSatitsakul",
      //     "Address": "2024-11-10",
      //     "birthdate": "2024-11-10",
      //     "Assessor": "p1e0ov8y5d5a72dwe1rd34fk",
      //     "business_with": "befvxwfev1kz1t6fwf4hmb1e",
      //     "estimate": "green",
      //     "sub_district": "z0djf7s3ekitgvsw6afp9ctq" z0djf7s3ekitgvsw6afp9ctq
      // }}
      console.log("yuy", requestData);

      await ax.post(`${conf.apiUrlPrefix}/customers`, requestData);
      
      setShowPopup(true);
    } catch (error) {
      console.error("Error posting customer data:", error);
    }
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className=" mt-32 sm:mt-8 md:mt-10 lg:mt-12 md:ml-32 "
    >
      <Stepper activeStep={activeStep} alternativeLabel className="">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="step-content flex flex-col h-full justify-between ">
        {activeStep === 0 && (
          <div>
            {/* <Camera /> */}
            <Camera onOCRProcessed={handleOCRProcessed} />
            <div className="mt-auto items-center flex flex-row  justify-center p-2 space-x-2">
              <button
                onClick={handleNext}
                disabled={!customerData} //มันต้องรอตรงนี้นานนิดหน่อย
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="mt-auto items-center flex flex-row  justify-center p-2 space-x-2">
              {activeStep < steps.length - 1 && (
                <button
                  onClick={handleNext}
                  disabled={!customerDatatoCheck?.estimate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ถัดไป
                </button>
              )}
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
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

            <div className="mt-auto items-center flex flex-row  justify-center p-2 space-x-2">
              {activeStep <= steps.length - 1 && (
                <button
                  onClick={() => {
                    handleNext();
                    PostCustomer();
                  }}
                  disabled={!customerDatatoCheck}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ถัดไป
                </button>
              )}
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
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
