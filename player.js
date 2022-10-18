//импорты всегда пишутся вначале js
import { musicInfo } from "./musicInfo.js";  //без webpack необходимо указывать расширение(.js) 
//при использовании импортов и экспортов jsфайл становится модулем(т е частью одного составного js  и браузер д б извещен,что это модуль)
const playButton = document.querySelector('.play');
const soundImage = document.querySelector('.img_artist');
const artist = document.querySelector('.artist');
const composition = document.querySelector('.composition');
const previousSong = document.querySelector('.previous_song');
const nextSong = document.querySelector('.next_song');
const volumeSwitchButton = document.querySelector('.vol');
volumeSwitchButton.value = '🔊';
const volumeAdjustingRange = document.querySelector('.volume_adjusting_range');
const currentTimeTrack = document.querySelector('.current_time');//текущее время воспроизведения
const endTime = document.querySelector('.end_time');//время проигрывания трека
const track = document.querySelector('.track');//инпут с дорожкой трека
let isDragg = false;  //т е ползунок трека не захвачен

const audio = new Audio();//создаем обьект аудио,крый позволяет прослушивать и тд аудиофайлы
let i = 0;
soundImage.src = musicInfo[i].artistImage;
artist.textContent = musicInfo[i].artist;
composition.textContent = musicInfo[i].composition;
audio.src = musicInfo[i].sound; //мы должны записать путь,по крому лежит песня
audio.volume = 0.1;// забыла

let isPlay = false; // т к при загрузке плеер не играет
const playPauseSound = () => {
    if(isPlay) {
        audio.pause();
        playButton.textContent = '▶';
    } else {
        audio.play();
        playButton.textContent = '❚❚';
    };
    isPlay = !isPlay;// т е поменять значение на противоположное
}
playButton.addEventListener('click',playPauseSound);

const nextComposition = () => {
  if (i < musicInfo.length) {
    i = i + 1;
  } else {
    i = 0;
  }
  audio.src = musicInfo[i].sound
  soundImage.src = musicInfo[i].artistImage;
  artist.textContent = musicInfo[i].artist;
  composition.textContent = musicInfo[i].composition;
  audio.play()
};
audio.addEventListener('ended',nextComposition)

const changePrevSong = () => {
  if(i > 0) {
    i = i - 1;
  } else {
   i = musicInfo.length; 
  }
  audio.src = musicInfo[i].sound
  soundImage.src = musicInfo[i].artistImage;
  artist.textContent = musicInfo[i].artist;
  composition.textContent = musicInfo[i].composition;
  audio.play()
}

previousSong.addEventListener('click',changePrevSong)

nextSong.addEventListener('click',nextComposition);

const switchVolume = () => {
 if(audio.volume === 0) {
    audio.volume = 1;
    volumeSwitchButton.value = '🔊'
 } else {
    audio.volume = 0;
    volumeSwitchButton.value = '🔇'
 };
}

volumeSwitchButton.addEventListener('click',switchVolume);

const adjustVolume = (e) => {
  const currentVolumeValue = e.target.value
  audio.volume = +currentVolumeValue/100
} 

volumeAdjustingRange.addEventListener('input',adjustVolume);

const getCorrectFormat = (number) => {
  return number < 10 ? `0${number}` : number;
}

const getMinuteTimeFormat = (timeInSeconds) => {
  let hours, minutes, seconds;
  hours = Math.floor(timeInSeconds / 3600); //округление вниз
  minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
  seconds = Math.ceil(timeInSeconds - (hours * 3600) - (minutes * 60)); //округление в большую сторону
  return `${hours? `${hours}:` : ''}${minutes ? `${getCorrectFormat(minutes)}:` : '00:'  }${seconds ? getCorrectFormat(seconds) : ''}`;
}

const setSoundFullTime = () => {
  const trackDuration = audio.duration;
  const fullTime = getMinuteTimeFormat(trackDuration);
  endTime.textContent = fullTime;
  track.max = audio.duration;
}
audio.addEventListener('durationchange',setSoundFullTime);//при полной загрузке аудио срабатывает функц

const calculateCurrentSoundTime = () => {
  const currentSoundTime = getMinuteTimeFormat(audio.currentTime)//выводить текущее время трека в формате мин.сек
  currentTimeTrack.textContent = currentSoundTime;
  if(!isDragg) {track.value = audio.currentTime};
}

audio.addEventListener('timeupdate',calculateCurrentSoundTime);

const playInSpecificPosition = (e) => {
  audio.currentTime = e.target.value;
  calculateCurrentSoundTime();
  isDragg = false;
};

track.addEventListener('mouseup',playInSpecificPosition)//при отпускании мышкой ползунка начинает играть с заданной позиции

track.addEventListener('mousedown', () => {//при нажатии мышкой на ползунок меняется значение isDragg
  isDragg = true;
});




