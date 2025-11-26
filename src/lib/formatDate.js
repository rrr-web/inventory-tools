export const validateApiData = (data) => {
  if (!Array.isArray(data)) {
    console.error("Data harus berupa array");
    return [];
  }

  return data.map((item) => {
    //Format semua field tanggal ke yyyy-MM-dd
    const dateFields = ['createdAt', 'borrowDate', 'returnDate', 'brokenDate']; // ✅ Tambahkan field tanggal lainnya
    
    const formattedItem = { ...item };
    
    dateFields.forEach(field => {
      if (item[field]) {
        const date = new Date(item[field]);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          formattedItem[field] = `${year}-${month}-${day}`;
        } else {
          formattedItem[field] = "";
        }
      }
    });

    return formattedItem;
  });
};