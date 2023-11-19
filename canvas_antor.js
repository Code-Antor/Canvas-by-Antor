//write it into a function named 
//canvas();

function canvass(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    });
  
    function files(index) {
     //add your images into var data🔰  
     //some example added🔰   
      var data = `
    // ./frames00007.png
    // ./frames00010.png
    // ./frames00013.png
    // ./frames00016.png
    // ./frames00019.png
    // ./frames00022.png
    // ./frames00025.png
    // ./frames00028.png
    // ./frames00031.png
      `;
      return data.split("\n")[index];
    }
  
    const frameCount = 67;
    const images = [];
    const imageSeq = {
      frame: 1,
    };
  
    // Preload all images before starting GSAP animation
    // Corrected By Antor.SK
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
      }
    };
  
    preloadImages();
  
    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 1,
        trigger: ".page3>canvas",
        // markers: true,
        start: "top top",
        end: "250% top",
        scroller: "#main",
      },
      onUpdate: render,
    });
  
    function render() {
      scaleImage(images[imageSeq.frame], context);
    }
  
    function scaleImage(img, ctx) {
      var canvas = ctx.canvas;
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.max(hRatio, vRatio);
      var centerShift_x = (canvas.width - img.width * ratio) / 2;
      var centerShift_y = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }
  
    ScrollTrigger.create({
      trigger: ".page1",
      pin: true,
      start: "top top",
      end: "250% top",
      scroller: "#main",
    });
  
  }
  canvass();
