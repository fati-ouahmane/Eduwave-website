import {EventEmitter} from "events";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js"
import Experience from "./Experience.js";
export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device= this.sizes.device;

        this.sizes.on("switchdevice", (device)=>{
            this.device= device;
        })
        this.world.on("worldready",()=>{
            this.setAssets();
            this.playIntro();
        })

    }
    setAssets(){
    
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren ;
        console.log(this.roomChildren); 
    }

    firstIntro(){
        return new Promise ((resolve)=>{
            this.timeline = new GSAP.timeline();
            if(this.device === "desktop"){
    
            
            this.timeline.to(this.roomChildren.cube018.scale,{
                x:1.4,
                y:1.4,
                z:1.4,
                ease: "back.out(2.5)",
                duration: 0.7,
            }).to(this.room.position,{
                x: -1,
                ease: "power1.out",
                duration: 0.7,
                
            });
        }else{
            this.timeline.to(this.roomChildren.cube018.scale,{
                x:1.4,
                y:1.4,
                z:1.4,
                ease: "back.out(2.5)",
                duration: 0.7,
            }).to(this.room.position,{
                z: -1,
                ease: "power1.out",
                duration: 0.7,
                
            });
        }
        this.timeline.to(".intro-text .animatedis" , {
            yPercent : -100,
            stagger : 0.07,
            ease: "back.out(1.2)",
            onComplete : resolve
        })
        })
        
    }
    secondIntro(){
        return new Promise ((resolve)=>{
        this.secondTimeline = new GSAP.timeline();
        

        
        this.secondTimeline.to(this.room.position,{
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
            
        },"same").to(this.roomChildren.cube018.rotation,{
            y: 2*Math.PI +Math.PI/4
        },"same").to(this.roomChildren.cube018.scale,{
            x:20.30,
            y:30,
            z:20,
        },"same").to(this.camera.orthographicCamera.position,{
            y:0,
        },"same").to(this.roomChildren.cube018.position,{
            y: -17.588,
            z:8.9259,
            x:-3.2128, 

        },"same").to(this.roomChildren.cube018.scale,{
            x:0,
            y:0,
            z:0,
        })
       
       .to(this.roomChildren.class.scale,{
            x:1,
            y:1,
            z:1,
            ease: "back.out(2,2)",
            duration: 0.5,
        }) .to(this.roomChildren.decoration.scale,{
            x:1,
            y:1,
            z:1,
            ease: "back.out(2,2)",
            duration: 0.5,
        }) .to(this.roomChildren.chair.scale,{
            x:1,
            y:1,
            z:1,
            ease: "back.out(2,2)",
            duration: 0.5,
        }) .to(this.roomChildren.clock.scale,{
            x:1,
            y:1,
            z:1,
            ease: "back.out(2,2)",
            duration: 0.5,
        } )
         
    
        })
    }
    onScroll(e){
        if(e.deltaY> 0){
  
            this.removeEventListeners();
            this.playSecondIntro();
        }

    }
    onTouch(e){
       this.initalY = e.touches[0].clientY;

    }
    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference= this.initalY - currentY;
        if(difference>0){
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();

        }
        this.initalY = null;
    }
    removeEventListeners(){
        window.removeEventListener("wheel", this.scrollOnceEvent );
        window.removeEventListener("touchstart", this.touchStart );
        window.removeEventListener("touchmove", this.touchMove  );
    }
     async playIntro() {
        await this.firstIntro();
        this.moveFlag= true;
        
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);

        window.addEventListener("wheel", this.scrollOnceEvent );
        window.addEventListener("touchstart", this.touchStart );
        window.addEventListener("touchmove", this.touchMove  );

    }
    async playSecondIntro(){
        this.moveFlag= false;
        this.scaleFlage =true;
         await this.secondIntro();
         this.scaleFlage =false;
        this.emit("enablecontrols");
    }
    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1,0,0);
        }else{
            this.room.position.set(0,0,-1);
        }


    }
    update(){
        if(this.moveFlag){
            this.move();
            }
            if(this.scaleFlag){
                this.scale();
            }
        }
}