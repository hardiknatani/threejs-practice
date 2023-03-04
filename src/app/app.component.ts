import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Three from 'three';
import { BufferGeometry, CylinderGeometry } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';
// import '../assets/textures/door'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild ('canvas') canvasRef!:ElementRef<HTMLCanvasElement>

  // Scene
  scene = new Three.Scene();
  camera = new Three.PerspectiveCamera(75,window.innerWidth/innerHeight,0.1,1000);
  renderer!: Three.WebGLRenderer


  //Helpers 
  gridHelper  = new Three.GridHelper(100)
  planeHelper = new Three.PlaneHelper(new Three.Plane(new Three.Vector3(0,0,0)),100);

  //Controls
  orbitControl!:OrbitControls

  //debug ui

  gui = new dat.GUI()

  //objects 
  sphereMesh!:Three.Mesh


  createScene(){
    this.camera.position.set(50,50,50);
let directionalLight = new Three.SpotLight("#FF0000",0.5);
directionalLight.position.set(100,100,100);
let lightHelper = new Three.SpotLightHelper(directionalLight)
this.scene.add(lightHelper)
this.scene.add(directionalLight)
    let cameraGuiFolder =   this.gui.addFolder("Camera Position");
    let camera = this.camera
    cameraGuiFolder.add(this.camera.position,'x',-50,50,1)
    cameraGuiFolder.add(this.camera.position,'y',-50,50,1)
    cameraGuiFolder.add(this.camera.position,'z',-50,50,1)


    this.renderer.setClearColor("#233143")
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    this.scene.add(this.gridHelper);
    this.scene.add(this.planeHelper)
    this.orbitControl  = new OrbitControls(this.camera,this.canvasRef.nativeElement)

    // let cylinderGeom = new Three.CylinderGeometry(5,12.5,15);
    // let cylinderMat = new Three.MeshBasicMaterial({color:0xffff00});
    // let cylinderMesh = new Three.Mesh(cylinderGeom,cylinderMat)
    // cylinderMesh.position.set(20,20,20)
    // this.scene.add(cylinderMesh);

    let colorsObj={
      sphereColor:0xff00ff,
      triangleColor:0xff5050,
      sphereRotation:()=>{
        this.sphereMesh.rotateX(60)

      }
    }

for(let i =0;i<500;i++){
  let positionsArr = new Float32Array([
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4,  
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4, 
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4,
    (Math.random()-0.5)*4
  ]);

  let positionAttribute = new Three.BufferAttribute(positionsArr,3);
  let bufferGeom = new Three.BufferGeometry();
  bufferGeom.setAttribute('position',positionAttribute);

  let bufferMaterial =  new Three.MeshBasicMaterial({
    color:0xff00ff,
    wireframe:false
  });

  let bufferMesh = new Three.Mesh(bufferGeom,bufferMaterial)
  bufferMesh.position.set(   
  (Math.random())*100,
  (Math.random())*100,
  (Math.random())*100)
  this.scene.add(bufferMesh)
  };

  let sphereGeom = new Three.BoxGeometry(15,10,20);  
  let texture = new Three.TextureLoader().load('../assets/textures/door/color.jpg',()=>{
console.log(    "Loaded successfully")  },()=>{
    console.log('in progress')
  },()=>{
    console.log('error')
  })
  let sphereMaterial = new Three.MeshBasicMaterial({
    // wireframe:true,color:colorsObj.sphereColor
  map:texture
  });
  texture.repeat.x=2
 this.sphereMesh = new Three.Mesh(sphereGeom,sphereMaterial)
 
 this.sphereMesh.position.set(20,20,20)
  this.scene.add(this.sphereMesh);
  let sphereFolder = this.gui.addFolder('Sphere')
  sphereFolder.add(this.sphereMesh.material,'wireframe');
  sphereFolder.addColor(colorsObj, 'sphereColor').onChange(()=>{
    sphereMaterial.color = new Three.Color(colorsObj.sphereColor)
  })
  sphereFolder.add(this.sphereMesh.rotation,'x',0,50,1)
  sphereFolder.add(this.sphereMesh.rotation,'y',0,50,1)

  sphereFolder.add(this.sphereMesh.rotation,'z',0,50,1)

  }

  startRendering(){
    let that = this;
  (function render(){
    requestAnimationFrame(render);
    that.sphereMesh.rotation.y+=.05
    that.renderer.render(that.scene,that.camera);
    that.orbitControl.update()
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
