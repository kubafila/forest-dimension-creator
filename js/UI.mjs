export default class UserInterface{
  constructor(){
    this.root = document.documentElement;
  }

  getBackgroundColor(element){
      const styles = window.getComputedStyle(element)
      const backgroundColor = styles.getPropertyValue('background-color')
      return backgroundColor;
  }

  getCSSVarValue(name){
      const value = String(getComputedStyle(this.root).getPropertyValue(name))
      return value;
  }

  setCSSVarValue(name,value){
    this.root.style.setProperty(name,value)
  }

  setBackgroundColor(element,color){
    element.style.backgroundColor = color;
  }

  isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

 
}