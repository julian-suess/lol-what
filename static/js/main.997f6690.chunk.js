(this["webpackJsonplol-what-react"]=this["webpackJsonplol-what-react"]||[]).push([[0],{10:function(n,e,i){},11:function(n,e,i){},14:function(n,e,i){"use strict";i.r(e);var t=i(0),l=i.n(t),o=i(3),c=i.n(o),f=(i(10),i(11),i(4)),d=i.n(f),a=(i(13),i(1)),r=i.n(a),u=function(n){var e,i,t,l,o,c="#ff4081",f=function(e,i,t){n.fill(t),n.rect(e,i,l,o)},d={},a=function(e){return e in d?d[e]:(d[e]=n.cos(e),d[e])},u={},m=function(e){return e in u?u[e]:(u[e]=n.sin(e),u[e])},s={},w=function(e){var i=t.length-e,l=n.map(t[e],0,t.length,0,2*n.windowHeight),o=n.map(t[t.length-1-e],0,t.length,0,2*n.windowHeight),f=s.midX+l*a(i*Y),d=s.midY+l*m(i*Y),r=s.midX+o*a(e*Y),u=s.midY+o*m(e*Y);n.fill(c),n.circle(f,d,10),n.fill("#ffff00"),n.circle(r,u,10)},h={},g=function(e){e%2===0?n.fill(c):n.fill("#ffff00");var i=n.map(e,0,t.length,l/4,l);n.circle(i,h.midY,n.map(t[e],0,t.length,0,2*n.windowHeight))},p={},x=function(e){e%2===0?n.fill("#ffff00"):n.fill(c),n.circle(p.x+l/2,p.y+o/2,n.map(t[e],0,t.length,0,2*n.windowHeight))},y={},v=function(e){var i=n.map(t[e],0,t.length,0,2*n.windowHeight);n.line(y.midX,y.midY,y.midX+i*n.cos(e*Y),y.midY+i*n.sin(e*Y))};n.setup=function(){n.createCanvas(n.windowWidth,n.windowHeight),n.noFill(),(e=new r.a.AudioIn).start(),(i=new r.a.FFT).setInput(e),n.angleMode(n.DEGREES),E(),n.userStartAudio().then((function(){console.log("Yes!")})),n.setFrameRate(24)};var Y,E=function(){l=n.windowWidth/2,o=n.windowHeight/2,h.x=0,h.y=o,h.midY=h.y+o/2,s.x=l,s.y=0,s.midX=s.x+l/2,s.midY=s.y+o/2,p.x=l,p.y=o,y.x=0,y.y=0,y.midX=l/2,y.midY=o/2};n.draw=function(){t=i.analyze(),Y=t.length/360,f(h.x,h.y,"#ffff00"),f(s.x,s.y,"#ffff00"),f(p.x,p.y,c),f(y.x,y.y,c),n.line(h.x,h.midY,h.x+l,h.midY);for(var e=0;e<t.length;e++)g(e),w(e),x(e),v(e);n.noFill()},n.doubleClicked=function(){F()},n.windowResized=function(){n.resizeCanvas(n.windowWidth,n.windowHeight),E()};var F=function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}};var m=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(d.a,{sketch:u}))};c.a.render(l.a.createElement(m,null),document.getElementById("root"))},5:function(n,e,i){n.exports=i(14)}},[[5,1,2]]]);
//# sourceMappingURL=main.997f6690.chunk.js.map