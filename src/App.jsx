import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";


function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data: posts } = await axios.get('http://localhost:3000/posts');
    setPosts([...posts]);
  };

  const agregarPost = async () => {
    const post = { titulo, imgSrc, descripcion };
    await axios.post('http://localhost:3000/posts', post);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id,likes) => {
    const newLikes = likes + 1;
    await axios.put(`http://localhost:3000/posts/like/${id}`, { likes: newLikes });
    getPosts();
  };


  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(`http://localhost:3000/posts/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
