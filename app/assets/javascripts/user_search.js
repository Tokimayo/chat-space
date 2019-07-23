$(function(){

  var users_list = $("#user-search-result");

  var chatMembers = [];
  $(".chat-group-user").each(function(){
    chatMember = {};
    chatMember['userName'] = $(this).children("p").text().replace(/\r?\n/g,"");
    chatMember['userId'] = Number($(this).children("input").val());
    chatMembers.push(chatMember);
  });

  function alreadyMenberCheckFlg(chatMembers, user){
    var checkFlg = chatMembers.some(value => value.userId === user.id);
    return checkFlg;
  }

  function appendUserCandidates(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    users_list.append(html);
  }

  function appendErrMsg(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    users_list.append(html);
  }

  function appendUserAddList(chatMember){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${chatMember.userId}>
                  <p class='chat-group-user__name'>${chatMember.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#chat-group-users").append(html);
  }

  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if ((users.length !== 0) && (input !== "") ){
        users.forEach(function(user){
          if (alreadyMenberCheckFlg(chatMembers, user) === false){
            appendUserCandidates(user);
          }
          else if((users.length === 0) && (input !== "") ||(alreadyMenberCheckFlg(chatMembers, user))){
            appendErrMsg();
          }
        });
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    chatMembers.push($(this).data());
    var chatMember = $(this).data();
      appendUserAddList(chatMember);
    $(this).parent().remove();
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    var userId = Number($(this).siblings("input").val());
    for(var i = 0; i < chatMembers.length; i++){
      if(chatMembers[i].userId === userId){
        $(this).parent().remove();
        chatMembers.splice(i,1);
      }
    }
  });
});