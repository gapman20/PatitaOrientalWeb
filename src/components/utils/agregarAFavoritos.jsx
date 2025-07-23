import { useContext } from "react";
import { contextFavoritos } from "../context/contextFavoritos";
import Swal from "sweetalert2";

export const useFavorito = () => {
  const { favorito, setFavorite } = useContext(contextFavoritos);

  const toggleFavorite = async (product) => {
    const loginData = JSON.parse(localStorage.getItem("isLoggedIn"));
    const isLoggedIn = loginData?.logInStatus;
    const userId = loginData?.id_user;
    const productId = product.id;

    // ❌ Si no ha iniciado sesión
    if (!isLoggedIn || !userId) {
      Swal.fire({
        title: 'Acción no permitida',
        text: 'Debes iniciar sesión para agregar a favoritos 💔',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión',
        confirmButtonColor: '#d679af',
        background: '#f0f8ff',
        color: '#333',
      });
      return;
    }

    const exists = favorito.some((item) => item.id === productId);

    try {
      if (exists) {
        // 🔴 Eliminar del backend
        await fetch(`https://patitaoriental-backend.duckdns.org/api/v1/users/${userId}/favorites/${productId}`, {
          method: 'DELETE',
        });

        Swal.fire({
          title: '¡Eliminado!',
          text: 'Platillo eliminado de favoritos 🖤',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#d679af',
          background: '#f0f8ff',
          color: '#333',
        });

        setFavorite((prev) => prev.filter((item) => item.id !== productId));
      } else {
        // 💖 Agregar al backend
        await console.log(`https://patitaoriental-backend.duckdns.org/api/v1/users/${userId}/favorites/${productId}`);
        await fetch(`https://patitaoriental-backend.duckdns.org/api/v1/users/${userId}/favorites/${productId}`, {
          method: 'PUT',
        });

        Swal.fire({
          title: '¡Agregado!',
          text: 'Platillo agregado a favoritos 💖',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#d679af',
          background: '#f0f8ff',
          color: '#333',
        });

        setFavorite((prev) => [...prev, product]);
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el favorito. Intenta más tarde.',
        icon: 'error',
        confirmButtonColor: '#d679af',
      });
    }
  };

  const isFavorito = (id) => favorito.some((item) => item.id === id);

  return { favorito, toggleFavorite, isFavorito };
};
