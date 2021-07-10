
let SECURE = false;
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

const callarr=[peerId];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
var nickname = getCookie('nickname');

socket.on('ONLINE_PEER_ARRAY', data=>{
    var arrPeerId = data.arrPeerId;
    var arrnickname = data.arrnickname;
      var i;
      for(i=0; i<=   arrPeerId.length-1; i++)
      {
        var NickName = decodeURIComponent(arrnickname[i]);
        $('#output').append(`<p class="user-joined">${NickName} joined</p>`);
        var nicknameid = arrnickname[i] + arrPeerId[i];
        $('#ulPeerId').append(`<p class="nickname" id="${nicknameid}">${NickName}</p>`);
        $('#ulPeerId').append(`<li id="${arrPeerId[i]}">${arrPeerId[i]}</li>`);
        
      }
})

socket.on('SOMEONE_DISCONNECTED', data => {
    //let {peerId,nickname} = data;
    var peerId = data.peerId;
    var id = 'video' + peerId;
    var nickname = data.nickname;
    var nicknameid = nickname + peerId;
    $(`#${peerId}`).remove();
    $(`#${nicknameid}`).remove();
    $(`#${id}`).remove();
});

socket.on('NEW_CLIENT_CONNECT', data => {
    //let {PeerId,nickname} = data;
    var peerId = data.peerId;
    var nickname = data.nickname;
    var NickName = decodeURIComponent(nickname)
    var nicknameid = nickname + peerId;
    $('#output').append(`<p class="user-joined" >${NickName} joined</p>`);
    $('#ulPeerId').append(`<p class="nickname" id="${nicknameid}">${NickName}</p>`);
    $('#ulPeerId').append(`<li id="${peerId}">${peerId}</p></li>`);
});
  
var numberid = 0;
$('#ulPeerId').on('click','li',function(){
    const Id = $(this).text();
    if(!callarr.includes(Id))
    {
        callarr.push(Id);
        numberid = numberid +1;
        var video = document.createElement("video");
        var id = "video" + Id;
        console.log("friend",id);
        video.setAttribute('id',id);
        video.setAttribute('class',"videofriend");
        video.width = 200;
        video.height = 150;
        video.controls = true;
        var element = document.getElementById("video");
        element.appendChild(video);
        socket.emit('call-send-id',peerId);
        openStream(stream =>{
            playVideo(stream,'localStream');
            const call = peer.call(Id, stream);
            call.on('stream',remoteStream => playVideo(remoteStream,id));
            });
    }
});
var sendid;
socket.on('send-sender-id',function(peerId){
    sendid = "video" + peerId;
    console.log(sendid)
    callarr.push(peerId);
})

peer.on('call', (call) => {
    var video = document.createElement("video");
    video.setAttribute('id',sendid);
    video.setAttribute('class',"videofriend");
    video.width = 200;
    video.height = 150;
    video.controls = true;
    var element = document.getElementById("video");
    element.appendChild(video);
    openStream(stream =>{
        playVideo(stream,'localStream');
        call.answer(stream);
        call.on('stream',remoteStream => playVideo(remoteStream,sendid));
        });
  });

  window.onload = ()=>{
    //Tinh gia tri cua b
    const b = Math.floor(Math.random() * 9) + 1;
    console.log("b",b);
    //Gui yeu cau lay p va q
    socket.emit("Request");
    //Lay p va q
    socket.on("Request",function(data){
        let {p,q} = data;
        console.log("p: ",p," q: ",q);
        console.log("b: ",b);
        //Tinh B
        let B = Math.pow(parseInt(q), b) % parseInt(p);
        console.log("B: ",B);
        socket.emit("Exchange",B);
        socket.on("Exchange",function(data){
            let {A,k_a} = data;
            const k_b = Math.pow(A, b) % p;
            console.log("k_b",k_b);
            if(k_a==k_b){
                alert("Ket noi an toan!");
                SECURE = true;
            }
            else{
                alert("Ket noi khong an toan!");
                SECURE = false;
            }
        })
    })
    
}

$('#send').on('click', function(){
    let msg1 = document.getElementById("message").value;
    const key = forge.random.getBytesSync(16);
    const iv = forge.random.getBytesSync(16);
    console.log(`Key : ${key}, IV : ${iv}`);
    const cipher = forge.cipher.createCipher("AES-CBC", key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(msg1));
    cipher.finish();
    const encryptedMsg = cipher.output.getBytes();
    socket.emit("Client-send-data",{
        name: nickname,
        message: encryptedMsg,
        key: key,
        iv: iv
    });
    console.log("secure", SECURE);
})

socket.on("Server-send-data",function(data){

    const key = data.key;
	const iv = data.iv;
	// Decrypted message
	const encMsg = forge.util.createBuffer(data.message);

    //Use AES-CBC
	const decipher = forge.cipher.createDecipher("AES-CBC", key);
	decipher.start({ iv: iv });
	decipher.update(encMsg);
	const result = decipher.finish();
	console.log("Result", result);
	const decryptedMsg = decipher.output.toString();

    document.getElementById("message").value ="";
    var div = document.createElement("div")
    var p1 = '';
    if(data[1]==peerId)
    {
        p1='You';
    }
    else
    {
        p1 = data.name;

    }
    var p2=''
    p2 = decryptedMsg;
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
    socket.emit("signal_to_Server", source);
})

$('#heart').click( () => {
    let source = document.getElementById("heart").src;
    socket.emit("signal_to_Server", source);
})

$('#like').click( () => {
    let source = document.getElementById("like").src;
    socket.emit("signal_to_Server", source);
})

$('#ok').click( () => {
    let source = document.getElementById("ok").src;
    socket.emit("signal_to_Server", source);
})

$('#vitory').click( () => {
    let source = document.getElementById("vitory").src;
    socket.emit("signal_to_Server", source);
})

socket.on("signal_to_Clients", (source) => {
    release_emotion(source);
})

