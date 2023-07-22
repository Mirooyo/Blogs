import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { UidContext } from "./component/AppContext";
import axios from "axios";

function App() {
  const [uid, SetUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: "http://localhost:5000/jwtid",
        withCredentials: true,
      })
        .then((res) => {
          SetUid(res.data);
          console.log(res);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </UidContext.Provider>
  );
}

export default App;
