if(typeof $ == 'undefined' && jQuery){
  $ = jQuery;
}
const q = function(element,parent=document) {
  return parent.querySelector(element);
}
const a = function(element,parent=document) {
  return parent.querySelectorAll(element);
}
const c = function(name) {
  return document.createElement(name);
}
function utf8_to_b64(str) {
  if (str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  } else {
    return '';
  }
}

function b64_to_utf8(str) {
  if (str) {
    return decodeURIComponent(escape(window.atob(str)));
  } else {
    return '';
  }
}
function runSortTop( a, b ) {
  if ( a.top < b.top ){
    return -1;
  }
  if ( a.top > b.top ){
    return 1;
  }
  return 0;
}
// ================================================= event post message
function receiveMessage(event)
{   
    if(event.data &&( event.data.domain == 'salekit.io' || event.data.domain == 'fchat.vn')){
      let id;
      if(document.querySelector('iframe')){
        document.querySelectorAll('iframe').forEach((item)=>{
          if(item.contentWindow === event.source){
            id = item.closest('[id]').id;
          }
        })
      }
      if(id && id.indexOf('ORDER_DETAIL') > -1){
        let old_height = document.querySelector("#"+id+" *:first-child").offsetHeight;
        document.querySelector("#"+id+" *:first-child").style.height = event.data.height+'px';
        if(parseFloat(event.data.height)- parseFloat(old_height) > 0){
          upTopAllChildren(document.querySelector("#"+id+" *:first-child"),parseFloat(event.data.height)- parseFloat(old_height))  
        }
      }else if( id &&  id.indexOf('FRAME') > -1){
        let old_height = document.querySelector("#"+id+" iframe").offsetHeight;
        document.querySelector("#"+id+" iframe").style.height = event.data.height+'px';
        if(parseFloat(event.data.height)- parseFloat(old_height) > 0){
          upTopAllChildren(document.querySelector("#"+id+" iframe"),parseFloat(event.data.height)- parseFloat(old_height))  
        }
      }
    }
}
window.addEventListener("message", receiveMessage, false);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


var pay_fee = 0;
document.body.style.width = '100%';
document.body.addEventListener('click', function (event) {
  if (document.querySelector("[id^=FRAME_POPUP]") && event.target.tagName == 'BODY') {
    document.querySelectorAll("[id^=FRAME_POPUP]").forEach((item) => {
      item.style.display = 'none';
    })
  }
})
// countdown
var list_countdown = [];
document.querySelectorAll('[id^=COUNTDOWN]').forEach((item) => {
  // Set the date we're counting down to
  var countDownDate = new Date();
  if (!localStorage.getItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id) 
    && !item.getAttribute('min_hour') && !item.getAttribute('end_time_local')) {
    countDownDate.setDate(countDownDate.getDate() + parseInt(item.querySelector('.day').textContent));
    countDownDate.setHours(countDownDate.getHours() + parseInt(item.querySelector('.hours').textContent));
    countDownDate.setMinutes(countDownDate.getMinutes() + parseInt(item.querySelector('.minute').textContent));
    countDownDate.setSeconds(countDownDate.getSeconds() + parseInt(item.querySelector('.second').textContent));
    countDownDate = countDownDate.getTime();
    localStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
    sessionStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
    countDownTime(item.id)
  }else if(item.getAttribute('end_time_local')){
    let countDownDate = new Date(item.getAttribute('end_time_local'));
    countDownDate = countDownDate.getTime();
    localStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
    sessionStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
    countDownTime(item.id)
  }else if (item.getAttribute('min_hour')) {
    let time_start = new Date();
    time_start.setHours(item.getAttribute('min_hour').split(':')[0])
    time_start.setMinutes(item.getAttribute('min_hour').split(':')[1])
    time_start.setSeconds(item.getAttribute('min_hour').split(':')[2])
    if (countDownDate.getTime() >= time_start.getTime()) {
      countDownDate.setHours(item.getAttribute('max_hour').split(':')[0]);
      countDownDate.setMinutes(item.getAttribute('max_hour').split(':')[1]);
      countDownDate.setSeconds(item.getAttribute('max_hour').split(':')[2]);
      countDownDate = countDownDate.getTime();
      localStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
      sessionStorage.setItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id, countDownDate);
      countDownTime(item.id)
    }
  } else {
    countDownTime(item.id)
  }
})
function countDownTime(id) {
  let item = document.querySelector("#" + id);
  // Get today's date and time
  var now = new Date().getTime();
  // Find the distance between now and the count down date
  var distance = localStorage.getItem(document.querySelector("#landingpage").value + '_' + document.querySelector("#time_current").value + '_' + item.id) - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (days < 10) {
    days = '0' + days;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  // Display the result in the element with id="demo"
  item.querySelector('.day').textContent = days;
  item.querySelector('.hours').textContent = hours;
  item.querySelector('.minute').textContent = minutes;
  item.querySelector('.second').textContent = seconds;
  if (distance < 0) {
    item.querySelector('.day').textContent = '00';
    item.querySelector('.hours').textContent = '00';
    item.querySelector('.minute').textContent = '00';
    item.querySelector('.second').textContent = '00';
  } else {
    setTimeout(function () {
      countDownTime(id)
    }, 1000)
  }
}
if (document.querySelector("[id^=POPUP]")) {
  document.querySelectorAll("[id^=POPUP]").forEach((item) => {
    item.addEventListener('click', function (ev) {
      if (ev.target == item) {
        item.removeAttribute('style')
        document.body.classList.remove('open_modal');
        if (inIframe()) {
          window.parent.document.body.dispatchEvent(new Event("click"))
        }
      }
    })
  })
}

function convert_json_to_param(json) {
  let string = '';
  for (let i in json) {
    if (json[i]) {
      string += i + '=' + json[i] + '&';
    }
  }
  return string;
}
window.addEventListener("load", (event) => {
  if (getAllUrlParams().popup) {
    document.querySelector("#" + getAllUrlParams().popup).style.display = 'block';
  }
  if (inIframe()) {
    if (window.frameElement.id.indexOf('FRAME_POPUP') > -1) {
      showPopup();
    }
    window.parent.dispatchEvent(new CustomEvent('reload_url', {
      bubbles: true,
      detail: {
        url: window.location.href
      }
    }));
  }
});
document.addEventListener('reload_url', function (event) {
  let array_url_frame = true;
  if (document.querySelector('[id^=FRAME_POPUP]')) {
    document.querySelectorAll('[id^=FRAME_POPUP]').forEach((item) => {
      if (item.getAttribute('src').indexOf(event.detail.url) > -1) {
        array_url_frame = false;
      }
    })
  }
  if (array_url_frame) {
    window.location.href = event.detail.url;
  }
})


// play video
document.querySelectorAll('[id^="VIDEO"]').forEach((item) => {
  if(item.querySelector('[id^="SHAPE"]')){
    item.querySelector('[id^="SHAPE"]').addEventListener('click', function () {
      this.style.display = 'none';
      autoPlayVideo(item);
    })  
  }
})
function autoPlayVideo(item) {
  item.firstChild.id = item.id + 'play'
  switch (item.firstChild.getAttribute('data-type')) {
    case "youtube":
      var player;
      let id = getParam('v', item.firstChild.getAttribute('data-link'))
      if(item.firstChild.getAttribute('data-link').indexOf('short') > -1){
        id = item.firstChild.getAttribute('data-link').split('/')[item.firstChild.getAttribute('data-link').split('/').length-1];
      }
      try {
        player = new YT.Player(item.firstChild.id, {
          videoId: id, // YouTube Video ID
          playerVars: {
            autoplay: 1, // Auto-play the video on load
            autohide: 1, // Hide video controls when playing
            disablekb: 1,
            mute:1,
            playsinline:1,
            controls: 1, // Hide pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            loop: 1, // Run the video in a loop
            fs: 0, // Hide the full screen button
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: function (e) {
              e.target.playVideo();
              e.target.setPlaybackQuality('hd720');
            }
          }
        });
      } catch (e) {
        console.log(e)
      }
      break;
    case "vimeo":
      var options = {
        url: item.firstChild.getAttribute('data-link'),
        autoplay: true,
        width:item.offsetWidth,
        height:item.offsetHeight,
      };
      item.firstChild.remove();
      var videoPlayer = new Vimeo.Player(item.id, options);
      videoPlayer.setVolume(0);
      break;
  }
}
function getParam(data, url=window.location.href) {
  var url = new URL(url);
  var data = url.searchParams.get(data);
  return data;
}
$(document).ready(function() {
 if (document.querySelector("#landingpage") && !getCookie(document.querySelector("#landingpage").value)) {
    setCookie(document.querySelector("#landingpage").value,'true',1);
    setTimeout(function() {
        $.ajax({
            url: '/apiv1/landingpage/updateView',
            method: 'POST',
            data: {
              page: document.querySelector("#landingpage").value
            },
            success: function (data, textStatus, xhr) {
            },
            timeout:2000
        });
    },2000)
  }
});
function setCookie(cname, cvalue, exdays,path='/') {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path="+path;
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function callCheckout(data) {
  loading();
  data['order_id'] = getCookie('order_id_funnel');
  if (data['thankyou_url'].indexOf('FRAME_POPUP') > -1) {
    data['thankyou_url'] = window.location.href + '?popup=' + data['thankyou_url'];
  }
  if (data['cancel_url'].indexOf('FRAME_POPUP') > -1) {
    data['cancel_url'] = window.location.href + '?popup=' + data['cancel_url'];
  }
  $.ajax({
    url: 'https://api.salekit.io/api/v1/payment/order',
    method: 'POST',
    headers: { "Content-Type": "application/json", "Shop-Id":shop_id },
    data: JSON.stringify(data),
    success: function (data, textStatus, xhr) {
      unload();
      if (data.checkout_url) {
        delete_cookie('order_id_funnel');
        window.location.href = data.checkout_url;
      }
      if (data.token == false && data.error == true) {
        // alert("Hello! I am an alert box!!");


        let group = document.createElement('div');
        group.setAttribute('style', 'position: fixed;top: 0;left: 0;z-index: 9999999999;background: #0000003b;width: 100%;height: 100%;display: flex;')
        let html = '<div style="\
                            max-width: max-content;\
                            background: #fff;\
                            margin: auto;\
                            border-radius: 5px;\
                            position: relative;">\
                            <div style="padding:20px; width: 550px; height: 100px;">'
        // html += item.parentNode.querySelector('.data_thankyou').textContent;
        html += '<div style="text-align: center;"> <p style=" font-size: 16px">Vui lòng cài đặt cấu hình kết nối với cổng thanh toán</p> </div>';
        html += '<div style="text-align: center;"> <a href="'+ 'https://salekit.io/shop/config?type=payment'+'"  style="margin: 20px auto;background-color: #2d7fc3; border: 1px solid #2d7fc3; border-radius: 5px; font-size: 16px;width:165px;height: 40px; display: flex; justify-content: center;align-items: center;color: #fff;cursor: pointer;">  KẾT NỐI NGAY</a> </div>'
        html += '</div></div>';
        group.innerHTML = html;
        group.addEventListener('click', function (event) {
          if (event.target == group || event.target.closest(".close_modal")) {
            group.remove();
          }
        })
        document.body.appendChild(group);
      }
    }
  });
}
function showPopup() {
  document.querySelector("[id^=POPUP]").style.display = 'block';
}
function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      // paramName = paramName.toLowerCase();
      // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = decodeURI(paramValue);
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(decodeURI(paramValue));
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = decodeURI(paramValue);
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = decodeURI([obj[paramName]]);
          obj[paramName].push(decodeURI(paramValue));
        } else {
          // otherwise add the property
          obj[paramName].push(decodeURI(paramValue));
        }
      }
    }
  }
  return obj;
}
// ================================ LIST_PRODUCT
let url_checkout = 'https://'+window.location.hostname+'/checkout';
if(document.querySelector("[name='url_button_order']") && document.querySelector("[name='url_button_order']").value){
  url_checkout = document.querySelector("[name='url_button_order']").value;
}
document.querySelectorAll(".item_clone_product").forEach((item)=>{
  item.remove();
})
document.querySelectorAll('[id^=LIST_PRODUCT]').forEach((item,index)=>{
  item.querySelectorAll('[id^=PARAGRAPH],[id^=TITLE],[id^=LIST]').forEach((item_p)=>{
    let regex = /{[ a-z_+\-0-9)]*}/g;
    if(item.innerHTML.match(regex)){
      let check_text = [...item.innerHTML.match(regex)];
      if(check_text && check_text[0]){
        item_p.setAttribute('data-html',utf8_to_b64(item_p.innerHTML));
        item_p.innerHTML = '';
      }
    }
  })
  if(item.getAttribute('open-popup') && q('#'+item.getAttribute('open-popup'))){
    let popup = q('#'+item.getAttribute('open-popup'));
    popup.querySelectorAll('[id^=PARAGRAPH],[id^=TITLE],[id^=LIST]').forEach((item_p)=>{
    let regex = /{[ a-z_+\-0-9)]*}/g;
      if(popup.innerHTML.match(regex)){
        let check_text = [...popup.innerHTML.match(regex)];
        if(check_text && check_text[0]){
          item_p.setAttribute('data-html',utf8_to_b64(item_p.innerHTML));
          item_p.innerHTML = '';
        }
      }
    })
  }
  item.querySelector(".item_product_list").style.display = 'none';
  item.classList.add('active_list_product');
  if(document.querySelector("#url_api")){
    let limit = item.getAttribute('columns')*item.getAttribute('rows');
    let url_api = document.querySelector("#url_api").value+'/apiv1/landingpage/product';
    let param = [];
    if(item.getAttribute('category-product') && item.getAttribute('category-product') != null){
      param.push('category='+item.getAttribute('category-product'));
    }
    if(limit){
      param.push('limit='+limit+'&page=0');
    }
    if(item.getAttribute('type-sort')){
      param.push('sort='+item.getAttribute('type-sort'));
    }else{
      param.push('sort=ASC');
    }
    if(item.getAttribute('field-product')){
      param.push('field='+item.getAttribute('field-product'));
    }else{
      param.push('field=created_at');
    }
    $.ajax({
        headers: {
          "Access-Token":token_landingpage
        },
        url:url_api+'?'+param.join('&'),
        method:'GET'
    }).done(function(data) {
      if(!data.error){
        for(let i of data){
          let clone = item.querySelector(".item_product_list").cloneNode(true);
          clone.setAttribute('product-id',i.id);
          clone.querySelector(".image_background").style.backgroundImage = `url("${i.img}")`;
          clone.querySelectorAll("[data-html]").forEach((item_replace)=>{
            let html = b64_to_utf8(item_replace.getAttribute('data-html'));
            for(let key of Object.keys(i)){
              let new_regex =  new RegExp(`{${key}}`, "g");
              if(isNaN(parseFloat(i[key])) || parseFloat(i[key]) != i[key]){
                html = html.replace(new_regex,i[key])  
              }else if(parseFloat(i[key]) == i[key]){
                html = html.replace(new_regex,format_money(i[key]))
              }
            }
            item_replace.removeAttribute('data-html');
            item_replace.innerHTML = html;
          })
          clone.removeAttribute('style');
          clone.classList.add('item_clone_product');
          a('[type-cart]',clone).forEach((item)=>{
            addEventClickTypeCart(item)
          })
          item.appendChild(clone);
          if(item.getAttribute('open-popup') && q('#'+item.getAttribute('open-popup'))){
            let popup = q('#'+item.getAttribute('open-popup'));
            clone.addEventListener('click',function() {
              popup.setAttribute('product-id',i.id);
              popup.querySelectorAll("[data-html]").forEach((item_replace)=>{
                let html = b64_to_utf8(item_replace.getAttribute('data-html'));
                for(let key of Object.keys(i)){
                  let new_regex =  new RegExp(`{${key}}`, "g");
                  if(isNaN(parseFloat(i[key])) || parseFloat(i[key]) != i[key]){
                    html = html.replace(new_regex,i[key])  
                  }else if(parseFloat(i[key]) == i[key]){
                    html = html.replace(new_regex,format_money(i[key]))
                  }
                }
                item_replace.innerHTML = html;
              })
              if(popup.querySelector('[id^=IMAGE]')){
                if(i.img){
                  popup.querySelector('[id^=IMAGE] *:first-child').style.backgroundImage = `url(${i.img})`;  
                }else{
                  popup.querySelector('[id^=IMAGE]  *:first-child').style.backgroundImage = null;  
                }
              }
              if(popup.querySelector("[id^=QUANTITY]")){
                popup.querySelector("[id^=QUANTITY] input").value = 1;
              }
              popup.style.display='flex';
              document.body.classList.add("open_modal");
            })
          }

        }
      }
    })
  }
})

action_quantity(document);
function action_quantity(group) {
  a(".action_quantity",group).forEach((item)=>{
    item.addEventListener('click',function() {
      if(item.getAttribute('action') =='up'){
        value = parseFloat(item.parentNode.querySelector('input').value) + 1;
      }
      if(item.getAttribute('action') =='down'){
        value = parseFloat(item.parentNode.querySelector('input').value) - 1;
      }
      if(value < 1){
        value = 1;
      }
      item.parentNode.querySelector('input').value = value
      item.parentNode.querySelector('input').dispatchEvent(new Event('change'))
    })
  })
}
count_cart(true);
document.querySelectorAll('[type-cart]').forEach((item)=>{
  addEventClickTypeCart(item)
})
function addEventClickTypeCart(item) {
  item.addEventListener('click',function() {
    let array_id = [];
    let count = 0;
    if(localStorage.getItem(utf8_to_b64(url_checkout))){
      array_id = JSON.parse(localStorage.getItem(utf8_to_b64(url_checkout)));
    }
    if(item.closest('[product-id]')){
      let id_pro = item.closest('[product-id]').getAttribute('product-id');
      let quantity;
      try{
        quantity = parseFloat(item.closest('[product-id]').querySelector('[id^=QUANTITY] input').value)
      }catch(e){
        quantity = 1;
      }
      
      if(array_id.length > 0){
        let check_pro=true;
        for(let i in array_id){
          if(array_id[i].id == id_pro){
            array_id[i].quantity = quantity + parseFloat(array_id[i].quantity);
            check_pro = false;
          }
        }
        if(check_pro){
          array_id.push({id:id_pro,quantity});  
        }
        count = parseFloat(localStorage.getItem(utf8_to_b64(url_checkout)+'_count'));
      }else{
        array_id = [{id:id_pro,quantity}];
      }
      count+=parseFloat(quantity);
      localStorage.setItem(utf8_to_b64(url_checkout)+'_count',count);
      count_cart();
    }
    localStorage.setItem(utf8_to_b64(url_checkout),JSON.stringify(array_id))
    if(item.getAttribute('type-cart') == 'buy_now'){
      // console.log(array_id);return false;
      $.ajax({
          headers: {
            "Access-Token":token_landingpage
          },
          url:url_checkout,
          method:'POST',
          data:{
            product:array_id
          }
      }).done(function(data) {
        if(!data.error){
          window.location.href = url_checkout;
        }
      })
    }
  })
}
function count_cart(first=false) {
  if(document.querySelector(".count_cart")){
    document.querySelector(".count_cart").textContent = 0;
    if(localStorage.getItem(utf8_to_b64(url_checkout)+'_count')){
      document.querySelector(".count_cart").textContent = localStorage.getItem(utf8_to_b64(url_checkout)+'_count');
    }
    if(first && q(".count_cart").parentNode.getAttribute('open-popup')){
      let popup = q("#"+q(".count_cart").parentNode.getAttribute('open-popup'));
      document.querySelector(".count_cart").parentNode.addEventListener('click', async function() {
        let {data,object_quantity} = await total_cart_money_process();
        if(data && !data.error){
            if(data.length > 0){
             
              if(popup.querySelector(".item_box_product")){
                popup.querySelector("*:first-child").removeAttribute('style');
                popup.querySelectorAll(".item_box_product").forEach((item)=>{
                  item.remove();
                });
                popup.querySelectorAll('.change_top_box_product').forEach((item)=>{
                  item.removeAttribute('style');
                })
                // popup.querySelector('[id^="BOX_PRODUCT"]').style.display = 'block';
                downTopAllChildren(popup.querySelector('[id^="BOX_PRODUCT"]'),false,true);
              }
              add_product_to_list(popup.querySelector("[id^=BOX_PRODUCT]"),0,data);
              resetJSEvent();
            }
        }
        popup.style.display='flex';
        document.body.classList.add("open_modal");
      })
    }
  }
}
async function  total_cart_money_process() {
  if(localStorage.getItem(utf8_to_b64(url_checkout))){
    let list_pro = JSON.parse(localStorage.getItem(utf8_to_b64(url_checkout)));
    let url_api = document.querySelector("#url_api").value+'/apiv1/landingpage/product';
    let list_id = [];
    let object_quantity = {};
    for(let i of list_pro){
      list_id.push(i.id);
      object_quantity[i.id] = i.quantity;
    }
    url_api += `?cart=${list_id.join(',')}`;
    let data = await  $.ajax({
        headers: {
          "Access-Token":token_landingpage
        },
        url:url_api,
        method:'GET'
    })
    let total_cart_money = 0;
    if(!data.error && data.length > 0){
      for(let i in data){
        data[i].quantity = object_quantity[data[i].id];
        data[i].product_id = data[i].id;
        total_cart_money += parseFloat(data[i].quantity)*parseFloat(data[i].price_sale);
      }
    }
    let el_total_cart_money = document.querySelector('[field-attribute="total_cart_money"]');
      if(el_total_cart_money){
        el_total_cart_money.innerHTML= b64_to_utf8(el_total_cart_money.getAttribute('data-html')).replace('{total_cart_money}',format_money(total_cart_money));  
      }
    return {
      data,
      object_quantity
    };
  }
  return false
}
function changeProductCart(el,remove=false,update=false) {
  if(remove){
    downTopAllChildren(el.closest('[id^=BOX_PRODUCT]'),false,true);  
  }
  
  let id_product = el.closest('[id^=BOX_PRODUCT]').getAttribute('data-product');
  let list_pro = JSON.parse(localStorage.getItem(utf8_to_b64(url_checkout)));

  if(list_pro){
    let quantity = JSON.parse(localStorage.getItem(utf8_to_b64(url_checkout)+'_count'));
    let index =false;
    let count = 0;
    for(let i in list_pro){
      if(list_pro[i].id == id_product){
        index = i;
        count = list_pro[i].quantity;
      }
    }
    if(index !== false && remove){
      list_pro.splice(index,1);
      quantity = quantity - count;
    }
    if(index !== false && update){
      list_pro[index].quantity = update;
      quantity += (update - count);
    }
    localStorage.setItem(utf8_to_b64(url_checkout),JSON.stringify(list_pro));
    localStorage.setItem(utf8_to_b64(url_checkout)+'_count',quantity);
    count_cart();
  }
  if(checkout_cart && remove){
    for(let i in products_funel){
      if(products_funel[i].id == id_product){
        index = i;
      }
    }
    if(index !== false && remove){
      products_funel.splice(index,1);
    }
    let total_cart_money = 0;
    for(let i in products_funel){
      total_cart_money += parseFloat(products_funel[i].quantity)*parseFloat(products_funel[i].price_sale);
    }

    let tempo_price = document.querySelector('[field-attribute="tempo_price"]');
    if(tempo_price){
      tempo_price.innerHTML= b64_to_utf8(tempo_price.getAttribute('data-html')).replace('{tempo_price}',format_money(total_cart_money));  
    }
    let pay_money = document.querySelector('[field-attribute="pay_money"]');
    if(pay_money){
      pay_money.innerHTML= b64_to_utf8(pay_money.getAttribute('data-html')).replace('{pay_money}',format_money(total_cart_money));  
    }
  }
  if(remove){
    el.closest('[id^=BOX_PRODUCT]').remove();
    total_cart_money_process()
  }
}
// ===========================================

if (document.querySelector("[id^='ORDER_DETAIL']")) {
  if (getCookie('order_id_funnel')) {
    document.querySelectorAll("[id^= ORDER_DETAIL]").forEach((item) => {
      let iframe = item.querySelector('iframe');
      iframe.setAttribute('src', iframe.getAttribute('data-src') + '/' + getCookie('order_id_funnel'))
    })
  } else {
    document.querySelectorAll("[id^= ORDER_DETAIL]").forEach((item) => {
      let iframe = item.querySelector('iframe');
      iframe.setAttribute('src', iframe.getAttribute('data-src'))
    })
  }
}

if (document.querySelector('[id^=TABS_ITEM].active_tabs')) {
  document.querySelectorAll('[id^=TABS_ITEM].active_tabs').forEach((item) => {
    item.closest(".list_item").parentNode.querySelectorAll('[id^="TABS_ITEM_CONTENT"]').forEach((item) => {
      item.style.display = 'none';
    })
    document.querySelector("#" + item.getAttribute('data-content')).style.display = 'block';
  })
}

if (document.querySelector('[data-content^="TABS_ITEM_CONTENT"]')) {
  document.querySelectorAll('[data-content^="TABS_ITEM_CONTENT"]').forEach((item) => {
    if(!item.classList.contains('stop_active_tab')){
      item.addEventListener('click', addEventClickActiveTab)
      ;
    }
  })
}
function addEventClickActiveTab(ev) {
  this.closest(".list_item").querySelector(".active_tabs").classList.remove('active_tabs');
  this.classList.add('active_tabs');
  this.closest(".list_item").parentNode.querySelectorAll('[id^="TABS_ITEM_CONTENT"]').forEach((item) => {
    item.style.display = 'none';
  })
  document.querySelector("#" + this.getAttribute('data-content')).style.display = 'block';
  if(this.closest('.list_item').parentNode.querySelector('[type="tab_next"]')){
    upHeightAllParent(q("#" + this.getAttribute('data-content')))
  }
}
try {
  if (url_funel) {
    document.querySelectorAll('.data_thankyou').forEach((item) => {
      if(item.getAttribute('type') != 'tab_next'){
        item.setAttribute('type', 'url')
        item.textContent = url_funel
      }
    })
  }
} catch (e) { }
document.querySelectorAll('[id^=MINIMIZE_ITEM_CONTENT]').forEach((item_content) => {
  item_content.style.display = 'none';
})
document.querySelectorAll("[data-content^=MINIMIZE_ITEM_CONTENT]").forEach((item) => {
  if (item.querySelector(".close")) {
    item.querySelector(".close").style.display = 'none';
  }
  if (item.querySelector(".open")) {
    item.querySelector(".open").style.display = 'block';
  }
  item.style.cursor = 'pointer';
  item.addEventListener('click', function () {
    if(item.classList.contains('active_tabs')){
      if (item.querySelector(`.close`)) {
        item.querySelector(`.close`).style.display = 'none';
      }
      if (item.querySelector(`.open`)) {
        item.querySelector(`.open`).style.display = 'block';
      }
      document.querySelector("#"+item.getAttribute('data-content')).style.display = 'none';
      item.classList.remove("active_tabs")
    }else{
      item.parentNode.closest('[id^=MINIMIZE]').querySelectorAll('[id^=MINIMIZE_ITEM_CONTENT]').forEach((item_content) => {
        if (document.querySelector(`[data-content=${item_content.id}] .close`)) {
          document.querySelector(`[data-content=${item_content.id}] .close`).style.display = 'none';
        }
        if (document.querySelector(`[data-content=${item_content.id}] .open`)) {
          document.querySelector(`[data-content=${item_content.id}] .open`).style.display = 'block';
        }
        item_content.style.display = 'none';
      })
      if (item.parentNode.closest('[id^=MINIMIZE]').querySelector(".active_tabs")) {
        item.parentNode.closest('[id^=MINIMIZE]').querySelector(".active_tabs").classList.remove('active_tabs');
      }

      item.classList.add('active_tabs');
      if (item.querySelector('.open')) {
        item.querySelector('.open').style.display = 'none';
      }
      if(item.querySelector('.close')){
        item.querySelector('.close').style.display = 'block';
      }
      item.parentNode.closest('[id^=MINIMIZE]').querySelector('#' + item.getAttribute('data-content')).style.display = 'block';
    }
  })
})
document.querySelectorAll('[id^=MINIMIZE]').forEach((item) => {
  if (item.id.indexOf('MINIMIZE_ITEM') == -1 && item.querySelector("*:first-child > [id^=MINIMIZE_ITEM]")) {
    let first_item = item.querySelector("*:first-child > [id^=MINIMIZE_ITEM]");
    if(first_item.classList.contains('active_tabs')){
      first_item.classList.remove('active_tabs');
    }
    first_item.click();
  }
})
if(document.querySelector("[name='undefined[]']")){
  document.querySelectorAll("[name='undefined[]']").forEach((item,index)=>{
    item.setAttribute('name',item.closest('[id]').id+'[]');
  })
}

if(document.querySelector('[type="checkbox"]')){
  document.querySelectorAll('[type="checkbox"]').forEach((item,index)=>{
    if(item.getAttribute('name') == ''){
      item.setAttribute('name',item.closest('[id]').id+'[]');
    }
  })  
}

if(document.querySelector('[type="radio"]')){
  document.querySelectorAll('[type="radio"]').forEach((item,index)=>{
    if(item.getAttribute('name') == ''){
      item.setAttribute('name',item.closest('[id]').id);
    }
  })  
}

if(document.querySelector("[name='undefined']")){
  document.querySelectorAll("[name='undefined']").forEach((item,index)=>{
    item.setAttribute('name',item.closest('[id]').id);
  })  
}
// update data to form
if(localStorage.getItem('data_form')){
  let data_form = b64_to_utf8(localStorage.getItem('data_form'));
  data_form = JSON.parse(data_form)
  let address = [];
  let address_old;
  for(let i in data_form){
    if(i && document.querySelector(`[name="${i}"]`)){
      switch(i){
        case "province":
          document.querySelector(`[name="province"]`).setAttribute('value',data_form[i]);
          address.push(data_form[i]);
          break;
        case "district":
          document.querySelector(`[name="district"]`).setAttribute('value',data_form[i]);
          address.push(data_form[i]);
          break;
        case "ward":
          document.querySelector(`[name="ward"]`).setAttribute('value',data_form[i]);
          address.push(data_form[i]);
          break;
      }
      if(i =='address'){
        address_old = data_form[i];
      }else{
        document.querySelectorAll(`[name="${i}"]`).forEach((item)=>{
          if(i!='province' && i != 'district' && i != 'ward'){
            item.value = data_form[i]
          }
        });
      }
    }
  }
  if(address_old && document.querySelector('[name="address"]')){
    if(address){
      // for(let i of address){
      //   address_old = address_old.replace('- '+i,'')
      //   address_old = address_old.replace(i,'')
      // }
      if(address_old.indexOf('undefined') == -1){
        document.querySelector('[name="address"]').value = address_old.trim();  
      }
      
    }else{
      if(address_old.indexOf('undefined') == -1){
        document.querySelector('[name="address"]').value = address_old.trim();  
      }
    }
  }
}
document.querySelectorAll("select.province").forEach((province) => {
  province.addEventListener('change', function (event) {
    let value = event.target.querySelector("option[value='" + event.target.value + "']").getAttribute('data-code');
    requestGetProvince('get_districts', event.target.parentNode.querySelector("select.districts"), value, false).then(function() {
      document.querySelectorAll(`[name=district]`).forEach((district)=>{
        if(district.getAttribute('value')){
          if(district.querySelector(`option[value="${district.getAttribute('value')}"]`)){
            district.querySelector(`option[value="${district.getAttribute('value')}"]`).setAttribute('selected',true);
            district.dispatchEvent(new Event('change'));
          }
        }
      })
    })
  })
  requestGetProvince('get_province', province, false, false).then(function() {
    if(province.getAttribute('value')){
      if(province.querySelector(`option[value="${province.getAttribute('value')}"]`)){
        province.querySelector(`option[value="${province.getAttribute('value')}"]`).setAttribute('selected',true);
        province.dispatchEvent(new Event('change'));
      }
    }
  })
})
document.querySelectorAll("select.districts").forEach((item) => {
  item.addEventListener('change', function (event) {
    let value_province = item.parentNode.querySelector("select.province option[value='" + item.parentNode.querySelector("select.province").value + "']").getAttribute('data-code');
    let value_district = item.querySelector("option[value='" + event.target.value + "']").getAttribute('data-code');
    requestGetProvince('get_wards', event.target.parentNode.querySelector("select.wards"), value_province, value_district).then(function() {
      document.querySelectorAll("select.wards").forEach((ward) => {
        if(ward.getAttribute('value') && ward.querySelector(`option[value="${ward.getAttribute('value')}"]`)){
          ward.querySelector(`option[value="${ward.getAttribute('value')}"]`).setAttribute('selected',true);
        }
      })
    })
  })
})
async function requestGetProvince(type,item,code_province,code_districts) {
  if(typeof axios == 'undefined'){
    await check_axios();
  }
    switch(type){
      case "get_province":
        url = 'https://api.salekit.com:3039/file/province.json';
        break;
      case "get_districts":
        url = 'https://api.salekit.net:3038/api/v1/address/district?province_id='+code_province;
        break;
      case "get_wards":
        url = 'https://api.salekit.net:3038/api/v1/address/ward?district_id='+code_districts;
        break;
    }
    axios.get(url).then((result)=>{
        let first = item.querySelector("option").cloneNode(true);
          item.innerHTML = '';
          item.appendChild(first)
        for(let i of result.data.data){
          let option = document.createElement('option');
          option.setAttribute('value',i.name)
          option.setAttribute('data-code', i.id)
          option.textContent = i.name;
          item.appendChild(option)
        }
    })
    return true;
}
function check_axios() {
  return new Promise((resolve)=>{
      let script = document.createElement("script");
      script.setAttribute("src", "https://unpkg.com/axios/dist/axios.min.js");
      q("head").appendChild(script);
      script.addEventListener('load',function() {
        resolve(true);
      })
  })
}

// box product
function showHTMLProduct(item,first_item,list_product) {
  if(first_item.id || first_item.product_id){
    let html = '';
    if(item.getAttribute('old_html')){
      html = b64_to_utf8(item.getAttribute('old_html'));
    }else{
      item.setAttribute('old_html',utf8_to_b64(item.innerHTML));  
      html = item.innerHTML;
    }
    item.setAttribute('data-product',first_item.product_id);
    if(first_item.id){
      item.setAttribute('data-product',first_item.id);  
    }
    
    item.classList.add('item_box_product');

    item.innerHTML = html.replace('{name_product}',first_item.name)
    item.innerHTML = item.innerHTML.replace('{price_sale}',format_money(first_item.price_sale))
    if(item.querySelector(".img_product")){
      let img = first_item.image;
      if(!img){
        img = first_item.img
      }
      item.querySelector(".img_product").style.backgroundImage = "url('"+img+"')"  
    }
    
    let total_price_sale;
    let quantity_el = item.querySelector('[name="quantity"]');
    if(!quantity_el && item.querySelector('[id^="QUANTITY"]')){
      quantity_el = item.querySelector('[id^="QUANTITY"] input');
    }
    let quantity = 1;
    action_quantity(item);
    if(quantity_el){
      if(!quantity_el.value){
        quantity_el.value = 1;
      }
      if(list_product[item.getAttribute('data-index-product')].quantity){
        quantity_el.value = list_product[item.getAttribute('data-index-product')].quantity;
      }
      quantity = quantity_el.value;
      quantity_el.addEventListener('change',function() {
        changeQuantity(item,quantity_el,this.value,list_product)
      })
      first_item.quantity = quantity;
    }
    // item.innerHTML = item.innerHTML.replace('{total_price_sale}',format_money(first_item.price_sale*quantity));
    item.querySelectorAll("[id^=PARAGRAPH]").forEach((p)=>{
      let regex = /{total_price}/g;
      if(p.innerHTML.match(regex)){
        let check_text = [...p.innerHTML.match(regex)];
        if(check_text && check_text[0]){
          // save data old
          p.setAttribute('old_html',utf8_to_b64(p.innerHTML));
          p.innerHTML = p.innerHTML.replace('{total_price}',format_money(first_item.price_sale*(first_item.quantity?first_item.quantity:1)));
        }
      }
      regex = /{quantity}/g;
      if(p.innerHTML.match(regex)){
        if(parseInt(first_item.price)){
          p.innerHTML = p.innerHTML.replace('{quantity}',first_item.quantity?first_item.quantity:1);
        }else{
          p.remove()
        }
      }
      regex = /{price}/g;
      if(p.innerHTML.match(regex)){
        if(parseInt(first_item.price)){
          p.innerHTML = p.innerHTML.replace('{price}',format_money(first_item.price));
        }else{
          p.remove()
        }
      }
      regex = /{description}/g;
      if(p.innerHTML.match(regex)){
        p.innerHTML = p.innerHTML.replace('{description}',first_item.description);
      }
    })
    document.querySelectorAll("[id^=PARAGRAPH],[id^=TITLE],[id^=LIST]").forEach((item)=>{
      let regex = /{[ a-z_+\-0-9)]*}/g;
      if(item.innerHTML.match(regex)){
        let check_text = [...item.innerHTML.match(regex)];
        
        if(check_text && check_text[0]){
          for(let i of check_text){
            if(i.indexOf('tempo_price') > -1){
              item.setAttribute('data-html',utf8_to_b64(item.innerHTML));
              item.setAttribute('field-attribute','tempo_price');
            }
            if(i.indexOf('pay_money') > -1 && !item.closest('[id^=BUMP]')){
              item.setAttribute('data-html',utf8_to_b64(item.innerHTML));
              item.setAttribute('field-attribute','pay_money');
            }
          }
        }
      }
    })
    changeFieldPrice(list_product);
  }
}
function changeQuantity(item,el,value,list_product) {
  // let first_item = item
  let first_item;
  for(let i of list_product){
    if(i.id == item.getAttribute('data-product') || i.product_id == item.getAttribute('data-product')){
      first_item = i
    }
  }
  if(item.querySelector("[old_html]")){
    let p = item.querySelector("[old_html]");
    p.innerHTML = b64_to_utf8(p.getAttribute('old_html')).replace('{total_price}',format_money(first_item.price_sale*this.value));
  }
  if(item.getAttribute('data-index-product')){
    list_product[item.getAttribute('data-index-product')].quantity = value;
  }else{
    list_product[0].quantity = value;
  }
  if(document.querySelector('[id^=BUMP]')){
    change_detail_bump();  
  }
  changeProductCart(el,false,value);  
  changeFieldPrice(list_product);
  total_cart_money_process();
}
function downTopAllChildren(item,space_up=false,first_round=false, check_tab = false) {
  if(item.closest('[id^=TABS]')){
    check_tab = 'TABS';
  }
  if(!item.classList.contains('list_content_item') && !item.classList.contains('list_item')){
    let list_child = item.parentNode.children;
    let style_item = window.getComputedStyle(item);
    top_item = parseFloat(style_item.getPropertyValue('top'));
    left_item = parseFloat(style_item.getPropertyValue('left'));
    height_item = isNaN(parseFloat(style_item.getPropertyValue('height')))?item.offsetHeight:parseFloat(style_item.getPropertyValue('height'));
    width_item = isNaN(parseFloat(style_item.getPropertyValue('width')))?item.offsetWidth:parseFloat(style_item.getPropertyValue('width'));
    if(!height_item){
      let style_item_first_child = window.getComputedStyle(item.querySelector("*:first-child"));
      height_item = parseFloat(style_item_first_child.getPropertyValue('height'))
      width_item = parseFloat(style_item_first_child.getPropertyValue('width'))
    }
    if(!space_up){
      space_up = height_item;
    }
    for(let i of list_child){
      if(i.style.display != 'none' && i != item && i.id.indexOf(check_tab) == -1){
        let style = window.getComputedStyle(i)

        let top = parseFloat(style.getPropertyValue('top'));
        let left = parseFloat(style.getPropertyValue('left'));
        if(i.querySelector("*:first-child")){
          let style_child = window.getComputedStyle(i.querySelector("*:first-child"));
          let height = parseFloat(style_child.getPropertyValue('height'));
          let width = parseFloat(style_child.getPropertyValue('width'));
          if(top >= top_item && width+left >= left_item && left_item+width_item >= left){
            i.style.top = ((top - space_up < 0? (space_up - top): top - space_up) - 10)+'px';
          }
        }
      }
    }

    if(item.parentNode.id.indexOf('GROUP') > -1 || item.parentNode.id.indexOf('TABS') > -1){
      item.style.height = (height_item - space_up - 10)+'px'
    }
  }
  if(item.parentNode.id.indexOf('SECTION') == -1 && item.parentNode.id.indexOf('POPUP') == -1){
    downTopAllChildren(item.parentNode,space_up,false);
  }
  
  if(item.parentNode.id.indexOf('SECTION') > -1){

    item.parentNode.style.height = (item.parentNode.offsetHeight - space_up)+'px'
  }
  if(item.closest('[id^=POPUP]') && first_round){
     let first_child = item.closest('[id^=POPUP]').querySelector('*:first-child');
    let style_popup = window.getComputedStyle(first_child);
    let height_child = parseFloat(style_popup.getPropertyValue('height'))
    first_child.style.height = (height_child - space_up)+'px' 
  }
  return space_up;
}
function upHeightAllParent(item) {
  let style_item = window.getComputedStyle(item);
  let height = parseFloat(style_item.getPropertyValue('height'));

  let parent = item.closest('[id]').parentNode.closest('[id]');
  let parent_style = parent.querySelector("*:first-child");
  let list_child = [...item.closest('[id]').parentNode.children];
  let bottom = 0;
  let style_parent = window.getComputedStyle(item.parentNode);
  top_item = parseFloat(style_parent.getPropertyValue('top'));
  left_item = parseFloat(style_parent.getPropertyValue('left'));
  let old_bottom;
  list_child.forEach((item_child)=>{
    let style_item_child = window.getComputedStyle(item_child);
    if(style_item_child.getPropertyValue('display') != 'none'){
      let top = parseFloat(style_item_child.getPropertyValue('top'));
      if(item_child.querySelector('*:first-child')){
        let style_item_child_2 = window.getComputedStyle(item_child.querySelector('*:first-child'));
        let height = parseFloat(style_item_child_2.getPropertyValue('height'));
        if((top+height) > bottom){
          bottom = top+height;
          let old_style;
          if(item_child.querySelector('*:first-child').getAttribute('style')){
            old_style = item_child.querySelector('*:first-child').getAttribute('style');
            item_child.querySelector('*:first-child').removeAttribute('style');
          }
          old_bottom = item_child.querySelector('*:first-child').offsetHeight + top;
          if(old_style){
            item_child.querySelector('*:first-child').setAttribute('style',old_style);
          }
        }  
      }
    }
  })
  let space_bottom = bottom - old_bottom;
  // let height_item = isNaN(parseFloat(style_parent.getPropertyValue('height')))?item.offsetHeight:parseFloat(style_parent.getPropertyValue('height'));
  // let width_item = isNaN(parseFloat(style_parent.getPropertyValue('width')))?item.offsetWidth:parseFloat(style_parent.getPropertyValue('width'));
  // list_child.forEach((item_child)=>{
  //   if(item_child.style.display != 'none'){
  //     let style = window.getComputedStyle(item_child)
  //     let top = parseFloat(style.getPropertyValue('top'));
  //     let left = parseFloat(style.getPropertyValue('left'));
  //     let style_child = window.getComputedStyle(item_child.querySelector("*:first-child"));
  //     let height = parseFloat(style_child.getPropertyValue('height'));
  //     let width = parseFloat(style_child.getPropertyValue('width'));
   
  //     if( top + height >= top_item && width+left > left_item && left_item+width_item > left && item_child != item.closest('[id]')){
  //       // item_child.querySelector("*:first-child").style.height = (item_child.offsetHeight + space_bottom)+'px';
  //     }  
  //   }
  // })
  let style_item_parent = window.getComputedStyle(parent_style);
  let height_parent = parseFloat(style_item_parent.getPropertyValue('height'));
  if(parent_style.classList.contains('sp_container')){
      if(bottom > parent_style.parentNode.offsetHeight){
        parent_style.parentNode.style.height = bottom+'px';  
      }
  }else{
      parent_style.style.height = bottom + 10 +'px';
  }
  if(!parent_style.classList.contains('sp_container') && item.closest('section') && parent_style.tagName != 'BODY'){
    upHeightAllParent(parent_style)
  }

}
function upTopAllChildren(item,space_up=false,first_round=false, check_tab = false) {

  if(item.closest('[id^=TABS]')){
    check_tab = 'TABS';
  }
  
  if(!item.classList.contains('list_content_item') && !item.classList.contains('list_item')){
    let list_child = item.parentNode.children;
    let style_item = window.getComputedStyle(item);
    top_item = parseFloat(style_item.getPropertyValue('top'));
    left_item = parseFloat(style_item.getPropertyValue('left'));
    let height_item = isNaN(parseFloat(style_item.getPropertyValue('height')))?item.offsetHeight:parseFloat(style_item.getPropertyValue('height'));
    let width_item = isNaN(parseFloat(style_item.getPropertyValue('width')))?item.offsetWidth:parseFloat(style_item.getPropertyValue('width'));
    
    if(!height_item){
      let style_item_first_child = window.getComputedStyle(item.querySelector("*:first-child"));
      height_item = parseFloat(style_item_first_child.getPropertyValue('height'))
      width_item = parseFloat(style_item_first_child.getPropertyValue('width'))
    }

    if(!space_up){
      space_up = height_item;
    }
    for(let i of list_child){
      if(i.id.indexOf('BOX_PRODUCT') == -1 && i.id != item.id && i.id.indexOf(check_tab) == -1){
        i.classList.add('change_top_box_product')
        let style = window.getComputedStyle(i)
        let top = parseFloat(style.getPropertyValue('top'));
        let left = parseFloat(style.getPropertyValue('left'));
        let width = 0;
        let height = 0;
        if(i.querySelector("*:first-child")){
          let style_child = window.getComputedStyle(i.querySelector("*:first-child"));
          height = parseFloat(style_child.getPropertyValue('height'));
          width = parseFloat(style_child.getPropertyValue('width'));
        }
        
        if(i.id.indexOf('LINE') > -1){
          let style_line = window.getComputedStyle(i.querySelector("*:first-child"));
          margin_top = parseFloat(style_line.getPropertyValue('margin-top'));
          height_line = parseFloat(style_line.getPropertyValue('height'));
          border_top = parseFloat(style_line.getPropertyValue('height'));
          border_left = isNaN(parseFloat(style_line.getPropertyValue('border-left-width')))?0:1;
          if(border_left){
            height_line = border_top;
          }
          height = margin_top+height_line;

        }
        
        
        // neu la box background
        if(i.id.indexOf('BOX') > -1 && 
          top + height + space_up >= top_item + height_item && 
          top  <= top_item && 
          width+left > left_item && 
          left_item+width_item > left){
        }else if( top >= top_item && width+left > left_item && left_item+width_item >= left){
         
          i.style.top = (top + space_up + 10)+'px';
        }
      }
    }
    // for -> first-child group or tabs
    if( item.parentNode.id.indexOf('GROUP') > -1 || item.parentNode.id.indexOf('TABS') > -1){
      item.style.height = (height_item + space_up+ 10)+'px'
    }
  }
  

  if(item.parentNode.id.indexOf('SECTION') == -1 && item.parentNode.id.indexOf('POPUP') == -1){
    upTopAllChildren(item.parentNode,space_up,false);
  }
  
  if(item.parentNode.id.indexOf('SECTION') > -1){
    item.parentNode.style.height = (item.parentNode.offsetHeight + space_up)+'px'
  }

  if(item.closest('[id^=POPUP]') && first_round){
    let first_child = item.closest('[id^=POPUP]').querySelector('*:first-child');
    let style_popup = window.getComputedStyle(first_child);
    let height_child = parseFloat(style_popup.getPropertyValue('height'))
    first_child.style.height = (height_child + space_up) +10+'px' 
  }
}
function add_product_to_list(item,index_product,list_product) {
  let style = window.getComputedStyle(item);
    let top = parseFloat(style.getPropertyValue('top'));
    let first_item = list_product[index_product];
    if(index_product == 0 && list_product.length >= 1){
      let html = item.cloneNode(true);
      if(item.nextSibling){
        item.parentNode.insertBefore(html,item.nextSibling);
      }else{
        item.parentNode.appendChild(html);
      }
      html.setAttribute('data-index-product',index_product)
      html.addEventListener('changeQuantity',function(event) {
        changeQuantity(html,html.querySelector("*:first-child"),event.detail.quantity,list_product)
      })
      html.style.display = 'block';
      showHTMLProduct(html,first_item,list_product)
      upTopAllChildren(html,false,true);
      upHeightAllParent(html);
      for(let i in list_product){
        if(i > 0){
          let html = item.cloneNode(true);
          if(item.nextSibling){
            item.parentNode.insertBefore(html,item.nextSibling);
          }else{
            item.parentNode.appendChild(html);
          }
          // html.classList.add('item_box_product')
          html.style.display = 'block';
          html.setAttribute('data-index-product',i)
          let style_item  = window.getComputedStyle(item.querySelector("*:first-child"));
          html.style.top = (top+parseFloat(style_item.getPropertyValue("height"))+10)+'px';
          top += parseFloat(style_item.getPropertyValue("height"))+10;
          showHTMLProduct(html,list_product[i],list_product)
          upTopAllChildren(html,false,true);
        }
      }  
      
    }else{

      let html = item.cloneNode(true);
          html.innerHTML = b64_to_utf8(item.getAttribute('old_html'));  
          html.setAttribute('data-index-product',index_product)
          html.style.display = 'block';
          if(item.nextSibling){
            item.parentNode.insertBefore(html,item.nextSibling);
          }else{
            item.parentNode.appendChild(html);
          }
          if(item.offsetHeight == 0){
            html.style.top = '0px';
          }else{
            html.style.top = (top+item.offsetHeight+10)+'px';
          }
          showHTMLProduct(html,list_product[index_product],list_product)
          upTopAllChildren(html);
    }
    
}
function changeFieldPrice(list_product) {
  let total_price = 0;
  for(let i of list_product){
    let quantity = i.quantity;
    if(!quantity){
      quantity = 1
    }
    total_price += quantity * i.price_sale
  }

  a("[field-attribute=pay_money]").forEach((item)=>{
    let regex = /{[ a-z_+\-0-9)]*}/g;
    let old_html = b64_to_utf8(item.getAttribute('data-html'));
    if(old_html.match(regex)){
      let check_text = [...old_html.match(regex)];
      if(check_text && check_text[0]){
        for(let i of check_text){
          let split = '';
          split = i.replace('pay_money',total_price);
          split = split.replace('{','').replace('}','');
          if(i.indexOf('+') > -1){
            split = split.split('+');
            pay_fee = parseFloat(split[1].trim());
            split = parseFloat(split[0].trim())+parseFloat(split[1].trim());
            item.setAttribute('pay_fee',pay_fee);
          }
          item.innerHTML = old_html.replace(i,format_money(split));  
        }
      }
    }
  })
  a("[field-attribute=tempo_price]").forEach((item)=>{
    item.innerHTML = b64_to_utf8(item.getAttribute('data-html')).replace('{tempo_price}',format_money(total_price));
  })
  localStorage.setItem(utf8_to_b64(window.location.href)+'_final',JSON.stringify(list_product));
}
if(document.querySelector("[id^=BOX_PRODUCT]")){
  document.querySelectorAll("[id^=BOX_PRODUCT]").forEach((item)=>{
    downTopAllChildren(item,false,true)
    item.style.display = 'none';
    item.setAttribute('old_html',utf8_to_b64(item.innerHTML))
  })
  if(typeof products_funel != 'undefined' && products_funel.length > 0){
    document.querySelectorAll("[id^=BOX_PRODUCT]").forEach((item)=>{
      add_product_to_list(item,0,products_funel);
      item.style.display ='none';
    })
  }else if(localStorage.getItem(utf8_to_b64(window.location.href))){

    let list_pro = JSON.parse(localStorage.getItem(utf8_to_b64(window.location.href)));
    let url_api = 'https://salekit.io/apiv1/landingpage/product';
    if(document.querySelector("#url_api")){
      url_api = document.querySelector("#url_api").value+'/apiv1/landingpage/product';
    }
    
    let list_id = [];
    let object_quantity = {};
    for(let i of list_pro){
      list_id.push(i.id);
      object_quantity[i.id] = i.quantity;
    }
    url_api += `?cart=${list_id.join(',')}`;
    $.ajax({
        headers: {
          "Access-Token":token_landingpage
        },
        url:url_api,
        method:'GET'
    }).done(function(data) {
      if(!data.error){
        
        for(let i in data){
          data[i].quantity = object_quantity[data[i].id];
          data[i].product_id = data[i].id;
        }
        document.querySelectorAll("[id^=BOX_PRODUCT]").forEach((item)=>{
          add_product_to_list(item,0,data);
          item.style.display ='none';
        })
        resetJSEvent();
      }
    })
  }

}
// ===========================================================
document.querySelectorAll("[id^=PARAGRAPH],[id^=TITLE]").forEach((item)=>{
  replaceText(item);
  replaceText_2(item);
})
function replaceText(item,list_variable=false) {
  let regex = /{[ a-z_+\-0-9)]*}/g;
  if(item.innerHTML.match(regex)){
    let check_text = [...item.innerHTML.match(regex)];
    
    if(check_text && check_text[0]){
      for(let i of check_text){
        if(i.indexOf('tempo_price') > -1){
          item.setAttribute('data-html',utf8_to_b64(item.innerHTML));
          item.setAttribute('field-attribute','tempo_price');
        }
        if(i.indexOf('pay_money') > -1 && !item.closest('[id^=BUMP]')){
          item.setAttribute('data-html',utf8_to_b64(item.innerHTML));
          item.setAttribute('field-attribute','pay_money');
        }
        if(i.indexOf('total_cart_money') > -1 && !item.closest('[id^=BUMP]')){
          item.setAttribute('data-html',utf8_to_b64(item.innerHTML));
          item.setAttribute('field-attribute','total_cart_money');
        }
        if(getCookie('order_id_funnel')){
          $.ajax({
              url: 'https://api.salekit.io/api/v1/order/list',
              headers: {"Content-Type":"application/json",'Shop-Id':shop_id},
              method: 'POST',
              data: JSON.stringify({id:getCookie('order_id_funnel')}),
              success: function(data, textStatus, xhr){
                if(data.data){
                  for(let i of data.data){
                    item.innerHTML = item.innerHTML.replace('{cart_order_id}',getCookie('order_id_funnel'));  
                    item.innerHTML = item.innerHTML.replace('{order_id}',getCookie('order_id_funnel'));  
                    item.innerHTML = item.innerHTML.replace('{order_money}',i.total_pay);
                    item.innerHTML = item.innerHTML.replace('{cart_money}',i.total_pay);  
                  }
                }
                
              },
              error: function(xhr, status, error) {
                  // resolve(data);
                  console.log(xhr, status, error)
              }
          })
        }
        if(i.indexOf('total_money') > -1){
          item.setAttribute('data-var','total_money');
          item.setAttribute('data-old-html',utf8_to_b64(item.innerHTML));
          item.innerHTML = item.innerHTML.replace(i,format_money(total_money,true));  
        }else if(i.indexOf('total_discount') > -1){
          if(total_discount || total_discount === 0 || total_discount === "0"){
            item.setAttribute('data-var','total_discount');
            item.setAttribute('data-old-html',utf8_to_b64(item.innerHTML));
            item.innerHTML = item.innerHTML.replace(i,format_money(total_discount)?format_money(total_discount):0);  
          }
        }else if(i.indexOf('pay_money') > -1 && typeof pay_money != 'undefined'){
          if(pay_money || pay_money === 0 || pay_money === "0"){
            item.setAttribute('data-old-html',utf8_to_b64(item.innerHTML));
            let split = '';
            split = i.replace('pay_money',pay_money);
            split = split.replace('{','').replace('}','');
            if(i.indexOf('+') > -1){
              split = split.split('+');
              pay_fee = parseFloat(split[1].trim());
              split = parseFloat(split[0].trim())+parseFloat(split[1].trim());
            }
            item.setAttribute('data-var','pay_money');
            item.innerHTML = item.innerHTML.replace(i,format_money(split));  
          }
        }
        replaceVariable(item,check_text,list_variable)
      }
    }
  }
}
let check_param = getAllUrlParams(window.location.href);
if(document.querySelector("[id^=FORM]")){
  document.querySelectorAll("[id^=FORM]").forEach((item)=>{
    for(let i in check_param){
      if(item.querySelector(`input[name=${i}]`)){
        item.querySelector(`input[name=${i}]`).value= decodeURIComponent(check_param[i]);
      }else if(i == 'full_name' || i == 'name' || i=='fullname'){
        if(item.querySelector(`input[name="full_name"]`)){
          item.querySelector(`input[name="full_name"]`).value= decodeURIComponent(check_param[i]);  
        }
        if(item.querySelector(`input[name="name"]`)){
          item.querySelector(`input[name="name"]`).value= decodeURIComponent(check_param[i]);  
        }
        if(item.querySelector(`input[name="fullname"]`)){
          item.querySelector(`input[name="fullname"]`).value= decodeURIComponent(check_param[i]);  
        }
      }else{
        let array_var = ['name','full_name','fullname','phone','email','ref','cid','aff','src','address','id','order_id','cart_order_id','cart_order_money']
        if(array_var.indexOf(i) > -1){
          addInput(item,i,check_param[i])
        }
      }
    }
    if(getCookie('cid')){
      addInput(item,'cid',getCookie('cid'))
    }
    if(getCookie('aff')){
      addInput(item,'aff',getCookie('aff'))
    }
    if(getCookie('ref')){
      addInput(item,'ref',getCookie('ref'))
    }
    if(getCookie('cid')){
      addInput(item,'cid',getCookie('cid'))
    }
    if(getCookie('src')){
      addInput(item,'src',getCookie('src'))
    }
  })
}
function addInput(item,i,value) {
  if(!item.querySelector("[name="+i+"]")){
    let input = document.createElement('input');
    input.setAttribute('name',i);
    input.setAttribute('value',value);
    input.setAttribute('type','hidden');
    item.querySelector("form").appendChild(input)
  }
}
function replaceVariable(item,check_text,list_variable = false) {
  for(let i of check_text){
    if(localStorage.getItem("data_form")){
      let data_form = JSON.parse(b64_to_utf8(localStorage.getItem("data_form")));
      for(let i in data_form){
        if(i != 'order_id' && i != 'pay_money'){
          if(!item.getAttribute('old_html')){
            item.setAttribute('old_html',utf8_to_b64(item.innerHTML));
          }
          if(i == 'full_name' || i == 'fullname' || i == 'name'){
            item.innerHTML = item.innerHTML.replace('{name}',data_form[i]);
            item.innerHTML = item.innerHTML.replace('{full_name}',data_form[i]);
            item.innerHTML = item.innerHTML.replace('{fullname}',data_form[i]);
          }else if(i == 'customer_cid'){
            item.innerHTML = item.innerHTML.replace('{cid}',data_form[i]);
          }else{
            item.innerHTML = item.innerHTML.replace('{'+i+'}',data_form[i]);  
          }
        }
      }
    }

    let data = getAllUrlParams(window.location.href)[i.replace('{','').replace('}','')]
    if(!data){
      data = '';
    }
    if(i== '{order_id}' && getAllUrlParams(window.location.href)['order_id']){
      item.innerHTML = item.innerHTML.replace(i,encodeURI(data));
    }
    if(i== '{order_money}' && getAllUrlParams(window.location.href)['order_money']){
      item.innerHTML = item.innerHTML.replace(i,encodeURI(data));
    }
    if(i== '{cart_order_id}' && getAllUrlParams(window.location.href)['cart_order_id']){
      item.innerHTML = item.innerHTML.replace(i,encodeURI(data));
    }
    if(i== '{cart_money}' && getAllUrlParams(window.location.href)['cart_money']){
      item.innerHTML = item.innerHTML.replace(i,encodeURI(data));
    }
    let array_pass = ['{order_id}','{order_money}','{cart_order_id}','{cart_money}','{coupon_text}','{coupon_code}','{spin_turn_left}']
    if(array_pass.indexOf(i) == -1){
      if(!item.getAttribute('old_html')){
        item.setAttribute('old_html',utf8_to_b64(item.innerHTML));
      }
      if(item.getAttribute('list_variable')){
        if(item.getAttribute('list_variable').indexOf(i) == -1){
          item.setAttribute('list_variable',item.getAttribute('list_variable')+','+i)  
        }
      }else{
        item.setAttribute('list_variable',i)
      }
      if(list_variable && list_variable[i.replace('{','').replace('}','')]){
        item.innerHTML = item.innerHTML.replace(i,list_variable[i.replace('{','').replace('}','')]);
      }else{
        item.innerHTML = item.innerHTML.replace(i,encodeURI(data));
      }
      
    }
  }
}
// gallery
if(document.querySelector("[id^=GALLERY]")){
  document.querySelectorAll(".child_gallery .item").forEach((item)=>{
    item.addEventListener('click',function(event) {
      item.closest("[id^=GALLERY]").querySelectorAll(".animate__fadeIn").forEach((item)=>{
        item.classList.remove('animate__fadeIn')
      })
      setTimeout(function(){
        item.closest("[id^=GALLERY]").querySelector(".main_gallery").style.backgroundImage = item.style.backgroundImage;
        item.closest("[id^=GALLERY]").querySelector(".main_gallery").classList.add('animate__animated');
        item.closest("[id^=GALLERY]").querySelector(".main_gallery").classList.add('animate__fadeIn');
        item.closest("[id^=GALLERY]").querySelector(".main_gallery").setAttribute('data-index',item.getAttribute('data-index'));
      },200)
    })
  })
  document.querySelectorAll('[id^=GALLERY]').forEach((item)=>{
    let list_child = [...item.querySelector(".child_gallery").children];
    for(let i of list_child){
      i.setAttribute('data-index',list_child.indexOf(i));
    }
    item.querySelector(".next_gallery").addEventListener('click',function() {
      let index = parseFloat(item.querySelector(".main_gallery").getAttribute('data-index')?item.querySelector(".main_gallery").getAttribute('data-index'):0);
      let new_item ;
      if(item.querySelector(`.child_gallery [data-index="${index+1}"]`)){
        new_item = item.querySelector(`.child_gallery [data-index="${index+1}"]`);
        new_item.click();
        item.querySelector(".main_gallery").setAttribute('data-index',index+1);
      }else{
        new_item = item.querySelector(`.child_gallery [data-index="0"]`)
        new_item.click();
        item.querySelector(".main_gallery").setAttribute('data-index',0);
      }
      list_child = [...item.querySelector(".child_gallery").children];
      if(list_child.indexOf(new_item) == 4){
        item.querySelector(".child_gallery").appendChild(item.querySelector(".child_gallery").children[0]);
        item.querySelector(".child_gallery").children[3].classList.add('animate__animated');
        item.querySelector(".child_gallery").children[3].classList.add('animate__fadeIn');
      }
    })
    item.querySelector(".prev_gallery").addEventListener('click',function() {
      let index = parseFloat(item.querySelector(".main_gallery").getAttribute('data-index')?item.querySelector(".main_gallery").getAttribute('data-index'):0);
      let new_item;
      list_child = [...item.querySelector(".child_gallery").children];
      if(item.querySelector(`.child_gallery [data-index="${index-1}"]`)){
        new_item = item.querySelector(`.child_gallery [data-index="${index-1}"]`)
        new_item.click();
        item.querySelector(".main_gallery").setAttribute('data-index',index-1);
      }else{
        new_item = item.querySelector(`.child_gallery [data-index="${list_child.length-1}"]`);
        new_item.click();
        item.querySelector(".main_gallery").setAttribute('data-index',list_child.length-1);
      }
      if(index == item.querySelector(".child_gallery > *:first-child").getAttribute('data-index')){
        new_item = item.querySelector(".child_gallery").insertBefore(item.querySelector(".child_gallery").children[list_child.length-1], item.querySelector(".child_gallery").children[0]);
        new_item.classList.add('animate__animated');
        new_item.classList.add('animate__fadeIn');
      }
    })
    if(item.getAttribute('data-loop')){
      setInterval(function () {
        item.querySelector(".next_gallery").click();
      }, item.getAttribute('data-loop')*1000);
    }
  })
}
try{
  if(document.querySelector("[id^=BOX_BUMP]") && bump_step){

    document.querySelector("[id^=BOX_BUMP] > *:first-child").innerHTML = b64_to_utf8(bump_step);
    document.querySelectorAll("[id^=BOX_BUMP] > *:first-child > .row").forEach((item)=>{
      item.setAttribute('style',`background:${getComputedStyle(item.parentNode).background};border:${getComputedStyle(item.parentNode).border};border-radius:${getComputedStyle(item.parentNode).borderRadius};`)  
    })
    // reset height box_bump

    
    document.querySelectorAll("[id^=BOX_BUMP] > *:first-child img").forEach((item)=>{
      item.addEventListener('load',function() {
        item.setAttribute('loaded',true);
        let check = document.querySelectorAll("[id^=BOX_BUMP] > *:first-child img:not([loaded])");
        if(check.length  == 0){
          let space = 0;
          let style_bump = window.getComputedStyle( document.querySelector("[id^=BOX_BUMP] > *:first-child"));
          let old_height = parseFloat(style_bump.getPropertyValue('height'));
          document.querySelector("[id^=BOX_BUMP] > *:first-child").style.height = 'fit-content'
          let height = document.querySelector("[id^=BOX_BUMP] > *:first-child").offsetHeight
          if(document.querySelector("[id^=BOX_BUMP]").closest("[id^=TABS_ITEM_CONTENT]")
            && document.querySelector("[id^=BOX_BUMP]").closest("[id^=TABS_ITEM_CONTENT]").style.display == 'none'){
            let tab_content = document.querySelector("[id^=BOX_BUMP]").closest("[id^=TABS_ITEM_CONTENT]");
            tab_content.style.display = 'block';
            tab_content.style.opacity = '0';
            tab_content.style.zIndex = -1;
            height = document.querySelector("[id^=BOX_BUMP] > *:first-child").offsetHeight;
            let box_pro = document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]');
            if(box_pro){
              box_pro.style.display = 'block';
              box_pro.style.opacity = '0';
              box_pro.style.zIndex = -1;
              space = box_pro.offsetHeight;
              // console.log(space)
              downTopAllChildren(document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]'),space);
              document.querySelector("[id^=BOX_BUMP] > *:first-child").style.height = (height+20)+'px';
              // downTopAllChildren(document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]'),space);
              upTopAllChildren(document.querySelector("[id^=BOX_BUMP]"),height-old_height,true);

              box_pro.setAttribute('style','display:none;');
              let array_top = [];
              document.querySelector("[id^=BUMP]").parentNode.querySelectorAll('[id^=BOX_PRODUCT]').forEach((item)=>{
                if(item.style.display != 'none'){
                  array_top.push({item:item,top:parseFloat(window.getComputedStyle(item).getPropertyValue('top'))});
                }
              })
              array_top = array_top.sort(runSortTop);
              for(let i of array_top){
                upTopAllChildren(i.item,i.item.offsetHeight,true);
              }
            }
            
            tab_content.setAttribute('style','display: none;');
          }else{
            let box_pro = document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]');
            if(box_pro){
               box_pro.style.display = 'block';
              box_pro.style.opacity = '0';
              box_pro.style.zIndex = -1;
              space = box_pro.offsetHeight;
              downTopAllChildren(document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]'),space);
              document.querySelector("[id^=BOX_BUMP] > *:first-child").style.height = (height+20)+'px';
              // downTopAllChildren(document.querySelector("[id^=BUMP]").parentNode.querySelector('[id^=BOX_PRODUCT]'),space);
              upTopAllChildren(document.querySelector("[id^=BOX_BUMP]"),height-old_height,true);
              
              box_pro.setAttribute('style','display:none;')
              let array_top = [];
              document.querySelector("[id^=BUMP]").parentNode.querySelectorAll('[id^=BOX_PRODUCT]').forEach((item)=>{
                if(item.style.display != 'none'){
                  array_top.push({item:item,top:parseFloat(window.getComputedStyle(item).getPropertyValue('top'))});
                }
              })
              array_top = array_top.sort(runSortTop);
              for(let i of array_top){
                upTopAllChildren(i.item,i.item.offsetHeight,true);
              }
            }
          }
          
          upHeightAllParent(document.querySelector("[id^=BOX_BUMP]  > *:first-child"));
        }
      })
    })


    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.border = "unset"
    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.background = "none"
    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.borderRadius = "unset"
    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.display = 'flex';
    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.flexDirection = 'column';
    document.querySelector("[id^=BOX_BUMP] > *:first-child").style.gap = '20px';

    
    document.querySelectorAll(".tieude-bump-show input[type='checkbox']").forEach((item)=>{
      item.addEventListener('click',function() {
        if(this.checked){
          let check = true;
          for(let i of products_funel){
            if(i.product_id == this.getAttribute('data-product-id')){
              i.quantity +=parseInt(this.getAttribute('data-quantity'));
              check = false;
            }
          }
          if(check){
            products_funel.push({
              product_id:this.getAttribute('data-product-id'),
              name:this.closest(".row").querySelector(".title-bump").textContent,
              image:this.closest(".row").querySelector(".bump-image img").getAttribute('src'),
              price:this.getAttribute('data-product-price'),
              price_sale:this.getAttribute('data-product-price_sale'),
              quantity:parseInt(this.getAttribute('data-quantity'))
            });
            document.querySelectorAll('div:has( > [id^=BOX_PRODUCT])').forEach((item)=>{
              let last_top_item = 0;
              let last_item;
              item.querySelectorAll("[id^=BOX_PRODUCT]").forEach((item)=>{
                if(item.offsetTop >= last_top_item){
                  last_item = item;
                  last_top_item = item.offsetTop;
                }
              })
              add_product_to_list(last_item,products_funel.length-1,products_funel);
              // upHeightAllParent(item)
            })
            // add_product_to_list(products_funel.length-1)
          }
        }else{
          for(let i in products_funel){
            if(products_funel[i].product_id == this.getAttribute('data-product-id')){
              if(products_funel[i].quantity >parseInt(this.getAttribute('data-quantity'))){
                products_funel[i].quantity -=parseInt(this.getAttribute('data-quantity'))
              }else{
                document.querySelectorAll(`[data-product="${products_funel[i].product_id}"]`).forEach((item)=>{
                  downTopAllChildren(item);
                  item.remove();
                })
                products_funel.splice(i, 1);
              }
            }
          }
        }
        change_detail_bump();
      })
    })
    document.querySelectorAll(".bump_quantity").forEach((item)=>{
      item.addEventListener('change',function() {
        let check_box = item.closest(".row-content-bump").parentNode.querySelector(".tieude-bump-show input[type='checkbox']");
        let id_product = check_box.getAttribute('data-product-id');
        let item_pro = {};
        if(check_box.checked){
          for(let i in products_funel){
            if(products_funel[i].id == id_product || products_funel[i].product_id == id_product){
              products_funel[i].quantity = parseInt(this.value)
              item_pro = products_funel[i];
            }
          }
          change_detail_bump()
          let item = q(`[id^=BOX_PRODUCT][data-product="${id_product}"]`)
          showHTMLProduct(item,item_pro,products_funel)
        }
      })
    })
    if(q(".box_bump .counter-flex")){
      a(".counter-flex").forEach((item)=>{
        a("span",item).forEach((span)=>{span.classList.add("action_quantity")});
        q(".down",item).setAttribute('action','down');
        q(".up",item).setAttribute('action','up');
        action_quantity(item)
        q("input",item).addEventListener('change',function() {
          item.closest(".row:not(.row-content-bump)").querySelector("#checkbox_bump").setAttribute('data-quantity',this.value)
        })
      })
    }
  }
  if(q("[id^=BUMP] [id^=BUTTON] [data-funnel=yes]")){
    let item = q("[id^=BUMP] [id^=BUTTON] [data-funnel=yes]");
    item.replaceWith(item.cloneNode(true));
    q("[id^=BUMP] [id^=BUTTON] [data-funnel=yes]").addEventListener('click',function() {
      let list_data = [];
      this.closest("[id^=BUMP]").querySelectorAll(".box_bump .tieude-bump-show").forEach((item)=>{
        let input = item.querySelector("input");
        if(input.checked){
          list_data.push({
            id:input.getAttribute('data-product-id'),
            quantity: parseInt(input.getAttribute('data-quantity'))
          })  
        }
      })
      // console.log(list_data);
      addToCart(url_funel,false,list_data)
      if(this.querySelector('[id^=SHAPE]')){
        this.querySelector('[id^=SHAPE]').remove();
      }
      this.querySelector("span").innerHTML = '<i class=" remove_submit fa fa-spinner fa-spin"></i>'+this.querySelector("span").innerHTML;
    })
  }
}catch(e){
  document.querySelector(".box_bump").remove();
}

function change_detail_bump() {
  let total_money = 0;
  let total_discount = 0;
  let el_total_money = document.querySelector('[data-var="total_money"]');
  let el_total_discount = document.querySelector('[data-var="total_discount"]');
  let el_pay_money = document.querySelectorAll('[data-var="pay_money"]');
  let el_tempo_price = document.querySelector('[field-attribute="tempo_price"]');
  for(let i of products_funel){
    let quantity = i.quantity;
    if(!quantity){
      quantity = 1;
    }
    total_money += i.price*quantity;
    if(parseInt(i.price)){
      total_discount += (i.price - i.price_sale)*quantity;
    }
  }
  if(el_tempo_price){
    el_tempo_price.innerHTML= b64_to_utf8(el_tempo_price.getAttribute('data-html')).replace('{tempo_price}',format_money(total_money));  
  }
  if(el_total_money){
    el_total_money.innerHTML= b64_to_utf8(el_total_money.getAttribute('data-old-html')).replace('{total_money}',format_money(total_money));  
  }
  if(el_total_discount){
    el_total_discount.innerHTML= b64_to_utf8(el_total_discount.getAttribute('data-old-html')).replace('{total_discount}',format_money(total_discount));  
  }
  
  el_pay_money.forEach((item)=>{
    let html_pay_money = b64_to_utf8(item.getAttribute('data-old-html')); 
    total_money = 0;
    for(let i of products_funel){
      let quantity = i.quantity;
      if(!quantity){
        quantity = 1;
      }
      total_money += i.price_sale*quantity;
      if(parseInt(i.price)){
        total_discount += (i.price - i.price_sale)*quantity;
      }
    }
    let regex = /{[ a-z_+\-0-9)]*}/g;
    if(html_pay_money.match(regex) && html_pay_money.match(regex)[0]){
      let split = html_pay_money.match(regex)[0].replace('pay_money',total_money);
      split = split.replace('{','').replace('}','');
      if(split.indexOf('+') > -1){
        
        split = split.split('+');
        split = parseFloat(split[0].trim())+parseFloat(split[1].trim());
      }
      item.innerHTML= html_pay_money.replace(html_pay_money.match(regex)[0], format_money(split));
    }
  })
  
}

function format_money(number,check=false) {
    let index_sub = 0
    if(number.toString().length <= 3){
      return number;
    }
    if(!Number.isInteger(number.toString().length/3)){
      index_sub = number.toString().length - (parseInt(number.toString().length/3)*3);
    }
    let new_number = number.toString().substring(index_sub, number.length);
    let first_number = number.toString().substring(0, index_sub)
    let regex = /[0-9]{3}/g;
    let check_number = [...new_number.matchAll(regex)];
    check_number = check_number.map((item)=>{return item[0];});

    check_number = check_number.join('.');
    number = check_number;
    if(first_number){
      number = first_number+'.'+number;
    }
    if(!number){
      number = 0;
    }
    return number;
};
function loading() {
  // let loading = document.createElement('div');
  // loading.className = 'loading_salekit';
  // loading.innerHTML = '<div class="lds-ripple"><div></div><div></div></div>';
  // document.body.appendChild(loading);
}
function unload() {
  if(document.querySelector(".remove_submit")){
    document.querySelector(".remove_submit").remove();  
  }
}
// document.querySelectorAll('button[type="submit"]').forEach((item)=>{
//   item.addEventListener('click',function() {
//     item.querySelector("span").innerHTML = '<i class=" remove_submit fa fa-spinner fa-spin"></i>'+item.querySelector("span").innerHTML;
//   })
// })

document.querySelectorAll('button[data-funnel="pay"]').forEach((item)=>{
  item.addEventListener('click',function() {
    if(item.querySelector("span i")){
      item.querySelector("span i").remove();
    }
    item.querySelector("span").innerHTML = '<i class=" remove_submit fa fa-spinner fa-spin"></i>'+item.querySelector("span").innerHTML;
  })
})

// Store the meta element
if(document.querySelector(".sp_container")){
  var viewport_meta = document.querySelector('[name="viewport"]');

  // Define our viewport meta values
  let width_section = parseFloat(window.getComputedStyle(document.querySelector(".sp_container")).getPropertyValue("width"));
  var viewports = {
      landscape: 'width='+width_section+', user-scalable=no, initial-scale='+document.body.offsetWidth/width_section+', minimum-scale='+document.body.offsetWidth/width_section+', maximum-scale='+document.body.offsetWidth/width_section
    };

  // Change the viewport value based on screen.width
  var viewport_set = function() {
        viewport_meta.setAttribute( 'content', viewports.landscape );
  }

  // Set the correct viewport value on page load
  viewport_set();

  // Set the correct viewport after device orientation change or resize
  window.onresize = function() { 
    viewport_set(); 
  }  
}
  
  if(document.querySelector(".show_pass")){
    document.querySelector(".show_pass").addEventListener('click',function() {
      if(this.parentNode.querySelector('input').getAttribute('type') == 'password'){
        this.parentNode.querySelector('input').setAttribute('type','text');
      }else{
        this.parentNode.querySelector('input').setAttribute('type','password');
      }
      this.querySelector('i').classList.toggle('fa-eye-slash')
      this.querySelector('i').classList.toggle('fa-eye')
    })
  }

 function showPopupAlert(text,item) {
   let group = document.createElement('div');
      group.setAttribute('style','position: fixed;top: 0;left: 0;z-index: 9999999999;background: #0000003b;width: 100%;height: 100%;display: flex;')
      let html = '<div style="\
              max-width: max-content;\
              background: #fff;\
              margin: auto;\
              border-radius: 5px;\
              position: relative;">\
              <div style="padding:20px;">'
      html += text;       
      html +='</div>\
              <button style="color: #3d3d3d;\
                        display: inline-block;\
                        padding: 8px 17px;\
                        font-size: 16px;\
                        border-radius: 5px;\
                        cursor: pointer;\
                        border: 1px solid var(--color-gray);\
                        margin: 20px;\
                        margin-top: 0;\
                        float: right;">Đóng</button>\
              </div>';
      group.innerHTML = html;
      group.querySelector('button').addEventListener('click',function() {
        if(item.closest('[id^=POPUP]')){
          item.closest('[id^=POPUP]').removeAttribute('style');
        }
        group.remove();
      })
      group.addEventListener('click',function(event) {
        if(event.target == group || event.target.closest(".close_modal")){
          if(item.closest('[id^=POPUP]')){
            item.closest('[id^=POPUP]').removeAttribute('style');
          }
          group.remove();
        }
      })
      document.body.appendChild(group);
 }
 function logoutLandingpage() {
   $.ajax({
        url: 'https://api.salekit.io/api/v1/logout/'+document.querySelector("#landingpage").value,
        method: 'POST',
        success: function(data, textStatus, xhr){
          if(data.link_login){
            window.location.href = data.link_login;
          }
        }
    })
 }
 function collapseBlock(item,collapse_item) {
    collapse_item = document.querySelector("#"+collapse_item);
    collapse_item.style.overflow = 'hidden';

   if(collapse_item.offsetHeight == 0){
    changeHeightParent(collapse_item.parentNode.closest('[id]'),collapse_item.querySelector("*:first-child").offsetHeight,'up',collapse_item.offsetTop);
    countHeight(0,collapse_item.querySelector("*:first-child").offsetHeight,collapse_item,false);
   }else{
    changeHeightParent(collapse_item.parentNode.closest('[id]'),collapse_item.querySelector("*:first-child").offsetHeight,'down',collapse_item.offsetTop);
    countHeight(collapse_item.querySelector("*:first-child").offsetHeight,0,collapse_item,false);
   }
 }
function countHeight(start,end,element,removeClass){
    let id = setInterval(count, 0.1);
    function count() {
      if (start == end || (start < 0 || (start > end && end != 0))) {
        clearInterval(id);
      } else {
        if(start > end){
          start = start - 2 
        }else{
          start  = start + 2;
        }
        element.style.height = start + 'px';
      }
    }
}
function changeTopCollapse(parent,height,type,top) {
  parent.querySelector("*:first-child").childNodes.forEach((item)=>{
    if(item.id && item.offsetTop > top){
      let start = item.offsetTop;
      let end;
      if(type == 'up'){
        end = top+height;
      }else{
        end = item.offsetTop - top < height? top:(item.offsetTop - height);
      }
      let id = setInterval(count, 0.1);
      function count() {
        if ((start < end+2 && type == 'down') || (start > end-2 && type =='up') ) {
          clearInterval(id);
        } else {
          if(start > end){
            start = start - 2 
          }else{
            start  = start + 2;
          }
          item.style.top = start + 'px';
        }
      }
    }
  })
}
function changeHeightParent(parent,height,type,top) {
  let start = parent.offsetHeight;
  let end;
  if(type == 'up'){
    end = parent.offsetHeight+parseFloat(height);
  }else{
    end = parent.offsetHeight-parseFloat(height);
  }
  changeTopCollapse(parent,height,type,top);
  let id = setInterval(count, 0.1);
    function count() {
      if (start == end || (start < 0 || (start > end && type == 'up'))) {
        clearInterval(id);
      } else {
        if(start > end){
          start = start - 2 
        }else{
          start  = start + 2;
        }
        parent.style.height = start + 'px';
      }
    }
  if(parent.id.indexOf('SECTION') == -1 && parent.id.indexOf('POPUP') == -1 ){
    changeHeightParent(parent.parentNode.closest('[id]'),height,type,parent.offsetTop)
  }
}
//  convert phone
document.querySelectorAll('[data-type="phone"]').forEach((item)=>{
  item.addEventListener('keyup',function() {
    if(this.value.indexOf('+84') > -1){
      this.value = this.value.replace('+84','0');
    }
  })
})
if(document.body.classList.contains('mobile_only')){
  document.querySelectorAll('section').forEach((item)=>{
    item.style.width = item.querySelector('.sp_container').offsetWidth+'px';
    item.style.margin = 'auto';
  })
}
// survey
document.querySelectorAll('[id^=SURVEY]').forEach((item)=>{
  // check form
  let data_name = item.getAttribute('data-name')?item.getAttribute('data-name'):'question_'+item.id.toLowerCase();
  if(item.getAttribute('data-form')){
    let list_form = item.getAttribute('data-form').split(',');
    for(let i of list_form){
      if(document.querySelector('#'+i)){
        let form = document.querySelector('#'+i+" form");
        let input = document.createElement('input');
        input.setAttribute('type','hidden')
        input.setAttribute('name',data_name);
        form.appendChild(input)
      }
    }
  }
  item.querySelectorAll('.img_survey').forEach((img)=>{
    img.parentNode.addEventListener('click',function() {
      if(this.classList.contains('active_survey')){
        this.classList.remove('active_survey');
      }else{
        if(!item.querySelector(".next_survey") && item.querySelector(".active_survey")){
          item.querySelector(".active_survey").classList.remove('active_survey');
        }
        this.classList.add('active_survey');
        if(!item.querySelector(".next_survey")){
          window['action_survey_'+item.id]();
        }
      }
      let list_data = [];
      item.querySelectorAll(".active_survey").forEach((active_survey)=>{
        list_data.push(b64_to_utf8(active_survey.getAttribute('data-value')))
      })
      document.querySelectorAll(`input[name='${data_name}']`).forEach((input)=>{
        input.setAttribute('value',list_data.join(','))
      })
    })
  })
  if(item.querySelector('.next_survey')){
    item.querySelector('.next_survey').addEventListener('click',function() {
      window['action_survey_'+item.id]();
    })
  }
})

  // ************************* vertical
  function story_page_vertical() {
    let top = 0;
    let time = 3000
    let loading = document.createElement('div');
    loading.className = 'loading_storypage'
    document.body.appendChild(loading);
    document.querySelectorAll('section').forEach((item)=>{
      let clone = document.createElement('div');
      clone.className = 'item_loading '+item.id;
      clone.setAttribute('data-id',item.id)
      clone.innerHTML = '<div style="background:#fff;width:0px;height:10px;cursor:pointer"></div>';
      loading.appendChild(clone);
      clone.addEventListener('click',function() {
        let check_section = false;
        document.querySelector("#"+clone.getAttribute('data-id')).style.display = 'block';
        document.querySelector("#"+clone.getAttribute('data-id')).style.top = '0px';
        document.querySelector(".item_loading."+clone.getAttribute('data-id')+" div").style.width = '0px';
        document.querySelectorAll('section').forEach((item)=>{
          if(check_section){
            document.querySelector(".item_loading."+item.id+" div").style.width = '0px';
            item.style.top = document.querySelector("#"+clone.getAttribute('data-id')).offsetHeight+'px';
            item.style.display = 'none';
          }
          if(item.id==clone.getAttribute('data-id')){
            check_section = true;
          }
        })
        clearInterval(run_wait_section);
        clearInterval(run_loading);
        run_next_section(document.querySelector("#"+clone.getAttribute('data-id')),true);
      })
      item.style.position ='absolute';
      item.style.width ='100%';
      item.style.minHeight ='100%';
      item.style.top = top+'px';

      top = item.offsetWidth;
      if(parseFloat(item.style.top) > 0){
        item.style.display = 'none';
      }
    })
    var section = document.querySelector("section");
    document.body.style.overflow = 'hidden'
        run_next_section(section)
    var run_wait_section;
    var run_loading
    function run_next_section(section,click = false) {
      let date = new Date();
      run_loading = setInterval(function() {
        let div = document.querySelector(".item_loading."+section.id+" div");
        if(parseFloat(div.style.width) > div.parentNode.offsetWidth){
          clearInterval(run_loading);
        }else{
          div.style.width = (parseFloat(div.style.width) + parseFloat(div.parentNode.offsetWidth)/(time/5))+'px'
        }
      }, 5);
      run_wait_section = setInterval(function() {
        clearInterval(run_wait_section);
        if(section.nextSibling.tagName == 'SECTION'){
          let div = document.querySelector(".item_loading."+section.id+" div");
          div.style.height = div.parentNode.offsetHeight+'px';
          let top = parseFloat(section.style.top);
          let height = section.offsetHeight;
          section.nextSibling.style.display = 'block';
          const run_section = setInterval(function() {
            if(parseFloat(section.style.top) <= top-height){
              section.style.top = top-height;
              section.style.display = 'none';
              section.nextSibling.style.top = '0px';

              section = section.nextSibling;
              run_next_section(section);
              clearInterval(run_section);
            }else{
              section.style.top = (parseFloat(section.style.top) - 10) + 'px'
              section.nextSibling.style.top = (parseFloat(section.nextSibling.style.top) - 10) + 'px'
            }
          }, 0);
        }
      }, time);
    }
  }

  // ********************* horizontal
  function story_page_horizontal() {
    let left = 0;
    let time = 3000
    let loading = document.createElement('div');
    loading.className = 'loading_storypage'
    document.body.appendChild(loading);
    document.querySelectorAll('section').forEach((item)=>{
      let clone = document.createElement('div');
      clone.className = 'item_loading '+item.id;
      clone.setAttribute('data-id',item.id)
      clone.innerHTML = '<div style="background:#fff;width:0px;height:10px;cursor:pointer"></div>';
      loading.appendChild(clone);
      clone.addEventListener('click',function() {
        let check_section = false;
        document.querySelector("#"+clone.getAttribute('data-id')).style.display = 'block';
        document.querySelector("#"+clone.getAttribute('data-id')).style.left = '0px';
        document.querySelector(".item_loading."+clone.getAttribute('data-id')+" div").style.width = '0px';
        document.querySelectorAll('section').forEach((item)=>{
          if(check_section){
            document.querySelector(".item_loading."+item.id+" div").style.width = '0px';
            item.style.left = document.querySelector("#"+clone.getAttribute('data-id')).offsetWidth+'px';
            item.style.display = 'none';
          }
          if(item.id==clone.getAttribute('data-id')){
            check_section = true;
          }
        })
        clearInterval(run_wait_section);
        clearInterval(run_loading);
        run_next_section(document.querySelector("#"+clone.getAttribute('data-id')),true);
      })
      item.style.position ='absolute';
      item.style.width ='100%';
      item.style.minHeight ='100%';
      item.style.left = left+'px';

      left = item.offsetWidth;
      if(parseFloat(item.style.left) > 0){
        item.style.display = 'none';
      }
    })
    var section = document.querySelector("section");
    if(document.body.offsetHeight < section.offsetHeight){
      document.body.style.overflowY = null;
      document.body.style.height = section.offsetHeight+'px';
    }else{
      document.body.style.overflow = 'hidden'
    }
        run_next_section(section)
    var run_wait_section;
    var run_loading
    function run_next_section(section,click = false) {
      let date = new Date();
      run_loading = setInterval(function() {
        let div = document.querySelector(".item_loading."+section.id+" div");
        if(parseFloat(div.style.width) > div.parentNode.offsetWidth){
          clearInterval(run_loading);
        }else{
          div.style.width = (parseFloat(div.style.width) + parseFloat(div.parentNode.offsetWidth)/(time/5))+'px'
        }
      }, 5);
      run_wait_section = setInterval(function() {
        clearInterval(run_wait_section);
        if(section.nextSibling.tagName == 'SECTION'){
          let div = document.querySelector(".item_loading."+section.id+" div");
          div.style.width = div.parentNode.offsetWidth+'px';
          let left = parseFloat(section.style.left);
          let width = section.offsetWidth;
          section.nextSibling.style.display = 'block';
          const run_section = setInterval(function() {
            if(parseFloat(section.style.left) <= left-width){
              section.style.left = left-width;
              section.style.display = 'none';
              section.nextSibling.style.left = '0px';

              section = section.nextSibling;
              run_next_section(section);
              clearInterval(run_section);
            }else{
              section.style.left = (parseFloat(section.style.left) - 10) + 'px'
              section.nextSibling.style.left = (parseFloat(section.nextSibling.style.left) - 10) + 'px'
            }
          }, 0);
          if(window.innerHeight < section.nextSibling.offsetHeight){
            document.body.style.overflowY = null;
            document.body.style.height = section.nextSibling.offsetHeight+'px';
          }else {
            document.body.style.overflow = 'hidden'
          }
        }
      }, time);
    }
  }
function copyToClipboard(text,event=false){
  if(event){
    // show tooltip
    if(document.querySelector(".tooltip_copy")){
      document.querySelector(".tooltip_copy").remove();
    }
    let target = event.target.closest('[id]');
    let top = getOffsetTop(target);
    let tooltip = document.createElement('div');
    tooltip.className = 'tooltip_copy'
    tooltip.innerHTML = 'copied';
    if((top-50) > window.pageYOffset){
      tooltip.style.top = (top-40)+'px';
      tooltip.style.left = (getOffsetLeft(target)+(target.offsetWidth/2))+'px';
      tooltip.classList.add('bottom_tooltip');
    }else{
      tooltip.style.top = (top+target.offsetHeight+10)+'px';
      tooltip.style.left = (getOffsetLeft(target)+(target.offsetWidth/2))+'px';
      tooltip.classList.add('top_tooltip');
    }
    document.body.appendChild(tooltip)
    setTimeout(function(){
      tooltip.remove();
    },1000)
  }

  if (window.clipboardData && window.clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData("Text", text);

  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      } catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      } finally {
          document.body.removeChild(textarea);
      }
  }
}
function getOffsetTop(el,top=0) {
  if(el!=q('body')){
    let style_el = window.getComputedStyle(el.parentNode);
    let check = false;
    if(style_el.getPropertyValue('position') != 'absolute'
      && style_el.getPropertyValue('position') != 'fixed'
      && style_el.getPropertyValue('position') != 'relative'
      && style_el.getPropertyValue('position') != 'sticky'){
      check = style_el.getPropertyValue('position');
      el.parentNode.style.position = 'relative';  
    }
    top += el.offsetTop-(el.parentNode.scrollTop?el.parentNode.scrollTop:0);
    if(check){
      el.parentNode.style.position = check;
    }
    top = getOffsetTop(el.parentNode,top);
  }
  return top;
}
function getOffsetLeft(el,left=0) {
  if(el!=q('body')){
    let style_el = window.getComputedStyle(el.parentNode);
    let check = false;
    if(style_el.getPropertyValue('position') != 'absolute'
      && style_el.getPropertyValue('position') != 'fixed'
      && style_el.getPropertyValue('position') != 'relative'
      && style_el.getPropertyValue('position') != 'sticky'){
      check = style_el.getPropertyValue('position');
      el.parentNode.style.position = 'relative';  
    }
    left += el.offsetLeft-(el.parentNode.scrollLeft?el.parentNode.scrollLeft:0);
    if(check){
      el.parentNode.style.position = check;
    }
    left = getOffsetLeft(el.parentNode,left);
  }
  return left;
}
// slide
if(document.querySelector('[id^=CAROUSEL][running_time]')){
  document.querySelectorAll('[id^=CAROUSEL][running_time]').forEach((item)=>{
    if(item.getAttribute('auto_run')){
      next_slide(item);
    }
  })
  function next_slide(group,time=false) {
    let run_slide1 = setInterval(function(){
      if(!group.getAttribute('stop')){
        if(!time){
          time = group.getAttribute('running_time')*100;
        }
        // console.log(time)
        let check_space = next_item(group,time);
        if (!check_space) {
          clearInterval(run_slide1);
          if(group.querySelector('[out]')){
            let max = 0 ;
            group.querySelectorAll('[id^=CAROUSEL_ITEM]').forEach((item)=>{
              if(item.offsetLeft < 0 ){
                max = item.offsetLeft
              }
            })
            group.querySelectorAll('[out]').forEach((out)=>{
              out.removeAttribute('out');
              group.querySelector("*:first-child").appendChild(out);
            })
            group.querySelectorAll('[id^=CAROUSEL_ITEM]').forEach((item)=>{
              item.style.left = max+'px';
            })
            next_item(group,time);
            next_slide(group);
          }
        }
      }
    }, group.getAttribute('running_time')*1000);
  }
  
}
if(document.querySelector('[id^=CAROUSEL]')){
  document.querySelectorAll('[id^=CAROUSEL_ITEM]').forEach((item)=>{
    item.addEventListener('click',function(event) {
    })
  
  // window.addEventListener('mouseover', function () {
  //     document.querySelectorAll('[id^=CAROUSEL][running_time]').forEach((item)=>{
  //       item.removeAttribute('stop');
  //     })
  // });
  // window.addEventListener('mouseout', function () {
  //     document.querySelectorAll('[id^=CAROUSEL][running_time]').forEach((item)=>{
  //       item.setAttribute('stop',true);
  //     })
  // });
  })
  document.querySelectorAll('[id^=CAROUSEL]').forEach((item)=>{
    item.addEventListener('mouseover',function(argument) {
      item.setAttribute('stop',true);
    })
    item.addEventListener('mouseout',function(argument) {
      item.removeAttribute('stop');
    })
  })
  
  var stop_slide;
  document.querySelectorAll('[id^=CAROUSEL] .next_item').forEach((item)=>{
    item.addEventListener('click',function(event) {
      let parent = item.closest('[id^=CAROUSEL]');
      parent.setAttribute('stop',true);
      clearInterval(stop_slide);
      stop_slide = setInterval(function(){
        parent.removeAttribute('stop');
      }, parent.getAttribute('running_time')*1000);
      next_item(parent,parent.getAttribute('running_time')*1000);
    })
  })
  document.querySelectorAll('[id^=CAROUSEL] .prev_item').forEach((item)=>{
    item.addEventListener('click',function(event) {
      let parent = item.closest('[id^=CAROUSEL]');
      parent.setAttribute('stop',true);
      clearInterval(stop_slide);
      stop_slide = setInterval(function(){
        parent.removeAttribute('stop');
      }, parent.getAttribute('running_time')*1000);
      prev_item(item.closest('[id^=CAROUSEL]'),item.closest('[id^=CAROUSEL]').getAttribute('running_time')*1000,true);
      // next_slide(item.closest('[id^=CAROUSEL]'));
    })
  })

  function next_item(group,time_run) {
    let space = 0;

    if(group.getAttribute('type_view') == 'vertical'){
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        if(!space &&group.offsetHeight < item.offsetTop+item.offsetHeight){
          space = (item.offsetTop+item.offsetHeight) -  group.offsetHeight
        }
      })
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        let space_return;
        let i;
        if(isNaN(parseFloat(item.style.top))){
          space_return =  "-"+space;
          i = 0;
        }else{
          space_return = (parseFloat(item.style.top) - space); 
          i = parseFloat(item.style.top);
        }
        let run_slide = setInterval(function(){
          if (i <= space_return) {
            item.style.top = space_return+'px';
            clearInterval(run_slide);
          }else{
            item.style.top = i+'px';
          }
          i = i - 2;
        }, 1);
        if(i <= space_return){
          clearInterval(run_slide);
        }
      })
    }else{

      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        if(!space &&group.offsetWidth < q("#"+item.id).offsetLeft+q("#"+item.id).offsetWidth){
          space = (q("#"+item.id).offsetLeft+q("#"+item.id).offsetWidth) -  group.offsetWidth
        }
      })
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        let space_return;
        let i;
        if(isNaN(parseFloat(item.style.left))){
          space_return =  "-"+space;
          i = 0;
        }else{
          space_return = (parseFloat(q("#"+item.id).style.left) - space); 
          i = parseFloat(q("#"+item.id).style.left);
        }
        let run_slide = setInterval(function(){
          i = i - 2;
          if (i <= space_return) {
            item.style.left = space_return+'px';
            clearInterval(run_slide);
            if(q("#"+item.id).offsetLeft < 0 && q("#"+item.id).offsetLeft*-1 > q("#"+item.id).offsetWidth){
              item.setAttribute('out',true);
            }
          }else{
            item.style.left = i+'px';
          }
        }, 1);
        if(i <= space_return){
          clearInterval(run_slide);
        }
      })
    }
    return space;
  }
  function prev_item(group,time_run) {
    let space = 0;
    if(group.getAttribute('type_view') == 'vertical'){
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        if(item.offsetTop < 0){
          space = item.offsetTop*-1
        }
      })
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        let space_return;
        let i;
        if(isNaN(parseFloat(item.style.top))){
          space_return =  space;
          i = 0;
        }else{
          space_return = (parseFloat(item.style.top) + space); 
          i = parseFloat(item.style.top);
        }
        let run_slide = setInterval(function(){
          if (i >= space_return) {
            item.style.top = space_return+'px';
            clearInterval(run_slide);
          }else{
            item.style.top = i+'px';
          }
          i = i + 2;
        }, 1);
        if(i >= space_return){
          clearInterval(run_slide);
        }
      })
    }else{
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        if(item.offsetLeft < 0){
          space = item.offsetLeft*-1
        }
      })
      a('[id^=CAROUSEL_ITEM]',group).forEach((item)=>{
        let space_return;
        let i;
        if(isNaN(parseFloat(item.style.left))){
          space_return =  space;
          i = 0;
        }else{
          space_return = (parseFloat(item.style.left) + space); 
          i = parseFloat(item.style.left);
        }
        let run_slide = setInterval(function(){
          if (i >= space_return) {
            item.style.left = space_return+'px';
            clearInterval(run_slide);
          }else{
            item.style.left = i+'px';
          }
          i = i + 2;
        }, 1);
        if(i >= space_return){
          clearInterval(run_slide);
        }
      })
    }
  }
}

function resetJSEvent() {
  let old_js = document.querySelector("#eventListener").textContent;
  let regex = /q\("#[A-Z]+[0-9]+"\).addEventListener|a\("#[A-Z]+[0-9]+"\).forEach/g
  if(old_js.match(regex)){
    let check_text = [...old_js.match(regex)];
    for(let i of check_text){
      regex = /[A-Z]+[0-9]+/g
      if(i.match(regex)){
        let id = [...i.match(regex)];
        let el = q("#"+id);
        el.replaceWith(el.cloneNode(true));
      }
    }
  }
  document.querySelector("#eventListener").remove();
  new_script = c('script');
  new_script.id = 'eventListener';
  new_script.textContent = old_js;
  q('body').appendChild(new_script);
}
a("[id^=FORM] .data_thankyou").forEach((item)=>{
  if(item.getAttribute('type') == 'tab_next' && q("#"+item.textContent)){
    q("#"+item.textContent).removeEventListener('click', addEventClickActiveTab);
  }
})
// show tooltip
a("[data-tooltip]").forEach((item)=>{
  item.addEventListener('mouseover',function(event) {
    let top = getOffsetTop(item);
    let left = getOffsetLeft(item);
    let bottom = top + item.offsetHeight;
    let right = left + item.offsetWidth;
    
    if(q(".tooltip")){
      q(".tooltip").remove();
    }
    let data_tooltip = JSON.parse(b64_to_utf8(item.getAttribute('data-tooltip')));
    let tooltip = c('div');
    tooltip.className = 'tooltip '+data_tooltip.local
    
    let style =`box-sizing:border-box;position:absolute;opacity:0;background:${data_tooltip.background};padding: 5px 15px;border-radius: 3px;color:#fff;`;
    let style_caret = `position: absolute; border-left: solid 10px transparent; 
                      border-right: solid 10px transparent; 
                      border-bottom: solid 10px ${data_tooltip.background}; 
                      height: 0; 
                      width: 0;`
    tooltip.innerHTML = data_tooltip.text;
    tooltip.setAttribute('style',style)
    document.body.append(tooltip);
    let top_tooltip = top  - tooltip.offsetHeight;
    let left_tooltip = right - tooltip.offsetWidth;
    switch(data_tooltip.local){
      case "top_left":
        style +=`top:${top_tooltip - 10}px;left:${left}px;`
        style_caret +="top: 100%; transform: rotate(180deg) ;"
        break;
      case "top_center":
        style +=`top:${top_tooltip -10 }px;left:${left + (item.offsetWidth/2) - (tooltip.offsetWidth /2)}px;`
        style_caret +="top: 100%; transform: rotate(180deg) translate(50%, 0px); left: 50%;"
        break;
      case "top_right":
        style +=`top:${top_tooltip -10}px;left:${left_tooltip}px;`
        style_caret +="top: 100%; transform: rotate(180deg); left: 50%;"
        break;
      case "bottom_left":
         style +=`top:${bottom +10}px;left:${left}px;`
         style_caret +="bottom: 100%;"
        break;
      case "bottom_center":
         style +=`top:${bottom +10}px;left:${left + (item.offsetWidth/2) - (tooltip.offsetWidth /2)}px;`
         style_caret +="bottom: 100%; transform: translate(50%, 0px); left: 50%;"
        break;
      case "bottom_right":
        style +=`top:${bottom +10}px;left:${left_tooltip}px;`
        style_caret +="bottom: 100%; left: 50%;"
        break;
      case "left_top":
        style +=`left:${left - 10 - tooltip.offsetWidth}px;top:${top}px;`
        style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
      case "left_center":
        style +=`left:${left - 10 - tooltip.offsetWidth}px;top:${top + (item.offsetHeight/2) - (tooltip.offsetHeight /2)}px;`
        style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
      case "left_bottom":
        style +=`left:${left - 10 - tooltip.offsetWidth}px;top:${bottom - tooltip.offsetHeight}px;`
        style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
      case "right_top":
         style +=`left:${right + 10 + tooltip.offsetWidth}px;top:${top}px;`
         style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
      case "right_center":
        style +=`left:${right + 10 + tooltip.offsetWidth}px;top:${top + (item.offsetHeight/2) - (tooltip.offsetHeight /2)}px;`
        style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
      case "right_bottom":
        style +=`left:${right + 10 + tooltip.offsetWidth}px;top:${bottom - tooltip.offsetHeight}px;`
        style_caret +="left: 100%;transform: rotate(90deg) translate(-15px, 5px);"
        break;
    }
    style+='opacity:1;z-index: 99;'
    tooltip.innerHTML = data_tooltip.text+` <div style="${style_caret}" ></div>`;
    
    tooltip.setAttribute('style',style)
    
  })
  item.addEventListener('mouseout',function() {
    if(q(".tooltip")){
      q(".tooltip").remove();
    }
  })
})
if(q("[id^=FAQ]")){

  a("[id^=FAQ] .item_question").forEach((item)=>{
    item.closest('[id]').querySelector("*:first-child").style.height = 'auto';
    item.closest('[id]').style.height = item.closest('[id]').offsetHeight+'px';
    item.addEventListener('click',function() {
       
      if(this.parentNode.classList.contains('open_faq')){
        let parent = this.parentNode;
        let content = parent.querySelector(".item_content");
          let old_height = content.offsetHeight;
          let old_height_parent = parent.closest('[id]').offsetHeight;
          let downheight = setInterval(function() {
            content.style.height = (parseFloat(content.style.height)- 2)+'px'
              if(parseFloat(content.style.height) <= 0){
                content.style.height = null
                clearInterval(downheight);
                parent.classList.remove('open_faq');
                parent.closest('[id]').style.height = parent.closest('[id]').querySelector("*:first-child").offsetHeight+'px'
                changeHeightAllParent(parent.closest('[id]'),old_height_parent,parent.closest('[id]').querySelector("*:first-child").offsetHeight)
              }
          },5)
      }else{
        this.parentNode.classList.add('open_faq')
        let content = this.parentNode.querySelector(".item_content");
        let parent = this.parentNode.closest('[id]');
        let old_height = content.offsetHeight;
        let old_height_parent = item.closest('[id]').offsetHeight;
        content.style.height = '0px';
        let upheight = setInterval(function() {
            if(parseFloat(content.style.height) >= old_height){
              clearInterval(upheight);
              parent.querySelector("*:first-child").style.height = 'auto'
              parent.style.height = parent.querySelector("*:first-child").offsetHeight+'px'
              changeHeightAllParent(parent,old_height_parent,parent.querySelector("*:first-child").offsetHeight)
            }
            content.style.height = (parseFloat(content.style.height)+ 2)+'px'
        },5)
      }
    })
  })
  function changeHeightAllParent(item,old_height,new_height) {
    let style_item = window.getComputedStyle(item);
    let parent = item.closest('[id]').parentNode.closest('[id]');
    let parent_style = parent.querySelector("*:first-child");
    let list_child = [...parent_style.children];
    
    top_item = parseFloat(style_item.getPropertyValue('top'));
    let space = old_height - new_height;
    let bottom = old_height + top_item
    list_child.forEach((item_child)=>{
      let style_item_child = window.getComputedStyle(item_child);
      if(style_item_child.getPropertyValue('display') != 'none'){
        let top = parseFloat(style_item_child.getPropertyValue('top'));
        if(item_child.querySelector('*:first-child')){
          let style_item_child_2 = window.getComputedStyle(item_child.querySelector('*:first-child'));
          if(top > bottom){
            item_child.style.top = (top-space)+'px';
          }  
        }
      }
    })
    if(parent_style.classList.contains('sp_container')){
      if(getLastBottom(parent) > parent.offsetHeight){
        parent_style.parentNode.style.height = (parent.offsetHeight - space)+'px';
      }
    }else{
        let old_height_parent = parent.offsetHeight;
        parent_style.style.height = (parent.offsetHeight - space) + 10 +'px';
        changeHeightAllParent(parent,old_height_parent,parseFloat(parent_style.style.height))
    }
  }
}
function getLastBottom(element) {
  let parent = element.querySelector("*:first-child");
  let list_child = parent.children;
  let last_bottom = 0;
  for(let i of list_child){
    if(window.getComputedStyle(i).getPropertyValue('position') == 'absolute'){
      let height = parseFloat(window.getComputedStyle(i).getPropertyValue('height'));
      let top = parseFloat(window.getComputedStyle(i).getPropertyValue('top'));
      if(last_bottom < top+height){
        last_bottom = top + height;
      }
    }
  }
  return last_bottom;
}
a("[id^=NOTIFY]").forEach((item)=>{
  if(item.getAttribute('data-type') == 'salekit'){
    $.ajax({
        url: 'https://api.salekit.io/apiv1/landingpage/getNotify',
        method: 'POST',
        data: {
          id: item.getAttribute('data-id')
        },
        success: function (data, textStatus, xhr) {
          let list_notify = data.data;

          for(let i of list_notify){
            if(i.time_type == 0 || i.time_type ){
              let type = 'phút';
              switch(i.time_type){
                case "1":
                  type="giờ"
                  break;
                case "2":
                  type="ngày"
                  break;
              }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
              i.time = i.time_duration+' '+type+" trước"
            }
            let clone_item = item.querySelector(".item_notify").cloneNode(true);
            clone_item.style.display = 'none';
            clone_item.querySelector("b").textContent = i.title;
            clone_item.querySelector("p").textContent = i.content;
            clone_item.querySelector("img").setAttribute('src',i.image);
            clone_item.querySelector("p:nth-child(3)").textContent = i.time;
            item.querySelector("*:first-child").appendChild(clone_item);
          }
          item.querySelector(".item_notify").remove();
          item.querySelector(".item_notify").style.display = 'flex';
          item.style.display = 'block';
          setInterval(function() {
            item.querySelector(".item_notify").style.display = 'none';
            item.querySelector(".item_notify").className = 'item_notify'
            item.querySelector(".item_notify").nextSibling.className = 'item_notify animate__animated animate__slideInUp';
            item.querySelector(".item_notify").nextSibling.style.display = 'flex';
            setTimeout(function() {
              item.querySelector("*:first-child").appendChild(item.querySelector(".item_notify"));
            },item.getAttribute('data-time_appears')*1000)
          },item.getAttribute('data-time_appears')*1000)
        },
        timeout:2000
    });
  }else{
    gapi.load('client', initializeGapiClient);
    function initializeGapiClient() {
      gapi.client.init({
      'apiKey': 'AIzaSyD9oNdmykp8khW2w27wkC2THX_9lYEjqIg',
      'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: item.getAttribute('data-id'),
        range: 'A:J', // for example: List 1!A1:B6
      })
    }).then((response) => {
      // parse the response data
      const loadedData = response.result.values;
      let index_title = 0;
      let index_content = 0;
      let index_image = 0;
      let index_time = 0;
      for(let i in loadedData){
        if(i == 0){
          for(let title in loadedData[i]){
            if(loadedData[i][title] == 'Title'){
              index_title = title;
            }
            if(loadedData[i][title] == 'Content'){
              index_content = title;
            }
            if(loadedData[i][title] == 'Image'){
              index_image = title;
            }
            if(loadedData[i][title] == 'Time'){
              index_time = title;
            }
          }
        }else{
          let clone_item = item.querySelector(".item_notify").cloneNode(true);
          clone_item.style.display = 'none';
          for(let content in loadedData[i]){
            if(content == index_title){
              clone_item.querySelector("b").textContent = loadedData[i][content];
            }
            if(content == index_content){
              clone_item.querySelector("p").textContent = loadedData[i][content];
            }
            if(content == index_image){
              clone_item.querySelector("img").setAttribute('src',loadedData[i][content]);
            }
            if(content == index_time){
              clone_item.querySelector("p:nth-child(3)").textContent = loadedData[i][content];
            }
          }
          item.querySelector("*:first-child").appendChild(clone_item);
        }
      }
      item.querySelector(".item_notify").remove();
      item.querySelector(".item_notify").style.display = 'flex';
      item.style.display = 'block';
      setInterval(function() {
        item.querySelector(".item_notify").style.display = 'none';
        item.querySelector(".item_notify").className = 'item_notify'
        item.querySelector(".item_notify").nextSibling.className = 'item_notify animate__animated animate__slideInUp';
        item.querySelector(".item_notify").nextSibling.style.display = 'flex';
        setTimeout(function() {
          item.querySelector("*:first-child").appendChild(item.querySelector(".item_notify"));
        },item.getAttribute('data-time_appears')*1000)
      },item.getAttribute('data-time_appears')*1000)
    }).catch((err) => {
    });
    }
  }
})

a("[id^=REVIEW]").forEach((item)=>{
  gapi.load('client', initializeGapiClient);
  function initializeGapiClient() {
    gapi.client.init({
    'apiKey': 'AIzaSyD9oNdmykp8khW2w27wkC2THX_9lYEjqIg',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  }).then(() => {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: item.getAttribute('data-id'),
      range: 'A:J', // for example: List 1!A1:B6
    })
  }).then((response) => {
    // parse the response data
    const loadedData = response.result.values;
    let index_title = 0;
    let index_content = 0;
    let index_image = 0;
    let index_time = 0;
    let index_star = 0;
    let index_verify = 0;
    for(let i in loadedData){
      if(i == 0){
        for(let title in loadedData[i]){
          if(loadedData[i][title].toLowerCase() == 'title'){
            index_title = title;
          }
          if(loadedData[i][title].toLowerCase() == 'content'){
            index_content = title;
          }
          if(loadedData[i][title].toLowerCase() == 'image'){
            index_image = title;
          }
          if(loadedData[i][title].toLowerCase() == 'time'){
            index_time = title;
          }
          if(loadedData[i][title].toLowerCase() == 'star'){
            index_star = title;
          }
          if(loadedData[i][title].toLowerCase() == 'verify'){
            index_verify = title;
          }
        }
      }else{
        let clone_item = item.querySelector(".item_review").cloneNode(true);
        clone_item.removeAttribute('style')
        clone_item.querySelector(".image_item_review").style.display = 'none';
        for(let content in loadedData[i]){
          if(content == index_title){
            clone_item.querySelector(".title_item_review").textContent = loadedData[i][content];
          }
          if(content == index_content){
            clone_item.querySelector(".content_item_review").textContent = loadedData[i][content];
          }
          if(content == index_verify){
            clone_item.querySelector(".verify_item_review").textContent = loadedData[i][content];
          }
          if(content == index_image){
            clone_item.querySelector(".image_item_review").setAttribute('src',loadedData[i][content]);
            clone_item.querySelector(".image_item_review").style.display = 'block';
          }
          if(content == index_time){
            clone_item.querySelector(".time_item_review").textContent = loadedData[i][content];
          }
          if(content == index_star){
            switch(parseInt(loadedData[i][content])){
              case 5:
                break;
              case 4:
                clone_item.querySelector(".item_star_review i:nth-child(5)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                break;
              case 3:
                clone_item.querySelector(".item_star_review i:nth-child(5)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(4)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                break;
              case 2:
                clone_item.querySelector(".item_star_review i:nth-child(5)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(4)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(3)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                break;
              case 1:
                clone_item.querySelector(".item_star_review i:nth-child(5)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(4)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(3)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                clone_item.querySelector(".item_star_review i:nth-child(2)").setAttribute('style','background-image:linear-gradient(90deg,#FFC107 0%, #dfdfdf 0%)')
                break;
            }
            clone_item.querySelector(".time_item_review").textContent = loadedData[i][content];
          }
        }
        item.querySelector("*:first-child").appendChild(clone_item);
      }
    }
  }).catch((err) => {
  });
  }
})
a("[id^=LUCKYSPIN]").forEach((item)=>{
  if(localStorage.getItem(q("#landingpage").value + '_' + item.id)){
    item.setAttribute('data-max_luckyspin',localStorage.getItem(q("#landingpage").value + '_' + item.id));
  }else{
    localStorage.setItem(q("#landingpage").value + '_' + item.id, item.getAttribute('data-max_luckyspin'));
  }
  q(".button_lucky_spin",item).addEventListener('click',function() {
    
    if(item.getAttribute('data-max_luckyspin')==0){
      let group = document.createElement('div');
                group.setAttribute('style','position: fixed;top: 0;left: 0;z-index: 9999999999;background: #0000003b;width: 100%;height: 100%;display: flex;')
                let html = '<div style="\
                        max-width: 300px;\
                        background: #fff;\
                        margin: auto;\
                        border-radius: 5px;\
                        position: relative;">\
                        <div style="padding:20px;">'
                html += 'Bạn đã hết lượt quay!';       
                html +='</div>\
                        <button style="color: #3d3d3d;\
                                  display: inline-block;\
                                  padding: 8px 17px;\
                                  font-size: 16px;\
                                  border-radius: 5px;\
                                  cursor: pointer;\
                                  border: 1px solid var(--color-gray);\
                                  margin: 20px;\
                                  margin-top: 0;\
                                  float: right;">Đóng</button>\
                        </div>';
                group.innerHTML = html;
                group.querySelector('button').addEventListener('click',function() {
                  group.remove();
                  if(item.closest('[id^=POPUP]')){
                    item.closest('[id^=POPUP]').removeAttribute('style');
                  }
                })
                group.addEventListener('click',function(event) {
                  if(event.target == group || event.target.closest(".close_modal")){
                    group.remove();
                  }
                })
                document.body.appendChild(group);
      return false;
    }
    let list_coupon = [];
    let count_copupon = a(".text_spin",item).length;
    a(".text_spin",item).forEach((coupon)=>{
      let rate = coupon.getAttribute('data-rate');
      let rotate = parseFloat(coupon.style.transform.match(/([0-9]+)deg/g));
      while(rate > 0){
        list_coupon.push({
          coupon:coupon.getAttribute('data-coupon'),
          name:coupon.textContent,
          rotate:rotate
        })
        rate --;
      }
    })
    list_coupon = shuffle(list_coupon);
    let choose_coupon = list_coupon[Math.floor(Math.random() * 100) + 1];
    let rotate = 0;
    id = setInterval(frame, 1);
    function frame() {
      if (rotate == 360) {
        clearInterval(id);
        rotate =0;
        let end_spin = setInterval(frame_2, 2)
        function frame_2() {
            if (rotate >= 360-choose_coupon['rotate']) {
               clearInterval(end_spin);
               if(item.getAttribute('data-popup')){
                if(q("#"+item.getAttribute('data-popup'))){
                  q("#"+item.getAttribute('data-popup')).style.display = 'block';
                  a("[id^=PARAGRAPH],[id^=TITLE]",q("#"+item.getAttribute('data-popup'))).forEach((text)=>{
                    text.innerHTML = text.innerHTML.replace('{coupon_text}',choose_coupon.name);  
                    text.innerHTML = text.innerHTML.replace('{coupon_code}',choose_coupon.coupon);  
                    text.innerHTML = text.innerHTML.replace('{spin_turn_left}',parseFloat(item.getAttribute('data-max_luckyspin'))-1);
                  })
                  item.setAttribute('data-max_luckyspin',parseFloat(item.getAttribute('data-max_luckyspin'))-1)
                  localStorage.setItem(q("#landingpage").value + '_' + item.id, item.getAttribute('data-max_luckyspin'));
                }
               }else{
                  let group = document.createElement('div');
                  group.setAttribute('style','position: fixed;top: 0;left: 0;z-index: 9999999999;background: #0000003b;width: 100%;height: 100%;display: flex;')
                  let html = '<div style="\
                          max-width: 300px;\
                          background: #fff;\
                          margin: auto;\
                          border-radius: 5px;\
                          position: relative;">\
                          <div style="padding:20px;">'
                  html += b64_to_utf8(item.getAttribute('data-content_popup'));       
                  html +='</div>\
                          <button style="color: #3d3d3d;\
                                    display: inline-block;\
                                    padding: 8px 17px;\
                                    font-size: 16px;\
                                    border-radius: 5px;\
                                    cursor: pointer;\
                                    border: 1px solid var(--color-gray);\
                                    margin: 20px;\
                                    margin-top: 0;\
                                    float: right;">Đóng</button>\
                          </div>';
                  html = html.replace(/\n/g,'<br>');
                  html = html.replace('{coupon_text}',choose_coupon.name);
                  html = html.replace('{coupon_code}',choose_coupon.coupon);
                  html = html.replace('{spin_turn_left}',parseFloat(item.getAttribute('data-max_luckyspin'))-1);
                  item.setAttribute('data-max_luckyspin',parseFloat(item.getAttribute('data-max_luckyspin'))-1)
                  localStorage.setItem(q("#landingpage").value + '_' + item.id, item.getAttribute('data-max_luckyspin'));
                  group.innerHTML = html;
                  group.querySelector('button').addEventListener('click',function() {
                    group.remove();
                    if(item.closest('[id^=POPUP]')){
                      item.closest('[id^=POPUP]').removeAttribute('style');
                    }
                  })
                  group.addEventListener('click',function(event) {
                    if(event.target == group || event.target.closest(".close_modal")){
                      group.remove();
                    }
                  })
                  document.body.appendChild(group);
               }
            } else {
              rotate +=1 ;
              q(".bg_luckyspin",item).style.transform = 'rotate('+rotate+'deg)'
              q(".html_list_coupon",item).style.transform = 'rotate('+rotate+'deg)'
            }
        }
      } else {
        rotate +=2 ;
        q(".bg_luckyspin",item).style.transform = 'rotate('+rotate+'deg)'
        q(".html_list_coupon",item).style.transform = 'rotate('+rotate+'deg)'
      }
    }
  })
})

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

  // While there are elements in the array
    while (ctr > 0) {
  // Pick a random index
      index = Math.floor(Math.random() * ctr);
  // Decrease ctr by 1
      ctr--;
  // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
// check href
a("a[href]").forEach((item)=>{
  if(item.getAttribute('href').indexOf('|') > -1){
    let href = item.getAttribute('href').split('|')
    if(href[0].trim() != ""){
      item.setAttribute('href',href[0]);
    }else{
      item.setAttribute('href',href[1]);
    }
  }
})
function replaceText_2(item) {
  let regex = /\[\[(.*?)\]\]/g
  if(item.innerHTML.match(regex)){
      let check_text = [...item.innerHTML.match(regex)];
      if(check_text && check_text[0]){
        check_text_2 = [...item.textContent.match(regex)]
        let split = check_text[0].replace('[[','').replace(']]','').split('|');
        let check_html = c('div');
        check_html.innerHTML = split[0];
        let check_html_2 = c('div');
        check_html_2.innerHTML = split[1];
        let result = '';
        if(check_html.textContent.trim()){
          result = split[0];
        }else if(check_html_2.textContent.trim()){
          result = split[1];
        }
        item.innerHTML = item.innerHTML.replace(check_text[0],result);
      }
    }
}
