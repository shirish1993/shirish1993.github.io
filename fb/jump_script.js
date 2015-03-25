var original_y_pos,y_pos;
var interval,hurdle_interval;
var img;
var jet,bg_down;
var hurdle,hurdle1,animate_hurdle;
var failed=0;
var score=0;

function init(){
	if(failed==0){
		failed=1;
	original_y_pos=y_pos=240;
	score=0;
	$('#score').html(0);
	c=document.getElementById("myCanvas");
	ctx=c.getContext("2d");
	
	jet = document.getElementById("jet");
	img = document.getElementById("bg");
	bg_down = document.getElementById("bg_down");
	hurdle=document.getElementById("hurdle");
	hurdle1=document.getElementById("hurdle1");
	
	ctx.drawImage(bg_down,0,497);
	
	ctx.drawImage(img,0,0);
	ctx.drawImage(jet,60,y_pos);
	
	projectile_down();
	create_hurdle();
	$(document).keydown(function(e){
			
    	if (e.keyCode == 38) {
    		clearInterval(interval);
    		if(y_pos<=0){
    			
    			clearInterval(animate_hurdle);
    			
    			clearInterval(interval);
    		}
    		
    		original_y_pos=y_pos;	
    		
    		projectile_up();
    		
       		return false;
    	}
	});
	}
}
var new1=1;
var rand,hurdle_x_pos;
function create_hurdle(){
	
	rand=(Math.floor(Math.random()*20)+10)*10;
	
	hurdle_x_pos=600;
	
	ctx.drawImage(hurdle,hurdle_x_pos,rand-400);
	ctx.drawImage(hurdle1,hurdle_x_pos,rand+150);
	var flag=0;
	animate_hurdle=setInterval(function(){
		
		if(-20<hurdle_x_pos && hurdle_x_pos<140){
			if(rand>y_pos || y_pos>rand+150){
				clearInterval(animate_hurdle);
    			clearInterval(interval);
    			failed=0;
			}		
			else{
				if(flag==0){
					score++;
					flag=1;
				}	
				
				$("#score").html(score);
			}
		}
		
		ctx.drawImage(img,0,0);
		ctx.drawImage(jet,60,y_pos);
		
		hurdle_x_pos-=10;
		
		ctx.drawImage(hurdle1,hurdle_x_pos,rand-400);
		ctx.drawImage(hurdle,hurdle_x_pos,rand+150);
	
		ctx.drawImage(bg_down,0,497);
		if(hurdle_x_pos<=-80){
			clearInterval(animate_hurdle);
			create_hurdle();
		}
		
	},100);
	
		
}

function projectile_up(){
	
	interval=setInterval(function(){
		if(y_pos<=0){
			clearInterval(animate_hurdle);
			clearInterval(interval);
			failed=0;
		}
		else if(original_y_pos-y_pos<=75){
			
			ctx.drawImage(img,0,0);
			
			y_pos=y_pos-10;
			ctx.drawImage(jet,60,y_pos);
			
			ctx.drawImage(hurdle1,hurdle_x_pos,rand-400);
			ctx.drawImage(hurdle,hurdle_x_pos,rand+150);
		ctx.drawImage(bg_down,0,497);
		}	
		else{
			clearInterval(interval);
			projectile_down();
		}
	},50);
	
}

function projectile_down(){
	interval=setInterval(function(){
		if(y_pos<=440){
			ctx.drawImage(img,0,0);
			
			y_pos=y_pos+15;
			
			ctx.drawImage(jet,60,y_pos);
			
			ctx.drawImage(hurdle1,hurdle_x_pos,rand-400);
			ctx.drawImage(hurdle,hurdle_x_pos,rand+150);	
			ctx.drawImage(bg_down,0,497);
		}	
		else{
			clearInterval(animate_hurdle);
    		clearInterval(interval);
    		failed=0;
		}
	},50);
}
