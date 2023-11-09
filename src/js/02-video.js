import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
//шукаємо елемент відео
const iframe = document.querySelector('#vimeo-player');
//створюємо player
const player = new Player(iframe, {  
   id: 236203659,
});
//вмикаємо слухача on на плеєрі з подією timeupdate, яка повертає поточний час відтворення
player.on('timeupdate', throttle(timePlay, 1000));

//вмикаємо метод поверненя часу відтворення, куди передаємо час з localStorage
player.setCurrentTime(loadFromLs('videoplayer-current-time')).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':          
            break;
        default:           
            break;
    }
});
//записуємо в localStorage кожну секунду поточне значення з player.on
function timePlay(value) {
    //console.log(value);
  saveToLs('videoplayer-current-time', value.seconds);
}
// зберігання в localStorage
function saveToLs(key, value) { 
    localStorage.setItem(key, JSON.stringify(value));
  } 
// завантаження з localStorage
function loadFromLs(key) {
 const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return data;
  }
}
