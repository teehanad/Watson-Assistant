#!/usr/bin/env node
var watson = require('watson-developer-cloud');
var ibm_creds = require('./ibm-creds.js');


var service = new watson.AssistantV2({
  iam_apikey: ibm_creds.apikey,
  version: '2018-11-08',
  url: ibm_creds.assistant_url
});

function init_promise_create_session() {
	return new Promise(function(resolve, reject) {
		service.createSession({
			assistant_id : ibm_creds.assistant_id,
		}, function(err, response) {
			if(err){
				reject(err);
			}
			else {
				resolve(response);
			}
		});
	});
}

function init_promise_message(msg, s_id) {
	console.log("sid : ", s_id, msg);
	return new Promise(function(resolve, reject) {
		service.message({
			assistant_id : ibm_creds.assistant_id,
			session_id : s_id,
			input : {
				'message_type' : 'text',
				'text' : msg
			}
		}, function(err, response) {
			if(err) throw err;
			resolve(response);
		});
	});
}

function delete_session(s_id) {
	service.deleteSession({
		assistant_id: ibm_creds.assistant_id,
		session_id: s_id,
	}, function(err, response) {
		if (err) {
			console.error(err);
		} else{
			console.log(JSON.stringify(response, null, 2));
		}
	});
}

function main() { 
	var get_session = init_promise_create_session();
	get_session.then(function(response) {
		var get_response = init_promise_message("There is a flood in monkstown", response.session_id);
		get_response.then(function(response_msg) {
			console.log(JSON.stringify(response_msg, null, 2));
			
		}).catch(function(err) {
			console.error("caught error", err);
		});
	}).catch(function(err) {
		console.error("caught error", err);
	});
}


main();