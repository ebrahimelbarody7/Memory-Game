// your Name and Start Game
let myName=document.querySelector(".info-container .name span")
let control=document.querySelector(".control-buttons span")
let allControl=document.querySelector(".control-buttons")

control.onclick=function(){
    allControl.remove()
    let yourName=prompt("Whats Your Name")
    if(yourName===""||yourName==="null"){
        myName.textContent="Unkown"
        allControl.style.display="none"
    }else{
        myName.textContent=yourName
    }
    
    
}

// Random

let duration=1000;

let memoryGame=document.querySelector(".memory-game")
let arrMemoryGame=Array.from(memoryGame.children)



let orderRange=[...Array(arrMemoryGame.length).keys()]

// console.log(orderRange)
shuffle(orderRange)
// console.log(orderRange)


arrMemoryGame.forEach((ele,index)=>{
    ele.style.order=orderRange[index]
    ele.onclick=function(){
        console.log(ele)
        // ele.children[0].style.zIndex=0
        // ele.children[0].style.transform="rotateY(180deg)"

        ele.children[0].classList.add("is-flipped")
        let a=arrMemoryGame.filter((e)=>e.children[0].classList.contains("is-flipped"))
        if(a.length===2){
            // console.log("two")
            stopClicking();
            checkAll(a[0],a[1]);
            // console.log(a[0].dataset.technology)
            
        }
    }
})

function shuffle(arr){
    let current=arr.length,
    temp,
    random
    while (current > 0) {
        random=Math.floor(Math.random()*current)
        current--
        // console.log(random)
        temp=arr[current]
        arr[current]=arr[random]
        arr[random]=temp
    }
    return arr
    

}
function stopClicking(){
    memoryGame.classList.add("stop")
    setTimeout(()=>{
        memoryGame.classList.remove("stop")
    },duration)
}


function checkAll(firstElement,second){
    let wrong=document.querySelector(".tries span")
    // console.log(firstElement.dataset.technology)
    if(firstElement.dataset.technology === second.dataset.technology){
        firstElement.children[0].classList.remove("is-flipped")
        second.children[0].classList.remove("is-flipped")

        firstElement.children[0].classList.add("good")
        second.children[0].classList.add("good")
        document.querySelector("#succes").play()
    }else{
        setTimeout((e)=>{
            wrong.innerHTML=Number(wrong.innerHTML)+1
            firstElement.children[0].classList.remove("is-flipped")
        second.children[0].classList.remove("is-flipped")

        },duration)
        document.querySelector("#fail").play()
    }
}