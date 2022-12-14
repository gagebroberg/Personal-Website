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
    } else {
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
    if (battery.charging == true) {
        powerSource.innerHTML = "Power Source: Power Adapter";
    } else {
        powerSource.innerHTML = "Power Source: Battery";

    }
});

var batteryInfo = function() {
    var info = document.getElementById("batteryInfo");
    if (!info.classList.contains("active")) {
        info.classList.add("active");
    } else {
        info.classList.remove("active");
    }
}

var networkInfo = function() {
    var info = document.getElementById("networkInfo");
    if (!info.classList.contains("active")) {
        info.classList.add("active");
    } else {
        info.classList.remove("active");
    }
}
// #endregion