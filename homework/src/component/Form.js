import React from 'react';

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

export default Form;