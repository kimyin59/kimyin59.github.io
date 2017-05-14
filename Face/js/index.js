var bobImg = document.getElementById("bobImg");
var centre = document.getElementById("centre");
var img = document.getElementById("img");
var centre_x; var centre_y;
var mouse_x; var mouse_y;
var dist_to_centre;
var subArray;
var Bob;
var pie = 12;
var onion = 3;

var Animal = function (name, colour) {
    this.name = name;
    this.colour = colour;
    this.imgArray = new Array;
    this.dir = "img/" + name + "/imgArray/";
}

window.onload = function () {
    findCentre();
    centreElement(img);
    Bob = new Animal("Bob", "Red");
}

window.onresize = function () {
    findCentre();
}

function findCentre() {
    centre_x = window.innerWidth / 2 - 2.5;
    centre_y = window.innerHeight / 2 - 2.5;

    centre.style.left = centre_x + "px";
    centre.style.top = centre_y + "px";
}

window.onmousemove = function (evt) {
    mouse_x = evt.clientX - (window.innerWidth / 2);
    mouse_y = (window.innerHeight / 2) - evt.clientY;
    dist_to_centre = Math.sqrt(Math.pow(mouse_x, 2) + Math.pow(mouse_y, 2));

    circularSection(dist_to_centre, window.innerHeight / 2);        //  根據鼠標與頁面中心距離得到環形區 subArray = [0 ~ 2]

    var imgName = findQuadrant(mouse_x, mouse_y) + "_" + subArray;  //  加上之前算出的錐形區得到圖片名 imgName = [0 ~ 11]_[0 ~ 2]
    showImage(imgName);
}

function showImage (imgName) {
    bobImg.style.backgroundImage = "url('" + Bob.dir + imgName + ".png')";      //  顯示圖片
}

function findQuadrant(xval, yval) {
    var quadrant;
    if (xval > 0 && yval > 0) {
        quadrant = 1;
    } else if (xval > 0 && yval < 0) {
        quadrant = 2;
    } else if (xval < 0 && yval < 0) {
        quadrant = 3;
    } else if (xval < 0 && yval > 0) {
        quadrant = 4;
    } else {
        quadrant = 0;
    }
    var rad = Math.abs(Math.atan2(yval, xval) - Math.PI / 2);

    if (Math.atan2(yval, xval) - Math.PI / 2 > 0) {
    	rad = Math.PI * 2 - rad;
    } else if (rad == 0) {
    	rad = 0.01;
    }
    quadrant = Math.ceil(rad / Math.PI * 180 / (360 / pie));

    return quadrant;
}

function circularSection(disToCentre, maxDist) {
    var ratio = disToCentre / maxDist;

    if (ratio >= 0 && ratio < 1 / onion) {
    	subArray = 0;
    } else {
    	for (i = 1; i < onion; i++) {
	    	if (ratio >= i / onion && ratio < i + 1 / onion) {
	    		subArray = i;
	    	}
    	}
    }
}

function centreElement (ele) {
    ele.style.left = (window.innerWidth / 2) - (getStyle(ele, "width"));
    ele.style.top = (window.innerHeight / 2) - (getStyle(ele, "height"));
}

function getStyle(ele, p) {
    return parseFloat(window.getComputedStyle(ele).getPropertyValue(p));
}

function print(msg) {
    console.clear();
    console.log(msg);
}

var cat = new Animal("Bob", "Ninja");



