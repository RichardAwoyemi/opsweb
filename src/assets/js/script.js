'use strict';

$(function() {
  page.config({
    disableAOSonMobile: true,
    smoothScroll: false,
  });

  let dropdownMenuLinkClass = '.dropdown-menu a';
  let dropdownMenuClass = '.dropdown-menu';

  $(dropdownMenuLinkClass).on("click", dropdownMenuClass, function () {
    $(this).closest(dropdownMenuClass).prev().dropdown("toggle");
  });
});
