let mouse = document.querySelector(".mouse")
let site = document.querySelector(".site")
let rowClass = document.querySelector(".rowclass")
let colomnClass = document.querySelector(".colomnClass")
let mouseRect = mouse.getBoundingClientRect();
const mouseHalfWidth = mouseRect.width / 2
const mouseHalfHeigth = mouseRect.height / 2

function mouseFunc(e){
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    mouse.style.transform = `translate(${x -mouseHalfWidth}px, ${y - mouseHalfHeigth}px)`
    site.style.transform = `translate(${x}px, ${y}px)`
    colomnClass.style.transform = `translateX(${x}px)`
    rowClass.style.transform = `translateY(${y}px)`
    site.innerHTML = `${x}px, ${y}px`

    //rowClass.style.top = `${y}px`
    //colomnClass.style.left = `${x}px`
    //mouse.style.top = `${y}px`
    //mouse.style.left = `${x}px`
    //site.style.top = `${y}px`
    //site.style.left = `${x}px`
}

window.addEventListener("mousemove", mouseFunc);


window.addEventListener("load", () => {
    window.addEventListener("mousemove", mouseFunc);
})