$(function(){

var wH = $(window).height();
var wW = $(window).width(); 
var mH = 500;
var fH = $('#footer').height();

if (wH < 500) {
	$('#content').css('height',500 - fH);
	} else {
	$('#content').css('height',wH - fH);
}

});
