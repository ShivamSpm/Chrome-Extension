let myLinks = []

const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const clearBtn = document.getElementById("clear-btn")
const tabBtn = document.getElementById("tab-btn")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if(linksFromLocalStorage){
    myLinks = linksFromLocalStorage
    renderInput(myLinks)
}

inputBtn.addEventListener("click", function(){
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    renderInput(myLinks)
})

clearBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLinks = []
    renderInput(myLinks)
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        renderInput(myLinks)

    })
    
})


function renderInput(linkArray){
    let listItems = ""
    
    for(let i = 0; i < linkArray.length;i++){
        listItems +=
         `<li>
            <a href="${linkArray[i]}" target="_blank"> 
            ${linkArray[i]}
            </a>
        </li>`
    }
    
    ulEl.innerHTML = listItems
}



