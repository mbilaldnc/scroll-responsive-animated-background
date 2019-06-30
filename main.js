let backGround = document.getElementById('background'),
	width = window.innerWidth,
	height = window.innerHeight,
	maxGap = 30,
	scrollGap = 300,
	zigzagCount = 20;

setup();

function changeBackground() {
	width = window.innerWidth;
	height = window.innerHeight;
	let bg_clipPath = 'polygon(0 0, 100% 0,';

	var tempWidth = width;
	for (var i = 1; i <= zigzagCount; i++) {
		let randomHeight = Math.random() * 2 * maxGap + height / 2 - maxGap;
		bg_clipPath += `${Math.round(tempWidth * 100 / width)}% ${Math.round(randomHeight * 100 / height)}%, `;
		tempWidth -= width / zigzagCount;
	}
	let randomHeight = Math.random() * 2 * maxGap + height / 2 - maxGap;
	bg_clipPath += `${Math.round(tempWidth * 100 / width)}% ${Math.round(randomHeight * 100 / height)}%)`;
	backGround.style.clipPath = bg_clipPath;
}

function setup() {
	//#region üstte dizili noktalar yapma
	let bg_clipPath = 'polygon(0 0, 100% 0, ',
		tempWidth = width;
	for (let i = 1; i <= zigzagCount; i++) {
		bg_clipPath += `${Math.round(tempWidth * 100 / width)}% 0, `;
		tempWidth -= width / zigzagCount;
	}
	bg_clipPath += `${Math.round(tempWidth * 100 / width)}% 0)`;
	//#endregion
	backGround.style.clipPath = bg_clipPath;
	setTimeout(() => {
		changeBackground();
	}, 100);
}

window.addEventListener('resize', (event) => {
	changeBackground();
});

var last_scrollY = 0;
window.addEventListener('scroll', (event) => {
	console.log(window.scrollY);
	if (Math.abs(window.scrollY - last_scrollY) > scrollGap) {
		last_scrollY = window.scrollY;
		changeBackground();
	}
});

//#region IF YOU WILL USE CANVAS
/* 
let bgCanvas = document.getElementById('bg-canvas'),
    ctx = bgCanvas.getContext('2d');
    
function changeBackground() {
	let width = window.innerWidth,
		height = window.innerHeight,
		maxGap = 50,
		zigzagCount = 30;

	bgCanvas.setAttribute('width', width);
	bgCanvas.setAttribute('height', height);
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = 'rgb(255, 217, 0)';
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(width, 0);
	var tempWidth = width;
	for (var i = 1; i <= zigzagCount; i++) {
		ctx.lineTo(tempWidth, Math.random() * 2 * maxGap + height / 2 - maxGap);
		tempWidth -= width / zigzagCount;
	}
	ctx.lineTo(0, Math.random() * 2 * maxGap + height / 2 - maxGap);
	ctx.fill();
}
*/
//#endregion

//#region FORM CONTROL
document.getElementById('maxGap').value = maxGap;
document.getElementById('scrollGap').value = scrollGap;
document.getElementById('zigzagCount').value = zigzagCount;
document.getElementById('apply').addEventListener('click', (event) => {
	maxGap = document.getElementById('maxGap').value;
	scrollGap = document.getElementById('scrollGap').value;
	zigzagCount = document.getElementById('zigzagCount').value;
	changeBackground();
});
//#endregion
