let quote = document.querySelector(".quote")

// 각 요소 구하기
function sizePractice(){
    quote.innerHTML = `
    window.screen: ${window.screen.width}, ${window.screen.height}<br>
    window.outer: ${window.outerWidth}, ${window.outerHeight}<br>
    window.inner: ${window.innerWidth}, ${window.innerHeight}<br>
    documentElement.clientWidth: ${document.documentElement.clientWidth}, ${document.documentElement.clientHeight}<br>`
}

window.addEventListener("resize", sizePractice);
sizePractice();

