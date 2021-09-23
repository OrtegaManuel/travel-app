import { getWeatherData } from './js/app';
import { getWeatherURL } from './js/app';
import { postData } from './js/app';
import { updateUI } from './js/app';
import './styles/style.scss';

document.getElementById('generate').addEventListener('click', getWeatherData);

export { getWeatherData, getWeatherURL, postData, updateUI };

alert('I EXIST!');
