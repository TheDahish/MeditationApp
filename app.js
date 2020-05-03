const app = () => {

	const song = document.querySelector('.song');
	const play = document.querySelector('.play');
	const outline = document.querySelector('.moving-outline circle');
	const video = document.querySelector('.vid-container video');
	const timeSelect = document.querySelectorAll('.time-select button');

	//sounds
	const songs = document.querySelectorAll('.sound-picker button');
	//time display

	const timeDisplay = document.querySelector('.time-display');

	// Length of outline

	const outlineLength = outline.getTotalLength();
	//duration

	let fakeDuration = 600;

		outline.style.strokeDasharray=outlineLength;
		outline.style.strokeDashoffset=outlineLength;

	//pick sounds
	
	songs.forEach(sound =>{
		sound.addEventListener('click', () =>{
			song.src = sound.getAttribute('data-sound');
			video.src= sound.getAttribute('data-video');
			if(song.paused){
		song.play();
		play.src='./svg/pause.svg';
		if(screen.width> 700)
		video.play();
	}
	else{
		song.pause();
		play.src = './svg/play.svg';
		if(screen.width> 700)
		video.pause();
	}
		})
	})	

	//play sound
	play.addEventListener('click' ,() => {
	if(song.paused){
		song.play();
		play.src='./svg/pause.svg';
		if(screen.width> 700)
		video.play();
	}
	else{
		song.pause();
		play.src = './svg/play.svg';
		if(screen.width> 700)
		video.pause();
	}
	});


	//select sound
	timeSelect.forEach(option =>{
		option.addEventListener('click', () => {
			fakeDuration = option.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration%60)}0`;
		})
	})

	//animate circle
	song.ontimeupdate = () => {
		let currentTime= song.currentTime;
		let elapsed = fakeDuration - currentTime;
		let seconds = Math.floor(elapsed % 60);
		let minutes = Math.floor(elapsed / 60);


		let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
		console.log(progress);
		outline.style.strokeDashoffset = progress;

		if(seconds<10){
			timeDisplay.textContent = `${minutes}:0${seconds}`;	
		}
		else
			timeDisplay.textContent = `${minutes}:${seconds}`;
		if(currentTime>=fakeDuration)
		{
			song.pause();
			song.currentTime=0;
			play.src = './svg/play.svg';
			video.pause();
		}

	}

};

app();