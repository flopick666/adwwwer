$(document).ready(function () {
  $('.animated_diagramm').animate({'opacity': '1'}, 3000).delay(3000);
  $('.animated_diagramm').append('<div class="mon month1">Apr</div><div class="mon month2">May</div><div class="mon month3">Jun</div><div class="mon month4">Jul</div><div class="mon month5">Aug</div>');
  $('.month1').delay(2000).animate({'opacity': '1'}, 500);
  $('.month2').delay(2500).animate({'opacity': '1'}, 500);
  $('.month3').delay(3000).animate({'opacity': '1'}, 500);
  $('.month4').delay(3500).animate({'opacity': '1'}, 500);
  $('.month5').delay(4000).animate({'opacity': '1'}, 500);
  $('.animated_diagramm').append('<div class="serv serv1"><i class="fa fa-cog" aria-hidden="true"></i></div><div class="serv serv2"><i class="fa fa-heart" aria-hidden="true"></i></div><div class="serv serv3"><i class="fa fa-star" aria-hidden="true"></i></div><div class="serv serv4"><i class="fa fa-coffee" aria-hidden="true"></i></div>');
  $('.serv1').delay(4500).animate({'opacity': '1'}, 500);
  $('.serv2').delay(5000).animate({'opacity': '1'}, 500);
  $('.serv3').delay(5500).animate({'opacity': '1'}, 500);
  $('.serv4').delay(6000).animate({'opacity': '1'}, 500);


  // setTimeout(function(){
  //   alert("Boom1");
  // }, 100);
  // setTimeout(function(){
  //   alert("Boom2");
  // }, 3100);
  // setTimeout(function(){
  //   alert("Boom3");
  // }, 4750);
  // setTimeout(function(){
  //   // alert("Boom!");
  //   $('.month1').fadeIn('2000').delay(3000);
  // }, 2000);
  // setTimeout(function(){
  //   $('.month2').fadeIn('4000').delay(6000);
  //   $('.month3').fadeIn('8000').delay(9000);
  //   $('.month4').fadeIn('12000').delay(12000);
  //   $('.month5').fadeIn('16000').delay(15000);
  // }, 4000);
});

(function () {
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
		},
		timeToCall);
		lastTime = currTime + timeToCall;
		return id;
};

if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
};
}());


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineCap = "round";


// calc waypoints traveling along vertices
function calcWaypoints(vertices) {
var waypoints = [];
for (var i = 1; i < vertices.length; i++) {
		var pt0 = vertices[i - 1];
		var pt1 = vertices[i];
		var dx = pt1.x - pt0.x;
		var dy = pt1.y - pt0.y;
		for (var j = 0; j < 100; j++) {
				var x = pt0.x + dx * j / 100;
				var y = pt0.y + dy * j / 100;
				waypoints.push({
						x: x,
						y: y
				});
		}
}
return (waypoints);
}


function animate() {
  if (t < points.length - 1) {
  		requestAnimationFrame(animate);
  }
  // draw a line segment from the last waypoint to the current waypoint
  ctx.beginPath();
  ctx.moveTo(points[t - 1].x, points[t - 1].y);
  ctx.lineTo(points[t].x, points[t].y);
  // ctx.moveTo(0,290);
  // ctx.lineTo(470,290);
  ctx.stroke();
  // increment "t" to get the next waypoint
  t++;
}

// variable to hold how many frames have elapsed in the animation
var t = 1;
// define the path to plot
var vertices = [];
vertices.push({
x: 40,
y: 268
});
vertices.push({
x: 88,
y: 223
});
vertices.push({
x: 138,
y: 255
});
vertices.push({
x: 186,
y: 135
});
vertices.push({
x: 235,
y: 280
});
vertices.push({
x: 285,
y: 250
});
vertices.push({
x: 332,
y: 183
});
vertices.push({
x: 382,
y: 200
});
vertices.push({
x: 432,
y: 150
});

// draw the complete line
//ctx.lineWidth = 1;
// tell canvas you are beginning a new path
//ctx.beginPath();
// draw the path with moveTo and multiple lineTo's
//ctx.moveTo(0, 0);
//ctx.lineTo(300, 800);
//ctx.lineTo(80, 200);
//ctx.lineTo(10, 100);
//ctx.lineTo(0, 0);
//ctx.strokeStyle = "yellow";
// stroke the path
//ctx.stroke();


// set some style
ctx.lineWidth = 3;
ctx.strokeStyle = "#20b7a3";
// calculate incremental points along the path
var points = calcWaypoints(vertices);
// extend the line from start to finish with animation
setTimeout(function() {
animate(points);
},7000);
