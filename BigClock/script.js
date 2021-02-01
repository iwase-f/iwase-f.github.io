// ページ読み込み時に init関数を実行
window.onload = function() {
init();
};

// clock関数を0.１秒周期で繰り返す
function init(){
    clock();
    setInterval('clock();',100);
}
 
// clock関数 start
function clock(){
    var now = new Date();
    var canvas = document.getElementById("clockid");
    var ctx = canvas.getContext('2d');
    ctx.save();

    var wi = document.documentElement.clientWidth;
    var he = document.documentElement.clientHeight;
    clock_size = Math.min(wi,he);
// 各種設定　キャンバスサイズをウィンドウサイズにしたい。
    // canvas.width = 600;
    // canvas.width = wi;

    canvas.width = clock_size;
    canvas.height = clock_size;
    // canvas.height = 600;
    // var w      = canvas.width;
    // var h      = canvas.height;
    var w      = clock_size;
    var h      = clock_size;
    var center = {x : w / 2, y : h / 2};
// 中心から数字までの距離(canvas の少し内側)
    var rads     = w / 2 * 0.9; 

    ctx.clearRect(0, 0, w, h);

// 時計の外側の丸
    ctx.save();
    ctx.strokeStyle = "rgb(207, 170, 77)";
    ctx.lineWidth   = 3;
    // ctx.shadowBlur = 10;
    // ctx.shadowColor = "#000";
    ctx.translate(center.x,center.y);
/* グラデーション領域をセット */
  // translateで座標を移動しているためグラデーションの始終を調整
    var grad  = ctx.createLinearGradient(0,-h/2,0,h/2);   
  /* グラデーション終点のオフセットと色をセット */
    // grad.addColorStop(0,'rgb(186, 168, 132)');
    // grad.addColorStop(0.5,'rgb(251, 240, 199)');
    // grad.addColorStop(0.9,'rgb(207, 170, 77)');
    // grad.addColorStop(1,'rgb(241, 238, 105)');
  /* グラデーションをfillStyleプロパティにセット */
    ctx.fillStyle = grad;
    ctx.beginPath();
    // ctx.arc(0, 0, (w/2)-5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();

    /* circle white */
    // ctx.beginPath();
    // ctx.arc(0, 0, 100, 0, Math.PI * 2, false);
    // ctx.fillStyle   ="#FFF";
    // ctx.fill();
    ctx.restore();

// 文字盤
    var fsize = clock_size * 0.08;
    ctx.save();
    // ctx.font        = "50px 'Arial'";
    ctx.font        = fsize + "px 'Arial'";
    ctx.textAlign   ="center";
    ctx.textBaseline    ="middle";
    ctx.fillStyle   = "rgb(0, 0, 0)";
    // ctx.shadowBlur = 5;
    // ctx.shadowColor = "#FFF";
    for (var i = 0; i < 12; i++) {
        var radian = i * Math.PI / 6;
        var x = center.x + rads * Math.sin(radian);
        var y = center.y - rads * Math.cos(radian);
        var text = "" + (i == 0 ? "12" : i);
        ctx.fillText(text, x, y);
    }
    ctx.restore();
 
//  中心を移動
    ctx.translate(center.x,center.y);

// 分
    ctx.save();
    ctx.strokeStyle ="#CCC";
    ctx.lineWidth = clock_size * 0.003;
    ctx.beginPath();
        for (var i=0;i<60;i++){
            if (i%5!=0) {
            // ctx.moveTo(100,0);
            // ctx.lineTo(95,0);
            ctx.moveTo(0.8*w/2,0);
            ctx.lineTo(0.8*0.95*w/2,0);
            }
        ctx.rotate(Math.PI/30);
        }
    ctx.stroke();

// 時間
    ctx.strokeStyle ="#999";
    ctx.lineWidth = clock_size * 0.005;
    ctx.beginPath();
        for (var i=0;i<60;i++){
        ctx.moveTo(0.8*w/2,0,0);
        ctx.lineTo(0.8*0.9*w/2,0);
        ctx.rotate(Math.PI/6);
        }
    ctx.stroke();
    ctx.restore();
 
// 針の設定
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr= now.getHours();
    hr = hr>=12 ? hr-12 : hr; // 12以上なら「hr-12」、それ以外なら「hr」
    ctx.fillStyle = "#999";
 
// 短針
    ctx.save();
    ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
    ctx.lineWidth = clock_size * 0.013;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#666";
    ctx.beginPath();
    ctx.moveTo(-2*w/300,25*w/300);
    ctx.lineTo(0,-70*w/300);
    ctx.lineTo(2*w/300,25*w/300);
    ctx.stroke();
    ctx.restore();

// 長針
    ctx.save();
    ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
    ctx.lineWidth = clock_size * 0.01;
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#999";
    ctx.beginPath();
    ctx.moveTo(-1.5*w/300,25*w/300);
    ctx.lineTo(0,-105*w/300);
    ctx.lineTo(1.5*w/300,25*w/300);
    ctx.stroke();
    ctx.restore();

// 秒針
    ctx.save();
    ctx.rotate(sec * Math.PI/30);
    // ctx.strokeStyle = "rgb(207, 170, 77)";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0,30*w/300);
    ctx.lineTo(0,-110*w/300);
    ctx.stroke();
    ctx.restore();

// 時計の中心の丸
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3;
    // ctx.strokeStyle = "rgb(207, 170, 77)";
    // ctx.fillStyle   = "rgb(186, 168, 132)";
    // ctx.strokeStyle = "red";
    ctx.fillStyle   = "red";
    ctx.arc(0,0,4*w/300,0,Math.PI*2,true);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    
    ctx.restore();

}   // clock end