import express from "express";
import path from "path";
import pool from "../config/db.js";
import {
  traerCancion,
  agregarCancion,
  editarCancion,
  eliminarCancion,
} from "../queries/consulta.js";
const router = express.Router();
const __dirname = import.meta.dirname;

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/canciones", async (req, res) => {
  const result = await traerCancion();
  res.send(result);
});

router.post("/Cancion", async (req, res) => {
  const { titulo, artista, tono } = req.body;
  const result = await pool.query(
    "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) returning *",
    [titulo, artista, tono]
  );
  res.send(result);
});

router.put("/cancion/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, artista, tono } = req.body;
  const result = await pool.query(
    "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 returning *",
    [titulo, artista, tono, id]
  );
  res.send(result);
});

router.delete("/cancion", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM canciones WHERE id = $1", [id]);
    res.status(200).send("Canción eliminada correctamente");
  } catch (error) {
    console.error("Error al eliminar la canción:", error);
    res.status(500).send("Error al eliminar la canción");
  }
});

export default router;
