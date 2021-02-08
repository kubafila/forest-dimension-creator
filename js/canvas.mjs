export default class Canvas{
  constructor(element, columns, rows){
    this.canvas = element;
    this.boxSize = 50;
    this.columns = columns;
    this.rows = rows;
    this.canvas.width = this.columns * this.boxSize ;
    this.canvas.height = this.rows * this.boxSize ;
    this.context = element.getContext('2d')
  }

  paint(colors){
  
    const summary = this.generateSummary(colors);

    this.canvas.height +=  (this.boxSize + 20) * summary.length  +55;

    this.context.fillStyle = '#fff'
    this.context.fillRect(0,0,this.canvas.width, this.canvas.height)
    this.drawColors(colors);
    this.drawNumbers(colors);
    this.drawSummary(summary)
  
  }

   drawColors(colors) {
    let counter = 0;
    const size = this.boxSize
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#000'
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.context.fillStyle = colors[counter].colorValue;

        this.context.fillRect(j * size, i * size, size, size)
        this.context.strokeRect(j * size, i * size, size, size)
        counter++;
      }
    }

  }

   drawNumbers(colors) {
     let counter = 0;
     const size = this.boxSize
     this.context.lineWidth = 4;
     this.context.strokeStyle = 'black'
    this.context.font = "16px Courier New";
     for (let i = 0; i < this.rows; i++) {
       for (let j = 0; j < this.columns; j++) {
         this.context.fillStyle = '#fff';
         this.context.strokeText(colors[counter].colorCode, j * size +5, i * size + 45)
         this.context.fillText(colors[counter].colorCode, j * size +5, i * size + 45)
         counter++;
       }
     }
   }

   generateSummary(colors){
      const counter = {}

      colors.forEach(color => {
        if(color.colorValue !='#fff'){
          var key = JSON.stringify(color)
          counter[key] = (counter[key] || 0) + 1
        }
      })

      const flatArray = Object.entries(counter);
      flatArray.sort( (a,b) => b[1] - a[1]);


      const finalArray = [];

      flatArray.forEach(x=>{

        const parsed = JSON.parse(x[0]);
        const obj = {
          count: x[1],
          colorValue: parsed.colorValue,
          colorCode: parsed.colorCode
        } 
        finalArray.push(obj)
      })

      return finalArray;
   }

   drawSummary(summary){

    this.context.lineWidth = 4;
    this.context.strokeStyle = 'black'
     for(let i = 0; i < summary.length; i++){
       this.context.fillStyle = summary[i].colorValue;
       this.context.strokeRect(this.boxSize, (this.rows * this.boxSize) + (this.boxSize * i) +(20*i) +10, this.boxSize,this.boxSize )
       this.context.fillRect(this.boxSize, (this.rows * this.boxSize) + (this.boxSize * i) +(20*i) +10, this.boxSize,this.boxSize )

       this.context.fillStyle = "#fff"
        this.context.font = "16px Courier New";
       this.context.strokeText(summary[i].colorCode, this.boxSize +3, (this.rows * this.boxSize) + (this.boxSize * i) + (20 * i) + 55)
       

       
       
       this.context.fillText(summary[i].colorCode, this.boxSize +3, (this.rows * this.boxSize) + (this.boxSize * i) + (20 * i) + 55)

        this.context.fillStyle = "#000"
        this.context.font = "40px Courier New";

       this.context.fillText("x" + summary[i].count, this.boxSize + 60, (this.rows * this.boxSize) + (this.boxSize * i) + (20 * i) + 55)

     }
   }
}