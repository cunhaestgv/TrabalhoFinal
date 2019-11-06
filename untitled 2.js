document.write('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"><\/script>');
 
function processImage() {
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    call(sourceImageUrl,function(value){
        $("#responseTextArea").val(value);
    });
    };
     
//ex1   
function newGroup() {
    var groupName = document.getElementById("newGroup").value;
    createPersonGroup(groupName,function(value){
        $("#responseTextArea").val(value);
    });
};
 
//ex2   
function newPerson() {
    var personGroupId = document.getElementById("newGroup").value;
    var personName = document.getElementById("newPerson").value;
    createPerson(personGroupId, personName, function(value) {
        $("#responseTextArea").val(value);
    });
};
 
//ex3
function newfaceOnPerson() {
    var sourceImageUrl = document.getElementById("url").value;
    var groupName = document.getElementById("newGroup").value;
    var personId = document.getElementById("faceIDPerson").value;
    createImagePersonGroup(sourceImageUrl, groupName, personId, function(value) {
        $("#responseTextArea").val(value);
    });
};
 
//ex 4
function TrainPerson(){
    var groupName = document.getElementById("idGrupo").value;
    trainingGroup(groupName,function(value){
        $("#responseTextArea").val(value);
    });
}
 
//ex 5
function IdPerson(){
    var groupId = document.getElementById("GroupId").value;
    var faceId = document.getElementById("FaceId").value;
    identifyPerson(groupId, faceId, function(value) {
        $("#responseTextArea").val(value);
    });
};
 
function call(sourceImageUrl,callback){
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/detect";
 
    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion," +"hair,makeup,occlusion,accessories,blur,exposure,noise"
    };
    var maxColor = "Error";
    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),
 
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
 
        type: "POST",
        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
 
    .done(function(data) {
        callback(data[0]['faceId']); 
         
       document.getElementById("FaceId").value = data[0]['faceId'];   
 
 
    })
 
    .fail(function(jqXHR, textStatus, errorThrown) {
        callback(errorThrown); 
    });
}
 
function call(sourceImageUrl,callback){
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/detect";
 
    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion," +"hair,makeup,occlusion,accessories,blur,exposure,noise"
        };
    var maxColor = "Error";
    // Perform the REST API call.
    $.ajax({
         url: uriBase + "?" + $.param(params),
 
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
 
        type: "POST",
        // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })
 
        .done(function(data) {
            alert(JSON.stringify(data[0]['faceAttributes']['hair']['hairColor']));
            var color = data[0]['faceAttributes']['hair']['hairColor'];
            var res = 0;
            var res2 = "";
            for(key in color)
            {
               
                var cabelo = parseFloat(JSON.stringify(color[key]['confidence']));
                var cab = color[key]["color"];
                if(cabelo >= res)
                {
                    res = cabelo;
                    res2 = cab;
                }
            }
            alert(JSON.stringify(res));
            alert(JSON.stringify(res2));
            callback(JSON.stringify(res2));
             
        })
 
        .fail(function(jqXHR, textStatus, errorThrown) {
            callback(errorThrown);
        });
}
 
//ex 1
function createPersonGroup(groupName, callback) {
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/persongroups/" + groupName;
    
    var reqData = new Object ();
    reqData.name = groupName;
    reqData.userData = "FC... é o melhor!!";
      
    alert (groupName);
      
    $.ajax({
            url: uriBase,
 
            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
 
            type: "PUT",
            // Request body.
            data: JSON.stringify(reqData),
        })
         
        .done(function(data) {
         
            callback("OK");
             
        })
         
         .fail(function(jqXHR, textStatus, errorThrown) {
            callback(errorThrown);
        });
}
 //ex 2
function createPerson(personGroupId, personName, callback){
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/persongroups/" + personGroupId + "/persons";
    //alert(uriBase);
    var reqData = new Object ();
    reqData.name = personName;
    reqData.userData = "Pessoa";
      
      
    $.ajax({
        url: uriBase,
 
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
 
        type: "POST",
        // Request body.
            data: JSON.stringify(reqData),
        })
         
        .done(function(data) {
             
            alert(data.personId);
            //document.getElementById("faceIDPerson").value = data.personId;
            callback(data.personId);
             
        })
         
         .fail(function(jqXHR, textStatus, errorThrown) {
            callback(errorThrown);
        });
 
}
//ex 3
 
function createImagePersonGroup(sourceImageUrl, groupName, personId, callback)
{
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/persongroups/" + groupName + "/persons/" + personId + "/persistedFaces";
 
 
    var reqData = new Object();
    reqData.url = sourceImageUrl;
    reqData.userData = "url";
 
    $.ajax({
        url: uriBase,
 
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
 
        type: "POST",
        data: JSON.stringify(reqData),
    })
 
    .done(function(data) {
 
        callback(JSON.stringify(data.persistedFaceId));
    })
 
    .fail(function(jqXHR, textStatus, errorThrown) {
        callback(errorThrown);
    });
}
 
//ex 4
function trainingGroup(groupName, callback) {
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/persongroups/" + groupName + "/train";
     
 
    var reqData = new Object();
 
    $.ajax({
        url: uriBase,
 
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
 
        type: "POST",
        data: JSON.stringify(reqData),
    })
 
    .done(function(data) {
        callback("OK");
 
    })
 
    .fail(function(jqXHR, textStatus, errorThrown) {
        callback(JSON.stringify(jqXHR)); 
    });
}
 
//ex 5
function call(sourceImageUrl,callback){
    var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
    var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/detect";
 
    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion," +"hair,makeup,occlusion,accessories,blur,exposure,noise"
    };
    var maxColor = "Error";
    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),
 
        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
 
        type: "POST",
        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
 
    .done(function(data) {
        callback(data[0]['faceId']); 
         
       //document.getElementById("FaceId").value = data[0]['faceId'];   
 
 
    })
 
    .fail(function(jqXHR, textStatus, errorThrown) {
        callback(errorThrown); 
    });
}
 
function identifyPerson(groupId, faceId, callback) {
 
        var subscriptionKey = "2bd5533e307542b7840fb55f53bb2a03";
        var uriBase = "https://ai3.cognitiveservices.azure.com/face/v1.0/identify/";
        var Ids = [];
        var reqData = new Object()
        Ids.push(faceId);
        reqData.faceIds = Ids;
        reqData.personGroupId = groupId;
        reqData.maxNumOfCandidatesReturned = 1;
        var reqData = {
            faceIds: [faceId],
            personGroupId: groupId,
            maxNumOfCandidatesReturned: 1
        };
 
        $.ajax({
            url: uriBase,
     
            beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
     
            type: "POST",
            data: JSON.stringify(reqData),
        })
     
        .done(function(jqXHR, textStatus, errorThrown) {
            callback(JSON.stringify(jqXHR));
     
        })
     
        .fail(function(jqXHR, textStatus, errorThrown) {
            callback(JSON.stringify(jqXHR));
        });
    };