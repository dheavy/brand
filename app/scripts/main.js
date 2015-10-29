'use strict';

$(function () {

  var $window = $(window),
      $content = $('.mp-content');

  function resize() {
    var windowHeight = $window.height(),
        contentHeight = $content.height(),
        yPos = (windowHeight / 2 - contentHeight / 2);

    $content.offset({ top: yPos });
  }

  $window.resize(resize);
  resize();

  $content.css('opacity', 1);
});
