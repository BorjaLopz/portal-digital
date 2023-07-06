import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useServer from "../hooks/useServer";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function DeleteAccount({ user }) {
  const { delete: deleteAccount, get } = useServer();
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { user: userLogged } = useAuth();

  const fetchUser = async () => {
    try {
      const { data } = await get({ url: `/useravatar/${user}` });
      setCurrentUser(data.userAvatar);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount({ url: `/user/${currentUser.id}/delete/` });
      toast.success("Usuario borrado exitosamente");
      if(userLogged.user.id === currentUser.id)
      {
        navigate("/logout");
      }
      navigate("/users")
    } catch (error) {
      toast.error("Error al borrar el usuario");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <button
      className="publish-comment text-white font-bold py-2 px-4 rounded content-center bg-indigo-500 hover:bg-red-900"
      onClick={handleDelete}
    >
      Borrar cuenta
    </button>
  );
}

export default DeleteAccount;
