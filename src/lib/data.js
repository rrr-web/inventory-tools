export async function getData(endpoint) {
  try {
    
    if (endpoint.startsWith("http")) {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`Gagal fetch external: ${res.status}`);
      return await res.json();
    }

  
    let fullUrl;
    
    if (typeof window === "undefined") {
     
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      fullUrl = `${baseUrl}${endpoint}`;
      // console.log(`[SERVER FETCH] ${fullUrl}`);
    } else {
     
      fullUrl = endpoint; 
      // console.log(`[CLIENT FETCH] ${fullUrl}`);
    }

   
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