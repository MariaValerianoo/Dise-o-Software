// src/controllers/usuarios.js
import usuarioModel from "../models/usuarioModel.js";

// Listar usuarios
export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuarioModel.find();
    res.render("usuarios/index", { usuarios });
  } catch (err) {
    next(err);
  }
};

// Mostrar formulario de creación
export const renderNuevoUsuario = (req, res) => {
  res.render("usuarios/new", { usuario: {}, error: null });
};

// Procesar creación
export const crearUsuario = async (req, res) => {
  try {
    // Usa el mismo nombre que importaste
    await usuarioModel.create(req.body);
    // Redirige al listado
    return res.redirect('/usuarios');
  } catch (error) {
    console.error(error);
    // En caso de error vuelve al form con los datos y el mensaje
    return res.status(400).render('usuarios/new', {
      usuario: req.body,
      error: 'Error al crear usuario'
    });
  }
};

// Mostrar formulario de edición
export const renderEditarUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioModel.findById(req.params.id);
    if (!usuario) return res.status(404).render("errors/404");
    res.render("usuarios/edit", { usuario, error: null });
  } catch (err) {
    next(err);
  }
};

// Procesar actualización
export const actualizarUsuario = async (req, res, next) => {
  const { id } = req.params;
  try {
    const u = await usuarioModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!u) return res.status(404).render("errors/404");
    res.redirect("/usuarios");
  } catch (error) {
    console.error(error);
    // Re-renderiza el edit pasando los datos y el mensaje de error
    res.status(400).render("usuarios/edit", {
      usuario: { _id: id, ...req.body },
      error: "Error al actualizar usuario.",
    });
  }
};

// Procesar borrado
export const borrarUsuario = async (req, res, next) => {
  try {
    const u = await usuarioModel.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).render("errors/404");
    res.redirect("/usuarios");
  } catch (error) {
    next(error);
  }
};
