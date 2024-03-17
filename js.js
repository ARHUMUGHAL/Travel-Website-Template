function loco() {
  gsap.registerPlugin(ScrollTrigger);


  // --- SETUP START ---
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
      return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.defaults({ scroller: "#main" });

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()


let playBtn = document.querySelector(".play_btn i")
let audio = document.querySelector(".music video")

let count = 0;

playBtn.addEventListener("click", function () {
  if (count == 0) {
    count = 1
    audio.play()
  }
  else {
    audio.pause()
    audio.currentTime = 0
    count = 0
  }
})

let firstVideoPlayBtn = document.querySelector(".video_1 i");
let firstVideo = document.querySelector(".video_1 video");

let firstPause = 0
firstVideoPlayBtn.addEventListener("click", function () {
  if (firstPause == 0) {
    firstVideoPlayBtn.style.opacity = "20%"
    firstVideo.play()
    firstPause = 1
  }
  else {
    firstVideoPlayBtn.style.opacity = "100%"
    firstVideo.pause()
    firstVideo.currentTime = 0
    firstPause = 0
  }
})


let secondVideoPlayBtn = document.querySelector(".video_2 i");
let secondVideo = document.querySelector(".video_2 video");


let secondPause = 0
secondVideoPlayBtn.addEventListener("click", function () {
  if (secondPause == 0) {
    secondVideoPlayBtn.style.opacity = "20%"
    secondVideo.play()
    secondPause = 1
  }
  else {
    secondVideoPlayBtn.style.opacity = "100%"
    secondVideo.pause()
    secondVideo.currentTime = 0
    secondPause = 0
  }
})


