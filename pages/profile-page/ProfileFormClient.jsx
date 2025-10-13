"use client";

import { updateUserProfile } from "@/lib/action";
import ModalCropImage from "components/ModalCropImage";
import ProfileDropDown from "components/ProfileDropdown";
import { UploadCloud, User2, XCircle } from "lucide-react";
import { startTransition, useActionState, useRef, useState } from "react";

const ProfileFormClient = ({ user, majors }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const [majorId, setMajorId] = useState(
    user?.major_id || user?.majors?.id || "",
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [state, formAction, isPending] = useActionState(
    updateUserProfile,
    undefined,
  );

  const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];

  const validateFile = (file) => {
    if (!file) return false;
    if (!acceptedTypes.includes(file.type)) {
      setFileError("Chỉ chấp nhận file PNG, JPG, JPEG, WEBP.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Kích thước tối đa là 5MB.");
      return false;
    }
    setFileError("");
    return true;
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f && validateFile(f)) {
      const imageURL = URL.createObjectURL(f);
      setPreviewURL(imageURL);
      setShowCropModal(true);
    } else {
      setSelectedFile(null);
    }
  };

  const handleCropDone = (croppedFile) => {
    setSelectedFile({ file: croppedFile });
    setShowCropModal(false);
    URL.revokeObjectURL(previewURL);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!majorId) {
      alert("Vui lòng chọn ngành học.");
      return;
    }

    const formData = new FormData();
    formData.append("majorId", majorId);
    if (selectedFile) formData.append("avatar", selectedFile.file);

    setIsSubmit(true);
    startTransition(() => formAction(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Ảnh đại diện
        </label>
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile.file)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : user?.image_url ? (
              <img
                src={user.image_url}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <User2 />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="sr-only"
            />
            <div className="flex gap-2">
              <label
                htmlFor="avatar"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Chọn ảnh</span>
              </label>
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  Xoá
                </button>
              )}
            </div>
            {fileError && (
              <div className="text-sm text-red-600">{fileError}</div>
            )}
          </div>
        </div>
      </div>

      {/* Major Dropdown */}
      <ProfileDropDown
        title="Chọn ngành học"
        id="major"
        list={majors}
        placeholder={user?.majors.name}
        value={
          majors.find((m) => m.id === majorId)?.name || user?.majors?.name || ""
        }
        setValue={setMajorId}
        isSubmit={isSubmit}
      />

      {/* Info (read-only) */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <p className="text-sm text-gray-500">Họ và tên</p>
          <p className="font-semibold">{user?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tên đăng nhập</p>
          <p className="font-semibold">{user?.username}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{user?.email}</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className={`w-full rounded-md px-4 py-2 font-semibold text-white ${isPending ? "bg-gray-400" : "bg-primary hover:bg-primary/90"}`}
      >
        {isPending ? "Đang lưu..." : "Lưu thay đổi"}
      </button>

      {state?.error && (
        <div className="text-center text-sm text-red-600">{state.error}</div>
      )}
      {state?.ok && (
        <div className="text-center text-sm text-green-600">
          Cập nhật thành công!
        </div>
      )}
      <ModalCropImage
        open={showCropModal}
        image={previewURL}
        onClose={() => setShowCropModal(false)}
        onCropDone={handleCropDone}
      />
    </form>
  );
};

export default ProfileFormClient;
