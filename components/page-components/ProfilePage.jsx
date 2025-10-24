"use client";

// Removed server action imports - now using API routes
import ProfileDropDown from "components/ProfileDropdown";
import Image from "next/image";
import { useState } from "react";

const ProfileFormClient = ({ user, majors }) => {
  const [majorId, setMajorId] = useState(
    user?.major_id || user?.majors?.id || "",
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [state, setState] = useState(undefined);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!majorId) {
      alert("Vui lòng chọn ngành học.");
      return;
    }

    const formData = new FormData();
    formData.append("majorId", majorId);

    setIsPending(true);
    fetch("/api/user/profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setState(result);
        if (result.success) {
          setIsSubmit(true);
        }
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        setState({ error: "Đã xảy ra lỗi khi cập nhật hồ sơ" });
      })
      .finally(() => {
        setIsPending(false);
      });
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
            <Image
              src={user?.image_url || "/user.png"}
              alt="Avatar"
              className="h-full w-full object-cover"
              height={78}
              width={78}
            />
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
        <div className="text-center text-sm text-red-600">
          {typeof state.error === 'string' ? state.error : state.error?.message || 'Đã xảy ra lỗi'}
        </div>
      )}
      {state?.ok && (
        <div className="text-center text-sm text-green-600">
          Cập nhật thành công!
        </div>
      )}
    </form>
  );
};

export default ProfileFormClient;
