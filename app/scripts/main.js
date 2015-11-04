/*global mixpanel, $*/

'use strict';

$(function () {

  var $window = $(window),
      $content = $('.mp-content'),
      $video = $('#mp-background'),
      $form = $('#mp-form');

  function generatePosterUrl() {
    var baseUrl = 'images/mp-poster-',
        fileFormat = '.png',
        maxIndex = 5;

    return baseUrl
           + (Math.floor(Math.random() * (maxIndex - 0 + 1) + 0)).toString()
           + fileFormat;
  }

  function isValidEmail(email) {
    return email && email.length > 1 && email.indexOf('@') > 1;
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

  function ajaxForm($f, $resultPlaceholder) {
    $f.submit(function (e) {
      e.preventDefault();

      if (!isValidEmail($f.find('input[type="email"]').val())) {
        $resultPlaceholder.html('Oops.. please enter a valid email.');
      } else {
        $resultPlaceholder.html('Just a sec...');
        submitForm($f, $resultPlaceholder);
      }
    });
  }

  function submitForm($f, $resultPlaceholder) {
    $.ajax({
      type: 'GET',
      url: $f.attr('action'),
      data: $f.serialize(),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c', // Makes Mailchimp trigger a JSONP response
      contentType: 'application/json; charset=utf-8'
    })
    .success(function (data) {
      if (data.result !== 'success') {
        var msg = data.msg || 'Sorry... something went wrong on our end. Please try again.';

        if (data.result && data.result === 'error') {
          msg = 'Please enter a valid email address.';
          toggleFormState(true);
        }

        if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
          msg = 'You\'re already in the list. Thank you!';
        }

        $resultPlaceholder.html(msg);
      } else {
        $resultPlaceholder.html('Thank you!<br>We\'ve sent a confirmation in your inbox.');
        hideForm();
      }
    })
    .fail(function (error) {
      console.error('[MPLSR] Something went wrong...');
      console.error(error);
    });
  }

  function toggleFormState(setActive) {
    var isButtonDisabled = !setActive,
        buttonLabel = isButtonDisabled ? 'Hold on...' : 'Reserve my account';

    $('#submit').prop('disabled', isButtonDisabled).text(buttonLabel);
  }

  function hideForm() {
    $form.fadeOut();
    mixpanel.track('User clicked to join Beta list.');
  }

  if (!$('html').hasClass('mobile')) {
    setVideo();
  } else {
    setPoster(generatePosterUrl());
  }

  $window.resize(resize);
  resize();

  $content.css('opacity', 1);

  mixpanel.track('User lands on page.');
  ajaxForm($form, $('.mp-msg-info'));
});
