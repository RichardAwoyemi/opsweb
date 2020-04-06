'use strict';

$(function () {
  // Google Analytics

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'UA-134173321-1');

  // Theme specific configuration

  page.config({
    disableAOSonMobile: true,
    smoothScroll: false
  });
});
