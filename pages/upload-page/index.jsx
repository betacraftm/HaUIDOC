"use client";

import Link from "next/link";
import { anton } from "components/fonts";
import { useState, useRef, useActionState, startTransition } from "react";
import { UploadCloud, XCircle, FileText } from "lucide-react";
import { uploadDocument } from "@/lib/action";
import { acceptedFileTypes } from "@/utils/utils";
import DropDown from "components/DropDown";

const UploadPage = ({ subjectsList }) => {
  // State chỉ lưu trữ File object
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [state, action, isPending] = useActionState(uploadDocument, undefined);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFileValidation = (file) => {
    if (!file) return false;

    if (!acceptedFileTypes.includes(file.type)) {
      setFileError("Chỉ chấp nhận các tệp PDF, DOC, hoặc DOCX.");
      return false;
    }

    // Kiểm tra kích thước tệp (ví dụ: tối đa 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      setFileError("Kích thước tệp không được vượt quá 5MB.");
      return false;
    }

    setFileError(""); // Xóa lỗi nếu tệp hợp lệ
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && handleFileValidation(file)) {
      setSelectedFile({ file }); // Chỉ lưu file, không cần previewUrl
    } else {
      setSelectedFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && handleFileValidation(file)) {
      setSelectedFile({ file }); // Chỉ lưu file, không cần previewUrl
    } else {
      setSelectedFile(null);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setFileError("Vui lòng chọn một tệp để tải lên.");
      return;
    }

    if (!handleFileValidation(selectedFile.file)) {
      return;
    }
    const subjectName = e.target.subject_name.value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("documentFile", selectedFile.file);
    formData.append("subjectName", subjectName);

    startTransition(async () => {
      action(formData);
      setSelectedFile(null);
      setTitle("");
      setDescription("");
      setIsSubmit(!isSubmit);
    });
  };

  return (
    <div className="bg-gray-50">
      <section
        className={`mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12`}
      >
        <h1
          className={`${anton.className} text-primary mb-6 text-center text-3xl font-extrabold`}
        >
          Tải lên tài liệu
        </h1>
        <form
          className="space-y-5 rounded-2xl bg-white p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* Trường Tiêu đề */}
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Tiêu đề
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập tiêu đề tài liệu"
              accept=".pdf, application/pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>

          {state?.error.title && (
            <div className="text-sm text-red-600">{state.error.title}</div>
          )}

          {/* Trường Mô tả */}
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows="4"
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập mô tả chi tiết về tài liệu"
            ></textarea>
          </div>

          {state?.error.description && (
            <div className="text-sm text-red-600">
              {state.error.description}
            </div>
          )}

          {/* Input chọn môn học */}
          <DropDown
            title={"Môn học"}
            list={subjectsList}
            id={"subject_name"}
            placeholder={"Nhập môn học"}
            isSubmit={isSubmit}
          />

          {state?.error.subject && (
            <div className="text-sm text-red-600">{state.error.subject}</div>
          )}

          {/* Input Tải file */}
          <div>
            <label
              htmlFor="documentFile"
              className="mb-1 block text-base font-semibold text-gray-800"
            >
              Tải tệp lên
            </label>
            {!selectedFile ? (
              <div
                className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition duration-200 ${
                  isDragging
                    ? "border-primary bg-primary/5" // Màu sắc khi đang kéo
                    : "hover:border-primary border-gray-300" // Màu sắc mặc định và hover bình thường
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  id="documentFile"
                  name="documentFile"
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="sr-only"
                />
                <UploadCloud
                  className={`mx-auto mb-2 h-12 w-12 ${
                    isDragging ? "text-primary" : "text-gray-400"
                  }`}
                />
                <p className="font-medium text-gray-600">
                  Kéo và thả tệp vào đây, hoặc{" "}
                  <span className="text-primary font-bold">chọn tệp</span>
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Hỗ trợ: PDF, DOCX (tối đa 10MB)
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center overflow-hidden">
                    {/* Sử dụng icon chung hoặc logic icon đơn giản */}
                    <FileText className="mr-2 h-5 w-5 flex-shrink-0 text-gray-500" />
                    <span className="truncate font-medium text-gray-800">
                      {selectedFile.file.name}
                    </span>
                    <span className="ml-2 flex-shrink-0 text-sm text-gray-500">
                      ({(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-2 text-red-500 transition hover:text-red-700"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {fileError && (
              <p className="mt-2 text-sm text-red-500">{fileError}</p>
            )}
          </div>

          {/* Nút Tải lên */}
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-base font-bold text-white transition disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang tải lên...
              </>
            ) : (
              "Tải lên"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-base text-gray-700">
          <Link
            href="/"
            className="text-secondary hover:text-secondary/80 underline"
          >
            Quay lại trang chủ
          </Link>
        </p>
      </section>
    </div>
  );
};

export default UploadPage;
