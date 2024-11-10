import React, { useState } from "react";
import { OCRResponse } from "../../modules/ocrSchema";
import { CustomerProps } from "../../modules/customerSchema";
interface CustomerInfoProps {
  customerData: OCRResponse;
  onDataUpdate: (updatedData: CustomerProps) => void;
}
const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerData,
  onDataUpdate,
}) => {
  const [estimate, setEstimate] = useState<string>("");
  const [updatedData, setUpdatedData] = useState<CustomerProps>({
    Pic: `data:image/jpeg;base64,${customerData.face}`,
    Id_Number: customerData.id_number,
    NameTitle: "",
    Name_Th: customerData.th_name,
    Name_Eng: `${customerData.en_fname} ${customerData.en_lname}`,
    Address: customerData.address,
    birthdate: customerData.th_dob,
    estimate: estimate,
  });
  const handleEstimateChange = (color: "green" | "yellow" | "red") => {
    const newData = { ...updatedData, estimate: color };
    setEstimate(color);
    setUpdatedData(newData);
    onDataUpdate(newData);
  };

  return (
    <div className="flex flex-col items-center p-2 space-y-2">
      <h2 className="text-xl font-bold ">ขั้นตอนที่ 2 ข้อมูล</h2>
      <div className="max-w-md w-full space-y-8 p-4 bg-white rounded-xl shadow-lg">
        <div className="grid gap-8 grid-cols-1">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row items-center">
              <h2 className="font-semibold text-lg mr-auto">Customer Info</h2>
            </div>
            <div className="mt-5">
              <div className="form">
                <div className="md:space-y-2 mb-3">
                  <label className="text-xs font-semibold text-gray-600 py-2">
                    รูปถ่ายบัตรประชาชน
                    <abbr className="hidden" title="required">
                      *
                    </abbr>
                  </label>
                  <div className="flex items-center justify-center py-6">
                    <div className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                      <img
                        className="w-12 h-12 mr-4 object-cover"
                        src={updatedData.Pic}
                        alt="Avatar Upload"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    เลขบัตรประชาชน <abbr title="required">*</abbr>
                  </label>
                  <input
                    defaultValue={updatedData.Id_Number || "เลขบัตรประชาชน"}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required
                    type="text"
                    name="integration[shop_name]"
                    id="integration_shop_name"
                  />
                </div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    คำนำหน้าชื่อ <abbr title="required">*</abbr>
                  </label>
                  <input
                    defaultValue={updatedData.NameTitle || "คำนำหน้าชื่อ"}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    required
                    type="text"
                    name="integration[shop_email]"
                    id="integration_shop_email"
                  />
                </div>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  ชื่อ-นามสกุล ภาษาไทย <abbr title="required">*</abbr>
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <div className="flex">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </div>
                  <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px  border  h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                    defaultValue={updatedData.Name_Th || "ชื่อ-นามสกุล ภาษาไทย"}
                  />
                </div>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  ชื่อ-นามสกุล ภาษาอังกฤษ <abbr title="required">*</abbr>
                </label>
                <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                  <div className="flex">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </div>
                  <input
                    type="text"
                    className="flex-shrink flex-grow flex-auto leading-normal w-px  border  h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                    defaultValue={
                      updatedData.Name_Eng || "ชื่อ-นามสกุล ภาษาอังกฤษ"
                    }
                  />
                </div>
              </div>
              <div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    ที่อยู่ <abbr title="required">*</abbr>
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <div className="flex">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </div>
                    <input
                      type="text"
                      className="flex-shrink flex-grow flex-auto leading-normal w-px  border  h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                      defaultValue={updatedData.Address || "ที่อยู่"}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-3 space-y-2 w-full text-xs">
                  <label className="font-semibold text-gray-600 py-2">
                    วัน/เดือน/ปีเกิด <abbr title="required">*</abbr>
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <div className="flex">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </div>
                    <input
                      type="text"
                      className="flex-shrink flex-grow flex-auto leading-normal w-px  border  h-10 border-grey-light rounded-lg  px-3 relative focus:border-blue focus:shadow"
                      defaultValue={updatedData.birthdate || "วัน/เดือน/ปีเกิด"}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  ผลการสำรวจ
                </label>
                <div className="flex space-x-3">
                  <button
                    className={`w-8 h-8 rounded-full bg-green-500 ${
                      estimate === "green"
                        ? "ring-2 ring-offset-2 ring-green-700"
                        : ""
                    }`}
                    onClick={() => handleEstimateChange("green")}
                  ></button>
                  <button
                    className={`w-8 h-8 rounded-full bg-yellow-300 ${
                      estimate === "yellow"
                        ? "ring-2 ring-offset-2 ring-yellow-300"
                        : ""
                    }`}
                    onClick={() => handleEstimateChange("yellow")}
                  ></button>
                  <button
                    className={`w-8 h-8 rounded-full bg-red-700 ${
                      estimate === "red"
                        ? "ring-2 ring-offset-2 ring-red-700"
                        : ""
                    }`}
                    onClick={() => handleEstimateChange("red")}
                  ></button>
                </div>
              </div>

              <p className="text-xs text-red-500 text-right my-3">
                Required fields are marked with an asterisk{" "}
                <abbr title="Required field">*</abbr>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
