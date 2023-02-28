import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Three from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild ('canvas') canvasRef!:ElementRef<HTMLCanvasElement>
  scene = new Three.Scene();
  camera = new Three.PerspectiveCamera(75,window.innerWidth/innerHeight);
  renderer!: Three.WebGLRenderer




  createScene(){
    this.camera.position.set(50,50,50);
    this.renderer.setClearColor("#233143")
    this.renderer.setSize(window.innerWidth,window.innerHeight);
  }

  startRendering(){
    let that = this;
  (function render(){
    requestAnimationFrame(render)
    that.renderer.render(that.scene,that.camera);
  })()

  }

  ngAfterViewInit(): void {

    window.addEventListener('resize',()=>{
      this.renderer.setSize(window.innerWidth,window.innerHeight);
      this.camera.aspect = window.innerWidth/window.innerHeight;
      this.camera.updateProjectionMatrix()
    })

    this.renderer = new Three.WebGLRenderer({
      canvas : this.canvasRef.nativeElement,
      antialias:true
    });

    this.createScene();
    this.startRendering()

    

  }

}
