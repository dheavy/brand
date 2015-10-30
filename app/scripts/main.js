'use strict';

$(function () {

  var $window = $(window),
      $body = $('body'),
      $content = $('.mp-content'),
      $video = $('#mp-background');

  function generatePosterUrl() {
    var baseUrl = 'images/mp-poster-',
        fileFormat = '.png',
        maxIndex = 5;

    return baseUrl
           + (Math.floor(Math.random() * (maxIndex - 0 + 1) + 0)).toString()
           + fileFormat;
  }

  function setPoster(url) {
    $video.attr('poster', url);
  }

  function setVideo() {
    $video.append(
      '<source src="videos/mp.mp4" type="video/mp4">'
      + '<source src="videos/mp.webm" type="video/webm">'
    );
  }

  function resize() {
    var windowHeight = $window.height(),
        contentHeight = $content.height(),
        yPos = (windowHeight / 2 - contentHeight / 2);

    $content.offset({ top: yPos });
  }

  setPoster(generatePosterUrl());

  if (!$('html').hasClass('mobile')) {
    setVideo();
  }

  $window.resize(resize);
  resize();

  $content.css('opacity', 1);
});
