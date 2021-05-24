let mouse = document.querySelector(".mouse")
let site = document.querySelector(".site")
let rowClass = document.querySelector(".rowclass")
let colomnClass = document.querySelector(".colomnClass")

function mouseFunc(e){
    const x = e.clientX;
    const y = e.clientY;
    console.log(x, y);
    //mouse.style.transform = `translate(${x}px, ${y}px)`
    //site.style.transform = `translate(${x}px, ${y}px)`
    site.innerHTML = `${x}px, ${y}px`
    rowClass.style.top = `${y}px`
    colomnClass.style.left = `${x}px`
    mouse.style.top = `${y}px`
    mouse.style.left = `${x}px`
    site.style.top = `${y}px`
    site.style.left = `${x}px`
}

window.addEventListener("mousemove", mouseFunc);