"use client";

import { useState } from "react";
import { anton } from "public/fonts";
import { Heart, X, Copy, Check } from "lucide-react";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Receiver information
  const receiverInfo = {
    name: "Hoàng Ngọc Đạt",
    bank: "Viettinbank",
    accountNumber: "101877695764",
    bankCode: "ICB",
  };

  const handleDonate = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }
    setShowModal(true);
  };

  const generateVietQRUrl = () => {
    const baseUrl = `https://img.vietqr.io/image/${receiverInfo.bankCode}-${receiverInfo.accountNumber}-compact.jpg`;
    const params = new URLSearchParams({
      amount: amount,
      addInfo: note || "Donate to HaUIDOC",
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const QRModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[95vh] max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Heart className="h-6 w-6 text-red-600" />
          </div>
          <h2 className={`${anton.className} text-xl font-bold text-gray-900`}>
            Ủng Hộ HaUIDOC
          </h2>
          <p className="text-sm text-gray-600">Cảm ơn bạn đã ủng hộ dự án!</p>
        </div>

        {/* QR Code */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-lg border-2 border-gray-200 p-3">
            <img
              src={generateVietQRUrl()}
              alt="VietQR Code"
              className="h-48 w-48"
              onError={(e) => {
                console.error("QR Code failed to load");
                e.target.src = "/qr-placeholder.png"; // Fallback image
              }}
            />
          </div>
        </div>

        {/* Receiver Information */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Thông tin chuyển khoản:
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Người nhận:</span>
              <span className="font-medium">{receiverInfo.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ngân hàng:</span>
              <span className="font-medium">{receiverInfo.bank}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium">
                  {receiverInfo.accountNumber}
                </span>
                <button
                  onClick={() => copyToClipboard(receiverInfo.accountNumber)}
                  className="text-primary hover:text-primary/80"
                  title="Copy account number"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Số tiền:</span>
              <span className="text-primary font-medium">
                {parseInt(amount).toLocaleString("vi-VN")} VND
              </span>
            </div>

            {note && (
              <div className="flex items-start justify-between">
                <span className="text-gray-600">Nội dung:</span>
                <span className="max-w-32 text-right font-medium break-words">
                  {note}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="mb-1 font-medium">Hướng dẫn:</p>
          <ul className="space-y-1 text-xs">
            <li>• Mở app ngân hàng và quét mã QR</li>
            <li>• Hoặc chuyển khoản theo thông tin bên trên</li>
            <li>• Số tiền và nội dung sẽ được điền tự động</li>
          </ul>
        </div>

        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          className="bg-primary mt-6 w-full rounded-lg py-3 font-semibold text-white transition hover:opacity-90"
        >
          Đã Hiểu
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto min-h-screen max-w-7xl">
      {/* Header */}
      <div>
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="text-center">
            <h1
              className={`${anton.className} text-primary mb-2 text-3xl font-bold`}
            >
              Ủng hộ HaUIDOC
            </h1>
            <p className="text-gray-600">
              HaUIDOC là dự án phi lợi nhuận. Sự ủng hộ của bạn giúp chúng tôi
              duy trì và phát triển nền tảng tốt hơn!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-6 pb-12">
        <div className="ring-secondary rounded-2xl bg-white p-8 shadow-2xl ring-1">
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Số tiền (VND) *
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền bạn muốn ủng hộ"
                className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:outline-none"
                min="10000"
                step="1000"
              />
              <p className="mt-1 text-xs text-gray-500">
                Số tiền tối thiểu: 10,000 VND
              </p>
            </div>

            {/* Note Input */}
            <div>
              <label
                htmlFor="note"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Lời nhắn (không bắt buộc)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Để lại lời nhắn động viên hoặc góp ý..."
                rows={3}
                className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                maxLength={100}
              />
              <p className="mt-1 text-xs text-gray-500">
                {note.length}/100 ký tự
              </p>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={!amount || parseFloat(amount) < 10000}
              className="bg-primary w-full rounded-lg py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Heart className="mr-2 inline h-5 w-5" />
              Ủng Hộ Ngay
            </button>

            {/* Info */}
            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <p className="mb-2 font-medium">💝 Tại sao nên ủng hộ?</p>
              <ul className="space-y-1 text-xs">
                <li>• Giúp duy trì server và hosting</li>
                <li>• Phát triển thêm tính năng mới</li>
                <li>• Cải thiện trải nghiệm người dùng</li>
                <li>• Mở rộng cộng đồng tài liệu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <QRModal />}
    </div>
  );
};

export default DonatePage;
