"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/cropImage";
import { X, Check } from "lucide-react";

const ModalCropImage = ({ open, image, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImg = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImg);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative w-[90%] max-w-md rounded-2xl bg-white p-4 shadow-lg">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cắt ảnh đại diện</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Crop Area */}
        <div className="relative h-64 w-full bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="accent-primary w-full"
          />

          <div className="flex w-full justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              onClick={handleCrop}
              className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold text-white"
            >
              <Check className="h-4 w-4" />
              Lưu ảnh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCropImage;
