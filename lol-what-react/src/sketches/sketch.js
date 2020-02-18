import "p5/lib/addons/p5.sound";
import p5 from "p5";

let simpleFFT = function(p) {
  let mic, fft;
  let spectrum;

  let mode = 0;

  let mode1 = () => {
    for (let i = 0; i < spectrum.length; i += 50) {
      let x = p.map(i, spectrum.length, 0, 0, p.windowWidth);
      let diff = i % 4 === 0 ? spectrum[i] : -spectrum[i];
      p.circle(x, p.windowHeight / 2 + diff, spectrum[i]);
      p.line(x, p.windowHeight / 2, x, p.windowHeight / 2 + diff);
    }
  };

  let mode2 = () => {
    p.fill(255, 255, 255);
    for (let i = 0; i < spectrum.length; i += 50) {
      p.circle(
        p.windowWidth / 2 - spectrum[i],
        p.windowHeight / 2 + spectrum[i],
        spectrum[i]
      );
    }
  };

  let mode3 = () => {
    p.translate(p.windowWidth, -0.05 * p.windowHeight);
    p.rotate(p.PI / 2);

    p.strokeWeight(2);
    for (let i = 0; i < spectrum.length; i += 10) {
      let x = p.map(i, 0, spectrum.length, 0, p.windowWidth);
      for (let j = spectrum.length - 1; j >= 0; j -= 10) {
        let y = p.map(j, 0, spectrum.length, 0, p.windowWidth);

        p.line(x, y + spectrum[i], x, y - spectrum[i]);
      }
    }
  };

  let video;

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    // Start the audio context on a click/touch event
    p.userStartAudio().then(function() {
      console.log("Yes!");
    });

    // p.setFrameRate(24);

    // specify multiple formats for different browsers
    video = p.createVideo(["assets/video.mp4"], vidLoad);
    video.hide();
  };

  p.draw = function() {
    spectrum = fft.analyze();

    p.rect(0, 0, p.windowWidth, p.windowHeight);
    // p.fill("#000000");

    let midi = p.freqToMidi(spectrum[spectrum.length / 2]);
    console.log(midi);

    // if (midi > 40) {
    //   p.fill(p.random(255), p.random(255), p.random(255));
    // }
    // if (midi > 20) {
    //   mode2();
    // }
    // if (midi > 10) {
    //   mode1();
    // }

    // mode2();
    // mode1();

    p.noFill();
    p.clear();

    // p.image(video, 0, 0); // draw the video frame to canvas
    // p.filter(GRAY);
    //p.image(video, 150, 150); // draw a second copy to canvas

    mode3();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.onMousePressed = function() {
    video.loop();
  };

  function vidLoad() {
    // video.loop();
    // video.volume(0);
  }
};

let fourFighters = function(p) {
  let mic, fft;
  let pink = "#ff4081";
  let yellow = "#ffff00";
  let spectrum;

  let drawRect = (x, y, color) => {
    p.fill(color);
    p.rect(x, y, boxWidth, boxHeight);
  };

  let cosMemo = {};
  let cosOf = angle => {
    if (angle in cosMemo) return cosMemo[angle];
    else {
      cosMemo[angle] = p.cos(angle);
      return cosMemo[angle];
    }
  };

  let sinMemo = {};
  let sinOf = angle => {
    if (angle in sinMemo) return sinMemo[angle];
    else {
      sinMemo[angle] = p.sin(angle);
      return sinMemo[angle];
    }
  };

  let anotherCircle = {};
  let drawAnotherCircle = i => {
    let spectrumCount = spectrum.length - i;

    let rad = p.map(spectrum[i], 0, spectrum.length, 0, p.windowHeight * 2);
    let rad1 = p.map(
      spectrum[spectrum.length - 1 - i],
      0,
      spectrum.length,
      0,
      p.windowHeight * 2
    );

    let prevX = anotherCircle.midX + rad * cosOf(spectrumCount * angle);
    let prevY = anotherCircle.midY + rad * sinOf(spectrumCount * angle);

    let nowX = anotherCircle.midX + rad1 * cosOf(i * angle);
    let nowY = anotherCircle.midY + rad1 * sinOf(i * angle);

    p.fill(pink);
    p.circle(prevX, prevY, 10);
    p.fill(yellow);
    p.circle(nowX, nowY, 10);
  };

  let wildCircle = {};
  let drawWildCircle = i => {
    if (i % 2 === 0) p.fill(pink);
    else p.fill(yellow);

    let wildX = p.map(i, 0, spectrum.length, boxWidth / 4, boxWidth);
    p.circle(
      wildX,
      wildCircle.midY,
      p.map(spectrum[i], 0, spectrum.length, 0, p.windowHeight * 2)
    );
  };

  let boringCircle = {};
  let drawBoringCircle = i => {
    if (i % 2 === 0) p.fill(yellow);
    else p.fill(pink);

    p.circle(
      boringCircle.x + boxWidth / 2,
      boringCircle.y + boxHeight / 2,
      p.map(spectrum[i], 0, spectrum.length, 0, p.windowHeight * 2)
    );
  };

  let lineCircle = {};
  let drawLineCircle = i => {
    let rad = p.map(spectrum[i], 0, spectrum.length, 0, p.windowHeight * 2);
    p.line(
      lineCircle.midX,
      lineCircle.midY,
      lineCircle.midX + rad * p.cos(i * angle),
      lineCircle.midY + rad * p.sin(i * angle)
    );
  };

  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noFill();

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);

    p.angleMode(p.DEGREES);

    updateDimension();

    // Start the audio context on a click/touch event
    p.userStartAudio().then(function() {
      console.log("Yes!");
    });

    p.setFrameRate(24);
  };

  let boxWidth;
  let boxHeight;
  let updateDimension = () => {
    boxWidth = p.windowWidth / 2;
    boxHeight = p.windowHeight / 2;

    wildCircle.x = 0;
    wildCircle.y = boxHeight;
    wildCircle.midY = wildCircle.y + boxHeight / 2;

    anotherCircle.x = boxWidth;
    anotherCircle.y = 0;
    anotherCircle.midX = anotherCircle.x + boxWidth / 2;
    anotherCircle.midY = anotherCircle.y + boxHeight / 2;

    boringCircle.x = boxWidth;
    boringCircle.y = boxHeight;

    lineCircle.x = 0;
    lineCircle.y = 0;
    lineCircle.midX = boxWidth / 2;
    lineCircle.midY = boxHeight / 2;
  };

  let angle;
  p.draw = function() {
    spectrum = fft.analyze();
    angle = spectrum.length / 360;

    drawRect(wildCircle.x, wildCircle.y, yellow);
    drawRect(anotherCircle.x, anotherCircle.y, yellow);
    drawRect(boringCircle.x, boringCircle.y, pink);
    drawRect(lineCircle.x, lineCircle.y, pink);

    p.line(
      wildCircle.x,
      wildCircle.midY,
      wildCircle.x + boxWidth,
      wildCircle.midY
    );

    for (let i = 0; i < spectrum.length; i++) {
      drawWildCircle(i);
      drawAnotherCircle(i);
      drawBoringCircle(i);
      drawLineCircle(i);
    }

    p.noFill();
  };

  p.doubleClicked = function() {
    toggleFullScreen();
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    updateDimension();
  };

  let toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
};

export { fourFighters as default, simpleFFT };
