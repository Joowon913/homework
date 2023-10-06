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
const Form = ({ updateCounter }) => {
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
      updateCounter();
  }
  
  return (
  <form action="" onSubmit={handleFormSubmit}>
    <input type="text" name="name" 
      placeholder="영화명을 입력하세요" 
      onChange={handleinputChange}
      value={value}
    />
    <button type="submit">추가</button>
    <p style= {{color: "#ff003e", fontSize: "20px"}}>{errorMessage}</p>
    </form>
  );
}

const MainMovie = ({ src, handleThumbsClick, thumbs, choiceFavorites }) => {
  const thumbsIcon = choiceFavorites ? '👍' : '🖐'
    return (
      <div className="main-movie">
        <img 
          src={src} 
          alt="해리포터" 
          width="300"
          style={{ border: "1px solid red" }}
        />
        <button onClick={handleThumbsClick}>{thumbsIcon}{thumbs}</button>
      </div>
    );
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
  const movieOne = 'img/movie-one.jpg';
  const movieTwo = 'img/movie-two.jpg';
  const [mainMovie, setMainMovie] = React.useState(movieOne);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || []
  });
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const [thumbs, setThumbs] = React.useState(() => {
    return jsonLocalStorage.getItem('thumbsCounter');
  });

  const choiceFavorites = favorites.includes(mainMovie);

  function updateCounter() {
    setCounter((pre) => {
      const nextCounter = pre + 1;
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
    setMainMovie(movieTwo);
  }

  function handleThumbsClick() {
    setFavorites((pre) => {
      const nextFavorites = [...pre, mainMovie];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      return nextFavorites;
    })
    setThumbs((pre) => {
      const nextThumbs = (thumbs < 0 || pre + 1);
      jsonLocalStorage.setItem('thumbsCounter', nextThumbs);
      return nextThumbs;
    });
  }

  return (
    <div>
      <Title>영화페이지 {counter}</Title>
      <Form updateCounter={ updateCounter } />
      <MainMovie src={mainMovie} handleThumbsClick={ handleThumbsClick } thumbs = {thumbs} choiceFavorites={favorites} />
      <Favorites favorites={favorites}/>
    </div>
  );
};

export default App;
