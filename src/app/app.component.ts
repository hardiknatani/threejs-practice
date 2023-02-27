import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TrackballControls} from "../../node_modules/three-trackballcontrols-ts"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit {
  title = 'threejs-practice';
  @ViewChild('canvas') canvasRef!:ElementRef<HTMLCanvasElement>;
  get aspectRatio(){
return window.innerWidth/window.innerHeight
  }
  scene=new THREE.Scene();
  camera= new THREE.PerspectiveCamera(
    60,this.aspectRatio,1,1200
  )
  renderer!: THREE.WebGLRenderer
  controls:any;
   boxGeom = new THREE.CylinderGeometry(5,4,10);
   boxMaterial = new THREE.MeshLambertMaterial({color:"blue"});
   boxMesh = new THREE.Mesh(this.boxGeom,this.boxMaterial);

  createScene(){
    this.renderer=new THREE.WebGLRenderer({
      antialias:true,
      canvas:this.canvasRef.nativeElement
    });
    //why tf is threre a blur 
    this.renderer.setSize(window.innerWidth*99,window.innerHeight*99)
    this.renderer.setSize(window.innerWidth,window.innerHeight)
    this.camera.position.z=20;
    this.camera.position.y=10;
    this.camera.position.x=10;

    this.scene.add(this.boxMesh);
    let helper = new THREE.AxesHelper(100);
    this.scene.add(helper)
    let light = new THREE.DirectionalLight('white',5)
    light.position.set(1,1,1);
    this.scene.add(light);
    // this.controls = new TrackballControls((<any>this.camera),this.canvasRef.nativeElement);
    this.controls = new OrbitControls(this.camera,this.canvasRef.nativeElement);
    this.controls.enableDamping = true
  }
  clock = new THREE.Clock()

  startRendering(){
    this.renderer.setClearColor("#233143");
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio ,2))
      
      let that = this;
      (function render(){
      requestAnimationFrame(render);
          const elapsedTime = that.clock.getElapsedTime()

      that.boxMesh.rotation.x=Math.cos(elapsedTime);
      that.boxMesh.rotation.y=Math.sin(elapsedTime);
  
      that.renderer.render(that.scene, that.camera);
      that.controls.update();
      })();

  }

    ngOnInit(){
    }

  ngAfterViewInit(){
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
  });

this.createScene();
this.startRendering();

  }
}
