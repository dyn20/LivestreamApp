$(document).ready(function(){
    $('#join').click(function(){
        {
            console.log('click click');
            document.getElementById("neon-wrapper2").style.display="none";
            document.getElementById("neon-wrapper").style.display="inline-block";
        }}) 
    $('#create').click(function(){
    {
        document.getElementById("neon-wrapper").style.display="none";
        document.getElementById("neon-wrapper2").style.display="inline-block"
    }})
})