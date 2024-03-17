//宣告 color
let color = '';
let primary = '#FFD366';
let green = '#86D73F'; //理想體重
let blue = '#31BAF9'; //過輕
let orange = '#FF982D'; //過重
let lightOrange = '#FF6C03'; //輕度 & 重度肥胖
let danger = '#FF1200 '; //重度肥胖

//宣告變數
let myBMI;
let myHeight;
let myWeight;
let calBtn = document.getElementById('calBtnId');
let resultImg = document.querySelector('.resultImg');
let resetBtn = document.querySelector('.resetBtn');
let resultRank = document.querySelector('.rank');
let delListBtn = document.querySelector('.delListBtn');
let recordList = document.querySelector('.recordList');
var data = JSON.parse(localStorage.getItem('BMIData')) || [];

//取得日期
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

updateList(data);

//點擊看結果按鈕
calBtn.addEventListener('click', function (e) {

    e.preventDefault();

    myHeight = document.getElementById('inputHeight').value;
    myWeight = document.getElementById('inputWeight').value;

    myHeight = myHeight / 100;
    myBMI = (myWeight / (myHeight * myHeight.toFixed(2))).toFixed(2);

    //判斷是否有輸入資料
    if (myHeight == '' || myWeight == '') {
        alert('請輸入資料');
    }
    else {
        calculat();
    }

}, false)

//計算 BMI
function calculat() {

    //reset 按鈕出現
    resetBtn.setAttribute('class', 'resetBtn')
    resultImg.setAttribute('class', 'resultImg')
    calBtn.setAttribute('class', 'd-none')
    resultImg.innerHTML = myBMI + '<span>BMI</span>';

    if (myBMI <= 18.5) {
        resultRank.textContent = '過輕';
        resultColor(blue);
        color = blue;
    }
    else if (myBMI > 18.5 && myBMI <= 25) {
        resultRank.textContent = '理想';
        resultColor(green);
        color = green;
    }
    else if (myBMI > 25 && myBMI <= 30) {
        resultRank.textContent = '過重';
        resultColor(orange);
        color = orange;
    }
    else if (myBMI > 30 && myBMI <= 35) {
        resultRank.textContent = '輕度肥胖';
        resultColor(lightOrange);
        color = lightOrange;
    }
    else if (myBMI > 35 && myBMI <= 40) {
        resultRank.textContent = '中度肥胖';
        resultColor(lightOrange);
        color = lightOrange;
    }
    else {
        resultRank.textContent = '重度肥胖';
        resultColor(danger);
        color = danger;
    }


    BMIData = {
        height: `${myHeight * 100}cm`,
        weight: `${myWeight}kg`,
        BMI: myBMI,
        resultRank: resultRank.textContent,
        time: `${month}-${day}-${year}`,
        color: color
    };

    data.splice(0, 0, BMIData);

    updateList(data);

    localStorage.setItem('BMIData', JSON.stringify(data));

}

//reset 按鈕設計
resetBtn.addEventListener('click', function (e) {

    e.preventDefault();

    let reset = document.querySelector('.resetBtn');
    reset.setAttribute('class', 'd-none');
    document.getElementById('inputHeight').value = '';
    document.getElementById('inputWeight').value = '';
    document.querySelector('.rank').textContent = '';
    

    resultImg.setAttribute('class', 'd-none')
    calBtn.setAttribute('class', 'calBtn')


}, false)

//輸出 data 資料
function updateList(items) {

    recordList.innerHTML = '';

    let str = "";
    let len = items.length;

    for (let i = 0; i < len; i++) {
        str += `<li data-num = ${i} 
                    <div style = 'border-color:${data[i].color}'> ${data[i].resultRank}</div>
                    <div><span>BMI</span>${data[i].BMI}</div>
                    <div><span>weight</span>${data[i].weight}</div>
                    <div><span>height</span>${data[i].height}</div>
                    <span>${data[i].time}</span>
                </li>`
    }

    recordList.innerHTML = str;

}

//清除所有資料
delListBtn.addEventListener('click', function (e) {

    e.preventDefault();
    localStorage.removeItem('BMIData');
    data.splice(data)
    updateList(data);

}, false)

//顏色變化
function resultColor(color) {

    resultRank.style['color'] = color
    resetBtn.style['background'] = color;
    resetBtn.style['border-color'] = color;
    resultImg.style['border-color'] = color;
    resultImg.style['color'] = color;
    
}
