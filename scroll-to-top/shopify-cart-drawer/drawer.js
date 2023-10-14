jQuery(document).ready(function(){
jQuery(".site-header__cart").click(function(e){
e.preventDefault();
jQuery("#overlay").addClass("is-active");
jQuery(".inline-cart").addClass("is-active");
});

jQuery('.top_header_new_cart').click(function(){
jQuery('body').addClass('cstm_toggle_cls');   
});

jQuery("#overlay").click(function(){
jQuery('body').removeClass('cstm_toggle_cls');  
});

jQuery(".close-cart-img").click(function(){
jQuery('body').removeClass('cstm_toggle_cls');  
});

});

jQuery(window).load(function(){
jQuery('body').on('click', '.close-cart-img', function(e){
e.preventDefault();
jQuery("#overlay").removeClass("is-active");
jQuery(".inline-cart").removeClass("is-active");
jQuery('body').removeClass('cstm_toggle_cls'); 
});

jQuery('body').on('click', '.continueshopping', function(e){
e.preventDefault();
jQuery("#overlay").removeClass("is-active");
jQuery(".inline-cart").removeClass("is-active");
});

jQuery('body').on('click', '#overlay', function(){
jQuery("#overlay").removeClass("is-active");
jQuery(".inline-cart").removeClass("is-active");
});

});

jQuery(document).ready(function(){

jQuery("body").on("click", ".qtyplus", function() {
var t = +jQuery(this).siblings(".changequantity").val() + 1;
jQuery(this).siblings(".changequantity").val(t)
}), jQuery("body").on("click", ".qtyminus", function() {
var t = +jQuery(this).siblings(".changequantity").val() - 1;
t < 0 && (t = 0), jQuery(this).siblings(".changequantity").val(t)
}),
jQuery(document).ready(function() {
jQuery("body").on("click", ".qtyplus, .qtyminus", function() {
var t = jQuery(this).siblings(".changequantity").attr("data-line-item-index"),
a = jQuery(this).siblings(".changequantity").val();
jQuery.ajax({
type: "POST",
url: "/cart/change.js",
data: "quantity=" + a + "&line=" + t,
dataType: "json",
success: function(t) {
t.item_count, jQuery(".site-header__cart #CartCount").html(t.item_count), jQuery.ajax({
type: "GET",
url: "/cart",
dataType: "html",
success: function(t) {
console.log("syncCart");
var a = jQuery(t).filter("#slidingcartmain").html();
jQuery("#slidingcartmain").html(a), jQuery("#overlay").addClass("is-active"), jQuery(".inline-cart").addClass("is-active")
}
});
}
});
});
});

jQuery('body').on('change', '.changequantity', function(){
var getline = jQuery(this).attr("data-line-item-index");
var getval = jQuery(this).val();

jQuery.ajax({
type: 'POST',
url: '/cart/change.js',
data:  'quantity=' + getval + '&line=' + getline,
dataType: 'json',
success: function(data) {
if(data.item_count > 0){
jQuery('.site-header__cart #CartCount').html(data.item_count);  
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
} else {
jQuery('.site-header__cart #CartCount').html(data.item_count) ;  
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
}

jQuery.ajax({
type: "GET",
url: "/cart",
dataType: 'html',
success: function(data) {
console.log("syncCart");
// console.log(data);
var minicartdata=jQuery(data).filter('#slidingcartmain').html();
// console.log(minicartdata);
jQuery('#slidingcartmain').html(minicartdata);
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
jQuery("#overlay").addClass("is-active");
jQuery(".inline-cart").addClass("is-active");
}
});
}
});

});

});

function remove(line, quantity){
jQuery.ajax({
type: 'POST',
url: '/cart/change',
data: 'quantity='+quantity+'&line='+line,
dataType: 'json',
success: function(response){
jQuery.ajax({
type: 'GET',
url: '/cart.js',
dataType: 'json',
success: function(cartdata){
jQuery('.site-header__cart #CartCount').html(cartdata.item_count);
jQuery.ajax({
type: "GET",
url: "/cart",
dataType: 'html',
success: function(data) {
var minicartdata=jQuery(data).filter('#slidingcartmain').html();
jQuery('#slidingcartmain').html(minicartdata);
console.log("COMPLETE");
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
}
});
location.reload();
}
});

}
});
}

jQuery(document).ready(function(){
jQuery("img.closebar").click(function(){
jQuery(this).hide();
jQuery(this).siblings(".promotionaltext.lightboxdisplay").hide();
jQuery(".home-slideshow.content-width").addClass("pickup");
})

jQuery(".product-form__cart-submit").click(function(e){
e.preventDefault();

jQuery.ajax({
type: 'POST',
url: '/cart/add.js',
data:jQuery(".product-single__meta .product-form").serialize(),
dataType: 'json',
success: function(response){
jQuery.ajax({
type: 'GET',
url: '/cart.js',
dataType: 'json',
success: function(cartdata){

jQuery('.site-header__cart #CartCount').html(cartdata.item_count);
jQuery.ajax({
type: "GET",
url: "/cart",
dataType: 'html',
success: function(data) {
var minicartdata=jQuery(data).filter('#slidingcartmain').html();
jQuery('#slidingcartmain').html(minicartdata);
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
jQuery("#overlay").addClass("is-active");
jQuery(".inline-cart").addClass("is-active");
jQuery('body').addClass('cstm_toggle_cls'); 
}
});
}
});

},
error: function(resp) {
var getres = JSON.stringify(resp);
alert(resp.responseJSON.description);
}
});
});
});

jQuery(document).ready(function(){
const defaults = {
class: '.custom-btn', // classname
};
const addToCart = document.querySelectorAll(defaults.class);
for (let i = 0; i < addToCart.length; i++) {
addToCart[i].addEventListener('click', function(event) {
event.preventDefault();
const formID = this.parentNode.getAttribute('id');
console.log(formID);
addProductToCart(formID);
});
}

function addProductToCart(formID) {
jQuery.ajax({
type: 'POST',
url: '/cart/add.js',
dataType: 'json',
data: jQuery('#' + formID).serialize(),
success: function(response){
jQuery.ajax({
type: 'GET',
url: '/cart.js',
dataType: 'json',
success: function(cartdata){
jQuery('.site-header__cart #CartCount').html(cartdata.item_count);
jQuery.ajax({
type: "GET",
url: "/cart",
dataType: 'html',
success: function(data) {
var minicartdata=jQuery(data).filter('#slidingcartmain').html();
jQuery('#slidingcartmain').html(minicartdata);
var value_get = jQuery(".BOLD-mc-picker > .currentCurrency .name").html();
jQuery(".currency-dropdown-option.option[data-value='"+value_get+"']").trigger("click");  
jQuery("#overlay").addClass("is-active");
jQuery(".inline-cart").addClass("is-active");
jQuery('body').addClass('cstm_toggle_cls'); 
}
});
}
});
},
error: function(resp) {
var getres = JSON.stringify(resp);
alert(resp.responseJSON.description);  
}
});
} 
});  