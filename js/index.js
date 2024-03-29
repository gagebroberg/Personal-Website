// #region Date handler
var dayOfWeekHash = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
}
var monthOfYearHash = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}
var printTime = function() {
    let currentDate = document.getElementById("date")
    var date = new Date();
    var mornOrAfter;
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (date.getHours() >= 12) {
        mornOrAfter = "PM"
    } else {
        mornOrAfter = "AM"
    }
    currentDate.innerHTML = dayOfWeekHash[date.getDay()] + " "
    + monthOfYearHash[date.getMonth()] + " "
    + date.getDate() + "  "
    + (date.getHours() != 12 && date.getHours() != 0 ? date.getHours() % 12 : 12) + ":"
    + minutes + " "
    + mornOrAfter;
}
printTime();
timer = setInterval(printTime, 100); // call every 500 milliseconds (1/10 second)
// #endregion

// // #region Flickering welcome
// var fadeInAndOut = function() {
//     let welcome = document.getElementsByClassName("welcome");
//     if (welcome.length != 0) {
//         let welcomeText = document.getElementById("welcomeText");
//         if (welcomeText.style.opacity == 0) {
//             welcomeText.style.transition = "opacity 2s linear 0s";
//             welcomeText.style.opacity = 1;
//         } else if (welcomeText.style.opacity == 1) {
//             welcomeText.style.transition = "opacity 2s linear 0s";
//             welcomeText.style.opacity = 0;
//         }

//         let welcomeTopArrow = document.getElementById("welcomeTopArrow");
//         if (welcomeTopArrow.style.opacity == 0) {
//             welcomeTopArrow.style.transition = "opacity 2s linear 0s";
//             welcomeTopArrow.style.opacity = 1;
//         } else if (welcomeTopArrow.style.opacity == 1) {
//             welcomeTopArrow.style.transition = "opacity 2s linear 0s";
//             welcomeTopArrow.style.opacity = 0;
//         }

//         let welcomeBottomArrow = document.getElementById("welcomeBottomArrow");
//         if (welcomeBottomArrow.style.opacity == 0) {
//             welcomeBottomArrow.style.transition = "opacity 2s linear 0s";
//             welcomeBottomArrow.style.opacity = 1;
//         } else if (welcomeBottomArrow.style.opacity == 1) {
//             welcomeBottomArrow.style.transition = "opacity 2s linear 0s";
//             welcomeBottomArrow.style.opacity = 0;
//         }
//     }   
// }
// timer =  setInterval(fadeInAndOut, 1000); // call every 1000 milliseconds (1 second)
// // #endregion

// #region Clock
var clockInAndOut = function() {
    var time = document.getElementById("clock");
    if (!time.classList.contains("active")) {
        time.classList.add("active");
    } else {
        time.classList.remove("active");
    }
}
// #endregion

// #region Network
function hasNetwork(online) {
    const element = document.querySelector(".status");
    if (online) {
        element.childNodes[0].style.color = "white";
        if (document.querySelector(".errorMessage") != null) {
            document.querySelector(".errorMessage").remove()
        }
        var status = document.getElementById("connStat");
        status.innerHTML = "Status: Connected";
        var message = document.getElementById("netMessage");
        message.innerHTML = "If this changes, I will let you know!";
    } else {
        var status = document.getElementById("connStat");
        status.innerHTML = "Status: Not Connected";
        var message = document.getElementById("netMessage");
        message.innerHTML = "I told you I would let you know!";
        var body = document.querySelector("body");
        var noNetworkBox = document.createElement("div");
        var errorMessage = document.createElement("i");
        var errorText = document.createElement("p");
        var exitButton = document.createElement("i");
        element.childNodes[0].style.color = "red";
        noNetworkBox.style.cssText = "width: 1000px;" +
            "height: 500px;" + 
            "position: absolute;" + 
            "top: 50%;" + 
            "left: 50%;" + 
            "transform: translate(-50%, -50%);" +
            "background-color: white;" + 
            "border: solid transparent;" +
            "border-radius: 15px;"
        noNetworkBox.classList.add("errorMessage");
        errorMessage.classList.add("fa");
        errorMessage.classList.add("fa-wifi");
        errorMessage.classList.add("fa-3x");
        errorMessage.style.cssText = "width: 600px;" +
            "height: 200px;" +
            "transform: translate(200px, 130px);" +
            "color: red;" + 
            "text-align: center;";
        errorText.innerHTML = "Oops! Unfortunately Gage's OS needs an internet connection to run! " +
            "Please check your connection and reload the page!";
        errorText.style.cssText = "text-align: center;" +
            "font-size: 2rem;" +
            "font-family: 'Cedarville Cursive', cursive;" +
            "margin: 10px auto;" +
            "width: 80%";
        exitButton.style.cssText = "float: right;" + 
            "width: 20px;" +
            "height: 20px;" +
            "margin: 10px 10px 0 0;"+
            "color: red;" +
            "cursor: pointer;";
        exitButton.classList.add("fas");
        exitButton.classList.add("fa-times-circle");
        exitButton.classList.add("fa-lg");
        exitButton.setAttribute("onclick", "exitNetworkError()");
        noNetworkBox.appendChild(exitButton);
        noNetworkBox.appendChild(errorMessage);
        noNetworkBox.appendChild(errorText);
        body.appendChild(noNetworkBox);
    }
}

var exitNetworkError = function() {
    if (document.querySelector(".errorMessage") != null) {
        document.querySelector(".errorMessage").remove();
    }
}

window.addEventListener('load', () => {
    if (navigator.onLine) {
        hasNetwork(navigator.onLine);
    }
    window.addEventListener('online', () => {
        hasNetwork(true);
    });
    window.addEventListener('offline', () => {
        hasNetwork(false);
    });
});
// #endregion

// #region Battery
navigator.getBattery().then(function(battery) {
    // Get the battery fill element
    var battFill = document.getElementById("batteryFill");
    battFill.style.cssText = "width: calc(14px * " + battery.level + ")"
    // check for subsequent updates
    battery.onlevelchange = function() {
      battFill.style.cssText = "width: calc(14px * " + this.level + ")"
    };
    var chargeLevel = document.getElementById("chargeLevel");
    chargeLevel.innerHTML = "Charge Level: " + Math.round(battery.level * 100) + "%";
    var powerSource = document.getElementById("powerSource");
    var batteryBolt = document.querySelector(".fa-bolt");
    if (battery.charging == true) {
        powerSource.innerHTML = "Power Source: Power Adapter";
        batteryBolt.style.display = "inline-block";
    } else {
        powerSource.innerHTML = "Power Source: Battery";
        batteryBolt.style.display = "none";
    }
});

var batteryInfo = function() {
    var info = document.getElementById("batteryInfo");
    if (!info.classList.contains("active")) {
        info.classList.add("active");
        var networkInfo = document.getElementById("networkInfo");
        if (networkInfo.classList.contains("active")) {
            networkInfo.classList.remove("active");
        }
    } else {
        info.classList.remove("active");
    }
}

var networkInfo = function() {
    var info = document.getElementById("networkInfo");
    if (!info.classList.contains("active")) {
        info.classList.add("active");
        var batteryInfo = document.getElementById("batteryInfo");
        if (batteryInfo.classList.contains("active")) {
            batteryInfo.classList.remove("active");
        }
    } else {
        info.classList.remove("active");
    }
}


// cookie set to get rid of the helper in the current session
setCookie = function (c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var expires = exdate.toUTCString();
    var isIE8 = (document.documentMode !== undefined);
    if (exdays == 0) {
        expires = (isIE8 == true) ? "" : "0";
    }
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+expires);
    document.cookie=c_name + "=" + c_value;
}

getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

deleteCookie = function(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

if (getCookie('visited')) {
    $('.welcome').remove();
    deleteCookie('visited');
} else {
    setCookie('visited','true',999); //999 days expiration
}

// adding a custom menu when right click pressed
document.onclick = hideMenu;
document.oncontextmenu = rightClick;
const currentApp = document.getElementById("currentApp")
const appName = document.getElementById("appName")
    
function hideMenu() {
    document.getElementById("contextMenu")
            .style.display = "none"
    // document.getElementById("batteryInfo")
    //         .style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById("contextMenu")
            .style.display == "block")
        hideMenu();
    else{
        var menu = document.getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}

// change desktop background
function openChangeDesktop() {
    currentApp.classList.remove("hidden")
    appName.innerText = "Change Desktop"
}

// open, close, minimize buttons
function closeWindow() {
    currentApp.classList.add("hidden")
}

function maxWindow() {
    currentApp.style.width = "100%"
    currentApp.style.height = "100%"
    currentApp.style.top = "33"
    currentApp.style.left = "0"
}

function minWindow() {
    currentApp.classList.add("hidden")
}

// movable div
// Make the DIV element draggable:
dragElement(document.getElementById("currentApp"));
// Use the function on your div:
resizeElement(document.getElementById("currentApp"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function resizeElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    // Create resizers
    var resizerBottom = createResizer("ns-resize");
    var resizerLeft = createResizer("ew-resize");
    var resizerRight = createResizer("ew-resize");
  
    // Position the resizers
    resizerBottom.style.width = "100%";
    resizerBottom.style.height = "10px";
    resizerBottom.style.bottom = "-5px";
    resizerLeft.style.width = "10px";
    resizerLeft.style.height = "100%";
    resizerLeft.style.left = "-5px";
    resizerLeft.style.top = "0";
    resizerRight.style.width = "10px";
    resizerRight.style.height = "100%";
    resizerRight.style.right = "-5px";
    resizerRight.style.top = "0";
  
    // Append the resizers
    elmnt.appendChild(resizerBottom);
    elmnt.appendChild(resizerLeft);
    elmnt.appendChild(resizerRight);
  
    // Attach the mousedown event handlers
    resizerBottom.onmousedown = e => resizeMouseDown(e, "bottom");
    resizerLeft.onmousedown = e => resizeMouseDown(e, "left");
    resizerRight.onmousedown = e => resizeMouseDown(e, "right");
  
    function createResizer(cursor) {
      var resizer = document.createElement("div");
      resizer.style.position = "absolute";
      resizer.style.cursor = cursor;
      return resizer;
    }
  
    function resizeMouseDown(e, direction) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = stopResizingElement;
      document.onmousemove = e => resizeDrag(e, direction);
    }
  
    function resizeDrag(e, direction) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      switch(direction) {
        case "bottom":
          elmnt.style.height = (elmnt.offsetHeight - pos2) + "px";
          break;
        case "left":
          elmnt.style.width = (elmnt.offsetWidth + pos1) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          break;
        case "right":
          elmnt.style.width = (elmnt.offsetWidth - pos1) + "px";
          break;
      }
    }
  
    function stopResizingElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

// file reading for image selection
const reader = new FileReader();
const fileInput = document.getElementById("file");
const img = document.getElementById("img");
reader.onload = e => {
  img.src = e.target.result;
}
fileInput.addEventListener('change', e => {
  const f = e.target.files[0];
  reader.readAsDataURL(f);
})

function setBackgroundImage() {
    console.log("Attempting to set background")
    document.body.style.backgroundImage = "url('" + img.src + "')"
}
// #endregion