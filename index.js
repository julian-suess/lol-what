import "p5/lib/addons/p5.sound";
import p5 from "p5";
import io from "socket.io-client";

let sketch = function(p) {
  // Keep track of our socket connection
  var socket;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    // Start a socket connection to the server
    // Some day we would run this server somewhere else
    socket = io.connect("http://localhost:8080");
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on(
      "mouse",
      // When we receive data
      function(data) {
        console.log("Got: " + data.x + " " + data.y);
        // Draw a blue circle
        p.fill(0, 0, 255);
        p.noStroke();
        p.ellipse(data.x, data.y, 80, 80);
      }
    );
  };

  p.mouseDragged = function() {
    // Draw some white circles
    p.fill(255);
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
    // Send the mouse coordinates
    p.sendmouse(p.mouseX, p.mouseY);
  };

  // Function for sending to the socket
  p.sendmouse = function(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);

    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos
    };

    // Send that object to the socket
    socket.emit("mouse", data);
  };
};

// function toggleFullScreen() {
//   if (!document.fullscreenElement) {
//     document.documentElement.requestFullscreen();
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//   }
// }

// let sketch = function(p) {
//   let mic, fft;

//   // Setup
//   p.setup = function() {
//     p.createCanvas(p.windowWidth, p.windowHeight);
//     p.noFill();

//     mic = new p5.AudioIn();
//     mic.start();
//     fft = new p5.FFT();
//     fft.setInput(mic);
//   };

//   // Draw
//   p.draw = function() {
//     p.background("#ff4081");

//     let spectrum = fft.analyze();

//     p.beginShape();
//     for (let i = 0; i < spectrum.length; i++) {
//       let x = p.map(i, 0, spectrum.length, 0, p.windowWidth);
//       p.vertex(x, p.map(spectrum[i], 0, 255, p.windowHeight / 2, 0));
//     }
//     p.endShape();
//   };

//   p.doubleClicked = function() {
//     toggleFullScreen();
//   };

//   p.windowResized = function() {
//     p.resizeCanvas(p.windowWidth, p.windowHeight);
//   };
// };

let myp5 = new p5(sketch);
