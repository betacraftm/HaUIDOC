"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Download,
  Eye,
  Trash2,
  Shield,
  BarChart3,
} from "lucide-react";
import { getAdminStats, deleteDocument } from "@/lib/action";

const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const statsData = await getAdminStats();
      setStats(statsData.stats);
      setUsers(statsData.users);
      setDocuments(statsData.documents);
    } catch (error) {
      console.error("Failed to load admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (docId) => {
  if (confirm("Bạn có chắc muốn xóa tài liệu này?")) {
  try {
  await deleteDocument(docId);
  await loadAdminData(); // Refresh data
  } catch (error) {
  alert("Không thể xóa tài liệu");
  }
  }
  };

  

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={32} style={{ color: "var(--color-primary)" }} />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <div className="text-sm text-gray-500">HaUIDOC Administration</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {/* Content */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Documents
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalDocuments || 0}
                </p>
              </div>
              <FileText size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <Users size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Downloads
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalDownloads || 0}
                </p>
              </div>
              <Download size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Views
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalViews || 0}
                </p>
              </div>
              <Eye size={24} style={{ color: "var(--color-primary)" }} />
            </div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Document Management
            </h2>
          </div>
        <div className="overflow-x-auto">
            <table className="w-full">
        <thead className="bg-gray-50">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Title
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Author
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Views
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Downloads
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Actions
        </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        {documents.map((doc) => (
        <tr key={doc.id}>
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
        {doc.title}
        </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
        {doc.users?.name}
        </div>
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        {doc.view_count}
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        {doc.download_count}
        </td>
        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
        <button
        onClick={() => handleDeleteDocument(doc.id)}
        className="text-red-600 transition hover:text-red-900"
        >
        <Trash2 size={18} />
        </button>
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              User Management
            </h2>
          </div>
        <div className="overflow-x-auto">
        <table className="w-full">
        <thead className="bg-gray-50">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Major
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        Status
        </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        {users.map((user) => (
        <tr key={user.id}>
        <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
        {user.name}
        </div>
        <div className="text-sm text-gray-500">
        @{user.username}
        </div>
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        {user.email}
        </td>
        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
        {user.major?.name}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {user.role === 'admin' ? 'Admin' : 'User'}
          </span>
        </td>
        
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        </div>


        </div>
    </div>
  );
};

export default AdminPage;
