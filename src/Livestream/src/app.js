import { data } from 'jquery';
import Peer from 'peerjs'
const {uid} = require('uid');
const $ = require('jquery');
const config = {host: 'realtime-livestream.herokuapp.com', port: 443, secure: true, key: 'peerjs'}
const openStream = require('./openStream');
const playVideo = require('./playVideo');
const io = require('socket.io-client');


const socket = io('http://localhost:3111')

console.log(socket)
function getPeer()
{
    const id = uid(10);
    $('#peer-id').append(id);
    return id;
}
const peerId = getPeer();
const peer = new Peer(peerId,config); 
/*$('#btnCall').click(() =>{
    const friendId = $('#txtFriendId').val();
    openStream(stream =>{
        playVideo(stream,'localStream');
        const call = peer.call(friendId, stream);
        call.on('stream',remoteStream => playVideo(remoteStream,'friendStream'));
        });
});
*/

const arrMsg=[];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
var nickname = getCookie('nickname');

socket.on('ONLINE_PEER_ARRAY', data=>{
    //let {arrPeerId,arrnickname} = data;
    var arrPeerId = data.arrPeerId;
    var arrnickname = data.arrnickname;
     // arrPeerId.forEach(id => {
       // $('#output').append(`<p class="user-joined">${id} joined</p>`);
        //$('#ulPeerId').append(`<p class="nickname">${nickname}</p>`);
        //$('#ulPeerId').append(`<li id="${id}">${id}</li>`);
        
      //});
      var i;
      for(i=0; i<=   arrPeerId.length-1; i++)
      {
        var NickName = decodeURIComponent(arrnickname[i]);
        $('#output').append(`<p class="user-joined" id="${arrnickname[i]}">${NickName} joined</p>`);
        $('#ulPeerId').append(`<p class="nickname">${NickName}</p>`);
        $('#ulPeerId').append(`<li id="${arrPeerId[i]}">${arrPeerId[i]}</li>`);
        
      }
})

socket.on('SOMEONE_DISCONNECTED', data => {
    //let {peerId,nickname} = data;
    var peerId = data.peerId;
    var nickname = data.nickname;
    $(`#${peerId}`).remove();
    $(`#${nickname}`).remove();
});

socket.on('NEW_CLIENT_CONNECT', data => {
    //let {PeerId,nickname} = data;
    var peerId = data.peerId;
    var nickname = data.nickname;
    var NickName = decodeURIComponent(nickname)
    $('#output').append(`<p class="user-joined" id="${nickname}">${NickName} joined</p>`);
    $('#ulPeerId').append(`<p class="nickname">${NickName}</p>`);
    $('#ulPeerId').append(`<li id="${peerId}">${peerId}</p></li>`);
});
  
var numberid = 0;
$('#ulPeerId').on('click','li',function(){
    numberid = numberid +1;
    var friendStream = numberid.toString();
    var video = document.createElement("video");
    video.setAttribute('id',friendStream);
    video.width = 300;
    video.controls = true;
    var element = document.getElementById("video");
    element.appendChild(video);
    const peerId = $(this).text();
    openStream(stream =>{
        playVideo(stream,'localStream');
        const call = peer.call(peerId, stream);
        call.on('stream',remoteStream => playVideo(remoteStream,friendStream));
        });
});

peer.on('call', (call) => {
    var friendStream = numberid.toString();
    var video = document.createElement("video");
    video.setAttribute('id',friendStream);
    video.width = 300;
    video.controls = true;
    var element = document.getElementById("video");
    element.appendChild(video);
    openStream(stream =>{
        playVideo(stream,'localStream');
        call.answer(stream);
        call.on('stream',remoteStream => playVideo(remoteStream,friendStream));
        });
  });

$('#send').on('click', function(){
    var arrmsg=[]
    let msg1 = document.getElementById("message").value;
    arrmsg.push(msg1);
    arrmsg.push(peerId);
    socket.emit("Client-send-data",arrmsg);
})

socket.on("Server-send-data",function(data){

    document.getElementById("message").value ="";
    var div = document.createElement("div")
    var p1 = '';
    if(data[1]==peerId)
    {
        p1='You';
    }
    else
    {
        p1 = data[1];

    }
    //var p2 = document.createElement("p");
   // p1.setAttribute('class','joiner-name')
    //p2.setAttribute('class','msg-content')
    var p2=''
    p2 = data[0];
   // $('#output').append(p2);
    //append(`<p class="user-joined">${id} joined</p>`);
    $('#output').append(`<p class='msg-content'><strong>${p1} </strong>${p2}</p>`)
})


$(document).ready(function(){
    socket.emit('create-room',document.getElementById('roomid').innerHTML);
    console.log(peerId);
    socket.emit('NEW_PEER_ID',{peerId: peerId, nickname: nickname});
})

socket.on("server-send-room-socket",function(data){
  // $("#roomhientai").html(data);
})


$('#clap').click( () => {
    let source = document.getElementById("clap").src;
    //socket.emit("signal_to_Server", source);
    socket.emit("Client-send-data", source);
})

$('#heart').click( () => {
    let source = document.getElementById("heart").src;
    socket.emit("signal_to_Server", source);
    //socket.emit("Client-send-data", source);
})

$('#like').click( () => {
    let source = document.getElementById("like").src;
    socket.emit("signal_to_Server", source);
    //socket.emit("Client-send-data", source);
})

$('#ok').click( () => {
    let source = document.getElementById("ok").src;
    socket.emit("signal_to_Server", source);
    //socket.emit("Client-send-data", source);
})

$('#vitory').click( () => {
    let source = document.getElementById("vitory").src;
    socket.emit("signal_to_Server", source);
    //socket.emit("Client-send-data", source);
})

socket.on("signal_to_Clients", (source) => {
    release_emotion(source);
})