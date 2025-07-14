"use client";

import './globals.css';
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/utils/supabaseClient";
import { useTheme } from "next-themes";

type DataSensor = {
  id: number;
  ph: number;
  suhu: number;
  tds: number;
  kekeruhan: number;
  created_at: string;
};

export default function HomePage() {
  const [latestData, setLatestData] = useState<DataSensor | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("capstone")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setLatestData(data?.[0] || null);
      }

      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-4 sm:px-6 md:px-12 py-6 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Data Monitoring Air
      </h1>

      {/* Tabel Data Responsif */}
      <div className="overflow-x-auto w-full max-w-4xl mb-10">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300 dark:border-gray-700 text-center shadow-md rounded text-sm">
          <thead className="bg-gray-200 dark:bg-gray-800 sticky top-0 z-10">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">pH</th>
              <th className="p-3 border">Suhu (°C)</th>
              <th className="p-3 border">TDS (ppm)</th>
              <th className="p-3 border">Kekeruhan (NTU)</th>
              <th className="p-3 border">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-6 text-gray-500 text-center">
                  Memuat data...
                </td>
              </tr>
            ) : latestData ? (
              <tr className="bg-gray-100 dark:bg-gray-900">
                <td className="p-3 border">{latestData.id}</td>
                <td className="p-3 border">{latestData.ph}</td>
                <td className="p-3 border">{latestData.suhu}</td>
                <td className="p-3 border">{latestData.tds}</td>
                <td className="p-3 border">{latestData.kekeruhan}</td>
                <td className="p-3 border">
                  {new Date(latestData.created_at).toLocaleString()}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-gray-500 text-center">
                  Tidak ada data tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Section Author */}
      <div className="w-full max-w-4xl text-center mt-10 mb-8">
        <h2 className="text-xl font-semibold mb-4">Author</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <Image
              src="/univ.png"
              alt="Logo Universitas"
              width={100}
              height={100}
              className="rounded-lg"
            />
            <p className="mt-2 text-sm">Universitas</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/author1.png"
              alt="Author 1"
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mt-2 text-sm">Pencipta 1</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/author2.png"
              alt="Author 2"
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="mt-2 text-sm">Pencipta 2</p>
          </div>
        </div>
      </div>

      {/* Tombol Ganti Tema */}
      {mounted && (
        <button
          className="mb-4 px-4 py-2 text-sm border rounded transition-all dark:border-white border-black hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      )}
    </main>
  );
}
