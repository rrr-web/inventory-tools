"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToolPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const [form, setForm] = useState({
    quantity: 1,
    location: "",
  });

  // 🔍 Ambil data tools dari warehouse sesuai pencarian
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) return setSuggestions([]);
      const res = await fetch(`/api/warehouse/search?q=${encodeURIComponent(search)}`);
      const data = await res.json();
      setSuggestions(data);
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  // Saat user memilih tool dari list
  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setSearch(tool.toolName);
    setSuggestions([]);
  };

  // Untuk update field quantity dan location
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Fungsi simpan data ke API
  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedTool) return alert("Pilih alat terlebih dahulu");

    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: selectedTool.id,
          toolName: selectedTool.toolName,
          brand: selectedTool.brand || "",
          spec: selectedTool.spec || "",
          PN: selectedTool.PN || "",
          quantity: Number(form.quantity),
          location: form.location,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok || !data.success) throw new Error(data.error || "Gagal menambah data");
      alert("✅ Data alat berhasil ditambahkan!");

      router.push("/tools");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Terjadi kesalahan saat menyimpan data.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          📦 Tambah Stock Tools Room
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 🔍 Input Nama Tools */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Nama Tools</label>
            <input
              type="text"
              placeholder="Masukkan nama tools"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedTool(null);
              }}
              required
            />

            {/* Dropdown hasil pencarian */}
            {!selectedTool && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full rounded shadow max-h-40 overflow-y-auto">
                {suggestions.map((tool) => (
                  <li
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {tool.toolName} {tool.brand ? `- ${tool.brand}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
              value={selectedTool?.brand || ""}
            />
          </div>

          {/* PN */}
          <div>
            <label className="block text-sm font-medium mb-1">Part Number (PN)</label>
            <input
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
              value={selectedTool?.PN || ""}
            />
          </div>

          {/* Spec */}
          <div>
            <label className="block text-sm font-medium mb-1">Spesifikasi</label>
            <textarea
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
              value={selectedTool?.spec || ""}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah</label>
            <input
              name="quantity"
              type="number"
              min={1}
              placeholder="Masukkan jumlah"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <select
              name="location"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Pilih lokasi
              </option>
              <option value="Gudang">Gudang</option>
              <option value="Tools Room">Tools Room</option>
            </select>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.push("/tools")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ← Kembali
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
