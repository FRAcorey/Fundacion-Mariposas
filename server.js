const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "api", "config", ".env") });
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
}));
app.use(express.json());

// Para comprobar que el .env se cargó (bórralo después)
console.log("URL cargada:", !!process.env.supabase_URL);
console.log("ANON cargada:", !!process.env.supabase_ANON_KEY);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/api/config", (req, res) => {
  res.json({
    url: process.env.supabase_URL,
    anonKey: process.env.supabase_ANON_KEY,
  });
});

console.log(JSON.stringify(process.env.supabase_URL));
console.log(JSON.stringify(process.env.supabase_ANON_KEY));

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
}

module.exports = app;