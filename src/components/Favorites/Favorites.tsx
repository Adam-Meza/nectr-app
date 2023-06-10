import React, { useEffect } from "react";
// import { FavoritesProps } from "../App/App";
import { WordProps } from "../../utilites";
import { DefinitionCard } from "../DefinitionCard/DefinitionCard";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

interface FavoritesCompProps {
  favorites: WordProps[]
}

export const Favorites : React.FC<FavoritesCompProps> = ({favorites}) => {
  const favoriteCards = favorites.map((fav : WordProps)=> {
    return ( <DefinitionCard definition ={fav}/> )
  })

  return (
    <section className='.favorite-card'>
      {favorites.length === 0 && <ErrorMessage message = "No Favorites yet!"/>}
      {favorites && favoriteCards}
    </section>
  )
}