document.querySelectorAll("[id^=BUTTON][data-product]").forEach((item)=>{
    item.addEventListener('click',function() {
        try{
            let data_pro = item.getAttribute('data-product').split(',');
            let arr = [];
            for(let i of data_pro){
                arr.push({
                    product_id:i,
                    quantity:1,
                })
            }
            let pro = localStorage.getItem("product_landingpage_builder");
            if(pro){
                pro = JSON.parse(pro);
                for(let i in pro){
                    if(pro.length > 0){
                        let check = false;
                        for(let j of arr ){
                            if(j.product_id == pro[i].product_id){
                                check = j.quantity;
                            }
                        }
                        if(check){
                            pro[i] = {
                                product_id:pro[i].product_id,
                                quantity:parseFloat(pro[i].quantity)+parseFloat(check)
                            }
                        }else{
                            pro.push({
                                product_id:pro[i].product_id,
                                quantity:1
                            })
                        }
                    }
                }
                arr = pro;
            }
            localStorage.setItem("product_landingpage_builder", JSON.stringify(arr));
            
        }catch(e){}
    })
})
function apiCustomForm(data_send_2,item){
    let form = item.closest('[id^=FORM]');
    let product_list_new = products_funel;
    if(form.getAttribute('data-type') =='order'){
        if(form.getAttribute('data-product')){
            let arr_data_pro = form.getAttribute('data-product').split(',');
            for(let i of arr_data_pro){
                if(products_funel.length > 0){
                    let check = true;
                    for(let j of products_funel ){
                        if(j.product_id == i){
                            check = false;
                        }
                    }
                    if(check){
                        product_list_new.push({
                            product_id:i,
                            quantity:1
                        })
                    }
                }else{
                    product_list_new.push({
                        product_id:i,
                        quantity:1
                    })
                }
            }
        }else if(localStorage.getItem(utf8_to_b64(window.location.href)+'_final')){
            let list_pro_local = JSON.parse(localStorage.getItem(utf8_to_b64(window.location.href)+'_final'));
            product_list_new = [];
            for(let i of list_pro_local){
                product_list_new.push({
                    product_id:i.id,
                    quantity:i.quantity
                })
            }
        }
    }
   
    if(product_list_new.length > 0){
        // save data to localStorage
        localStorage.setItem('data_form',utf8_to_b64(JSON.stringify(data_send_2)));
        // // =========================
        data_send_2['products'] = product_list_new;
        if(typeof step_id != 'undefined'){
            data_send_2['step_id'] = step_id;    
        }
        if(document.querySelector("#landingpage")){
            data_send_2['page_id'] = document.querySelector("#landingpage").value;    
        }
        localStorage.setItem("data_order", utf8_to_b64(JSON.stringify(data_send_2)));
        data_send_2['extra_price'] = pay_fee;
        if(document.querySelector('[field-attribute="pay_money"][pay_fee]')){
            data_send_2['extra_price'] = document.querySelector('[field-attribute="pay_money"][pay_fee]').getAttribute('pay_fee')
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/v1/order/create',
                headers: {"Content-Type":"application/json",'Shop-Id':shop_id},
                method: 'POST',
                data: JSON.stringify({...data_more_address,...data_send_2}),
                success: function(data, textStatus, xhr){
                    if(!data.error){
                        setCookie('order_id_funnel', data.order_id, 30)    
                        if(typeof url_funel != 'undefined' && item.parentNode.querySelector('.data_thankyou').getAttribute('type')!='tab_next'){

                            item.parentNode.querySelector('.data_thankyou').setAttribute('type','url');
                            item.parentNode.querySelector('.data_thankyou').setAttribute('redirect',true);
                            item.parentNode.querySelector('.data_thankyou').textContent = url_funel;  
                        }
                        data_send['order']=data.data_order;
                    }
                    if(data.checkout_url  && item.parentNode.querySelector('.data_thankyou').getAttribute('type')!='tab_next'){
                        item.parentNode.querySelector('.data_thankyou').setAttribute('type','url');
                        item.parentNode.querySelector('.data_thankyou').setAttribute('redirect',true);
                        item.parentNode.querySelector('.data_thankyou').textContent = data.checkout_url;  
                    }
                    localStorage.removeItem(utf8_to_b64(window.location.href)+'_final')
                    localStorage.removeItem(utf8_to_b64(window.location.href)+'_count')
                    localStorage.removeItem(utf8_to_b64(window.location.href))
                    resolve(data);
                },
                error: function(xhr, status, error) {
                    resolve(error);
                }
            })
        })
    }else{
        delete_cookie('order_id_funnel');
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    }
    
}

function addToCart(redirect,el=false,list_data_add=false){
    loading();
    if(products_funel && step_id){
        if(redirect.indexOf('http') == -1){
            redirect = '//'+redirect;
        }
        let data_send = {};
        data_send['products'] = products_funel;
        if(list_data_add){
            data_send['products'] = list_data_add;
        }
        data_send['step_id'] = step_id;
        

        if(getCookie('order_id_funnel')){
            data_send['order_id'] = getCookie('order_id_funnel') ;
            $.ajax({
                url: '/api/v1/order/add-to-cart',
                headers: {"Content-Type":"application/json",'Shop-Id':shop_id},
                method: 'POST',
                data: JSON.stringify(data_send),
                success: function(data, textStatus, xhr){
                    unload();
                    if(!data.error){
                        if(redirect.indexOf('FRAME_POPUP') > -1){
                            document.body.querySelector("#"+redirect).style.display = "block"
                        }else{
                            window.location.href = redirect;    
                        }
                    }else{
                        alert(data.msg)
                    }
                },
                error: function(xhr, status, error) {
                    // resolve(data);
                    console.log(xhr, status, error)
                }
            })
        }else{
            data_send = JSON.parse(b64_to_utf8(localStorage.getItem("data_form")));
            data_send['products'] = products_funel;
            data_send['page_id'] = document.querySelector("#landingpage").value;
            data_send['step_id'] = step_id;
            $.ajax({
                url: '/api/v1/order/create',
                headers: {"Content-Type":"application/json",'Shop-Id':shop_id},
                method: 'POST',
                data: JSON.stringify(data_send),
                success: function(data, textStatus, xhr){
                    unload();
                    if(!data.error){
                        setCookie('order_id_funnel', data.order_id, 30)
                        window.location.href = redirect;
                    }else{
                        alert(data.msg)
                    }
                },
                error: function(xhr, status, error) {
                    // resolve(data);
                    console.log(xhr, status, error)
                }
            })
        }
    }
}
