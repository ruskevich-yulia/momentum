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

console.log(musicInfo);
const audio = new Audio();//создаем обьект аудио,крый позволяет прослушивать и тд аудиофайлы
let i = 0;
soundImage.src = musicInfo[i].artistImage;
artist.textContent = musicInfo[i].artist;
composition.textContent = musicInfo[i].composition;
audio.src = musicInfo[i].sound; //мы должны записать путь,по крому лежит песня
audio.volume = 0.1;

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
  i = i + 1;
  audio.src = musicInfo[i].sound
  soundImage.src = musicInfo[i].artistImage;
  artist.textContent = musicInfo[i].artist;
  composition.textContent = musicInfo[i].composition;
  audio.play()
  
  };
audio.addEventListener('ended',nextComposition)

const changePrevSong = () => {
  i = i - 1;
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
