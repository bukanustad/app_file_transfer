// app.js

let myDeviceID = "device-" + Math.floor(Math.random() * 10000); // Unique device ID

// Refer to Firebase Realtime Database
const devicesRef = database.ref("devices");

// Add device to Firebase (every device needs to register)
function addDevice() {
  const deviceRef = devicesRef.child(myDeviceID);
  deviceRef.set({
    id: myDeviceID,
    available: true,  // Mark as available for transfer
  });
}

// Listen for new devices in range
function listenForDevices() {
  devicesRef.on("child_added", (snapshot) => {
    const device = snapshot.val();
    if (device.id !== myDeviceID && device.available) {
      const deviceList = document.getElementById("deviceList");
      const deviceItem = document.createElement("div");
      deviceItem.classList.add("device-item");
      deviceItem.innerHTML = `
        <span>${device.id}</span>
        <button onclick="connectToDevice('${device.id}')">Send File</button>
      `;
      deviceList.appendChild(deviceItem);
    }
  });
}

// Send file to a selected device
function connectToDevice(deviceID) {
  console.log("Connecting to device: ", deviceID);

  // Create a new WebRTC peer connection
  const peerConnection = new RTCPeerConnection();

  // Create DataChannel for sending files
  const dataChannel = peerConnection.createDataChannel("fileTransfer");

  // Handle file sending once DataChannel is open
  dataChannel.onopen = () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileBuffer = event.target.result;
      dataChannel.send(fileBuffer); // Send file over WebRTC DataChannel
    };
    fileReader.readAsArrayBuffer(file);
  };

  // WebRTC signaling (implement later with Firebase or WebSocket)
  // This includes ICE candidates and SDP offer/answer
}

// Start the app
addDevice();
listenForDevices();
