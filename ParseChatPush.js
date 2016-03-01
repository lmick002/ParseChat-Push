﻿// Use Parse.Cloud.define to define as many cloud functions as you want.// For example:Parse.Cloud.define("hello", function(request, response) {  response.success("Hello world!");});Parse.Cloud.afterSave("Chat", function(request) {  	// "Chat" class has a "text" key with the body of the chat message  	var messageText = request.object.get('text');  	var groupId = request.object.get('groupId');  	var userId = request.object.get('user');  	  	console.log('groupID: ');  	console.log(groupId);  	  	console.log('userId: ');  	console.log(userId);  	  	var messagesQuery = new Parse.Query(Parse.Object.extend("Messages"));  	messagesQuery.equalTo('groupId', groupId);  	messagesQuery.notEqualTo('user', userId);  		// need to have users linked to installations  	var pushQuery = new Parse.Query(Parse.Installation);  	pushQuery.matchesKeyInQuery('user', 'user', messagesQuery);  Parse.Push.send({    where: pushQuery, // Set our Installation query    data: {      alert: "New message: " + messageText,      badge: "Increment",      sound : "default"    }  }, {    success: function() {      //response.success("Push success");    },    error: function(error) {        //response.error(error);      //throw "Got an error " + error.code + " : " + error.message;    }  });});