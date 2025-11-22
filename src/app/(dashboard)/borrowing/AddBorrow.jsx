import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/16/solid"

export default function AddBorrow() {
  const router = useRouter()
  const [form, setForm] = useState({
    toolName: "",
    borrower: "",
    borrowDate: "",
    returnDate: "",
    location: "",
    tools_keeper: "",
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/borrowing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Gagal menambah data")
      alert("✅ Data peminjaman berhasil ditambahkan!")

      router.push("/borrowing")
    } catch (error) {
      console.error(error)
      alert("❌ Terjadi kesalahan saat menyimpan data.")
    }
  }

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-xl max-w-4xl mx-auto my-8 shadow-2xl">
        {/* Header */}
        <div className="p-6 space-y-1 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            📦 Tambah Peminjaman Tools
          </h1>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tool Name */}
              <div className="space-y-2">
                <label 
                  htmlFor="toolName"
                  className="text-sm font-medium leading-none"
                >
                  Nama Tools
                </label>
                <input
                  id="toolName"
                  type="text"
                  placeholder="Masukkan nama tools"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.toolName}
                  onChange={(e) => setForm({ ...form, toolName: e.target.value })}
                  required
                />
              </div>

              {/* Borrower Name */}
              <div className="space-y-2">
                <label 
                  htmlFor="borrower"
                  className="text-sm font-medium leading-none"
                >
                  Nama Peminjam
                </label>
                <input
                  id="borrower"
                  type="text"
                  placeholder="Masukkan nama peminjam"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.borrower}
                  onChange={(e) => setForm({ ...form, borrower: e.target.value })}
                  required
                />
              </div>

              {/* Borrow Date */}
              <div className="space-y-2">
                <label 
                  htmlFor="borrowDate"
                  className="text-sm font-medium leading-none"
                >
                  Tanggal Pinjam
                </label>
                <input
                  id="borrowDate"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.borrowDate}
                  onChange={(e) => setForm({ ...form, borrowDate: e.target.value })}
                  required
                />
              </div>

              {/* Return Date */}
              <div className="space-y-2">
                <label 
                  htmlFor="returnDate"
                  className="text-sm font-medium leading-none"
                >
                  Tanggal Kembali
                </label>
                <input
                  id="returnDate"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.returnDate}
                  onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                  disabled
                />
              </div>

              {/* Tools Keeper */}
              <div className="space-y-2">
                <label 
                  htmlFor="tools_keeper"
                  className="text-sm font-medium leading-none"
                >
                  Tools Keeper
                </label>
                <select
                  id="toolsKeeper"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.toolsKeeper}
                  onChange={(e) => setForm({ ...form, toolsKeeper: e.target.value })}
                  required
                >
                  <option value="" disabled>Select tools keeper</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label 
                  htmlFor="location"
                  className="text-sm font-medium leading-none"
                >
                  Location
                </label>
                <select
                  id="location"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                >
                  <option value="" disabled>Select location</option>
                  <option value="MSF">MSF</option>
                  <option value="AST & KAMAZ">AST & KAMAZ</option>
                  <option value="TYRE">TYRE</option>
                  <option value="WS KLAWAS">WS KLAWAS</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="">
              <button
                type="submit"
                className="items-end min-w-full border p-3 shadow-2xl bg-gray-400 text-white rounded-md hover:bg-gray-500  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-2"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
