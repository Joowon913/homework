const MovieItem = ({ src }) => {
  return (
    <li>
      <img src={src} alt="영화" style={{width: "200px", height: "350px", backgroundSize: "contain", }} />
    </li>
  );
}

export default MovieItem;