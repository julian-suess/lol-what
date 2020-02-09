import "p5/lib/addons/p5.sound";
import p5 from "p5";

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

let sketch = function(p) {
  let mic, fft;
  let pink = "#ff4081";
  let yellow = "#ffff00";
  let spectrum;

  let drawRect = (x, y, width, height, color) => {
    p.fill(color);
    p.rect(x, y, width, height);
  };

  let drawWildCircle = (x, y, width, height, color = yellow) => {
    drawRect(x, y, width, height, color);

    let startY = y + height / 2;
    p.line(x, startY, x + width, startY);

    for (let i = 0; i < spectrum.length; i++) {
      if (i % 2 == 0) p.fill(yellow);
      else p.fill(pink);

      let x = p.map(i, 0, spectrum.length, width / 4, width);
      p.circle(x, startY, p.map(spectrum[i], 0, 255, 0, height));
    }
  };

  let drawCircle = (x, y, width, height, color = pink) => {
    drawRect(x, y, width, height, color);

    for (let i = 0; i < spectrum.length; i++) {
      if (i % 2 == 0) p.fill(pink);
      else p.fill(yellow);

      p.circle(
        x + width / 2,
        y + height / 2,
        p.map(spectrum[i], 0, 255, 0, height)
      );
    }

    // p.fill(yellow);
    // p.rect(0, height, width, height);

    // p.beginShape();
    // for (let i = 0; i < 128; i++) {
    //   let x = p.map(i, 1, 128, 0, width);
    //   p.vertex(x, p.map(spectrum[i], 1, 128, height - height / 3, 0));
    // }
    // p.endShape();
  };

  let c;
  let lineLength = 0;
  let angle = 0;
  let angleSpeed = 1;

  let drawRotatedLine = (x, y, width, height, color = yellow) => {
    // drawRect(x, y, width, height, color);

    if (p.mouseIsPressed && p.mouseButton == p.LEFT) {
      p.push();
      p.translate(p.mouseX, p.mouseY);
      p.rotate(p.radians(angle));
      p.stroke(c);
      p.line(0, 0, lineLength, 0);
      p.pop();

      angle += angleSpeed;
    }
  };

  let drawFFT = (x, y, width, height, color = pink) => {
    drawRect(x, y, width, height, color);

    let angle = spectrum.length / 360;
    p.beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      p.angleMode(p.DEGREES);
      p.line(
        x + width / 2,
        y + height / 2,
        spectrum[i] * p.cos(i * angle),
        spectrum[i] * p.sin(i * angle)
      );
    }
    p.endShape();
  };

  p.mousePressed = function() {
    // create a new random line length each new press
    lineLength = p.random(70, 200);
  };

  p.keyPressed = function() {
    if (p.keyCode == p.UP_ARROW) lineLength += 5;
    if (p.keyCode == p.DOWN_ARROW) lineLength -= 5;
    if (p.keyCode == p.LEFT_ARROW) angleSpeed -= 0.5;
    if (p.keyCode == p.RIGHT_ARROW) angleSpeed += 0.5;
  };

  p.keyReleased = function() {
    // reverse direction and mirror angle
    if (p.key == "d" || p.key == "D") {
      angle += 180;
      angleSpeed *= -1;
    }
  };

  // Setup
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    c = p.color(181, 157, 0);
    let width = p.windowWidth;
    let height = p.windowHeight;
    drawRect(width / 2, 0, width / 2, height / 2, yellow);
  };

  // Draw
  p.draw = function() {
    let width = p.windowWidth;
    let height = p.windowHeight;

    spectrum = fft.analyze();

    drawFFT(0, 0, width / 2, height / 2);
    drawRotatedLine(width / 2, 0, width / 2, height / 2);
    drawWildCircle(0, height / 2, width / 2, height / 2);
    drawCircle(width / 2, height / 2, width / 2, height / 2);

    p.noFill();
  };

  p.doubleClicked = function() {
    toggleFullScreen();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

let myp5 = new p5(sketch);
