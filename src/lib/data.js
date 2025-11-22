export async function getData(endpoint) {
  try {
    // 1. Jika endpoint sudah full URL (http...), gunakan langsung
    if (endpoint.startsWith("http")) {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`Gagal fetch external: ${res.status}`);
      return await res.json();
    }

    // 2. LOGIKA PINTAR DETEKSI ENVIRONMENT
    let fullUrl;
    
    if (typeof window === "undefined") {
      // --- INI SERVER SIDE ---
      // Server TIDAK tahu domainnya sendiri, jadi butuh Base URL lengkap.
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      fullUrl = `${baseUrl}${endpoint}`;
      console.log(`[SERVER FETCH] ${fullUrl}`);
    } else {
      // --- INI CLIENT SIDE ---
      // Browser SUDAH tahu domainnya. Cukup gunakan path relatif (/api/...).
      // Menggunakan localhost di sini malah bisa bikin error CORS/Network.
      fullUrl = endpoint; 
      console.log(`[CLIENT FETCH] ${fullUrl}`);
    }

    // 3. Lakukan Fetch
    const res = await fetch(fullUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Gagal fetch ${fullUrl}: ${res.statusText}`);
    }

    return await res.json();

  } catch (err) {
    console.error("Error di getData:", err);
    return []; 
  }
}