import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom= this.room.scene;
        this.roomChildren ={}
        this.lerp={
            current: 0,
            target: 0,
            ease: 0.9,


        };
      
        this.setModel();
        this.onMouseMove();
       
    }
    setModel(){

        this.actualRoom.children.forEach(child =>{
            child.castShadow= true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group){
                child.children.forEach((groupchild) =>{
                    groupchild.castShadow= true;
                    groupchild.receiveShadow = true;
                })
            }
            console.log(child);
            child.scale.set(0,0,0);
        if(child.name==="Cube018"){
            //child.scale.set(1,1,1);
            child.rotation.y = Math.PI/4; 
            child.position.set(0, -1.5, 0);
        }
        this.roomChildren[child.name.toLowerCase()] = child;


        })
        /*const width = 0.5;
const height = 0.7;
const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 0, 0 );
rectLight.rotation.x = Math.PI /2;
rectLight.rotation.z = -Math.PI /4;

this.actualRoom.add( rectLight )

const rectLightHelper = new RectAreaLightHelper( rectLight );
rectLight.add( rectLightHelper );*/
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
        this.actualRoom.rotation.y=Math.PI;
        
    }
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            
            this.rotation =(( e.clientX - window.innerWidth / 4)/2 ) /window.innerWidth;
            this.lerp.target = this.rotation *0.5;
           
            console.log(e.clientX,this.rotation );
        })
    }
    resize(){
       


    }
    update(){
          
        this.lerp.current =GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current ;
        
    }
}