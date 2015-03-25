var empty_position="33";
var flag=0;
var start_time=0;

function key_up(e){
	if(flag==0){
		shuffle();
	}
	else{	
		var empty_row=parseInt(empty_position[0]);
		var empty_col=parseInt(empty_position[1]);
		
		if(e.keyCode==37){//left
			if(empty_col!=3){
				var temp=empty_col+1;
				$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
				setTimeout(function(){
	        		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   				}, 500);
				$('#'+empty_row+''+empty_col).html($('#'+empty_row+''+temp).html());
				$('#'+empty_row+''+temp).html(" ");
				empty_position=empty_row+''+temp;
			}
		}
		if(e.keyCode==38){//up
			if(empty_row!=3){
				var temp=empty_row+1;
				$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
				setTimeout(function(){
	        		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   				}, 500);
				$('#'+empty_row+''+empty_col).html($('#'+temp+''+empty_col).html());
				$('#'+temp+''+empty_col).html(" ");
				empty_position=temp+''+empty_col;
			}
		}
		if(e.keyCode==39){//right
			if(empty_col!=0){
				var temp=empty_col-1;
				$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
				setTimeout(function(){
	        		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   				}, 500);
				$('#'+empty_row+''+empty_col).html($('#'+empty_row+''+temp).html());
				$('#'+empty_row+''+temp).html(" ");
				empty_position=empty_row+''+temp;
			}
		}
		if(e.keyCode==40){//down
			if(empty_row!=0){
				var temp=empty_row-1;
				$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
				setTimeout(function(){
	        		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   				}, 500);
				$('#'+empty_row+''+empty_col).html($('#'+temp+''+empty_col).html());
				$('#'+temp+''+empty_col).html(" ");
				empty_position=temp+''+empty_col;
			}
		}
	}
}

function start_timer(){
	var today=new Date();
    var s=Math.floor(today.getTime()/1000);
   
   	var diff=(s-start_time);
	
   	var min=Math.floor(diff/60);
   	var hr=Math.floor(diff/3600);

	if(diff>=60){
		diff=-min*60+diff;
	}
	if(min>=60){
		min=-hr*60+min;
	}
   
   	diff=append_zero(diff);
   	min=append_zero(min);
   	hr=append_zero(hr);
   
    document.getElementById('time_elapsed').innerHTML = hr+':'+min+':'+diff;
    
}

function append_zero(time1){
	if(time1<10){
		time1="0"+time1;
	}
	return time1;
}

var t;

function shuffle(){
	t = setInterval(function(){start_timer();},1000);
	var today=new Date();
   	start_time=Math.floor(today.getTime()/1000);
	
	start_timer();
	flag=1;
	var arr=[];
	var all="";
	for(var i=0; i<16; i++)
    {
        do
            n = Math.floor(Math.random()*16);
        while(arr.indexOf(n) !== -1);

       arr[i] = n;
       var row=Math.floor(n/4);
       var col=n%4;
       var temp=row+''+col;
       if(i==15){
       	empty_position=temp;
       	$('#'+temp).html(" ");	
       }
       else{
       	$('#'+temp).html(i+1);
       }
    }
}
function move_block(ids){
	if(flag==1){
		var row,col,empty_row,empty_col;
		row=parseInt(ids[0]);
		col=parseInt(ids[1]);
		empty_row=parseInt(empty_position[0]);
		empty_col=parseInt(empty_position[1]);
		if(Math.abs(row-empty_row)>1 || Math.abs(col-empty_col)>1 ||(Math.abs(row-empty_row)==1 && Math.abs(col-empty_col)==1)){
			$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px red");
			setTimeout(function(){
        		$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   			}, 500);
		}
		else if(Math.abs(row-empty_row)==1 || Math.abs(col-empty_col)==1){
			$('#'+empty_row+''+empty_col).html($('#'+row+''+col).html());
			$('#'+row+''+col).html(" ");				
			empty_position=""+row+''+col;		
		}
		else{
			$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px red");
			setTimeout(function(){
        		$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   			}, 500);
		}
		var counter=1;
		var incomplete=0;
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(i==3 && j==3)
					break;
				if($('#'+i+''+j).html()!=counter++){
					incomplete=1;
					break;
				}
			}
		}
		if(incomplete==0){
			$('#alert').show();
		}
	}
	else{
		shuffle();
	}
}

function solve(){
	clearInterval(t);
	$('#time_elapsed').html("00:00:00");
	flag=0;
	var counter=1;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(i==3 && j==3){
				$('#'+i+''+j).html(" ");
			}
			else{
				$('#'+i+''+j).html(counter++);
			}
		}
	}
	empty_position="33";
}

function insane_level(){
	$('#alert').hide();
	var counter=1;
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			$('#'+i+''+j).html(counter++);
		}
	}
	$('#30').html("13");
	$('#31').html("15");
	$('#32').html("14");
	$('#33').html(" ");
	$('#31').css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
        	$('#31').css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   	}, 700);
   	$('#32').css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
        	$('#32').css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   	}, 700);
   	empty_position="33";
}
