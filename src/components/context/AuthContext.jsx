import { useNavigate } from "react-router-dom";
import { useImageUpload } from "./uploadImagesContext";
import { createContext, useState, useContext, useEffect } from "react";

/*
creamos un nuevo contexto de autenticación que servirá como una "caja global"
para guardar información como el usuario actual y si está logueado o no.
*/
const AuthContext = createContext();

/*
Este componente envuelve la aplicación en el contexto de autenticación. 
Es donde se define qué valores estarán disponibles globalmente.
*/
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const apiurl = "https://patitaoriental-backend.duckdns.org/api/v1/users"; //Aqui cambias la variable de la url de la api
  const { uploadedUrl, setUploadedUrl } = useImageUpload();
  const [isLoggedIn, setIsLoggedIn] = useState({
    // crea un estado isLoggedIn que indica si el usuario está logueado (por defecto, false).
    logInStatus: false,
    id_user: null,
  });
  const [usuario, setUsuario] = useState(null); // Inicialmente null

useEffect(() => {
  const fetchUsuario = async () => {
    const stored = localStorage.getItem("isLoggedIn");

    if (stored) {
      const { logInStatus, id_user } = JSON.parse(stored);

      if (logInStatus && id_user) {
        try {
          const response = await fetch(`${apiurl}/${id_user}`);
          if (!response.ok) throw new Error("No se pudo obtener el usuario");

          const userData = await response.json();
          setUsuario(userData);
          setIsLoggedIn({ logInStatus: true, id_user });
          localStorage.setItem("usuario", JSON.stringify(userData));
        } catch (error) {
          console.error("Error al obtener el usuario:", error);
        }
      }
    }
  };

  fetchUsuario();
}, []);





  
  const [logInInput, setLogInInput] = useState({
    //para el inicio de sesion de formulario
    inputEmail: "",
    inputContraseña: "",
  });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    //para el registro de usuarioformulario
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    password: "",
    imageUrl: "",
    // añadimos role constante para todos
    role: { id: 2, name: "CUSTOMER" },
    favorites: [],
    active: true,
  });

  const getListaUsuarios = async () => {
    const res = await fetch(apiurl, {
      method: "GET", //  GET es default
    });
    if (res.ok) {
      const data = await res.json(); // API responde con los datos del usuario

      return data;
    } else {
      console.log("Hubo un error al GET JSON DE USUARIOS");
    }
  };

  const guardarLogInInput = (e) => {
    setLogInInput({
      ...logInInput,
      [e.target.name]: e.target.value,
    });
  };

  const logInCheck = async (e) => {
    const usuariosJson = await getListaUsuarios();
    const foundUser = usuariosJson.find(
      (usuarioJson) => usuarioJson.email === logInInput.inputEmail
    );
    if (foundUser) {
      if (foundUser.password === logInInput.inputContraseña) {
        console.log("USUARIO ACEPTADO");

        const nuevoEstado = {
          logInStatus: true,
          id_user: foundUser.id,
        };

        setIsLoggedIn(nuevoEstado);
        localStorage.setItem("isLoggedIn", JSON.stringify(nuevoEstado));

       // localStorage.setItem("usuario", JSON.stringify(foundUser)); // guardar usuario encontrado en local storage

        setUsuario(foundUser); // Aquí actualizas el contexto inmediatamente
        navigate("/Profile"); // redirigir a la página de perfil
        setLogInInput({
          //Limpiar el forms de inicio
          inputEmail: "",
          inputContraseña: "",
        });
        return true;
      } else {
        return "Contraseña incorrecta";
      }
    } else {
      return "Usuario no encontrado";
    }
  };

  const guardarInfoDeUsuarios = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario, //trae toda la infomacion de el usuario que ya esta escrita
      [e.target.name]: e.target.value, // solo cambia la que le pide el input
    });
  };

  const agregarUsuario = async () => {
    nuevoUsuario.imageUrl = uploadedUrl; //añadimos la url de la imagen
    try{
    const res = await fetch(apiurl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (res.ok) {
      const data = await res.json(); // API responde con los datos del usuario
      setUsuario(data); // actualizas el contexto inmediatamente

      const nuevoEstado = {
          logInStatus: true,
          id_user: data.id,
        };

        setIsLoggedIn(nuevoEstado);
        localStorage.setItem("isLoggedIn", JSON.stringify(nuevoEstado));

      setNuevoUsuario({
        //para el registro de usuarioformulario
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        postalCode: "",
        password: "",
        imageUrl: "",
        // añadimos role constante para todos
        role: { id: 2, name: "CUSTOMER" },
        favorites: [],
        active: true,
      });
      navigate("/Profile"); // redirigir a la página de perfil
      setUploadedUrl(""); //limpiar url de imagen
      return true;
    } else {
      console.log("Hubo un error al registrar");
      const nuevoEstado = {
          logInStatus: false,
          id_user: "",
        };

        setIsLoggedIn(nuevoEstado);
        localStorage.setItem("isLoggedIn", JSON.stringify(nuevoEstado));
       return  false;
     
    }
  }catch (error) {
  console.error("Error en agregarUsuario:", error);
  return false; // ← AÑADE ESTO PARA SEGURIDAD
}
  };

  const uptadeUser = async () => {
    // Clonar el usuario actual
    const usuarioActualizado = { ...usuario };

    // Si hay nueva imagen, reemplazarla
    if (uploadedUrl !== "") {
      usuarioActualizado.imageUrl = uploadedUrl;
    }

    try {
      const response = await fetch(`${apiurl}/${usuarioActualizado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioActualizado),
      });

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();
      setUsuario(data);
      localStorage.setItem("usuario", JSON.stringify(data));
      setUploadedUrl(""); // limpiar la imagen subida

      console.log("Usuario actualizado con éxito:", data);
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  const deleteUser = async () => {
    try {
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
      const response = await fetch(`${apiurl}/${usuarioGuardado.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al borrar el usuario");
      }

      // Limpiar el estado y el localStorage
      localStorage.removeItem("usuario");
      localStorage.setItem("isLoggedIn", "false");
      setUsuario(null);
      setIsLoggedIn(false);

      // Redirigir al home o login
      navigate("/InicioDeSesion");

      console.log("Usuario eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  

  /*Aquí se entregan los valores (isLoggedIn, usuario, y sus funciones para actualizar) 
  a cualquier componente que consuma este contexto. */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        usuario,
        getListaUsuarios,
        setUsuario,
        agregarUsuario,
        guardarInfoDeUsuarios,
        nuevoUsuario,
        logInInput,
        setLogInInput,
        guardarLogInInput,
        logInCheck,
        uptadeUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/*
Este hook personalizado (useAuth) permite que en cualquier parte de la aplicación se pueda escribir:
const { usuario, isLoggedIn, setUsuario } = useAuth();
y así acceder al estado global de autenticación fácilmente.
*/

export const useAuth = () => useContext(AuthContext);
