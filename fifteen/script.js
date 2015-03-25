var empty_position="33";
var flag=0;
var start_time=0;
var moves=0;

(function () {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipeup and swipedown
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };

//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();


$( document ).on( "swipeleft swiperight swipedown swipeup", function( event ){
	if(flag==0){
		shuffle();
	}
	else{
		if(event.type=="swipeleft"){
			move_left();
		}
		if(event.type=="swiperight"){
			move_right();
		}
		if(event.type=="swipeup"){
			move_up();
		}
		if(event.type=="swipedown"){
			move_down();
		}   
	}
});


function key_up(e){
	if(flag==0){
		shuffle();
	}
	else{
		if(e.keyCode==37){//left
			e.preventDefault();
			move_left();
		}
		if(e.keyCode==38){//up
			e.preventDefault();
			move_up();
		}
		if(e.keyCode==39){//right	
			e.preventDefault();
			move_right();
		}
		if(e.keyCode==40){//down
			e.preventDefault();
			move_down();
		}
	}
}

function move_left(){
	var empty_row=parseInt(empty_position[0]);
	var empty_col=parseInt(empty_position[1]);
	if(empty_col!=3){
		var temp=empty_col+1;
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
		$('#'+empty_row+''+empty_col).html($('#'+empty_row+''+temp).html());
		$('#'+empty_row+''+temp).html(" ");
		empty_position=empty_row+''+temp;
		moves++;
		$('#moves').html("Moves: "+moves);
		check();
	}
	else{
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
	}
}

function move_right(){
	var empty_row=parseInt(empty_position[0]);
	var empty_col=parseInt(empty_position[1]);
	if(empty_col!=0){
		var temp=empty_col-1;
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
		$('#'+empty_row+''+empty_col).html($('#'+empty_row+''+temp).html());
		$('#'+empty_row+''+temp).html(" ");
		empty_position=empty_row+''+temp;
		moves++;
		$('#moves').html("Moves: "+moves);
		check();
	}
	else{
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
	}
}

function move_up(){
	var empty_row=parseInt(empty_position[0]);
	var empty_col=parseInt(empty_position[1]);
	
	if(empty_row!=3){
		var temp=empty_row+1;
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
		$('#'+empty_row+''+empty_col).html($('#'+temp+''+empty_col).html());
		$('#'+temp+''+empty_col).html(" ");
		empty_position=temp+''+empty_col;
		moves++;
		$('#moves').html("Moves: "+moves);
		check();
	}
	else{
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
	}
}

function move_down(){
	var empty_row=parseInt(empty_position[0]);
	var empty_col=parseInt(empty_position[1]);
	if(empty_row!=0){
		var temp=empty_row-1;
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
		$('#'+empty_row+''+empty_col).html($('#'+temp+''+empty_col).html());
		$('#'+temp+''+empty_col).html(" ");
		empty_position=temp+''+empty_col;
		moves++;
		$('#moves').html("Moves: "+moves);
		check();
	}
	else{
		$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px red");
		setTimeout(function(){
			$('#'+empty_row+''+empty_col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
		}, 500);
	}
}

var t;

function start_timer(){
	if(flag==0){
		clearInterval(t);
	}
	else{
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
}

function append_zero(time1){
	if(time1<10){
		time1="0"+time1;
	}
	return time1;
}

function shuffle(){
	moves=0;
	
	var today=new Date();
   	start_time=Math.floor(today.getTime()/1000);
	t = setInterval(function(){start_timer();},1000);
	$('#moves').html("Moves: 0");
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
			moves++;
			$('#moves').html("Moves: "+moves);
			check();	
		}
		else{
			$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px red");
			setTimeout(function(){
        		$('#'+row+''+col).css("box-shadow","0px 0px 5px 1px rgb(105,145,241)");
   			}, 500);
		}
		
	}
	else{
		shuffle();
	}
}

function check(){
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
			clearInterval(t);
			moves=0;
			
			$('#alert').show();
			flag=0;
		}
}

function solve(){
	clearInterval(t);
	$('#time_elapsed').html("00:00:00");
	$('#moves').html("Moves: 0");
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
	
	$('#time_elapsed').html("00:00:00");
	$('#moves').html("Moves: 0");
	flag=1;
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
