function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


 



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();


function navAnimation() {
  var nav = document.querySelector("nav")

nav.addEventListener("mouseenter",function(){
    let tl = gsap.timeline()
  tl.to("#nav-bottom",{
    height:"24vh"
  })
  tl.to(".nav-part2 h5",{
    display:"block"
  })
  tl.to(".nav-part2 h5 span",{
    y:0,
    // duration:0.3,
    stagger:{
      amount:0.4
    }
  })
  
})

nav.addEventListener("mouseleave",function(){
  let tl = gsap.timeline()
 
tl.to(".nav-part2 h5 span",{
  y:25,
  // duration:0.3,
  stagger:{
    amount:0.2
  } 
})
tl.to(".nav-part2 h5",{
  display:"none",
  duration:"0.1"
})
tl.to("#nav-bottom",{
  height:"0",
  duration:"0.1",
})
})
}
navAnimation();

function page2Animation() {
  var relem=document.querySelectorAll("#right-elem")
  relem.forEach(function(elem) {
     elem.addEventListener("mouseenter",function(){
         gsap.to(elem.childNodes[3],{
           opacity :1,
           scale:1
         })
 
      }) 
     elem.addEventListener("mouseleave",function(){
       gsap.to(elem.childNodes[3],{
         opacity : 0,
         scale:0
       })
      }) 
      elem.addEventListener("mousemove",function(dets){
       gsap.to(elem.childNodes[3],{
           x:dets.x - elem.getBoundingClientRect().x-80,
           y:dets.y -elem.getBoundingClientRect().y-50
       })
      })
  })
}

page2Animation();

function page3VideoAnimation() {
  var play = document.querySelector(".icon i")
var video = document.querySelector("#page3 video")

play.addEventListener("click",function () {
  video.play()
  gsap.to(video,{
    transform:"scaleX(1) scaleY(1)",
    opacity:1,
    borderRadius:0
  })
})
video.addEventListener("click",function () {
  video.pause()
  gsap.to(video,{
    transform:"scaleX(0.7) scaleY(0)",
    opacity:0,
    borderRadius:"30px"
  })
})
}

page3VideoAnimation();

function videoAni() {
  var sec = document.querySelectorAll(".sec1-right")

 
  sec.forEach(function(elem){
         elem.addEventListener("mouseenter",function(){
           elem.childNodes[3].style.opacity = 1
           elem.childNodes[3].play()
         })
         elem.addEventListener("mouseleave",function(){
           elem.childNodes[3].style.opacity = 0
           elem.childNodes[3].load()
         })
  })
}

videoAni();

function page9Animation() {
  gsap.from(".btmn-parts h4",{
    x:0,
    duration:1,
    scrollTrigger:{
      trigger:".btmn-parts",
      scroller:"#main",
      // markers:"true",
      start:"top 80%",
      end: "top 10%",
      scrub:true
    }
  })
}
page9Animation();