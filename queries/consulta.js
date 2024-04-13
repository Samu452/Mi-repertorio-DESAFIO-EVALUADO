import pool from "../config/db.js";

const traerCancion = async () => {
  try {
    const consultaCanciones = await pool.query("SELECT * FROM canciones");
    return consultaCanciones.rows;
  } catch (error) {
    console.error("Error al consultar canciones:", error);
  }
};

const agregarCancion = async (cancion) => {
  try {
    const nuevoCancion = await pool.query(
      "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
      [cancion.titulo, cancion.artista, cancion.tono]
    );
    return nuevoCancion;
  } catch (error) {
    console.error("Error al agregar cancion:", error);
  }
};

const editarCancion = async (id, cancion) => {
  try {
    const editarCancion = await pool.query(
      "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4",
      [cancion.titulo, cancion.artista, cancion.tono, id]
    );
    return editarCancion;
  } catch (error) {
    console.error("Error al editar cancion:", error);
  }
};

function eliminarCancion(i, id) {
  axios
    .delete(`${url}/${id}`)
    .then(() => {
      console.log("Canción eliminada exitosamente");
      alert("Canción " + canciones[i].titulo + " eliminada");
      getData();
    })
    .catch((error) => {
      console.error("Error al eliminar la canción:", error);
      alert("Error al eliminar la canción");
    });
}

export { traerCancion, agregarCancion, editarCancion, eliminarCancion };
