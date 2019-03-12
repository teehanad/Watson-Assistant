 var request = require('request');
 
 //var test_arg = process.argv[2];
 
 
function init_promise(text_input) {
	var input_json_obj = {
		text : text_input
	};
	var options = {
        url: 'http://localhost:3000/assistant',
		method: 'POST',
        headers: {
            'User-Agent': 'request'
        },
		json : input_json_obj
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}
function main() {
	var test_arg = process.argv[2];
	if(test_arg != undefined) {
		var p = init_promise(test_arg);
		p.then(function(response) {
			console.log("got response",response);
		}).catch(function(err) {
			console.error("caught error", err);
		});
	}
	else console.log("No input text specified. Usage : ./send-text.js \"text to watson\"");
}


main();
