import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Proxy is running.");
});

app.get("/proxy", async (req, res) => {
  let url = req.query.url;
  if (!url) return res.status(400).send("Missing ?url=");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy error: " + err);
  }
});

app.listen(PORT, () => console.log("Running on " + PORT));
