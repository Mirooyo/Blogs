import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEmpty } from "../Utils/Utils";
import "../styles/Cart.css";

const Cart = () => {
  const userData = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const posts = userData.likes;
  const [data, setData] = useState();

  const getPost = async (posts) => {
    const requests = posts.map((post) =>
      axios.get(`http://localhost:5000/post/${post}`)
    );

    try {
      const responses = await axios.all(requests);
      const datas = responses.map((response) => response.data);
      setData(datas);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, userId) => {
    try {
      const request = axios({
        method: "patch",
        url: `http://localhost:5000/auth/dislikes/${userId}`,
        data: { likes: id },
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost(posts);
  }, [posts]);

  useEffect(() => {
    if (!loading) {
      console.log(data); // Utilisez 'data' ici, car 'data' sera défini après que la requête soit terminée.
    }
  }, [data, loading]);

  return (
    <div className="allcart">
      {!isEmpty(data) &&
        data.map((article) => (
          <div className="cart" key={article._id}>
            <img src={article.image} alt="" />
            <h1>{article.name}</h1>
            <a
              className="delete-cart"
              onClick={() => {
                handleDelete(article._id, userData._id);
              }}
            >
              Supprimer
            </a>
          </div>
        ))}
    </div>
  );
};

export default Cart;
