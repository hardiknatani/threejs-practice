import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'threejs-practice';
@ViewChild('canvas') canvasRef!:ElementRef<HTMLCanvasElement>
canvas!:HTMLCanvasElement
 context2d!:CanvasRenderingContext2D|null
 x=Math.random()*window.innerWidth;
 y=Math.random()*window.innerHeight
 dx=(Math.random()-0.5)*window.innerWidth;
 dy=(Math.random()-0.5)*window.innerHeight;

  generateRandomColor() {

  let colorsArr=["#3A1078","#4E31AA","#EB455F","#FFB84C","#FF5F9E","#16FF00","#D9ACF5",]
  return colorsArr[Math.floor(Math.random()*7)]
};


 createSteps(){
  for(let i=0;i<100;i++){
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;

    if(i%2!=0){
      this.context2d.strokeStyle=this.generateRandomColor()
      this.context2d.beginPath()
      this.context2d.moveTo(x,y);
      x+=20;
      this.context2d.lineTo(x,y);
      this.context2d.stroke()
      this.context2d.closePath()
      console.log(x,y)
    }else {
      this.context2d.strokeStyle=this.generateRandomColor()
      this.context2d.beginPath()
      this.context2d.moveTo(x,y);
      y+=20;
      this.context2d.lineTo(x,y);
      this.context2d.stroke();
      this.context2d.closePath()

      console.log(x,y)
    }
      }
 }

 createCircle(x,y){

  this.context2d.strokeStyle=this.generateRandomColor();
  this.context2d.beginPath()
  // x=-x;
  this.context2d.arc(x,y,30,0,Math.PI*2,true);
  this.context2d.stroke()

 }

 animateCircle(){
console.log(this.x,this.y)
    if(this.x+30>window.innerWidth || this.x-30<0){
      this.dx=-this.dx
    }
    if(this.y+30>window.innerHeight|| this.y-30<0){
      this.dy=-this.dy
    }

    this.x+=this.dx;
    this.y+=this.dy;
    // console.log(this.x,this.y)
    this.createCircle(this.x,this.y)
  
 }

 createCircles(){
  for(let i=0;i<100;i++){
    let x = Math.random()*window.innerWidth-60;
    let y = Math.random()*window.innerHeight-60
    ;
    if(i%2!=0){
      this.context2d.strokeStyle=this.generateRandomColor();
      this.context2d.beginPath()
      // x=-x;
      this.context2d.fillStyle = this.generateRandomColor()

      this.context2d.arc(x,y,30,0,Math.PI*2,true);
      this.context2d.stroke()
      this.context2d.fill()

    }else {
      this.context2d.strokeStyle=this.generateRandomColor();
      this.context2d.beginPath()
      this.context2d.fillStyle = this.generateRandomColor()
      // y+=20;
      this.context2d.arc(x,y,30,0,Math.PI*2);
      this.context2d.stroke()
      this.context2d.fill()
    }}
 }


initCanvas(){
this.canvas = this.canvasRef.nativeElement;
this.canvas.width= window.innerWidth;
this.canvas.height=window.innerHeight;
 this.context2d = this.canvas.getContext('2d');
  this.context2d.fillStyle= '#00ff0050';
  // this.context2d?.fillRect(1, 1, 50, 50);
  // let string = "hey Hardik here"; let d = 0;
  // for (let i = 0; i < string.length; i++) {
  //   d += 5;
  //   this.context2d?.fillText(string[i], 100 + d, 100, 10)
  // }


}

ngAfterViewInit(): void {
  this.initCanvas();

window.addEventListener('resize',()=>{
this.canvas.width= window.innerWidth/2;
this.canvas.height=window.innerHeight/2;
})

let that = this;
(function render(){
  requestAnimationFrame(render)
  that.context2d.clearRect(0,0,window.innerWidth,window.innerHeight);
  // that.createCircles();
that.animateCircle()
that.createCircles()


})()

}

}
