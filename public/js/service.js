(function () {
    angular.module("App")
        .service("dbService", dbService);

    function dbService($http, $q) {
        var vm = this;
        vm.skylink = new Skylink();
        
        vm.list = function () {
            var defer = $q.defer();
            var params = {
                
            };
            $http.get("/api/companies", {
                params: params
            }).then(function (result) {
                defer.resolve(result.data);
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };
        
        vm.getUserChat = function (compId,userId) {
            var defer = $q.defer();
            var param = {
                compId: compId,
                userId: userId
            };
            $http.get("/api/company/user/",{
                params: param
            }).then(function (result) {
                defer.resolve(result.data);
            }).catch(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        };

        vm.initSkylink =  function (roomName){
            vm.skylink.init({
            apiKey: '4ec21635-cbbc-4a78-84c8-837450b63f66',
            defaultRoom: roomName
            }, function() {
                console.log('joining in room' + roomName);
            vm.skylink.joinRoom({
                audio: true,
                video: true
            }, function (jRError, jRSuccess) {
              if(jRError){
                  return;
              }
              vm.skylink.getPeers(function (error, success) {
                if (error) return;
                console.log("The list of only un-privileged Peers in the same App space ->", success);
              });  
            
            });
                console.log('joined in room'+ roomName);
            });
        }


vm.skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  console.log("@PEER Joined" + peerId +  peerInfo);
    var user = 'You';
    if(!isSelf) {
    user = peerInfo.userData.name || peerId;
    }
    addMessage(user + ' joined the room', 'action');
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.getElementById('vid-box').appendChild(vid)
});

vm.skylink.on('incomingStream', function(peerId, stream, isSelf) {
  console.log("@incomingStream" + peerId);    
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});

vm.skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var vid = document.getElementById(peerId);
  document.getElementById('vid-box').removeChild(vid);

  var user = 'You';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' left the room', 'action');
});

vm.skylink.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

vm.skylink.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
var user = 'You',
className = 'you';
if(!isSelf) {
user = peerInfo.userData.name || peerId;
className = 'message';
}
addMessage(user + ': ' + message.content, className);
});

vm.sendmessage = function sendMessage() {
var input = document.getElementById('message');
vm.skylink.sendP2PMessage(input.value);
input.value = '';
}

function addMessage(message, className) {
var chatbox = document.getElementById('chatbox'),
div = document.createElement('div');
div.className = className;
div.textContent = message;
chatbox.appendChild(div);
}

vm.setname = function setName() {
var input = document.getElementById('name');
vm.skylink.setUserData({
name: input.value
});
}

function joinRoom() {
vm.skylink.joinRoom();
}

function leaveRoom() {
vm.skylink.leaveRoom();
}


/* Helper functions */
function getRoomId() {
  var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
  if(roomId) {
    return roomId[1];
  }
  else {
    roomId = vm.skylink.generateUUID();
    var date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    document.cookie = 'roomId=' + roomId + '; expires=' + date.toGMTString() + '; path=/';
    return roomId;
  }
};
}
})();