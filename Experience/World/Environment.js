import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import Theme from "../Theme.js";
import GUI from "lil-gui";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        //this.gui = new GUI({container:document.querySelector(".hero-main")});
        this.setSunlight();
        this.obj = {
            colorObj:{r:0, g:0, b:0},
            intensity:3,


        };
        //this.setGUI();
    }
    setGUI(){
        this.gui.addColor(this.obj,"colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj)
            this.ambientLight.color.copy(this.obj.colorObj)
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj,"intensity",0,10).onChange(()=>{
             this.sunLight.intensity= this.obj.intensity
             this.sunLight.ambientLight= this.obj.intensity
        })
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 1;
      //  const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
       // this.scene.add(helper);
        this.sunLight.position.set(1.5, 7, 3);
        this.scene.add(this.sunLight);
        this.ambientLight = new THREE.AmbientLight("#ffffff",1)
        this.scene.add(this.ambientLight );

    }
    switchTheme(theme){
        if (theme === "dark"){
             GSAP.to(this.sunLight.color,{
                r: 0.12156862745098039, g: 0.20392156862745098, b: 0.33725490196078434
             });
             GSAP.to(this.ambientLight.color,{
                r: 0.12156862745098039, g: 0.20392156862745098, b: 0.33725490196078434
            });
            GSAP.to(this.sunLight,{
                intensity: 4.36,
            });
            GSAP.to(this.ambientLight,{
                intensity: 4.36,
            });
        }else{
            GSAP.to(this.sunLight.color,{
                r:255/255,
                g:255/255,
                b:255/255,
            });
            GSAP.to(this.ambientLight.color,{
                r:255/255,
                g:255/255,
                b:255/255,
            });
            GSAP.to(this.sunLight,{
                intensity: 5,
            });
            GSAP.to(this.ambientLight,{
                intensity: 5,
            });

        }
    }
        
     
    
    resize() {
       
    }
    update() {

    }
}