//console.clear();

let addBtn = document.getElementById("addBtnId");
let addName = document.getElementById("addName");
let addImg = document.getElementById("addImg");
let addViewPoint = document.getElementById("addViewPoint");
let addTicketDescribe = document.getElementById("addTicketDescribe");
let addSetNum = document.getElementById("addSetNum");
let addTicketMoney = document.getElementById("addTicketMoney");

let searchBtn = document.getElementById("searchBtnId");
let ticketList = document.querySelector(".ticketList");
let selectArea = document.getElementById("selectAreaId");
let selectMoney = document.getElementById("selectMoneyId");
let selectKeyword = document.getElementById("keywordId");
let searchResult = document.getElementById("searchResultId");
let searchData = {data:[]};

//套票 Data
let ticketData = {data:[]};

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
  // 成功的 response
  response.data.data.forEach((item) => { ticketData.data.push(item); })
  addList();
})
  .catch(function (error) {
    // 失敗的 response
    console.log(error);
})


//新增旅遊套票
function addList(){
  ticketList.innerHTML = '';
  ticketData.data.forEach( (item) => {inputToList(item)} )
}

//搜尋關鍵字
searchBtn.addEventListener('click',function (e){
  search(e);
},false);

//搜尋地區
selectArea.addEventListener('change', (e) => {
  search(e);
  chartDisplay('area');
},false);

//搜尋價格
selectMoney.addEventListener('change', (e) => {
  ticketData.data.forEach((item) => {
    if(item.price <= 500) item.priceInterval = '500 以下';
    else if(item.price>500 && item.price <1000) item.priceInterval = '501-999';
    else if(item.price >= 1000) item.priceInterval = '1000 以上';
  })
  search(e);
  chartDisplay('priceInterval');
},false);


//渲染列表
function inputToList(item){
  ticketList.innerHTML += `<li class="ticketContent">
                <div class="imgInfo">
                    <img src="${item.imgUrl}" alt="">
                    <p class="areaName">${item.area}</p>
                </div>
                <h2 class="ticketTitle">${item.name}</h2>
                <p class="ticketDescribe">${item.description}</p>
                <p class="ticketCountDown">剩下倒數 ${item.group} 組套票</p>
                <p class="ticketMoney">$${item.price}</p>
            </li>`;
}

//紀錄搜尋的 value
let search = (e) =>{
  let selectAreaValue = selectArea.value;
  let selectMoneyValue = selectMoney.value;
  let selectKeywordValue = selectKeyword.value;
  selectData(selectAreaValue,selectMoneyValue,selectKeywordValue);
}

//搜尋資料
function selectData(area,money,keyword){
  let filterData;
  ticketList.innerHTML = "";
  searchResult.innerHTML = "";
  searchData = {data:[]};
  
  if (keyword == ""){
    if (area == "全部地區" && money == "不限金額"){
      addList();
      searchResult.innerHTML = `搜尋資料為 <em>${ticketData.data.length}</em> 筆`;
    }else{
      if( area == "全部地區" && money !== "不限金額"){
        //只搜尋金額相同
        filterData = ticketData.data.filter((item) =>(item.priceInterval == money));
      }else if(area !== "全部地區"){
        if(money !== "不限金額"){
          //搜尋地區和金額相同
          filterData = ticketData.data.filter((item) => (item.area == area && item.priceInterval == money));        
        }else if(money == "不限金額"){
          //只搜尋地區相同
          filterData = ticketData.data.filter((item) =>(item.area == area));
        }
      }

    } 
  }else if (keyword !== ""){
    if (area == "全部地區" && money == "不限金額"){
      //印出包含關鍵字的全部資料 
      filterData = ticketData.data.filter((item, index, array) => item.name.includes(keyword));
    }else if( area == "全部地區" && money !== "不限金額"){
      //只搜尋金額和關鍵字相同
      filterData = ticketData.data.filter((item) => item.name.includes(keyword) && item.priceInterval == money);
    }else if(area !== "全部地區"){
      if(money !== "不限金額"){
        //搜尋地區和金額和關鍵字相同
        filterData = ticketData.data.filter((item) => (item.area == area && item.name.includes(keyword) && item.priceInterval == money));
      }else if(money == "不限金額"){
        //只搜尋地區和關鍵字相同
        filterData = ticketData.data.filter((item, index, array) => (item.area == area && item.name.includes(keyword)));
      }
    }
  }
  
  filterData.forEach( (item) => { inputSearchData(item);} );
  searchResult.innerHTML = `搜尋資料為 <em>${searchData.data.length}</em> 筆`;
  
  //沒有符合的資料
  if(ticketList.innerHTML == ""){
    ticketList.innerHTML += `<li class="ticketContent"><h2 class="ticketTitle">沒有符合條件的套票！</h2></li>`;
    searchResult.innerHTML = "";
  }  
}

//新增到 searchData 裡並印出來
function inputSearchData(item){
  searchData.data.push(ticketData.data[item]);
  inputToList(item);
}

//表單驗證
let addTicketForm = document.getElementById("addTicketId");
let input = document.querySelectorAll("#addTicketId input, #addTicketId select, #addTicketId textarea");

let constraints = {
  "套票名稱":{
    presence:{
      allowEmpty: false,
      message: "為必填欄位"
    },
  },
  "圖片網址":{
    presence:{
      message: "為必填欄位"
    },
    url: {
      schemes: ["http","https"],
      message: "填寫格式錯誤，必須是正確的網址"
    }
  },
  "景點地區":{
    presence:{
      message: "為必填欄位"
    }
  },
  "套票描述":{
    presence:{
      allowEmpty: false,
      message: "為必填欄位"
    }
  },
  "套票組數":{
    presence:{
      message: "為必填欄位",
    },
    numericality: { // min="1" max="99"
      greaterThan: 0,
      notGreaterThan: "必須大於 0",
      lessThan: 100,
      notLessThan: "必須小於 99"
    }
  },
  "套票金額":{
    presence:{
      message: "為必填欄位",
    },
    numericality: { // min="1" max="9999"
      greaterThan: 0,
      notGreaterThan: "必須大於 0",
      lessThan: 9999,
      notLessThan: "必須小於 9999"
    }
  }
}

addTicketForm.addEventListener("submit",function(e){
  e.preventDefault();
  handleFormSubmit(addTicketForm);
})

function handleFormSubmit(form){
  let errors = validate(form,constraints);
  if (errors){
    Object.keys(errors).forEach((keys) => document.querySelector(`.${keys}`).textContent = errors[keys]);
  }else {
    //console.log("success")
    addTicketSuccess();
  }
  
  input.forEach((item) => {
    item.addEventListener("change", (e) => {
      let message = document.querySelector(`.messages.${item.name}`);
      message.textContent= "";
      let errors = validate(form,constraints);
      if (errors){
        Object.keys(errors).forEach((keys) => document.querySelector(`.${keys}`).textContent = errors[keys]);
      }
    })
  })
}

//新增套票
function addTicketSuccess(){
  //取出各欄位的值
  let ticketName = document.getElementById("ticketNameId").value;
  let imgUrl = document.getElementById("imgUrlId").value;
  let viewPoint = document.getElementById("viewPointId").value;
  let ticketDescribe = document.getElementById("ticketDescribeId").value;
  let setNum = document.getElementById("setNumId").value;
  let ticketMoney = document.getElementById("ticketMoneyId").value;
  
  let addTicketData = {
      id: ticketData.data.length,
      name: ticketName,
      imgUrl: imgUrl,
      area: viewPoint,
      description: ticketDescribe,
      group: parseInt(setNum),
      price: parseInt(ticketMoney),
      rate: null,
  };
  
  addTicketForm.reset();
  ticketData.data.push(addTicketData);
  addList();
}

//圖表
function chartDisplay(name){
  let editData = {};
  let title;
  ticketData.data.forEach((item,index) => {
    if(editData[item[name]] == undefined){
      editData[item[name]] = 1;
    }else{
      editData[item[name]] += 1;
    }
  });
  
  let columns = []
  let editDataKey = Object.keys(editData);
  
  editDataKey.forEach((item,index) => {
    columns.push([[item],editData[item]])
  })
  
  if(name == "area"){
    title = "地區"
  }else{
    title = "價位"
  }
  
  let chart = c3.generate({
    data: {
      columns: columns,
      type : 'donut',
    },
    donut: {
      title: title
    }
  })
}