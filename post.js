const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "chilenos",
  allowExitOnIdle: true,
});

const getPost = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    console.log("Posts obtenidos:", rows);
    return rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw new Error("Error al obtener los posts");
  }
};

const agregarPost = async (titulo, imgSrc, descripcion, likes = 0) => {
  try {
    const consulta =
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)";
    const values = [titulo, imgSrc, descripcion, likes];
    await pool.query(consulta, values);

    console.log("Post agregado");
  } catch (error) {
    console.error("Error al agregar el post:", error);
    throw new Error("Error al agregar el post");
  }
};

const like = async (likes, id) => {
  try {
    const consulta = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values = [likes, id];
    const result = await pool.query(consulta, values);
    if (result.rowCount === 0) {
      throw new Error("Post no encontrado");
    }
    console.log(`Likes actualizados para el post con ID ${id}`);
    return true;
  } catch (error) {
    console.error("Error al modificar el post:", error);
    throw new Error ("Error al modificar el post");
  }
};

const eliminarPost = async (id) => {
  try {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
  if (result.rowCount === 0) {
    throw new Error("Post no encontrado");
  }
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    throw new Error ("Error al eliminar el post");
  }
};

module.exports = {
  getPost,
  agregarPost,
  like,
  eliminarPost,
};
