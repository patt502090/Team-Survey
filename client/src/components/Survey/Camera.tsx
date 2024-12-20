"use client";
import { useState, useRef, useEffect } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PartyModeIcon from "@mui/icons-material/PartyMode";
import axios from "axios";
import { OCRResponse, ocrSchema } from "../../modules/ocrSchema";
import conf from "@/conf/main";
interface CameraProps {
  onOCRProcessed: (data: OCRResponse) => void;
}
export default function Camera({ onOCRProcessed }: CameraProps) {
  const [image, setImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async (facingMode: "user" | "environment") => {
    stopStream();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert(
        "Your browser does not support camera access or is not using HTTPS."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      const error = err as Error;
      console.error("Cannot access camera:", error);
      if (error.name === "NotAllowedError") {
        //setShowPermissionPopup(true);
      } else {
        alert("Cannot access the camera. Please check your camera settings.");
      }
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const capturedImage = canvasRef.current.toDataURL("image/png");
        setImage(capturedImage);
        processOCR(capturedImage);
      }
    }
  };

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("ไม่พบไฟล์ที่เลือก");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("กรุณาเลือกไฟล์ภาพที่เป็น .JPG, .JPEG หรือ .PNG เท่านั้น");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setImage(base64);

      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const ocrResponse = await uploadToOCR(formData);
        console.log("OCR Response:", ocrResponse);

        const ocrData = ocrSchema.parse(ocrResponse);
        onOCRProcessed(ocrData);
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการประมวลผล OCR");
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    startCamera(facingMode);
    return stopStream;
  }, []);

  const uploadToOCR = async (formData: FormData) => {
    try {
      const response = await axios.post(conf.apiAiforthai, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Apikey: conf.apiKeyforAiforthai,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          if (response.status === 403) {
            alert(
              "ไม่สามารถเข้าถึง API ได้ กรุณาตรวจสอบ API Key หรือการอนุญาต"
            );
          } else {
            console.error("Error details:", response.data);
          }
        } else {
          console.error("No response from API");
        }
      } else {
        console.error("OCR processing error:", error);
      }
      throw error;
    }
  };
  const toggleCamera = () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newFacingMode);
    startCamera(newFacingMode);
  };
  const base64ToBlob = (base64: string, contentType = "image/png") => {
    const byteString = atob(base64.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: contentType });
  };

  const processOCR = async (image: string) => {
    try {
      const blob = base64ToBlob(image);
      const formData = new FormData();
      formData.append("file", blob, "capturedImage.png");

      const ocrResponse = await uploadToOCR(formData);
      console.log("OCR Response:", ocrResponse);

      const ocrData = ocrSchema.parse(ocrResponse);
      onOCRProcessed(ocrData);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการประมวลผล OCR");
    }
  };

  return (
    <div className="flex flex-col items-center p-2 space-y-4">
      <h2 className="text-xl font-bold ">ขั้นตอนที่ 1 ถ่ายรูปบัตรประชาชน</h2>

      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg max-w-md bg-gray-200"
      />

      <div className="flex justify-center space-x-6 mt-4">
        <label htmlFor="file-upload" className="cursor-pointer text-center">
          <AddAPhotoIcon
            fontSize="large"
            className="text-black hover:text-gray-700"
          />
          <div className="mt-2 text-sm">เลือกภาพ</div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={uploadPhoto}
            className="hidden"
          />
        </label>

        <button
          onClick={takePhoto}
          className="text-center flex flex-col items-center"
        >
          <CameraAltIcon
            fontSize="large"
            className="text-black hover:text-gray-700"
          />
          <div className="mt-2 text-sm">ถ่ายรูป</div>
        </button>

        <button
          onClick={toggleCamera}
          className="text-center flex flex-col items-center"
        >
          <PartyModeIcon
            fontSize="large"
            className="text-black hover:text-gray-700"
          />
          <div className="mt-2 text-sm">สลับกล้อง</div>
        </button>
      </div>

      {image && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <img
            src={image}
            alt="Preview"
            className="w-full h-auto max-w-md rounded-lg"
          />
        </div>
      )}

      {showPermissionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p>Please allow camera access to use this feature.</p>
            <button
              onClick={() => {
                setShowPermissionPopup(false);
                startCamera(facingMode);
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
