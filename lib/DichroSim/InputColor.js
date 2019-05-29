/**
 * Input colors controler.
 *
 * @package   DichroSim
 * @author    Kahiro Matsudaira <0204.kahiro@gmail.com>
 * @copyright 2018 Kahiro Matsudaira
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 */

//This code must use math.js.


//////////////////////////////////////////////
//ColorDataオブジェクト関連
//////////////////////////////////////////////

//ColorDataオブジェクトの定義
function ColorData(){
	this.x = 0;
	this.y = 0;
	this.Y = 0;
	return	this;
}

//ColorDataオブジェクトにデータを入力するメソッド
//In:Number,Number,Number
//Return:ColorData(Object)
function setColorData(x,y,Y){
	var obj = new ColorData();
	obj.x = Number(x);
	obj.y = Number(y);
	obj.Y = Number(Y);
	return	obj;
}

//RGBDataオブジェクトの定義
function RGBData(){
	this.R = 0;
	this.G = 0;
	this.B = 0;
	return	this;
}

//RGBDataオブジェクトにデータを入力するメソッド
//In:Number,Number,Number
//Return:RGBData(Object)
function setRGBData(R,G,B){
	var obj = new RGBData();
	obj.R = Number(R);
	obj.G = Number(G);
	obj.B = Number(B);
	return	obj;
}


//ColorDataオブジェクト同士の加算をするメソッド(加法混色)
//In:ColorData(Object)
//Return:ColorData(Object)
function addColor(inColor1, inColor2){
	var tmpColor = new ColorData();
	var sumXYZ;
	tmpColor.X = inColor1.X+inColor2.X;
	tmpColor.Y = inColor1.Y+inColor2.Y;
	tmpColor.Z = inColor1.Z+inColor2.Z;
	sumXYZ = tmpColor.X+tmpColor.Y+tmpColor.Z;
	tmpColor.x = tmpColor.X / sumXYZ;
	tmpColor.y = tmpColor.Y / sumXYZ;
	tmpColor.z = tmpColor.Z / sumXYZ;
	
	return tmpColor;
}

//ColorDataオブジェクト同士の減算をするメソッド(減法混色)
//In:ColorData(Object)
//Return:ColorData(Object)
function subColor(inColor1, inColor2){
	var tmpColor = new ColorData();
	tmpColor.X = inColor1.X-inColor2.X;
	tmpColor.Y = inColor1.Y-inColor2.Y;
	tmpColor.Z = inColor1.Z-inColor2.Z;
	tmpColor.x = tmpColor.X / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	tmpColor.y = tmpColor.Y / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	tmpColor.z = tmpColor.Z / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	return tmpColor;
}
