const picCard = document.querySelector('.js-flip');
const cardFront = document.querySelector('.cardFront');
const cardBack = document.querySelector('.cardBack');
const main = document.querySelector('.main')
const QRcode = document.querySelector('.QRcode')
const QRcode02 = document.querySelector('.QRcode02')

const btn01 = document.getElementById('btn01')
const questionnaire = document.querySelector('.questionnaire')

const confirmBtn = document.getElementById('confirmBtn')

const endBtn = document.getElementById('endBtn')

const finalList = document.getElementById("materialsLink");

const starBtn = document.getElementById('starBtn')

const qrIMG = document.getElementById('qrIMG')


if (qrIMG){
  qrIMG.addEventListener('click', function(e){
    // console.log(132)

    QRcode.classList.toggle('close')
    if(QRcode02){
      QRcode02.classList.toggle('close')
    }
  }, false)
}
// //addEventListener 監聽有沒有執行這個事件（這個 click 有沒有執行這個函式）

if(starBtn){
  const randomNum = shuffleList()
  localStorage.setItem("myOrder", JSON.stringify(randomNum));
  starBtn.addEventListener('click', function(e) {
    let orderArray = JSON.parse(localStorage.getItem('myOrder'))
    orderArray[0]["done"] = "active"
    localStorage.setItem("myOrder", JSON.stringify(orderArray));
    window.location.href=`./materials/ver0${orderArray[0]["no"]}.html`;
  }, false)
}


// 圖卡翻面
if (picCard){
  picCard.addEventListener('click', function(e){
  cardBack.classList.toggle('active')
}, false)
}

// 問卷開始
if(btn01){
btn01.addEventListener('click', function(e){
  // bannerFooter.classList.add('close')
  main.classList.add('close')
  questionnaire.classList.remove('close')
  window.document.body.scrollTop = 0
  window.document.documentElement.scrollTop = 0
}, false)

}


// 結束，回到主頁
if (endBtn) {
  endBtn.addEventListener('click', function(e){
    localStorage.clear() 
    window.location.href=`https://skar5268.github.io/PaperExperiment/index.html`;

  },false)
}


// localStorage.clear();

// 教材隨機排列
function shuffleList() {
  // let list = [1, 2, 3, 4];
  let list = [
    {"no":1,
    "done":"no"},
        {"no":2,
    "done":"no"},
        {"no":3,
    "done":"no"},
        {"no":4,
    "done":"no"}
  ]
  // console.log(array.length)
  for (let i = 0; i<list.length; i++) {
    let num = Math.floor(Math.random() * (i + 1));
    [list[num], list[i]] = [list[i], list[num]];
  }
  return list
}

// 渲染教材連結
function randomLink(randomNum) {
  let list = ''

//   randomNum[0]["done"] = "done"
//   randomNum[1]["done"] = "active"
// console.log(randomNum)
  for (let i = 0; i<4; i++) {
    // localStorage.setItem("order01", "done");

    // localStorage.setItem("order02", "active");
    let link=""

    // let orderArray = JSON.parse(localStorage.getItem('myOrder'))

    // if (localStorage.getItem(`order0${i+1}`) === "done") link = `<li class="done"><a href="./pages/materials/ver0${randomNum[i]}.html">第 ${i+1} 版本教材</a></li>`
    // else if (localStorage.getItem(`order0${i+1}`)==="active") link = `<li  class="active"><a href="./pages/materials/ver0${randomNum[i]}.html">第 ${i+1} 版本教材</a></li>`
    // else link = `<li><a href="./pages/materials/ver0${randomNum[i]}.html">第 ${i+1} 版本教材</a></li>`
    // <a href="./pages/materials/ver0${randomNum[i]["no"]}.html">

    if (randomNum[i]["done"] === "done") link = `<li class="done">第 ${i+1} 版本教材</li>`
    else if (randomNum[i]["done"] ==="active") link = `<li  class="active">第 ${i+1} 版本教材</li>`
    else link = `<li>第 ${i+1} 版本教材</li>`


    list += link

  }

  return list
// console.log(list)
}
  // const randomNum = shuffleList()
  // console.log(randomNum)
// console.log(localStorage.getItem('myOrder'))
// localStorage.setItem("myOrder", 0);
if(finalList){
  let orderArray = JSON.parse(localStorage.getItem('myOrder'))

  // console.log(randomNum)
  let finalString = randomLink(orderArray)
  // console.log(finalString)
  
  // let finalList = document.getElementById("materialsLink");
  finalList.innerHTML = `<li class="done">學習成效前測</li>
  ${finalString}
  <li>學習情緒量表</li>
  <li>填寫回饋</li>`;
  
  // 儲存順序
  localStorage.setItem("myOrder", JSON.stringify(orderArray));
  // console.log(localStorage.getItem('myOrder'))
}

  // localStorage.setItem("myOrder", JSON.stringify(randomNum));

  // let orderArray = JSON.parse(localStorage.getItem('myOrder'))
// console.log(orderArray)
  // let finalString = randomLink(orderArray)
  // console.log(finalString)
  // let finalList = document.getElementById("materialsLink");
  // finalList.innerHTML = `<li class="done">學習成效前測</li>
  // ${finalString}
  // <li>填寫回饋</li>`;

// console.log(456)








if (confirmBtn) {
  
  confirmBtn.addEventListener('click', function(e){
    let orderArray = JSON.parse(localStorage.getItem('myOrder'))

    // let orderArray = JSON.parse(localStorage.getItem('myOrder'))
    let nextPage = 0
    
    for (let i = 0; i<4; i++){
      if (orderArray[i]["done"]==="active") 
      { orderArray[i]["done"]="done";
      nextPage = i + 1
    }

  }
      // console.log(nextPage)
if (orderArray[nextPage])
{
      orderArray[nextPage]["done"] = "active"
// console.log(orderArray)
  // let finalString = randomLink(orderArray)
  localStorage.setItem("myOrder", JSON.stringify(orderArray));
  window.location.href=`materials/ver0${orderArray[nextPage]["no"]}.html`;

} 
else {
  localStorage.setItem("myOrder", JSON.stringify(orderArray));
  window.location.href=`emotionalData.html`;
  // window.location.href=`feedback.html`;
}



}, false)

// console.log(localStorage.getItem('myOrder'))

// let orderArray = JSON.parse(localStorage.getItem('myOrder'))


}




// 等待 iframe 加載完成
const iframe = document.getElementById('questionnaireIframe'); // 替換 'your-iframe-id' 為實際的 iframe ID

if (iframe) {
  // const presentPath = location.pathname;


      iframe.onload = function() {
    // 重新載入整個頁面至 iframe 導向的網頁
    window.location.href = iframe.contentWindow.location.href;
};
  



}
