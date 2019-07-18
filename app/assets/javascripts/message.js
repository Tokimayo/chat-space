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
    var html = `<div class="message-box">
                  <div class="message-box__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message-box__sent-date">
                    ${GetcreatedTime()}
                  </div>
                  <div class="message-box__message-body">
                    ${message.content}
                  </div>
                </div>`
    return html;
  }

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
      $('.msg-input__textbox').val('')
      $('.messages-box').animate({
        scrollTop: $('.messages-box')[0].scrollHeight
      },'fast');
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  })
});