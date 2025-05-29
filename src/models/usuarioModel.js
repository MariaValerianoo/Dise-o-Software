// File: src/models/usuarioModel.js
import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  idUsuario:       { type: Number,   required: true, unique: true },
  nombreUsuario:   { type: String,   required: true },
  apellidoUsuario: { type: String,   required: true },
  telefonoUsuario: { type: String,   required: true },
  correoUsuario:   { type: String,   required: true }
});

// 1) Crear el modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// 2) Datos por defecto
const defaultUsers = [
  {
    idUsuario: 1,
    nombreUsuario: "Juan",
    apellidoUsuario: "Pérez",
    telefonoUsuario: "600123456",
    correoUsuario: "juan.perez@example.com"
  },
  {
    idUsuario: 2,
    nombreUsuario: "María",
    apellidoUsuario: "Gómez",
    telefonoUsuario: "600987654",
    correoUsuario: "maria.gomez@example.com"
  }
];

// 3) Seed si está vacío
Usuario.countDocuments()
  .then(count => {
    if (count === 0) {
      return Usuario.insertMany(defaultUsers);
    }
  })
  .then(() => console.log("✅ Usuarios por defecto creados"))
  .catch(err => console.error("❌ Error al seedear usuarios", err));

// 4) Exportar el modelo
export default Usuario;
