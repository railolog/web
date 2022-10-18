var form = document.querySelector('.formWithValidation')
var yVal = document.querySelector('.y')
var xVal = null
var rVal = null
var xBtns = document.querySelectorAll('.x')
var rBtns = document.querySelectorAll('.r')
var xError = document.querySelector('.error.x')
var yError = document.querySelector('.error.y')
var rError = document.querySelector('.error.r')
var table = document.querySelector('.results')
var parser = new DOMParser();
var y;


let xhr = new XMLHttpRequest()

function addColon(row, val){
    var colon = document.createElement('td')
    colon.innerText = val
    row.appendChild(colon)
}

function handleValid(responseObj, tr) {
    addColon(tr, responseObj.x)
    addColon(tr, responseObj.y)
    addColon(tr, responseObj.r)
    addColon(tr, responseObj.hit)
    addColon(tr, responseObj.t)
    addColon(tr, responseObj.wt)

    //table.appendChild(tr)
}

function handleInValid(tr) {
    var colon = document.createElement('td')
    colon.innerText = 'Сервер получил некорректные данные'
    colon.colSpan = 6
    colon.style.color = "red";
    tr.appendChild(colon)
}

xhr.onload = function() {
    console.log(xhr.response)
    console.log(xhr.response == "invalid request")

    var tr = document.createElement('tr')

    if (xhr.response == "invalid request"){
        handleInValid(tr);
    }
    else {
        var responseObj = JSON.parse(xhr.response)
        handleValid(responseObj, tr);
    }

    table.appendChild(tr);
}

xhr.onerror = function() {
    alert('Запрос не удался')
}

function updateClickedBtn(clickedBtn, others){
    valToChange = clickedBtn.value
    others.forEach(b => b.style.background = "white")
    clickedBtn.style.background = "red"
}

xBtns.forEach(b => b.addEventListener('click', function() {
    updateClickedBtn(this, xBtns)
}))

xBtns.forEach(b => b.addEventListener('click', function() {
    xVal = this.value
}))

rBtns.forEach(b => b.addEventListener('click', function() {
    updateClickedBtn(this, rBtns)
}))

rBtns.forEach(b => b.addEventListener('click', function() {
    rVal = this.value
}))

function valdateX(){
    if (!xVal){
        xError.textContent = 'Выберите значение X перед проверкой'
        return false
    }
    else{
        xError.textContent = ''
        return true
    }
}

function valdateY(){
    y = yVal.value

    if (y.length == 0){
        yError.textContent = 'Пожалуйста, введите число'
        return false
    }

    console.log(y.length)
    if (y.length > 5){
        y = y.substr(0, 5);
    }
    console.log(y.length)

    y = Number(y.replace(",", "."))

    if (isNaN(y)){
        yError.textContent = 'Пожалуйста, введите число'
        return false
    }
    else if (y < -3 || y > 5){
        yError.textContent = 'Введите значение Y в диапазоне от -3 до 5'
        return false
    }
    else{
        yError.textContent = ''
        return true
    }
}

function valdateR(){
    if (!rVal){
        rError.textContent = 'Выберите значение R перед проверкой'
        return false
    }
    else{
        rError.textContent = ''
        return true
    }
}

function sendRequestToPHP(){
    console.log(1)
    var params = 'x=' + encodeURIComponent(xVal) +
                 '&y=' + encodeURIComponent(y) +
                 '&r=' + encodeURIComponent(rVal) +
                 '&t=' + encodeURIComponent(new Date().getTimezoneOffset());
    xhr.open('GET', '/~s335079/script.php?' + params, true)
    //xhr.responseType = 'json'
    xhr.send()

    console.log(2)
}

form.addEventListener('submit', function(event) {
    event.preventDefault()
    if (valdateX() & valdateY() & valdateR()){
        console.log('send')
        sendRequestToPHP()
    }
})