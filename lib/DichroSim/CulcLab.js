/**
 * L*a*b* color calculation objects.
 *
 * @package   DichroSim
 * @author    Kahiro Matsudaira <0204.kahiro@gmail.com>
 * @copyright 2018 Kahiro Matsudaira
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 */

//This code must use math.js.

//////////////////////////////////////////////
//色差算出関連
//////////////////////////////////////////////

//Lab変換に利用する白色点定義
function WhitePointMatrix(){
	//D50における白色点のXYZ値(Xn, Yn, Zn) = ( 96.42, 100.0, 82.49 )
	return math.matrix(	[96.42, 100.0, 82.49] );
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