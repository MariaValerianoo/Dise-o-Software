import Llanta from '../models/producto.js';
import usuarioModel from '../models/usuarioModel.js';



export const renderDashboard = async (req, res) => {
  try {
    // 1) Cargar todas las llantas desde el modelo in-memory
    const llantaModel = new Llanta();
    const productosCount = llantaModel.getAll().length;

    // 2) Contar usuarios (si tienes DB; si no, atrapa el error)
    let usuariosCount = 0;
    try {
      usuariosCount = await usuarioModel.find().then(arr => arr.length);
    } catch {
      console.warn("⚠️ No pude leer usuarios de MongoDB, usuariosCount=0");
    }

    return res.render('index', { productosCount, usuariosCount });
  } catch (error) {
    console.error('Error en renderDashboard:', error);
    return res.status(500).send('Error al cargar el dashboard');
  }
};