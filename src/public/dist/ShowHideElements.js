
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
$(document).ready(function(req,res){
   // $("#roomid").html('Roomid: ' + req.cookies.roomid);
   document.getElementById('roomid').innerHTML = getCookie('roomid') ;
})
var a1;
var a2;

function show_hide_users()
{
    if(a1==1)
    {
        document.getElementById("display-chat").style.display = "none";
        document.getElementById("display-joiner").style.display="inline";
        a2=0;
        return a1=0;
    }
    else
    {
        document.getElementById("display-joiner").style.display = "none";
        return a1 = 1;
    }
}

function show_hide_chat()
{
    if(a2!=1)
    {
        document.getElementById("display-joiner").style.display = "none";
        document.getElementById("display-chat").style.display="inline";
        a1=1;
        return a2=1;
    }
    else
    {
        document.getElementById("display-chat").style.display = "none";
        return a2 = 0;
    }
}

let show_list_emotion_status = false;
function show_list_emotion_icons() {
    if(show_list_emotion_status)
    {
        document.getElementById("list-emotion-icons").style.display = "none";
        show_list_emotion_status = false;
    }
    else
    {
        document.getElementById("list-emotion-icons").style.display = "block";
        show_list_emotion_status = true;
    }
}


function release_emotion(source) {
    let child = add_child(source);
    document.getElementById("video").appendChild(child);
    setTimeout(function(){
        child.remove();

    },500);
    // $("#child").one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $("#child").remove(); });
    // remove_child(child);
}

function add_child(source) {
    let emotion = document.createElement("img");

    emotion.src = source;
    emotion.id = "child";
    emotion.className = "emotion-icon";

    return emotion;
}

function remove_child(child) {
    // let parent = document.getElementById("video");
    // let child = document.getElementById("child");
    // parent.removeChild(child);

    // $('#child').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });

    // let child = document.querySelector("#child");

    child.ontransitionend = function(e) {
        $(this).remove();
    }
}