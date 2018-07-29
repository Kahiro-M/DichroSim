/**
 * Color calculation objects.
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

//ColorDataオブジェクトからXYZ配列を算出するメソッド
//In:ColorData(Object)
//Return:math.matrix(Object)
function culcXYZ(inColorData){
	var obj = new ColorData();
	obj.x = Number(inColorData.x);
	obj.y = Number(inColorData.y);
	obj.Y = Number(inColorData.Y);

	var tmpz = 1-(obj.x+obj.y);
	var tmpX = (obj.x/obj.y)*obj.Y;
	var tmpZ = (tmpz/obj.y)*obj.Y;
	
	return	math.matrix([tmpX,obj.Y,tmpZ]);
}

//XYZ配列からColorDataオブジェクトを算出するメソッド
//In:math.matrix(Object)
//Return:ColorData(Object)
function culcSmallXYZ(inXYZ){
	var obj = new ColorData();
	
	var tmpX = inXYZ.get([0]);
	var tmpY = inXYZ.get([1]);
	var tmpZ = inXYZ.get([2]);
	
	var sumXYZ = tmpX+tmpY+tmpZ;

	obj.Y = tmpY;
	obj.x = tmpX/sumXYZ;
	obj.y = tmpY/sumXYZ;
	return	obj;
}

//ColorDataオブジェクトからXYZ配列を生成するメソッド
//In:ColorData(Object)
//Return:math.matrix(Object)
function makeXYZMatrix(inColorData){
	var mXYZ = culcXYZ(inColorData);
	return	mXYZ;
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



//////////////////////////////////////////////
//色覚タイプ関連
//////////////////////////////////////////////

//錐体分光感度に基づいて、XYZをLMSに変換するための変化行列定義
function VosMatrix(){
	//LMS錐体の反応値への変換行列
	//Vos(1978)の錐体分光感度を採用
	return math.matrix([	[0.15516, 0.54307, -0.03701],
							[-0.15516, 0.45692, 0.02969],
							[0, 0, 0.00732]]);

}

//色覚タイプの変換に利用する等エネルギー白色定義
function eMatrix(){
	//XYZ表色系における等エネルギー白色
	return math.matrix(	[0.333, 0.333, 0.333] );
}

//LMS配列からXYZ配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transLMStoXYZ(inLMS){
	var invVos = math.inv(VosMatrix());
	var mColor = math.multiply(invVos,inLMS);
	var retColor = culcSmallXYZ(mColor);
	return retColor;
}

//XYZ配列からLMS配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transXYZtoLMS(inXYZ){
	var Vos = VosMatrix();
	//var mColor = makeXYZMatrix(inColor);
	var LMS = math.multiply(Vos,inXYZ);
	return LMS;
}

//LMS配列からProtan変換したLMS配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transLMStoProtan(inLMS){
	var eXYZ = eMatrix();
	var eLMS = transXYZtoLMS(eXYZ);
	
	//TODO
	//参考文献に基づいて色覚タイプ変換を実装する。
	
	return eLMS;
}



//////////////////////////////////////////////
//色差算出関連
//////////////////////////////////////////////

//Lab変換に利用する白色点定義
function WhitePointMatrix(){
	//D50における白色点のXYZ値(Xn, Yn, Zn) = ( 0.9642, 1.0, 0.8249 )
	return math.matrix(	[0.9642, 1.0, 0.8249] );
}

//XYZ配列からLab配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transXYZtoLab(inXYZ){
	var WhitePoint = WhitePointMatrix();
	
	//LabのL成分―心理計測明度(psychometric lightness)―を求める
	var L = 0;
	var threshold = 0.008856;
	var normaliseX = inXYZ.get([0])/WhitePoint.get([0]);
	var normaliseY = inXYZ.get([1])/WhitePoint.get([1]);
	var normaliseZ = inXYZ.get([2])/WhitePoint.get([2]);
	if(normaliseY>threshold){
		L = math.cbrt(normaliseY)*116-16;
		}
	else{
		L = normaliseY*903.29;
	}
	
	//Labのa,b成分を求める
	var a = 500 * (math.cbrt(normaliseX)-math.cbrt(normaliseY));
	var b = 200 * (math.cbrt(normaliseY)-math.cbrt(normaliseZ));
	
	return math.matrix([L,a,b]);
}

//Lab配列同士の色差を算出するメソッド
//In:math.matrix(Object)
//Return:Number
function culcColorDelta(inLab1,inLab2){
	return math.distance(inLab1,inLab2);
}