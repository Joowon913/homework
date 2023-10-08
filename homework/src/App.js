import './App.css';
import React from 'react';

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
const Form = ({ searchMovie, mainMovieCards }) => {
  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const english = (text) => /[ A-Z ]/.test(text);

  function handleinputChange(data) {
    const userValue = data.target.value;
    if(english(userValue)) {
      setErrorMessage('한글로 입력해주세요.');
    } else {
      setErrorMessage('');
    }
    setValue(userValue.toUpperCase());
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    // setErrorMessage('');
    if(value === '') {
      setErrorMessage('값이 없으므로 추가할 수 없습니다.');
      return;
    }

		if(mainMovieCards.length > 2) {
			setErrorMessage('더이상 추가할 수 없습니다.');
			return;
		}
		searchMovie();
  }
  
  return (
  <form action="" onSubmit={handleFormSubmit}>
    <input type="text" name="name" 
      placeholder="영화명을 입력하세요" 
      onChange={handleinputChange}
      autocomplete= "off"
      value={value}
    />
    <button type="submit">추가</button>
    <p style= {{color: "#ff003e", fontSize: "20px"}}>{errorMessage}</p>
    </form>
  );
}

const MainMovieCards = ({mainMovieCards, movieCardClick}) => {
	const thumbsIcon = '👍';
	return (
		<div className='card-list'>
			{mainMovieCards.map((movie, index) => {
				return (
					<div className="main-movie">
						<img 
							src={movie.src} 
							alt="해리포터" 
							width="300"
							style={{ border: "1px solid red" }}
						/>
						<button className='main-card-button' onClick={() => movieCardClick(index)}>{thumbsIcon}{movie.thumbs}</button>
					</div>
				)
			})}
		</div>
	)
}

const MovieItem = ({ src }) => {
  return (
    <li>
      <img src={src} alt="영화" style={{width: "200px", height: "350px", backgroundSize: "contain", }} />
    </li>
  );
}

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map((movie, index) => <MovieItem src={movie} key={index + Date.now()} />)}
    </ul>
  );
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
			if(mainMovieCards.length === 1) nextMovieCards = [...pre, {'src': movieTwo, 'thumbs': ''}];
			else nextMovieCards = [...pre, {'src': movieThree, 'thumbs': ''}];
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
