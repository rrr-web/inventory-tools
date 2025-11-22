export const validateApiData = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data harus berupa array");
    return [];
  }

  return data.map((item) => {
    // Format tanggal
    let formattedDate = "";
    if (item.createdAt) {
      const date = new Date(item.createdAt);
      formattedDate = !isNaN(date)
        ? date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "-";
    }

    return {
      ...item,        // kembalikan semua data lama
      createdAt: formattedDate, // overwrite tanggal dengan format yang sudah rapi
    };
  });
};
