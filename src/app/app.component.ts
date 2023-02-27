import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Three from 'three';
import { AxesHelper, CameraHelper } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import '../assets/images/glow.png'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'threejs-globe';
  @ViewChild ('canvas') private canvasRef!:ElementRef;

  get aspectRatio(){
    return window.innerWidth/window.innerHeight;
  }
//set stage
  scene = new Three.Scene();
  camera =  new Three.PerspectiveCamera(45,this.aspectRatio,1,1200);
  renderer!:Three.WebGLRenderer

  //create globe
globeGeometry = new Three.SphereGeometry(40, 720, 360);
globeMAterial = new Three.MeshStandardMaterial()
texture = new Three.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/f/f7/Normal_Mercator_map_85deg.jpg")
globe = new Three.Mesh(this.globeGeometry,this.globeMAterial);


//controls
controls!:OrbitControls

//helpers
cameraHelper!:CameraHelper
axesHelper!:AxesHelper


  createScene(){
    this.renderer = new Three.WebGLRenderer({canvas:this.canvasRef.nativeElement,antialias:true});
    this.renderer.setClearColor("#233143")
    this.renderer.setSize(window.innerWidth*99,window.innerHeight*99)
    this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.renderer= new Three.WebGLRenderer({canvas:this.canvasRef.nativeElement,antialias:true});

    this.camera.position.set(150,100,150)
    this.globeMAterial.map=this.texture
    var spriteMaterial = new Three.SpriteMaterial({ 
      map:new Three.TextureLoader().load("../assets/images/glow.png"), 
      // useScreenCoordinates: false
      // , alignment: Three.SpriteAlignment.center,
      color: 0x0000ff, transparent: false, blending: Three.AdditiveBlending
    });
    var sprite = new Three.Sprite( spriteMaterial );
    sprite.scale.set(150, 150, 5);
    this.globe.add(sprite); // this centers the glow at the meshfor 
    
    this.scene.add(this.globe);
    this.globe.position.set(50,50,50)
    this.camera.lookAt(50,50,50)
    const light = new Three.DirectionalLight(0xffffff)
    light.position.set(1, 1, 3);
    light.castShadow = true;
    light.shadow.bias = -0.003
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    light.shadow.camera.left = -2
    light.shadow.camera.right = 2
    light.shadow.camera.top = -2
    light.shadow.camera.bottom = 2
    light.shadow.camera.near = 1
    light.shadow.camera.far = 5;
    this.cameraHelper = new Three.CameraHelper(light.shadow.camera)
    this.axesHelper = new Three.AxesHelper(100)
    // this.scene.add(this.cameraHelper)
    // this.scene.add(this.axesHelper)

    const lightPivot = new Three.Object3D()
    lightPivot.add(light)
    lightPivot.rotation.y += 0.01
    this.scene.add(lightPivot);


   
   for(let i=0; i<1500;i++){
//   let starGeom = new Three.SphereGeometry(0.5,720,360);
//  let starMat = new Three.MeshPhongMaterial({});
//  let starMEsh = new Three.Mesh(starGeom,starMat)
 let x= Math.random()*1000;
 let y= Math.random()*1000;
 let z= Math.random()*1000;

//  starMEsh.position.set(x,y,z)
//   this.scene.add(starMEsh)

let mesh;
var geometry = new Three.SphereGeometry( 1, 32, 16 );
var material = new Three.MeshLambertMaterial( { color: 0xffffff } );
mesh = new Three.Mesh( geometry, material );
mesh.position.set(x,y,z);
this.scene.add(mesh);

// SUPER SIMPLE GLOW EFFECT
// use sprite because it appears the same from all angles
var spriteMaterial = new Three.SpriteMaterial({ 
  map:new Three.TextureLoader().load("../assets/images/glow.png"), 
  // useScreenCoordinates: false
  // , alignment: Three.SpriteAlignment.center,
  color: 0xffffff, transparent: false, blending: Three.AdditiveBlending
});
var sprite = new Three.Sprite( spriteMaterial );
sprite.scale.set(5, 5, 1);
mesh.add(sprite); // this centers the glow at the meshfor 


}
    
        
    this.controls = new OrbitControls(this.camera, this.canvasRef.nativeElement)

  }

  startRendering(){
    let that = this;
   (  function animate() {
      requestAnimationFrame(animate)
  that.globe.rotation.y+=0.025
      that.controls.update()
      that.cameraHelper.update()
      // that.axesHelper.updateMatrix()
  
      that.renderer.render(that.scene,that.camera)

      // stats.update()
  })();
  }



ngAfterViewInit(){

  window.addEventListener('resize',()=>{
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  })


this.createScene();
this.startRendering()
}
}
