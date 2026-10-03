const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "api", "config", ".env") });
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/config", (req, res) => {
  res.json({
    url: process.env.supabase_URL,
    anonKey: process.env.supabase_ANON_KEY,
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

if (require.main === module) {
  app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
}

module.exports = app;