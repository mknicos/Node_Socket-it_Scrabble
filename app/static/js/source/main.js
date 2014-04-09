/* globals io: true */

(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;
  var game = {};

  function initialize(){
    initializeSocketIO();
    $('#join').click(join);
    $('#pick').click(pick);
  }

  function setletters(data){
    console.log('these are letters');
    console.log(data);
  }

  function pick(){
    var count = $('#count').val() * 1;
    var total = game.letters.length + count;
    if(total <= 7){
      socket.emit('getLetters', {user:game.user, count:count});
    }else{
      alert('you are dumb');
    }
  }

  function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
    socket.on('joined', joined);
    socket.on('setletters', setletters);
  }

  function joined(data){
    var user = data.user;
    var tr = '<tr data-user="'+user+'"><td class="user">'+user+'</td><td class="letters"></td></tr>';
    $('#users > tbody').append(tr);
  }

  function join(){
    var user = $('#user').val();
    game.user = user;
    game.letters = [];
    var tr = '<tr class="primary" data-user="'+user+'"><td class="user">'+user+'</td><td class="letters"></td></tr>';
    $('#users > tbody').append(tr);
    socket.emit('join', {user:user});
  }

})();
