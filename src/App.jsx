import { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchAutocomplete from "./SearchAutocomplete/SearchAutocomplete";
import ImgMediaCard from "./ImgMediaCard/ImgMediaCard";
import { PokemonContext } from "./context/favouriteContext";
import styles from "./app.module.css";
import CustomButton from "./CustomButton/CustomButton";

export default function App() {
  const { state, dispatch , handlePaginationClick} = useContext(PokemonContext);

  const handleCleanSearch = () => {
    dispatch({ type: "setFilteredPokemons", filteredPokemons: state.pokemons });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.home}>
        <SearchAutocomplete />
        {state.error && <Typography color="error">{state.error}</Typography>}
        <Box className={styles.cards}>
          {state.filteredPokemons.map((pokemon) => (
            <Box className={styles.card} key={pokemon.id}>
              <ImgMediaCard
                pokemon={pokemon}
                id={pokemon.id}
                isFavourite={state.favourites.some(
                  (fav) => fav.id === pokemon.id
                )}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        {state.filteredPokemons.length === 1 && (
          <CustomButton  name ={"Limpiar Búsqueda"} onClick={handleCleanSearch}/>
        )}
      </Box>
      <Box sx={{display:"flex", justifyContent:"space-between", width:"20%"}}>
        <CustomButton name={"Anterior"} onClick={() => handlePaginationClick(state.previousURL)} disabled={!state.previousURL}>Anterior</CustomButton>
        <CustomButton name={"Siguiente"} onClick={() => handlePaginationClick(state.nextURL)}/>
      </Box>
    </Box>
  );
}
