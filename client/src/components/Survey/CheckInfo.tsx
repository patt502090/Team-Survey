import React from "react";
import { CustomerProps } from "@/modules/customerSchema";

interface CheckInfoProps {
  customerData: CustomerProps;
}

const CheckInfo: React.FC<CheckInfoProps> = ({ customerData }) => {
  return (
    <div>
      <div className="flex flex-col items-center p-2 space-y-4">
        <h2 className="text-xl font-bold">ขั้นตอนที่ 3 ตรวจสอบข้อมูล</h2>
      </div>
      <div>
        <h2>ข้อมูลลูกค้า</h2>{" "}
        <img
          className="w-12 h-12 mr-4 object-cover"
          src={customerData.Pic}
          alt="Avatar Upload"
        />
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
  );
};

export default CheckInfo;
