import './App.css';
import React from 'react';
import Form from './component/Form';
import MainMovieCards from './component/MainMovieCards';
import Favorites from './component/Favorites';

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
};
function Title(props) {
  return <h1>{props.children}</h1>
}

const App = () => {
  const movieOne = window.location.href+'/img/movie-one.jpg';
  const movieTwo = window.location.href+'/img/movie-two.jpg';
  const movieThree = window.location.href+'/img/movie-three.jpg';
	const [mainMovieCards, setMainMovieCards] = React.useState(() => {
		return jsonLocalStorage.getItem('mainMovieCards') || [{'src': movieOne, 'thumbs': ''}];
	});
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });

  function searchMovie() {
		console.log(mainMovieCards.length);
		setMainMovieCards((pre) => {
      let nextMovieCards = [];
			if(mainMovieCards.length === 1) 
        nextMovieCards = [...pre, {'src': movieTwo, 'thumbs': ''}];
			else 
        nextMovieCards = [...pre, {'src': movieThree, 'thumbs': ''}];
      
      jsonLocalStorage.setItem('mainMovieCards', nextMovieCards);
      return nextMovieCards;
    })
  }

	function movieCardClick(index) {
		setFavorites((pre) => {
      const nextFavorites = [...pre, mainMovieCards[index].src];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    })
		mainMovieCards[index].thumbs++;
		jsonLocalStorage.setItem('mainMovieCards', mainMovieCards);
	}

  return (
    <div>
      <Title>영화 좋아요!</Title>
      <Form searchMovie={ searchMovie }  mainMovieCards={mainMovieCards} />
			<MainMovieCards mainMovieCards={mainMovieCards} movieCardClick={movieCardClick}/>
      <Favorites favorites={favorites}/>
    </div>
  );
};

export default App;
