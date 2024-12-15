const express = require("express");
const { agregarPost, getPost, like, eliminarPost } = require("./post.js");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });

app.get("/posts", async (req, res) => {
    try {
    const posts = await getPost(); 
    res.json(posts);
    } catch (error) {
    console.error("Error al obtener los posts:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
    }
});

app.post("/posts", async (req, res) => {
    try {
    const { titulo, imgSrc, descripcion, likes } = req.body;
    if (!titulo || !imgSrc || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    await agregarPost(titulo, imgSrc, descripcion, likes);
    res.status(201).send("Post creado con éxito");
    } catch (error) {
    console.error("Error al crear el post:", error);
    res.status(500).json({ error: "Error al crear el post" });
    }
});

app.put("/posts/like/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const { likes } = req.body;
    if (likes === undefined || typeof likes !== "number") {
        return res.status(400).send("El campo likes debe ser un número");
    }
    await like(likes, id);
    res.send("Post modificado con éxito");
    } catch (error) {
    console.error("Error al modificar el post:", error);
    res.status(500).json({ error: "Error al modificar el post" });
    }
});
  
app.delete("/posts/:id", async (req, res) => {
    try {
    const { id } = req.params;
    if (!id) {
    return res.status(400).send("El campo id es obligatorio");
    }
    await eliminarPost(id);
    res.send("Post eliminado con éxito");
} catch (error) {
    console.error("Error al eliminar el post:", error);
    res.status(500).json({ error: "Error al eliminar el post" });
    }
   });