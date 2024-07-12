
$(document).ready(function() {
   
    $('body').on('click', '.btn-register', function(e) {
        e.preventDefault();
    var full_name = $('.fullname').val();
    var phone = $('.phone').val();

    if($('.fullname').length) {
        if(!full_name){
            //$('.alert-name').html('<div class="alert alert-danger"> Vui lòng nhập họ & tên</div>');
            alert('Vui lòng nhập họ & tên');
            $('.fullname').focus();
            return false;
        }else{
            $('.alert-name').html('');
        }
    }


    if($('.phone').length) {
        if(!phone){
            alert('Vui lòng nhập số điện thoại!');
            $('.phone').focus();
           // $('.alert-phone').html('<div class="alert alert-danger">Vui lòng nhập số điện thoại!</div>');
            return false;
        }else{
            $('.alert-phone').html('');
        }
        if(!checkPhoneNumber(phone)){
            alert('Số điện thoại không đúng định dạng!');
            $('.phone').focus('');
            // $('.alert-phone').html('<div class="alert alert-danger">Số điện thoại không đúng định dạng!</div>');
            return false;
        }
    }
    $.ajax({
        type: "POST",
        url: 'https://api.salekit.io/api/lead/create/39973231',
        data: {
            full_name:full_name,
            phone:phone
        },
        success: function(kq){
            // console.log(kq)
            if(kq.status == 200){
                window.location.href = "/thankyou";
                $('.success_ta').removeClass('d-none');
                // alert('Đăng ký thành công');
                $('.contact_ta')[0].reset();
                // $('.fullname').val('');
                // $('.phone').val('');
            }else{
                alert('Đăng ký thất bại');
            }
        }
    });
    // return false;
});
});

function checkPhoneNumber(phone) {
    var flag = false;
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if (phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                flag = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                flag = true;
            }
        }
    }
    return flag;
}

function isPhone(phone){
    var re = /^(01[2689]|09|08)[0-9]{8}$/;
    return re.test(phone);
}