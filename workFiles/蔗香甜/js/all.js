$(document).ready(function () {
  /*下拉選單*/
  $('.menu').click(function () {
    $('.menu-list-inner').toggleClass('menu-active');
  });

  /*產品愛心*/
  $('.product:nth-child(1)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(1)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(1)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(1)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(2)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(2)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(2)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(2)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(3)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(3)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(3)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(3)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(4)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(4)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(4)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(4)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(5)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(5)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(5)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(5)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(6)>.label > li > a > .favorite-none').click(function () {
    $('.product:nth-child(6)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  $('.product:nth-child(6)>.label > li > a > .favorite').click(function () {
    $('.product:nth-child(6)>.label li > a >  .favorite').toggleClass('favorite-active');
  });

  /*電子發票*/
  $('.kind-e').click(function () {
    $('.kind-e').removeClass("receipt-none").addClass("receipt-active");
  });

  $('.kind-e').click(function () {
    $('.kind-p').removeClass("receipt-active").addClass("receipt-none");
  });

  $('.kind-e').click(function () {
    $('.user-input-email').removeClass("receipt-userinput-none").addClass("receipt-userinput-active");
  });

  $('.kind-e').click(function () {
    $('.user-input-address').removeClass("receipt-userinput-active").addClass("receipt-userinput-none");
  });


  /*郵寄發票*/
  $('.kind-p').click(function () {
    $('.kind-p').removeClass("receipt-none").addClass("receipt-active");
  });

  $('.kind-p').click(function () {
    $('.kind-e').removeClass("receipt-active").addClass("receipt-none");
  });

  $('.kind-p').click(function () {
    $('.user-input-address').removeClass("receipt-userinput-none").addClass("receipt-userinput-active");
  });

  $('.kind-p').click(function () {
    $('.user-input-email').removeClass("receipt-userinput-active").addClass("receipt-userinput-none");
  });

  /*同運送地址*/
  $('.checkbox').click(function () {
    $('.checkbox').toggleClass('checkbox-active');
  });
});