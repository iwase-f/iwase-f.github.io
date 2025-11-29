// GraphToolsV1.js
// 
//  SetCanvas(canvasname, backcolor); 　　　　　　　　　　CANVASの定義  
//  DrawLine(x0,y0, x1,y1, linecolor,linewidth);　　　　　　　  直線を描く
//  DrawPoint(x,y, pointcolor, pointsize);　　　　　　　　　　点を描く
//  DrawCircle(x,y, radius, linecolor, linewidth, fillcolor)                         円を描く
//  DrawText(text, x,y, align, color, font);　　　　　　　　　  テキスト（文字列）

//************************************************************************
//************************************************************************
//グローバル変数
  var CanvasWidth, CanvasHeight;
  var VXmin, VXmax, VYmin, VYmax;
  var Context;
  var GVX=new Array(); GVY=new Array();
//************************************************************************
//************************************************************************
function SetCanvas(canvasname, backcolor) {		//CANVASの定義
    canvas = document.getElementById(canvasname);	    //描画コンテキストの取得
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }
    Context = canvas.getContext('2d');      		// 2Dコンテキスト 
    Context.fillStyle = backcolor;          			//CANVASを黒く塗りつぶす
    Context.beginPath();
    Context.fillRect(0,0,CanvasWidth,CanvasHeight);
    Context.stroke();
}
//************************************************************************
function DrawLine(x0,y0, x1,y1, linecolor,linewidth) {	  //直線を引く
    var cx0, cy0, cx1, cy1;
    cx0 = (x0-VXmin)/(VXmax-VXmin)*CanvasWidth;
    cy0 = (VYmax-y0)/(VYmax-VYmin)*CanvasHeight;
    cx1 = (x1-VXmin)/(VXmax-VXmin)*CanvasWidth;
    cy1 = (VYmax-y1)/(VYmax-VYmin)*CanvasHeight;
    Context.strokeStyle = linecolor;    					//線の色(CSSの指定と同じ
    Context.lineWidth = linewidth;      					// 線の太さ 1, 2などを指定
    Context.beginPath();
    Context.moveTo(cx0,cy0);
    Context.lineTo(cx1,cy1);
    Context.stroke();
    Context.closePath();
}
//************************************************************************
function DrawPoint(x,y, pointcolor, pointsize) {		//点を描く
    var cx, cy, d;
    cx = (x-VXmin)/(VXmax-VXmin)*CanvasWidth;
    cy = (VYmax-y)/(VYmax-VYmin)*CanvasHeight;
    d = Math.floor((pointsize + 1)/2);
    Context.fillStyle = pointcolor;
    Context.fillRect(cx-d, cy-d, pointsize, pointsize);
}
//************************************************************************
//円を描く
function DrawCircle(x,y, radius, linecolor, linewidth, fillcolor) {
    var cx, cy;
    cx = (x-VXmin)/(VXmax-VXmin)*CanvasWidth;
    cy = (VYmax-y)/(VYmax-VYmin)*CanvasHeight;
    cr = radius*CanvasWidth/(VXmax-VXmin);
    Context.strokeStyle = linecolor; //枠線の色は白
    Context.lineWidth = linewidth;   // 線の太さ
    if (fillcolor!="none") Context.fillStyle = fillcolor; //塗りつぶし無しは、"none"）
    Context.beginPath();
    Context.arc(cx, cy, cr, 0, 2*Math.PI, false);
    if (fillcolor != "none") Context.fill();
    Context.stroke();
}
//************************************************************************




