function drawIt(){
    var x = 150, y = 150;
		var dx = 2, dy = 4;
		var WIDTH, HEIGHT;
		var r=5;
		var ctx,canvas;
 //PADDLE
    var paddlex, paddleh, paddlew;
    var rightDown = false, leftDown = false;
  //BRICKS
    var bricks;
		var NROWS, NCOLS;
		var BRICKWIDTH,BRICKHEIGHT;
    var PADDING;
  //MISKA
    var canvasMinX;
    var canvasMaxX;
  //TOCKE
    var f=1;		
    var tocke = 0;
  //TIMER
    var start=true;

    
    function onKeyDown(evt){
			if (evt.keyCode == 39){
				rightDown = true;
			}
			else if (evt.keyCode == 37){
				leftDown = true;
			}
		}

		function onKeyUp(evt){
			if (evt.keyCode == 39){
				rightDown = false;
			}
			else if (evt.keyCode == 37){
				leftDown = false;
			}
    }

    function init_mouse() {
      canvasMinX = $("canvas").offset().left;
      canvasMaxX = canvasMinX + WIDTH;
  }
    
  function onMouseMove(evt) {
      if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paddlex = evt.pageX - canvasMinX;
      }
  }
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp); 
  $(document).mousemove(onMouseMove);


//KREIRANJE OPEK
    function initbricks() { 
    //dimenzije
			NROWS = 5,NCOLS = 5;
			BRICKWIDTH = (WIDTH/NCOLS) - 1;
			BRICKHEIGHT = 15;
			PADDING = 1;
      bricks = new Array(NROWS);
    //polnjenje tabele "bricks"
			for (i=0; i < NROWS; i++) {
				bricks[i] = new Array(NCOLS);
				for (j=0; j < NCOLS; j++) {
					bricks[i][j]=1;
				}				
			}
    }	

//Dimenzije canvas
    function init() {
			canvas=document.getElementById('canvas');
			ctx = $('#canvas')[0].getContext("2d");
			WIDTH = $("#canvas").width();
      HEIGHT = $("#canvas").height();

      //TIMER
      sekunde = 0;
      izpisTimer = "00:00";
      intTimer = setInterval(timer, 1000);
      
      //funkcija draw se izvede vsakih 10nanosekund
			return setInterval(draw, 10);
    }

    function timer(){
      if(start==true){
        sekunde++;
        
        sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
        minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
        izpisTimer = minuteI + ":" + sekundeI;
        
        $("#cas").html(izpisTimer);
      }
      else{
        sekunde=0;
        $("#cas").html(izpisTimer);
      }
    }

    
    function draw() {
      //izris zoge
			ctx.clearRect(0,0,500,500);
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fill();
      ctx.fillStyle="#594f8d";
      //izris polja
			rect(paddlex, 500-paddleh, paddlew, paddleh);
			
//izris brickou z funkcijo 'rect'
      for (i=0; i < NROWS; i++){
				for (j=0; j < NCOLS; j++){
					if (bricks[i][j] == 1) {
						ctx.fillStyle="#594f8d";
						rect((j * (BRICKWIDTH + PADDING)) + PADDING,
						(i * (BRICKHEIGHT + PADDING)) + PADDING,
						BRICKWIDTH, BRICKHEIGHT);
					}
				}
			}
//PREMIKANJE ODBOOJNE DESKE
      if(rightDown){
				if((paddlex+paddlew) < WIDTH){
				  paddlex += 5;
				}
				else{
				  paddlex = WIDTH-paddlew;
				}
			}
			else if(leftDown){
				if(paddlex>0){
				  paddlex -=5;
        }
				else {
				}
			}
			
//Odboj samo od deske ne od podlage
if(document.getElementById("demo").innerHTML=="LET'S BEGIN")
    if (x + dx > 500-r || x + dx < 0+r)
      dx = -dx;
    if (y + dy < 0+r)
      dy = -dy;
    else if (y + dy > HEIGHT -(r+f)) { 
        if (x > paddlex && x < paddlex + paddlew) {
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
          start = true; //začetek timerja
        }
    else if (x > paddlex && x < paddlex + paddlew)
      dy = -dy;
    else{
      //ce zoga ne zadene deske se ustavi
        clearInterval(IntervalID);
      }
}
//PREMIKANJE ZOGE
  //ODBOJ ZOGE OD STEN   
      if (x + dx > 500 -r|| x + dx < 0 +r){
        dx = -dx;
      }
      if (y + dy > 500 -r|| y + dy < 0 +r){
      dy = -dy;
      }

  //ODBOJ OD BRICKOU     
    rowheight = BRICKHEIGHT + PADDING + f/2;
		colwidth = BRICKWIDTH + PADDING + f/2;
		row = Math.floor(y/rowheight);
    col = Math.floor(x/colwidth);
    
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] > 0)  {
      dy = -dy; bricks[row][col] = bricks[row][col]-1;
      
      if(bricks[row][col]==0){
        tocke += 1;
        $("#tocke").html(tocke);
      }
    }
      
//pojavno Okno ob zmagi
		if(tocke==25){
      //koncaj timer
      start = false;
      //ob kliku na gumb pojavnega okna se stran reloada
      swal({title: "YOU WON!", text: "Winner,winner, chicken dinner! ", type: 
      "sucess"}).then(function(){
        location.reload();
      });
        clearInterval(draw);
        tocke = 0;
			}
      x += dx;
      y += dy;
  }//ZAKLJUCEK "draw()"

//odbojna deska dimenzije
  function init_paddle(){
      paddlex = 500 / 2;
      paddleh = 10;
      paddlew = 100;
  }
    
//za izris brickou
  function rect(x,y,w,h){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }
    init();
    timer();
    init_paddle();
    init_mouse();
		initbricks();
}