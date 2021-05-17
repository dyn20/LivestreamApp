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