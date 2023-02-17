import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import * as Three from "three";
import { TrackballControls } from 'three-trackballcontrols-ts';
// import { TrackballControls } from 'three/examples';

@Component({
  selector: 'app-cube',
  templateUrl:'./cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements AfterViewInit {

  @ViewChild('canvas')
  private canvasRef!: ElementRef;
  get aspectRatio() { 
  return window.innerWidth/window.innerHeight}
  private scene=new Three.Scene();
  private camera = new Three.PerspectiveCamera(75,this.aspectRatio,0.6,1200);
  private renderer!: THREE.WebGLRenderer;
  controls:any 
// Trigonometry Constants for Orbital Paths 

 boxGeometry = new Three.BoxGeometry(2,2,2);
 boxMaterial = new Three.MeshLambertMaterial({
  color: 0xFFFFFF
});
 boxMesh = new Three.Mesh(this.boxGeometry,this.boxMaterial);
 theta = 0; // Current angle
// Angle increment on each render
 dTheta = 2 * Math.PI / 100;

  createScene(){
    this.camera.position.z=5;

    this.boxMesh.rotation.set(40, 0, 40);
    const lightValues = [
        {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
        {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
        {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
        {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
        {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
        {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
    ];

    lightValues.forEach(light=>{
    let  newLight=new Three.PointLight( light.colour, light.intensity, light.dist );
    newLight.position.set(light.x,light.y,light.z);
    this.scene.add(newLight);
    let newLightHelper = new Three.PointLightHelper(newLight,0.5);
    this.scene.add(newLightHelper)
    });
    this.scene.add(this.boxMesh);
    // this.scene.add(new Three.AxesHelper(5))
    this.controls= new TrackballControls((<any>this.camera),(<any>this.canvasRef.nativeElement));
    this.controls.rotateSpeed = 4;
    this.controls.dynamicDampingFactor = 0,15;

  }


  startRendering(){
    let that = this;
    that.theta += that.dTheta;

    (function render() {
      requestAnimationFrame(render);
      // that.scene.rotation.z -= 0.005;
      // that.scene.rotation.x -= 0.01;      
      that.boxMesh.rotation.x+=0.04;
      that.boxMesh.rotation.y+=0.04;
      // Store trig functions for sphere orbits 
          // MUST BE INSIDE RENDERING FUNCTION OR THETA VALUES ONLY GET SET ONCE
      const sphereMeshes = [];
      const sphereGeometry = new Three.SphereGeometry(0.1, 32, 32); // Define geometry
      const sphereMaterial = new Three.MeshLambertMaterial({color: 0xC56CEF}); // Define material
    for (let i=0; i<4; i++) {
        sphereMeshes[i] = new Three.Mesh(sphereGeometry, sphereMaterial); // Build sphere
        sphereMeshes[i].position.set(0, 0, 0);
        that.scene.add(sphereMeshes[i]); // Add sphere to canvas
    }
          const trigs = [
              {x: Math.cos(that.theta*1.05), y: Math.sin(that.theta*1.05), z: Math.cos(that.theta*1.05), r: 2},
              {x: Math.cos(that.theta*0.8), y: Math.sin(that.theta*0.8), z: Math.sin(that.theta*0.8), r: 2.25},
              {x: Math.cos(that.theta*1.25), y: Math.cos(that.theta*1.25), z: Math.sin(that.theta*1.25), r: 2.5},
              {x: Math.sin(that.theta*0.6), y: Math.cos(that.theta*0.6), z: Math.sin(that.theta*0), r: 2.75}
          ];
      // Loop 4 times (for each sphere), updating the position 
          for (let i=0; i<4; i++) {
              sphereMeshes[i].position.x = trigs[i]['r'] * trigs[i]['x'];
              sphereMeshes[i].position.y = trigs[i]['r'] * trigs[i]['y'];
              sphereMeshes[i].position.z = trigs[i]['r'] * trigs[i]['z'];
          };

      that.renderer.render(that.scene, that.camera);
      that.controls.update();
    }());
  }


ngAfterViewInit(): void {

  window.addEventListener('resize', () => {
    this.renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
});

  this.renderer = new Three.WebGLRenderer({canvas:this.canvasRef.nativeElement,antialias:true});
  this.renderer.setClearColor("#233143")
  this.renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99);
  this.createScene()
  this.startRendering();
}
}
