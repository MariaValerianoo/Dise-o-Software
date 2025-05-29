import Llanta from "../models/producto.js";
const llantaModel = new Llanta();

// Mostrar lista de llantas
export const getAllLlantas = async (req, res) => {
  try {
    const llantas = await llantaModel.getAll();
    res.render('llantas/index', { llantas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener llantas');
  }
};

// Mostrar formulario de creación
export const renderNuevaLlanta = (req, res) => {
  res.render('llantas/new', { llanta: {}, error: null });
};

// Crear llanta
export const createLlanta= async(req, res) => {
    try {
      const { marca, medida, precio } = req.body;
      if (!marca || !medida || !precio) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const nuevaLlanta = llantaModel.create({ marca, medida, precio });
      res.status(201).json(nuevaLlanta);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear llanta' });
    }
  }

// Mostrar formulario de edición
export const renderEditarLlanta = async (req, res) => {
  const id = parseInt(req.params.id);
  const llanta = await llantaModel.getById(id);
  if (!llanta) return res.status(404).render('errors/404');
  res.render('llantas/edit', { llanta, error: null });
};

// Actualizar llanta
export const updateLlanta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const success = await llantaModel.update(id, updatedData);
    if (!success) {
      return res.status(404).render('errors/404');
    }
    res.redirect('/llantas');
  } catch (error) {
    console.error(error);
    res.status(500).render('llantas/edit', {
      llanta: { _id: req.params.id, ...req.body },
      error: 'Error al actualizar la llanta'
    });
  }
};

// Eliminar llanta
export const deleteLlanta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await llantaModel.delete(id);
    if (!success) {
      return res.status(404).render('errors/404');
    }
    res.redirect('/llantas');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la llanta');
  }
};
