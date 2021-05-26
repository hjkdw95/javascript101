let listInput = document.querySelector("input")
let sumbit = document.querySelector(".submit")
let lists = document.querySelector("ul")


// 저장소
// 저장소 이름
const list_LS = "listSave"
//저장소 value
let listSave = [];
let idNumbers = 1;


// 1. input에서 얻어온 값을 list에 올려주는 함수로 보낸다
function onAdd(event){
    const currentValue = listInput.value;
    if(currentValue === ""){
        listInput.focus();
        return;
    }
    listUp(currentValue);
    listInput.value = "";
    listInput.focus();
    
}

// 2. list 생성 함수 - list입력/제거, local storage저장/삭제 기능
function listUp(text){
    //list에 추가
    const list = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = text;
    list.append(span);
    lists.append(list);

    // 새로 추가된 아이템으로 스크롤링
    list.scrollIntoView({block: "center"});


    // local storage에 저장
    const newId = idNumbers;
    idNumbers += 1;
    list.id = newId;

    const listObj = {
        text: text,
        id: newId
    };
    listSave.push(listObj);
    saveLists();


    //delete 버튼
    const delBtn = document.createElement("button");
    delBtn.setAttribute('class', 'trash');
    delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
    list.append(delBtn);
    
    delBtn.addEventListener("click", deleteItem);
}


// 3. 업데이트 한 array를 local storage에 저장
function saveLists(){
    localStorage.setItem(list_LS, JSON.stringify(listSave))
}

// 3-1. LS에 저장된 데이터를 화면에 보이게 할 함수
function loadLists(){
    const loadedLists = localStorage.getItem(list_LS);
    if(loadedLists !== null){
        const parsedLists = JSON.parse(loadedLists);
        parsedLists.forEach(list => {
            listUp(list.text)
        });
    }
}

// 4. local storage 및 리스트에서 삭제 기능을 수행하는 함수
function deleteItem(event)
    const li = event.target.parentNode.parentNode; // <li>
    lists.removeChild(li);

    // localstroage에서 지우기
    const cleanList = listSave.filter(function(item){
        return item.id !== parseInt(li.id);
        //item.id = number
        //li.id = string -> parseInt 사용(숫자로 반환)
    });
    listSave = cleanList;
    saveLists();
}




function init(){
    loadLists();
    sumbit.addEventListener("click", onAdd);
    listInput.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            onAdd();
        }
    });
}

init();