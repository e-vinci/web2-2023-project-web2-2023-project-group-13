import { clearPage } from '../../utils/render';

import Navigate from '../Router/Navigate';

import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/longGround.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const LoginPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += renderMenu();
  Navigate('/');
  
};


function renderMenu(){
  const menu = `
    <div id="skyContainer">
    <img id="skyImage" src="${sky}">
    <div id="groundContainer">
      <img id="groundImage" src="${ground}">
    </div>
    <div id="catioContainer">
      <img id="catioImage" src="${catio}">
    </div>
    <div id="cloud02Container">
      <img id="cloud02Image" src="${cloud02}">
    </div>
    <div id="cloud01Container">
      <img id="cloud01Image" src="${cloud01}">
    </div>
    <div id="cloud03Container">
      <img id="cloud03Image" src="${cloud03}">
    </div>
    <div id="sunContainer">
      <img id="sunImage" src="${sun}">
    </div>
    <div id="cloud04Container">
      <img id="cloud04Image" src="${cloud04}">
    </div>
    <form>
      <input type="text" id="firstname" placeholder="firstname">
      <input type="submit" id="submit">
    </form>
    `
    return menu;
  }


export default LoginPage;