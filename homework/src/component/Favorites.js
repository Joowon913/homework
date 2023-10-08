import MovieItem from './MovieItem';

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((movie, index) => <MovieItem src={movie} key={index + Date.now()} />)}
    </ul>
  );
}

export default Favorites;