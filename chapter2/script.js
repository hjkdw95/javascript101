let click = document.querySelector(".click")
let Yscroll = document.querySelector(".scrollY")
let Yscrollto = document.querySelector(".scrollYto")
let scrollSpecial = document.querySelector(".scrollSpecial")


function buttons(){
    //scrollBy : 일정 단위만큼 scroll하기
    Yscroll.addEventListener("click", () => window.scrollBy({
        top: 100,
        behavior: 'smooth'
        })
    )
    
    //scrollTo: 특정 위치로 scroll해서 가기
    Yscrollto.addEventListener("click", () => window.scrollTo(0, 100))
    
   // scrollIntoView: 특정 element로 바로 향한다
   scrollSpecial.addEventListener("click", function(){
           click.scrollIntoView()
   })
}


click.addEventListener("click", (event) => {
    const rect = click.getBoundingClientRect();
    console.log(rect);
    console.log(`clinetX : ${event.clientX}, clientY: ${event.clientY}`);
    console.log(`pageX : ${event.pageX}, pageY: ${event.pageY}`)
})

buttons()
