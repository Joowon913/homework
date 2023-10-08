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

export default MainMovieCards;