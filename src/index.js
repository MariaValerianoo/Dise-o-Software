import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override';


import { connectDatabase } from "./database.js";
import indexRoutes from "./routes/index.js";
import llantaRoutes from "./routes/llantaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoute.js";

(async () => {
  // 1) Conectar a MongoDB
  try {
    await connectDatabase();
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ No se pudo conectar a MongoDB", err);
    process.exit(1);
  }

  // 2) Inicializar Express
  const app = express();
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // 3) Settings
  app.set("port", process.env.PORT || 3000);
  app.set("views", join(__dirname, "views"));
  app.set("view engine", "ejs");


  // 4) Middlewares
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(methodOverride('_method'));


  // 5) Archivos estáticos
  app.use(express.static(join(__dirname, "public")));

  // 6) Rutas
  app.use("/", indexRoutes);          // Dashboard, about, contact
  app.use("/llantas", llantaRoutes);  // CRUD de llantas
  app.use("/usuarios", usuarioRoutes);// CRUD de usuarios

  // 7) Levantar servidor
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
})();
