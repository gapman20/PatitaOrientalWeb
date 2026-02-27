import React, { useState, useContext, useEffect } from 'react';
import { contextFavoritos } from '../../components/context/contextFavoritos';
import TarjetaMenu from "../../components/tarjetaMenu/tarjetaMenu";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"
import { useCartActions } from '../../components/utils/botonDeAgregar';
import './favoritos.css';

const Favoritos = () => {
  const { favorito, setFavorite } = useContext(contextFavoritos);
  const { handleAddToCart } = useCartActions();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("isLoggedIn"));

    if (!userData || userData.logInStatus !== true) {
      setIsLoggedIn(false);
      setIsLoading(false); // No cargar favoritos si no está logueado
      return;
    }

    setIsLoggedIn(true);

    const fetchFavorites = async () => {
      try {
        const response = await fetch(`https://patitaorientalbackend-production.up.railway.app/api/v1/users/${userData.id_user}`);
        if (!response.ok) throw new Error("Error al obtener favoritos");

        const data = await response.json();
        setFavorite(data.favorites || []);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [setFavorite]);

  const eliminarFavorito = (id) => {
    setFavorite(favorito.filter(product => product.id !== id));
    // Aquí podrías hacer la llamada al backend para eliminar también
  };

  return (
    <div className="favoritos-container">
      <div className="container-fluid">
        <h1 className="titulo-favoritos">Mis Favoritos</h1>
      </div>

      {isLoading ? (
        <LoadingScreen></LoadingScreen>
      ) : !isLoggedIn ? (
        <p>Inicia sesión si quieres añadir favoritos.</p>
      ) : favorito.length === 0 ? (
        <p>No tienes favoritos aún.</p>
      ) : (
        <div className="favoritos-grid">
          {favorito.map(product => (
            <TarjetaMenu
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onAddToFavorites={eliminarFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { Favoritos };
