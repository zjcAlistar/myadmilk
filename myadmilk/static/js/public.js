function showmessagebox (str) {
    var shadow = document.createElement("div");
    shadow.setAttribute("id", "shadow");
    shadow.style.cssText = "width:100%; height:100%; top:0; left:0; position:absolute; background:#222222;Opacity:0.95;";
    document.body.appendChild(shadow);

    var messagebox = document.createElement("div");
    messagebox.setAttribute("id", "messagebox");
    messagebox.style.cssText = "top:40%;left:20%;height:20%;width:60%;position:absolute;background:white;border-radius:10px;Opacity:1.0;font-family:SimHei;font-size:20px; text-align:center;line-height:33px;";
    // messagebox.innerHTML = "提示";
    document.body.appendChild(messagebox);

    var message = document.createElement("div");
    message.setAttribute("id", "message");
    message.style.cssText = "top:20%;left:5%;height:60%;width:90%;position:absolute;font-family:SimHei;font-size:20px; text-align:center;line-height:20px;"
    message.innerHTML = str;
    messagebox.appendChild(message);

    var btn_return = document.createElement("div");
    btn_return.setAttribute("id", "btn_return");
    btn_return.style.cssText = "top:65%;left:"+Width*0.4+"px;;height:"+Width*0.2+"px;width:"+Width*0.2+"px;position:absolute;background:white;border-radius:100%;font-family:SimHei;font-size:20px; text-align:center;line-height:"+Width*0.2+"px;";
    btn_return.innerHTML = "确认";
    document.body.appendChild(btn_return);

    btn_return.onclick = function () {
        $("#shadow").fadeOut(500);
        $("#messagebox").fadeOut(500);
        $("#btn_return").fadeOut(500);
        shadow.parentNode.removeChild(shadow);
        messagebox.parentNode.removeChild(messagebox);
        btn_return.parentNode.removeChild(btn_return);
    }
}