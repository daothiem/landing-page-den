/*
-------------------------------------------------------------------------
* Template Name    : Sofash - SaaS & Software Html5 Landing Page        * 
* Author           : ThemesBoss                                         *
* Version          : 1.0.0                                              *
* Created          : January 2019                                      * 
* File Description : Main JS file of the template                       *
*------------------------------------------------------------------------
*/
$(window).on("scroll", function () {
    $(window).scrollTop() >= 50 ? $(".sticky").addClass("stickyadd") : $(".sticky").removeClass("stickyadd")
}), $(".nav-item a").on("click", function (o) {
    var t = $(this);
    $("html, body").stop().animate({scrollTop: $(t.attr("href")).offset().top - 50}, 1500, "easeInOutExpo"), o.preventDefault()
}), $(document).on("click", ".navbar-collapse.show", function (o) {
    $(o.target).is("a") && $(this).collapse("hide")
}), $("#navbarCollapse").scrollspy({offset: 70});
var a = 0;
$(".video_hit").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: !1,
    fixedContentPos: !1
}), $(".owl-dash").owlCarousel({
    items: 4,
    itemsDesktop: [1e3, 2],
    itemsDesktopSmall: [768, 1],
    itemsTablet: [568, 1],
    lazyLoad: !0,
    autoPlay: !0,
    pagination: !0,
    stopOnHover: !0,
    navigation: !1
}), $(".img-zoom").magnificPopup({
    type: "image",
    closeOnContentClick: !0,
    mainClass: "mfp-fade",
    gallery: {enabled: !0, navigateByImgClick: !0, preload: [0, 1]}
}), $("#owl-demo").owlCarousel({
    autoPlay: 1e4,
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [979, 3]
}), $(window).on("scroll", function () {
    $(this).scrollTop() > 100 ? $(".back_top").fadeIn() : $(".back_top").fadeOut()
}), $(".back_top").on("click", function () {
    return $("html, body").animate({scrollTop: 0}, 1e3), !1
});
var loader = $(".loader"), wHeight = $(window).height(), wWidth = $(window).width(), o = 0;
loader.css({top: wHeight / 2 - 2.5, left: wWidth / 2 - 200});
do {
    loader.animate({width: o}, 10), o += 3
} while (o <= 400);
402 === o && (loader.animate({left: 0, width: "100%"}), loader.animate({
    top: "0",
    height: "100vh"
})), setTimeout(function () {
    $(".loader-wrapper").fadeOut("fast"), loader.fadeOut("fast")
}, 3500);
