// src/database.js
import mongoose from "mongoose";

export const connectDatabase = async () => {
  const uri = "mongodb://localhost:27017/llantasdc";
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.warn("⚠️ No hay MongoDB: sigue sin base de datos, pero el servidor arrancará igual.");
    
  }
};
