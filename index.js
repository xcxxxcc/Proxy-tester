import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "identity",     // ❗ WAJIB — non compressed
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive"
      }
    });

    // forward header penting
    res.set("Content-Type", response.headers.get("content-type") || "text/plain");

    const body = await response.text();  // ❗ ambil utuh, bukan stream
    res.send(body);

  } catch (e) {
    res.status(500).send("Proxy error: " + e.toString());
  }
});

app.listen(3000, () => console.log("OK"));
