var page = require('webpage').create();
var system = require('system');
var args = system.args;

var queue = [];
queue.push(function(){
	page.open('http://homerouter.cpe');
});

queue.push(function(){
			var username = page.evaluate(function(){
			var el = document.getElementById('txt_Username');
			el.value = 'admin';
			return el.value;
		});
		
		var password = page.evaluate(function(){
			var el = document.getElementById('txt_Password');
			el.value = 'myran_R0ckSt4r';
			return el.value;
		});
		
		page.evaluate(function(){

			var element=document.getElementById('login_btn');
			// create a mouse click event
    		var event = document.createEvent( 'MouseEvents' );
    		event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
    		// send click to element
    		element.dispatchEvent( event );
		});
});

queue.push(function(){
	console.log('Redirecting...');
});

queue.push(function(){
	page.open('http://homerouter.cpe/html/sms/message.asp?phnoe_number=');
});

queue.push(function(phone){
	var p = args[1];
	console.log(p);

	var t = args[2];
	console.log(t);

			var username = page.evaluate(function(phone){
			var el = document.getElementById('phnoe_number');
			el.value = phone;
			return el.value;
		}, p);
		
		var password = page.evaluate(function(text){
			var el = document.getElementById('sms_msg_content');
			el.value = text;
			return el.value;
		}, t);
		
		page.evaluate(function(){

			var element=document.getElementById('sendBtn');
			// create a mouse click event
    		var event = document.createEvent( 'MouseEvents' );
    		event.initMouseEvent( 'click', true, true, window, 1, 0, 0 );
 
    		// send click to element
    		console.log('skickar sms?');
    		element.dispatchEvent( event );
		});
});

page.onLoadStarted = function() {
  console.log('Sending request');
};

page.onLoadFinished = function() {
	console.log(JSON.stringify(phantom.cookies));
  //console.log('Finished request');
  console.log('---------------------');
  //console.log(page.content);
if(queue.length == 0){
	phantom.exit();
}
queue.shift()();
};

queue.shift()();
