$(function(){
  function GetcreatedTime(){
    var today  = new Date();
    var year   = today.getFullYear();
    var mounth = today.getMonth() + 1;
    var date = today.getDate();
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var weekday = weekday[today.getDay()];
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    if (mounth < 10) {
      mounth = '0' + mounth;
    }
    if (date < 10) {
      date = '0' + date;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    var created_time = year + '/' + 
                       mounth + '/' + 
                       date +
                       '(' + weekday + ')' + ' ' +
                       hours + ':' +
                       minutes + ':' +
                       seconds
    return created_time;
  }

  function buildMessage(message){
    
    var image = (message.image.url) ? `<img class="lower-message__image" src="${message.image.url}">` : "" ;

    var html = `<div class="message-box" data-id=${message.id}>
                  <div class="message-box__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message-box__sent-date">
                    ${GetcreatedTime()}
                  </div>
                  <div class="message-box__message-body">
                    ${message.content}
                    ${image}
                  </div>
                </div>`
  
    return html;
  }

  var reloadMessages = function() {
    last_message_id = $('.message-box:last').data('id');
    $.ajax({
      url: 'api/messages/',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var currentPageGroupId = $('.messages-header').data('current-group-id');
      messages.forEach(function(message){
        if(message.group_id === currentPageGroupId){
          var insertHTML = buildMessage(message);
          $('.messages-box').append(insertHTML);
        }
      })
      var lastMessageAri = ($('.message-box__message-body:last').find('img').length === 0) ? $('.message-box__message-body:last').text() : '画像が投稿されています';
      var lastMessageContent = ($('.messages-box').find('div').length === 0) ? 'まだメッセージはありません。' : lastMessageAri ;
      $(`div[data-group-id = ${currentPageGroupId}] .group__latest-message`).text(lastMessageContent);
      $('.messages-box').animate({
        scrollTop: $('.messages-box')[0].scrollHeight
      },'fast');
    })
    .fail(function () {
      alert('自動更新に失敗しました');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages-box').append(html)
      $('form')[0].reset();
      $('.messages-box').animate({
        scrollTop: $('.messages-box')[0].scrollHeight
      },'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })

  $(window).bind("load", function(){
    if(document.URL.match("/messages")){
      setInterval(reloadMessages, 5000);
    }
  });
});