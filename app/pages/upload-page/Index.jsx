"use client";

import Link from "next/link";
import { anton } from "@/ui/fonts";
import { useState, useRef, useActionState } from "react";
import { UploadCloud, XCircle, FileText } from "lucide-react";
import { uploadDocument } from "@/lib/action";
import { acceptedFileTypes } from "@/utils/filetype";

const UploadPage = ({ subjectsList }) => {
  // State chỉ lưu trữ File object
  const [selectedFile, setSelectedFile] = useState(null); // { file: File }
  const fileInputRef = useRef(null); // Ref cho input file ẩn
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState("");
  const [state, action] = useActionState(uploadDocument, undefined);
  const [subjectInput, setSubjectInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState(subjectsList);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const title = e.target.title.value;
    const description = e.target.description.value;
    const subjectName = e.target.subject_name.value;

    if (!selectedFile) {
      setFileError("Vui lòng chọn một tệp để tải lên.");
      return;
    }

    if (!handleFileValidation(selectedFile.file)) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("documentFile", selectedFile.file);
    formData.append("subjectName", subjectName);
    action(formData);
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    setSubjectInput(value);
    setFilteredSubjects(
      subjectsList.filter((subject) =>
        subject.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
    setDropdownOpen(true);
  };

  const handleSubjectSelect = (name) => {
    setSubjectInput(name);
    setDropdownOpen(false);
  };

  const handleSubjectFocus = () => {
    setFilteredSubjects(subjectsList);
    setDropdownOpen(true);
  };

  const handleSubjectBlur = () => {
    setTimeout(() => setDropdownOpen(false), 100);
  };

  return (
    <section
      className={`mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12`}
    >
      <h1
        className={`${anton.className} text-primary mb-6 text-center text-3xl font-extrabold`}
      >
        Tải lên tài liệu
      </h1>
      <form
        className="space-y-5 rounded-lg bg-white p-8 shadow"
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
            rows="4"
            className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
            placeholder="Nhập mô tả chi tiết về tài liệu"
          ></textarea>
        </div>

        {state?.error.description && (
          <div className="text-sm text-red-600">{state.error.description}</div>
        )}

        <div>
          <label
            htmlFor="subject_name"
            className="mb-1 block text-base font-semibold text-gray-800"
          >
            Môn học
          </label>
          <div className="relative">
            <input
              id="subject_name"
              name="subject_name"
              type="text"
              autoComplete="off"
              required
              value={subjectInput}
              onChange={handleSubjectChange}
              onFocus={handleSubjectFocus}
              onBlur={handleSubjectBlur}
              className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 text-base focus:ring-2 focus:outline-none"
              placeholder="Nhập môn học"
            />
            {dropdownOpen && filteredSubjects.length > 0 && (
              <ul className="absolute bottom-full z-10 mb-1 max-h-40 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {filteredSubjects.map((subject) => (
                  <li
                    key={subject.id}
                    className="hover:bg-primary/10 cursor-pointer px-3 py-1.5 text-sm"
                    onMouseDown={() => handleSubjectSelect(subject.name)}
                  >
                    {subject.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

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
                required
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
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
          className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-base font-bold text-white transition"
        >
          Tải lên
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
  );
};

export default UploadPage;
