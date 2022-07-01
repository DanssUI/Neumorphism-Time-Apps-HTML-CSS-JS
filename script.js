
//Holder Section
const clocksect = document.querySelector(".clock-section");
const stopwsect = document.querySelector(".stopw-section");
const timersect = document.querySelector(".timer-section");

const navtitle = document.querySelector(".topnavbar h2");

   //LoadingElement
   setTimeout(function() {document.querySelector(".loader").style="animation-name: fadeout; animation-duration: 1s;";}, 2000);
   setTimeout(function() {document.querySelector(".loader").style.display="none"}, 3000);
   setTimeout(function() {document.querySelector("#chref").click()}, 100);


  let currentTab = 1;

//ClockSection
const clockDisplayer = document.querySelector(".clock-section h1");
const dateDisplayer = document.querySelector(".clock-section h3");

const hourhand = document.querySelector(".hour");
const minhand = document.querySelector(".mins");
const sechand = document.querySelector(".secs");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const now = new Date();
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  
  let useampm = false;
  let ampm = "PM";
  
  function ampmtogle(){
  	if (useampm == false) {
  		document.querySelector(".ampmtogle").style = "box-shadow: inset 3px 3px 3px #cbced1, inset -3px -3px 3px white;";
  		useampm = true;
  	} else {
  		document.querySelector(".ampmtogle").style = "	border: 1px solid #F3F3F3; background: #ECF0F3; box-shadow: 3px 3px 7px #c3c3c3, -2px -2px 5px #ffffff;";
  		useampm = false;
  	}
  }

  dateDisplayer.innerHTML = day + ", " + now.getDate() + " " + month + " " + now.getFullYear();

  setInterval(updaterTime, 1000);

  function updaterTime(){
  	
  	 const time = new Date();
	 const sec = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
	 const min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
	 let hour = time.getHours();
	 
	 if (useampm == true) {
	 	if (hour < 12) {
	 		ampm = "AM";
	 		let timedisplay = hour + ":" + min + ":" + sec + " " + ampm;
			clockDisplayer.innerHTML = timedisplay;	
	 	}else {
	 		ampm = "PM";
	 		let timedisplay = hour - 12 + ":" + min + ":" + sec + " " + ampm;
			clockDisplayer.innerHTML = timedisplay;	
	 	}
	 	
	 } else {
	    let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
	 	let timedisplay = hour + ":" + min + ":" + sec;
		clockDisplayer.innerHTML = timedisplay;	
	 }
	 
	 //Clock Arrow Rotation
	 const secDeg = ((sec / 60) * 360) + 90;
	 const minDeg = ((min / 60) * 360) + ((sec/60)*6) + 90;
     const hourDeg = ((hour / 12) * 360) + ((min/60)*30) + 90;
	 
     sechand.style.transform = "rotate(" + secDeg + "deg)";
     minhand.style.transform = "rotate(" + minDeg + "deg)";
     hourhand.style.transform = "rotate(" + hourDeg + "deg)";
  }
  
//Stopwatch section
const swdisplay = document.getElementById('swdisplay');
const startbtn = document.getElementById('strbtn');
const stopbtn = document.getElementById('stpbtn');
const resetbtn = document.getElementById('rstbtn');
const lapbtn = document.getElementById('lapbtn');
const lapbox = document.querySelector(".lap-box-fixer");

let [ms, sc, mn] = [0,0,0];
let swbool = 0;
let lapindex = 1;

  function startSw(){
  	if (swbool == 0) {
  		swbool = setInterval(showwatch, 10);
  		startbtn.style.display ="none";
  		stopbtn.style.display = "block";
  		resetbtn.style.display = "none";
  		lapbtn.style.display = "block";
  		lapbox.style.display = "flex";
  	}
  }
  
  function stopSw() {
  	if (swbool != 0) {
  		clearInterval(swbool);
  		swbool = 0;
  		startbtn.style.display = "block";
  		stopbtn.style.display = "none";
  		resetbtn.style.display = "block";
   		lapbtn.style.display = "none";
   		lapbox.style.display = "none"
  	}
  }
  
  function resetSw(){
  	[ms, sc, mn] = [0,0,0];
  	swdisplay.innerHTML = "00 : 00 :";
  	document.querySelector("#swdisms").innerHTML = "&#160;00";
  	lapindex = 1;
  	var lapboxes = document.querySelectorAll(".laptab");
  	lapboxes.forEach(lapboxes => {lapboxes.remove();});
  }
  
  function lapSw(){
  	const laptab = document.createElement("span");
	laptab.className = "laptab";
	
	const lapCounter = document.createElement("h2");
	lapCounter.innerHTML = lapindex++ + "  Lap";
	
	const lapContent = document.createElement("h4");
	lapContent.innerHTML = swdisplay.innerHTML + document.querySelector("#swdisms").innerHTML;
	
	laptab.appendChild(lapCounter);
	laptab.appendChild(lapContent);
	document.querySelector(".lap-box").appendChild(laptab);
	
  }
  
  function showwatch(){
  	ms += 10;
  	if (ms == 1000) {
  		ms = 0;
  		sc++;
  	}
  	if (sc == 60) {
  		sc = 0;
  		mn++;
  	}
  	
  	let swmin = mn < 10 ? "0" + mn : mn;
  	let swsec = sc < 10 ? "0" + sc : sc;
  	let swmilsec = ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
  	
  	const swmilfix = String(swmilsec).slice(0, 2);
  	
  	const swtext = swmin + " : " + swsec + " : ";
  	swdisplay.innerHTML = swtext;
  	document.querySelector("#swdisms").innerHTML = "&#160;" + swmilfix;
  }
  
//Timer section
const tmdisplay = document.getElementById('tmdisplay');

const startTmBtn = document.getElementById('strTm');
const pauseTmBtn = document.getElementById('pauseTm');
const cancelTmBtn = document.getElementById('canTm');
const timerboxes = document.querySelector(".time-boxes");
const timepickerplaceholder = document.querySelector(".timer-pickerholder");

let [tmhr, tmmn, tmsc] = [0,0,0];
let booltimer = 0;
let booleverstart = 0;

let totalsec = 0;
let totalsecTemp = 0;

   function btninput(val){
   	    tmhr = val.split(":")[0];
   	    tmmn = val.split(":")[1];
   	    tmsc = val.split(":")[2];
   	    tmdisplay.innerHTML = val;
   }

   timepicker.oninput = function() {initTimeInput()}

   function initTimeInput(){
    	tmdisplay.innerHTML = timepicker.value;
    	tmhr = timepicker.value.split(":")[0];
    	tmmn = timepicker.value.split(":")[1];
    	tmsc = timepicker.value.split(":")[2];
   }

   function startTm() {
   	  if (booltimer == 0) {
   		booltimer = setInterval(timer, 1000);
   	  }
   	  
   	  document.querySelector(".progress-ring-timer").style = "stroke-dashoffset: calc(780 - (780 * (var(--totalsecTemp) / var(--totalsec))));";
   	  
   	  startTmBtn.style.display = "none";
   	  pauseTmBtn.style.display = "block";
   	  cancelTmBtn.style.display = "block";
   	  timerboxes.style.display = "none";
   	  timepickerplaceholder.style.display = "none";

   	  if (booleverstart == 0) {
   	    booleverstart = 1;
   	    
   	    //Bar Initialization
   	    tmmnTemp = tmmn * 60;
   	    tmhrTemp = tmhr * 3600;
   	    
   	    tmscfix = Number(tmsc);
   	    tmmnfix = tmmnTemp > 0 ? Number(tmmnTemp) : 0;
   	    tmhrfix = tmhrTemp > 0 ? Number(tmhrTemp) : 0;

   	    totalsec = tmscfix += tmmnfix += tmhrfix;
   	    totalsecTemp = totalsec;
   	    
   	    document.documentElement.style.setProperty('--totalsec', totalsec);
   	    document.documentElement.style.setProperty('--totalsecTemp', totalsecTemp);
   	    
	 }
   	  
   }
   
   function cancelTm(){
   	  clearInterval(booltimer);
   	  booltimer = 0;
   	  booleverstart = 0;
   	  initTimeInput();
   	     
   	  pauseTmBtn.style.display = "none";
   	  cancelTmBtn.style.display = "none";
   	  startTmBtn.style.display = "block";
   	  timerboxes.style.display = "flex";
   	  timepickerplaceholder.style.display = "flex";
   	  
   	  document.querySelector(".progress-ring-timer").style = "stroke-dashoffset: 0";
   }
   
   
   function pauseTm(){
   	  if (booltimer != 0) {
   	  	 clearInterval(booltimer);
   	  	 booltimer = 0;
   	  	 pauseTmBtn.style.display = "none";
   	  	 cancelTmBtn.style.display = "block";
   		 startTmBtn.style.display = "block";
   	  }
   }
   
   function timer(){
   	  if (tmsc != -1){
   	 	tmsc --;
		totalsecTemp --;
   	 	document.documentElement.style.setProperty('--totalsecTemp', totalsecTemp);
   	  }
   	  
   	  if (tmsc == -1) {
   	  	if (tmmn > 0) {
   	  		tmmn --;
   			tmsc = 59;
   	  	} else if (tmmn == 0 && tmhr > 0) {
   	  		tmmn = 59;
   	  		tmsc = 59;
   	  		tmhr --;
   	  	}
   	  }
   	  
   	  let timerhour = tmhr < 10 ? "0" + tmhr : tmhr;
   	  let timerminute = tmmn < 10 ? "0" + tmmn : tmmn;
   	  let timerseconds = tmsc < 10 ? "0" + tmsc : tmsc;
   	  
   	  if (tmsc < 0) {
   	  	 timerseconds = "00";
   	  }
   	  
   	  if (tmmn == 0) {
   	  	 timerminute = "00";
   	  }
   	  
   	  if (tmhr == 0) {
   	  	 timerhour = "00";
   	  }
   	  
   	  tmdisplay.innerHTML = timerhour + ":" + timerminute + ":" + timerseconds;
   	  
   	  if (tmhr == 0 && tmmn == 0 && tmsc < 0) {
   	  	 cancelTm();
   	  	 alert("Time's Up")
   	  }
   	  
   }
   
//Swipe Detectiton. Thanks to Stackoverflow  
/*document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {//most significant
        if ( xDiff > 0 ) {
            //too left swipe 
            if (currentTab < 2) {
        	    currentTab ++;
            }
            ganti();
        } else {
            /) to rightswipee 
            if (currentTab > 0) {
            	currentTab --;
            }
            ganti();
        }                       
    } else {
        if ( yDiff > 0 ) {
            // down swipe 
        } else { 
            // up swipe 
        }                                                                 
    }
    // reset values 
    xDown = null;
    yDown = null;                                             
};*/