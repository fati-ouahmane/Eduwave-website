import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'
export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);
        this.setSmoothScroll();
        this.setScrollTrigger();
        this.circleFirst = this.experience.world.floor.circleFirst ;
        this.circleSecond = this.experience.world.floor.circleSecond ;
        this.circleThird = this.experience.world.floor.circleThird ;
        document.querySelector(".page").style.overflow ="visible";
      
    }
     
    setupASScroll(){
        const asscroll = new ASScroll({
            disableRaf: true,
            ease: 0.3,
        });
       GSAP.ticker.add(asscroll.update);
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });
        ScrollTrigger.scrollerProxy(asscroll.containerElement,{
            scrollTop(value){
                if(arguments.length){
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect(){
                return{ top:0, left:0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        requestAnimationFrame(() =>{
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")

            });
            
        });
        return asscroll;
    }
 
    setSmoothScroll(){

    }
    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
           
            "(min-width: 969px)": ()=> {
                console.log("fired desktop")
                this.room.scale.set(0.11, 0.11,0.11);
                this.firstMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                });
                this.firstMoveTimeline.to(this.room.position,{
                    x: ()=>{
                        return this.sizes.width * 0.0022;
                        
                    },
                });
                this.secondMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                });
                this.secondMoveTimeline.to(this.room.position,{
                    x: ()=>{
                        return 1
                        
                    },
                    z:()=>{
                        return this.sizes.height*0.0032;
                    }
                },"same");
                this.secondMoveTimeline.to(this.room.scale,{
                   x:0.4,
                   y:0.4,
                   z:0.4,
                },"same");
                this.thirdMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    markers:true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position,{
                    y:-2.5,
                    x: -2.1,
                });
                
            },
            "(max-width: 968px)": ()=> {
                console.log("fired mobile");
                this.room.scale.set(0.07,0.07,0.07);
                this.room.position.set(0,0,0);
                this.firstMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                }).to(this.room.scale,{
                    x:0.1,
                    y:0.1,
                    z:0.1,
                });
                this.secondMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                }).to(this.room.scale,{
                    x:0.25,
                    y:0.25,
                    z:0.25,
                },"same").to(this.room.position,{
                    x:1.5,
                },"same")
                this.thirdMoveTimeline = new GSAP.timeline({ scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    markers:true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },

                });
                
            },
           
            "(min-width: 600px) and (max-width: 959px)": function() {
              
            },
          
  
            "(max-width: 599px)": function() {
              
            },
              
          
            "all": ()=> {
              this.sections = document.querySelectorAll(".section");
              this.sections.forEach(section =>{
                 this.progressWrapper = section.querySelector(".progress-wrapper");
                 this.progressBar = section.querySelector(".progress-bar");
                 if(section.classList.contains("right")){
                    GSAP.to(section,{
                        borderTopLeftRadius:10,
                        scrollTrigger:{
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                            markers: true,
                        }
                    });
                    GSAP.to(section,{
                        borderBottomLeftRadius:700,
                        scrollTrigger:{
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                            markers: true,
                        }
                    })
                 }
                 else{
                    GSAP.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger:{
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                            
                        },
                    });
                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger:{
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                           
                        },
                    });
                 
                 GSAP.from(this.progressBar,{
                    scaleY: 0,
                    scrollTrigger:{
                        trigger: section,
                         start: "top top",
                         end: "bottom bottom",
                         scrub: 0.4,
                         pin: this.progressWrapper,
                         pinSpacing : false,

                    }

                 })
                
               
                }
            })
              
          
  
        } 
    })
}
   
    

    resize() {
       
    }

    update() {
        
       
    }
}