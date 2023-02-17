import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as Three from 'three';
import { CameraHelper } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
  camera =  new Three.PerspectiveCamera(75,this.aspectRatio,0.6,100);
  renderer!:Three.WebGLRenderer

  //create globe
globeGeometry = new Three.SphereGeometry(1, 720, 360);
globeMAterial = new Three.MeshStandardMaterial()
texture = new Three.TextureLoader().load("https://upload.wikimedia.org/wikipedia/commons/f/f7/Normal_Mercator_map_85deg.jpg")
globe = new Three.Mesh(this.globeGeometry,this.globeMAterial)


//controls
controls!:OrbitControls

//helpers
helper!:CameraHelper


  createScene(){
    this.renderer = new Three.WebGLRenderer({canvas:this.canvasRef.nativeElement,antialias:true});
    this.renderer.setClearColor("#233143")
    this.renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99);
    this.renderer= new Three.WebGLRenderer({canvas:this.canvasRef.nativeElement,antialias:true});

    this.camera.position.z=2
    this.globeMAterial.map=this.texture

    this.scene.add(this.globe);
    this.globe.rotation.y = -Math.PI/2;

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
this.helper = new Three.CameraHelper(light.shadow.camera)
this.scene.add(this.helper)

const lightPivot = new Three.Object3D()
lightPivot.add(light)
lightPivot.rotation.y += 0.01
this.scene.add(lightPivot)
    

     this.controls = new OrbitControls(this.camera, this.canvasRef.nativeElement)

  }

  startRendering(){
    let that = this;
   (  function animate() {
      requestAnimationFrame(animate)
  // console.log("hey")
  that.globe.rotation.y+=0.025
  that.globe.rotation.x+=0.025

      that.controls.update()
      that.helper.update()
  
      that.renderer.render(that.scene,that.camera)

      // stats.update()
  })();
  }



ngAfterViewInit(){

  window.addEventListener('resize',()=>{
    this.renderer.setSize(window.innerWidth*0.99, window.innerHeight*0.99);
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
  })


this.createScene();
this.startRendering()

}
}
