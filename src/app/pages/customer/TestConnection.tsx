// src/app/pages/customer/TestConnection.tsx
import { useEffect, useState } from 'react';

export function TestConnection() {
  const [data, setData] = useState<any[]>([]);
  const [status, setStatus] = useState("Đang kết nối...");

  useEffect(() => {
    // Gọi thử vào server 5000
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(result => {
        setStatus("✅ Kết nối thành công!");
        setData(result);
      })
      .catch(err => {
        setStatus("❌ Lỗi kết nối: " + err.message);
      });
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Trang Kiểm Tra Kết Nối</h1>
      <p className="text-lg font-bold text-blue-600 mb-6">{status}</p>

      <div className="border p-4 rounded bg-gray-50 max-w-lg mx-auto text-left">
        <h3 className="font-bold border-b pb-2 mb-2">Dữ liệu từ MongoDB:</h3>
        {data.length === 0 ? (
           <p className="text-gray-500">Chưa có dữ liệu (hoặc đang tải)...</p>
        ) : (
          <pre className="text-sm bg-gray-800 text-white p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}