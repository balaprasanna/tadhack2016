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
            vm.skylink.joinRoom({
                audio: true,
                video: true
            });
            });
        }


vm.skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

vm.skylink.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});

vm.skylink.on('peerLeft', function(peerId) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});

vm.skylink.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

// skylink.init({
//   apiKey: 'cd7819c8-8513-4c3f-8ed1-bc1a35bc13ba',//'52a88d04-cc43-4e3d-b911-ead23a5fa0c8', // Get your own key at developer.temasys.com.sg
//   defaultRoom: 'GogabE'//getRoomId()
// }, function (error, success) {
//   if (error) {
//     document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
//   } else {
//        document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
//     document.getElementById('start').style.display = 'block';
//   }
// });

function start(event) {
  event.target.style.visibility = 'hidden';
  
  vm.skylink.joinRoom({
    audio: true,
    video: true
  }, function (error, success) {
    if (error) {
      document.getElementById('status').innerHTML = 'Failed joining room.<br>' +
  'Error: ' + (error.error.message || error.error);
    } else {
      document.getElementById('status').innerHTML = 'Joined room.';
    }
  });
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