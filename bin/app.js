function generateNoise(ctx) {
  var w = ctx.canvas.width,
       h = ctx.canvas.height,
       idata = ctx.getImageData(0, 0, w, h),
       buffer32 = new Uint32Array(idata.data.buffer),
       len = buffer32.length,
       i = 0,
       pr = 456 * Math.random(),
       prs = 716 * Math.random(),
       offset = 0;

   for(; i < len;) {
       buffer32[i++] = (((pr % 255)|0) << 24) | 0x770000 + (Math.random() * 16777216)|0;
       pr += prs * 1.2;
   }
   // wave (utilizes GPU in modern browsers)
   for(i = 0; i < w; i += 2) {
       var y = i * Math.sin((i + (offset++)) /100);
       ctx.drawImage(ctx.canvas, i,0, 1, h,  i, y, 1, h);
   }
   ctx.putImageData(idata, 0, 0);
}
function getInit() {

    const chars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    // and then just do:
    const data = [...Array(5)].map(i=>chars[Math.random()*chars.length|0]).join``;
    var canvas = document.getElementById("myCanvas");
    var ctx=canvas.getContext("2d");
    ctx.clear;
    ctx.font="18px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    generateNoise(ctx);
    ctx.fillText(data, canvas.width/2, canvas.height/2);
    $('#provided-hidden').val(data);
}
$(document).ready(function() {
  getInit();
  //hang on event of form with id=myform
  $("button").click(function(e) {
    $('#message').empty();
    const guess = $('#guess').val();
    const provided = $('#provided-hidden').val();
    const msg = (guess == provided);
    if (msg) {
      $('#message').css("color", "green")
    } else {
      $('#message').css("color", "red")
    }
    $('#message').text("Match: " + msg)
    getInit();
  });
} );
