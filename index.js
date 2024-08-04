const stops0 = document.querySelector(".page2").getBoundingClientRect().left;
const stops = document.querySelector(".page3").getBoundingClientRect().left;



var scrollDirectionHorizontal = true;
document.querySelector("body").style.setProperty(`--maskDirection`, "90deg");

if (window.innerWidth < 500) {
  scrollDirectionHorizontal = false;
  document.querySelector("body").style.setProperty(`--maskDirection`, "180deg");
}

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  //   console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 5000);
});

gsap.ticker.lagSmoothing(0);

function gradientGenerator(p, target, maskname) {
  let linear = [];
  const divider = 30;
  let trans = 0.13;

  let dif2 = 3.33;
  let trans2 = 0.13;
  var dif = 3.33;
  const prev = 3.33;
  // const prev = 100 / divider;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (i = 1; i <= 30; i++) {
        if (p <= 30) {
          if (i >= 30 - p) {
            if (trans <= 3.33) {
              const black = `black ${dif - prev}% ${dif - trans}%,transparent ${
                dif - trans
              }% ${dif}%`;
              linear.push(black);
            } else if (trans >= 3.33) {
              const black = `black ${dif - prev}% ${dif - 3.33}%,transparent ${
                dif - 3.33
              }% ${dif}%`;
              linear.push(black);
            }
            trans = trans + 0.25;
          } else {
            const black = `black ${
              dif - prev
            }% ${dif}%,transparent ${dif}% ${dif}%`;
            linear.push(black);
          }
          dif = dif + prev;
          ////if progress is greater tha 30
        }
        if (p > 30) {
          if (i > 13) {
            const black = `black ${dif2 - prev}% ${
              dif2 - trans2
            }%,transparent ${dif2 - trans2}% ${dif2}%`;
            linear.push(black);
            dif2 = dif2 + prev;
            trans2 = trans2 + 0.25;
          } else if (i > 13 - (p - 30)) {
            trans2 = trans2 + 0.25;
          }
        }
      }

      
      document.querySelector(`.${target}`).style.setProperty(`--${maskname}`, `${linear.join(",")}`);
      resolve();
    }, 0);
  });
}

// -----------------------------------------------------THEME CHANGER--------------------------------------------------------------------------------------------

const body = document.querySelector("body");
const themeSelector = document.querySelectorAll(".themeSelector");

function toggleTheme() {
  console.log("toogle theme working");
  if (body.classList.contains("light")) {
    body.className = "dark";
    document.querySelectorAll(".light-theme")[0].classList.remove("active");
    document.querySelectorAll(".light-theme")[1].classList.remove("active");
    document.querySelectorAll(".dark-theme")[0].classList.add("active");
    document.querySelectorAll(".dark-theme")[1].classList.add("active");
  } else {
    body.className = "light";
    document.querySelectorAll(".light-theme")[0].classList.add("active");
    document.querySelectorAll(".light-theme")[1].classList.add("active");
    document.querySelectorAll(".dark-theme")[0].classList.remove("active");
    document.querySelectorAll(".dark-theme")[1].classList.remove("active");
  }
}

themeSelector.forEach((theme) => {
  theme.addEventListener("click", toggleTheme);
});
var pos;
const loadingTl = gsap.timeline({ paused: true });
for (let i = 1; i <= 10; i++) {
  pos = 100 * i;
  loadingTl.to(
    ".loadingPercentage span",
    {
      yPercent: -pos,
    },
    ">"
  );
}

loadingTl.timeScale(3).play();

const logo_tl = gsap.timeline();

logo_tl.from(".navLogo span", {
  yPercent: 100,
  duration: 1,
  stagger: 0.08,
  delay:2.5,
  ease: "power1.out",
});

// ---------------------------------PRE-LOADER ANIMATION--------------------------------------------------------------------------------------------------------------

const logo = document.querySelectorAll(".logo span");

const tl = gsap.timeline();
tl.from(logo, {
  yPercent: "100",
  duration: 0.8,
  stagger: 0.1,
  ease: "power1.out",
});
tl.to(".innerLayer", {
  yPercent: "-100",
  duration: 1,
  ease: "power2.inOut",
  delay: 0.7,
});

// -----------------------------------------------------------HORIZONTAL SCROLL---------------------------------------------------------------------------------

var tl2 = gsap.timeline({
  defaults: {
    ease: "none",
  },
  scrollTrigger: {
    trigger: ".container",
    pin: true,

    scrub: 2,
    end: "+=12000px",
    // markers:true
  },
});

const pageTwoImage = document.querySelector(".page2-image");

const pages = gsap.utils.toArray(".container section");

const s1 = document.querySelector(".page2").getBoundingClientRect().top;
if (scrollDirectionHorizontal) {
  tl2.to(pages, {
    x: `-${stops0}px`,
  });
} else {
  tl2.to(pages, {
    y: `-${s1}px`,
  });
}

if (scrollDirectionHorizontal) {
  tl2.to(
    pageTwoImage,
    {
      backgroundPosition: "40% 40%",
    },
    "<"
  );
} else {
  tl2.to(
    pageTwoImage,
    {
      backgroundPosition: "50% 20%",
    },
    "<"
  );
}

// -------------------------------------------navlogo Animation ON PAGE2------------------------------------------------------------------------

gradientGenerator(0, "page1", "mask1");

tl2.to(
  ".page1",
  {
    onUpdate:  function () {
      gradientGenerator(this.progress() * 43, "page1", "mask1");
    },
   
  },
  "<"
);

const s2 = document.querySelector(".page3").getBoundingClientRect().top;

// tl2.to(pages, {
//   xPercent: -200,
//   })
if (scrollDirectionHorizontal) {
  tl2.to(pages, {
    // xPercent: -200,
    x: `-${stops}px`,
  });
} else {
  tl2.to(pages, {
    y: `-${s2}px`,
  });
}

gradientGenerator(0, "layer0", "maskLayer0");
gradientGenerator(0, "layer1", "maskLayer1");
gradientGenerator(0, "layer2", "maskLayer2");
gradientGenerator(0, "layer3", "maskLayer3");

//PUMA image reveal

tl2.to(
  ".page3",
  {
    onUpdate: async function () { gradientGenerator(this.progress() * 43, "layer0", "maskLayer0"); },
  },
  "<"
);
tl2.to( ".layer1-img", { scale: 1, }, "<" );
tl2.to(".it1", { scale: 1, }, "<");


//ChatApp image reveal

tl2.to(".page3", {
  onUpdate: async function () {
    gradientGenerator(this.progress() * 43, "layer1", "maskLayer1");
  },
});
tl2.to( ".layer2-img", { scale: 1, }, "<" );
// if (scrollDirectionHorizontal) {
//   tl2.from(".it2", {
//     xPercent:100

//   },"<")
// } else {
//   tl2.from(".it2", {
//     yPercent:100

//   },"<")
// }
tl2.to( ".imageContainer .img_wrapper", { xPercent: "-100", }, "<" );

tl2.to( ".it1", { scale: 1.2, }, "<" );
tl2.to( ".it2", { scale: 1, }, "<" );

const footerstop = document
  .querySelector(".footer")
  .getBoundingClientRect().left;
const f2 =
  document.querySelector(".footer").getBoundingClientRect().bottom -
  window.innerHeight;


//Airbnb image reveal
tl2.to(".page3", {
  onUpdate: async function () { gradientGenerator(this.progress() * 43, "layer2", "maskLayer2"); },
});
tl2.to(".imageContainer .img_wrapper", { xPercent: "-200", }, "<");
tl2.to( ".it2", { scale: 1.2, }, "<" );
tl2.to(".layer3-img", { scale: 1 }, "<");



//airbnb image hide
if (scrollDirectionHorizontal) {
  tl2.to(pages, { x: `-${footerstop}px`});
} else {
  tl2.to(pages, { y: `-${f2}px`});
}
tl2.to(".page3", { onUpdate: async function () { gradientGenerator(this.progress() * 43, "layer3", "maskLayer3"); }, }, "<");



// -----------------------------------------------------------MOBILE MENU---------------------------------------------------------------------------------------
function mobileMenuFunctionality() {
  const menuTk = gsap.timeline({ paused: true, });
  menuTk.to(".line1", { top: "30px", });
  menuTk.to( ".line3", { top: "30px", }, "<" );
  menuTk.to( ".line2", { opacity: 0, }, "<" );

  menuTk.to(".line1", { rotate: "45deg", });
  menuTk.to(".line3", { rotate: "-45deg", }, "<");
  


  document.querySelector(".menu").addEventListener("click", () => {
    if (menuTk.progress() == 0) {
      menuTk.timeScale(1.5).play();
      document.querySelector(".menu").classList.add("menuActive");
      document.querySelector(".mobileNav").style.opacity = 1;
      document.querySelector(".mobileNav").style.pointerEvents = "all";
    } else {
      menuTk.timeScale(2).reverse();
      document.querySelector(".menu").classList.remove("menuActive");
      document.querySelector(".mobileNav").style.opacity = 0;
      document.querySelector(".mobileNav").style.pointerEvents = "none";
    }
  });
}
mobileMenuFunctionality();

function goToWork() {
  window.scrollTo({ top: 2000, behavior: "smooth" });
  document.querySelector(".menu").click();
}
function goToContact() {
  window.scrollTo({ top: 5000, behavior: "smooth" });
  document.querySelector(".menu").click();
}
function goToHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(".menu").click();
}
