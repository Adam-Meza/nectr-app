import React, { useEffect } from "react";
import { DefinitionProps } from "../../utilites";
import { DefinitionCard } from "../DefinitionCard/DefinitionCard";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface FavoritesCompProps {
  favorites: DefinitionProps[]
}

export const Favorites : React.FC<FavoritesCompProps> = ({favorites}) => {
  const favoriteCards = favorites.map((fav : DefinitionProps)=> {
    return ( <DefinitionCard definition ={fav}/> )
  });

  return (
    <section>
      {favorites.length === 0 && <ErrorMessage message = "No Favorites yet!"/>}
      {favorites && favoriteCards}
    </section>
  );
};