import React from "react";
import { CustomerProps } from "@/modules/customerSchema";

interface CheckInfoProps {
  customerData: CustomerProps;
}

const CheckInfo: React.FC<CheckInfoProps> = ({ customerData }) => {
  return (
    <div className="flex flex-col items-center p-2 space-y-2">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold text-center">
          ขั้นตอนที่ 3 ตรวจสอบข้อมูล
        </h2>
      </div>
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-semibold">ข้อมูลลูกค้า</h3>
        <div className="flex items-center space-x-4">
          <img
            className="w-24 h-24 object-cover rounded-full"
            src={customerData.Pic}
            alt="Avatar Upload"
          />
          <div className="space-y-2">
            <p>
              <strong>เลขบัตรประชาชน:</strong> {customerData.Id_Number}
            </p>
            <p>
              <strong>คำนำหน้าชื่อ:</strong> {customerData.NameTitle}
            </p>
            <p>
              <strong>ชื่อ-นามสกุล ภาษาไทย:</strong> {customerData.Name_Th}
            </p>
            <p>
              <strong>ชื่อ-นามสกุล ภาษาอังกฤษ:</strong> {customerData.Name_Eng}
            </p>
            <p>
              <strong>ที่อยู่:</strong> {customerData.Address}
            </p>
            <p>
              <strong>วันเกิด:</strong> {customerData.birthdate}
            </p>
            <p>
              <strong>การประเมินผล:</strong> {customerData.estimate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInfo;
