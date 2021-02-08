import UserInterface from './UI'
import Canvas from './canvas'
import { colorPallete} from './colorPallete'
let ROWS = 10;
let COLUMNS = 20;

const canvasEL = document.querySelector('canvas')
const colorsSection = document.querySelector('.colors');
const painting = document.querySelector('.painting')

const dimensionsBtn = document.querySelector('.nav__btn--dimensions');
const dimensionsSpanInButton = dimensionsBtn.querySelector('span')
const dimensionsWrapper = document.querySelector('.dimensions__wrapper')
const dimensionsForm = document.querySelector('.dimensions__form');
const dimensionsInputWidth = document.querySelector('.dimensions__form_columns')
const dimensionsInputHeigh = document.querySelector('.dimensions__form_rows')
const dimensionsBtn8040 = document.querySelector('.dimensions__button-80-40')
const dimensionsBtn8060 = document.querySelector('.dimensions__button-80-60')
const iconDropdown = document.querySelector('.icon-dropdown')

const resetZoomBtn = document.querySelector('.zoom__btn--reset')
const zoomRange = document.querySelector('.zoom__input')
const zoomValueLabel = document.querySelector('.zoom__value')

const downloadBtn = document.querySelector('.nav__link--download')

const btnEraser = document.querySelector('.tools__btn--eraser')
const btnClear = document.querySelector('.tools__btn--clear')
const currentColorIndicator = document.querySelector('.current-color')

const UI = new UserInterface();

let currentcolor = colorPallete[0]
let currentColorCode = 1;
let lastActiveColorButton = undefined;

function saveImage(canvas) {
  let imageURL = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  downloadBtn.download = "Forest Dimension.jpg";
  downloadBtn.href = imageURL;
}

function getColorsFromPainting(){
  const boxes = document.querySelectorAll('.box');
  const colors = [];

  boxes.forEach(box=>{
    const boxObject = {
      colorValue:box.style.backgroundColor || '#fff',
      colorCode:box.innerText
    }
    colors.push(boxObject)
  })

  return colors;
}

function updateCurrentColor(color) {
  currentcolor = color;
  UI.setBackgroundColor(currentColorIndicator, currentcolor)
}

function toogleDimensionsWrapper() {
  dimensionsWrapper.classList.toggle('hide')
  iconDropdown.classList.toggle('rotate')

}

function updateDimensions(){

    COLUMNS = dimensionsInputWidth.value
    ROWS = dimensionsInputHeigh.value
    dimensionsSpanInButton.innerText = `${COLUMNS * 4}x${ROWS * 4}`
    const width = COLUMNS * 4;
    const height = ROWS * 4;
    dimensionsForm.querySelector('.dimensions__info--width').innerText = width;
    dimensionsForm.querySelector('.dimensions__info--height').innerText = height;
    
}

function changeZoom(value) {
  UI.setCSSVarValue('--painting-scale', value);
  zoomValueLabel.innerText = Math.floor(value * 100)
}

function generatePaiting() {
  const numOfDivs = ROWS * COLUMNS;
  painting.innerHTML = "";

  for (let i = 0; i < numOfDivs; i++) {
    const div = document.createElement('div');
    div.classList.add('box')

    painting.appendChild(div)
  }

  UI.setCSSVarValue('--columns', COLUMNS)
  UI.setCSSVarValue('--rows', ROWS)

}

function paintColors() {
  const colors = colorsSection.querySelectorAll('.color')

  let counter = 0;
  for(let i =0; i < 8; i++){
    for(let j = 0; j <24; j++){
      UI.setBackgroundColor(colors[counter], colorPallete[counter * 8 %191])
      counter++;
      if(counter >190){
        break;
      }
    }
   
  }
    
}

btnClear.addEventListener('click', generatePaiting)

dimensionsBtn.addEventListener('click', toogleDimensionsWrapper);

zoomRange.addEventListener('input', ({target:{value}}) =>changeZoom(value))

dimensionsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  updateDimensions();
  window.requestAnimationFrame(generatePaiting);
  toogleDimensionsWrapper();


})

dimensionsInputHeigh.addEventListener('input', () => {
  updateDimensions();
})

dimensionsInputWidth.addEventListener('input', () => {
  updateDimensions()
})

btnEraser.addEventListener('click', () => {
  updateCurrentColor('#fff')
})

colorsSection.addEventListener('click', ({target})=> {
  if(target.classList.contains('color')){

    updateCurrentColor(UI.getBackgroundColor(target))
    
    currentColorCode = target.dataset.code;
    target.classList.add('active')
    if(lastActiveColorButton){
      console.log(lastActiveColorButton)
      lastActiveColorButton.classList.remove('active');
    }
    lastActiveColorButton = target;

  }
})

painting.addEventListener('click', ({target}) => {
  if(target.classList.contains('box')){
    UI.setBackgroundColor(target,currentcolor)
    target.innerText = currentColorCode
  }
})

resetZoomBtn.addEventListener('click', () => {
  zoomRange.value = 1;
  changeZoom(1)
})

dimensionsBtn8040.addEventListener('click', () => {
  dimensionsInputHeigh.value = 10;
  dimensionsInputWidth.value = 20;
  updateDimensions();
  window.requestAnimationFrame(generatePaiting);
  toogleDimensionsWrapper();
})

dimensionsBtn8060.addEventListener('click', () => {

  dimensionsInputHeigh.value = 15;
  dimensionsInputWidth.value = 20;
  updateDimensions();
  window.requestAnimationFrame(generatePaiting);
  toogleDimensionsWrapper();
})

downloadBtn.addEventListener('click', ()=>{

  const canvas = new Canvas(canvasEL, COLUMNS, ROWS)
  const colorArray = getColorsFromPainting();
  canvas.paint(colorArray);
  saveImage(canvasEL)
})

document.addEventListener('DOMContentLoaded', ()=>{
  paintColors();
  updateDimensions();
  window.requestAnimationFrame(generatePaiting);
})