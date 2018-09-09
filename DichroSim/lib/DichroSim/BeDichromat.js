/**
 * Dichromat simlation objects.
 *
 * @package   DichroSim
 * @author    Kahiro Matsudaira <0204.kahiro@gmail.com>
 * @copyright 2018 Kahiro Matsudaira
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 */

//This code must use math.js.

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

//色覚タイプの変換(Protan/Deutan)に利用する波長575nmのLMS値定義
function LMS575nm(){
	return math.matrix(	[0.478775, 0.520202, 0.001023] );
}

//色覚タイプの変換(Protan/Deutan)に利用する波長475nmのLMS値定義
function LMS475nm(){
	return math.matrix(	[0.109594, 0.086843, 0.803563] );
}

//色覚タイプの変換(Tritan)に利用する波長660nmのLMS値定義
function LMS660nm(){
	return math.matrix(	[0.729969, 0.270031, 0.000000] );
}

//色覚タイプの変換(Tritan)に利用する波長485nmのLMS値定義
function LMS485nm(){
	return math.matrix(	[0.068706, 0.200723, 0.730571] );
}

//LMS配列からXYZ配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transLMStoXYZ(inLMS){
	var invVos = math.inv(VosMatrix());
	var mColor = math.multiply(invVos,inLMS);
//	var retColor = culcSmallXYZ(mColor);
	return mColor;
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
		
	//ProtanはLMS空間のL軸情報が喪失するのでMS平面に投影される。
	//入力値の傾きが等エネルギー白色より小さい場合は575nm、大きい場合は475nmに投影される。
	//Protanで投影される面(575nmとeLMSの平面 or 475nmとeLMSの平面)を調べる。
	var inTan = inLMS.get([2])/inLMS.get([1]);
	var eTan = eLMS.get([2])/eLMS.get([1]);
	var dichromatLMS;
	
	if(inTan<eTan){
		dichromatLMS = LMS575nm();
	}
	else{
		dichromatLMS = LMS475nm();
	}
	
	//二色型色覚の平面に投影するための係数を算出
	var abc = culcDichromatCoefficient(eLMS,dichromatLMS);
	
	//Protan変換の場合はL軸に沿って投影させる
	var protanL = (abc.get([1])*inLMS.get([1]) + abc.get([2])*inLMS.get([2]))/abc.get([0])*-1;		
	return math.matrix([ protanL, inLMS.get([1]), inLMS.get([2]) ]);
}

//LMS配列からDeutan変換したLMS配列を算出するメソッド
//In:math.matrix(Object)
//Return:math.matrix(Object)
function transLMStoDeutan(inLMS){
	var eXYZ = eMatrix();
	var eLMS = transXYZtoLMS(eXYZ);
		
	//DeutanはLMS空間のM軸情報が喪失するのでLS平面に投影される。
	//入力値の傾きが等エネルギー白色より小さい場合は575nm、大きい場合は475nmに投影される。
	//Protanで投影される面(575nmとeLMSの平面 or 475nmとeLMSの平面)を調べる。
	var inTan = inLMS.get([2])/inLMS.get([0]);
	var eTan = eLMS.get([2])/eLMS.get([0]);
	var dichromatLMS;
	
	if(inTan<eTan){
		dichromatLMS = LMS575nm();
	}
	else{
		dichromatLMS = LMS475nm();
	}
	
	//二色型色覚の平面に投影するための係数を算出
	var abc = culcDichromatCoefficient(eLMS,dichromatLMS);
	
	//Protan変換の場合はL軸に沿って投影させる
	var DeutanM = (abc.get([0])*inLMS.get([1]) + abc.get([2])*inLMS.get([2]))/abc.get([1])*-1;		
	return math.matrix([ inLMS.get([0]), DeutanM, inLMS.get([2]) ]);
}

//二色型色覚が見ているMS平面,LS平面,LM平面に投影するための係数を算出するメソッド
//In:math.matrix(Object),math.matrix(Object)
//Return:math.matrix(Object)
function culcDichromatCoefficient(inE,inDichro){
	var a = inE.get([1]) * inDichro.get([2]) - inE.get([2]) * inDichro.get([1]);
	var b = inE.get([2]) * inDichro.get([0]) - inE.get([0]) * inDichro.get([2]);
	var c = inE.get([0]) * inDichro.get([1]) - inE.get([1]) * inDichro.get([0]);
	return math.matrix([a,b,c]);
}

//ProtanとDeutanで投影される面を調べて算出するメソッド
//In:math.matrix(Object),math.matrix(Object)
//Return:math.matrix(Object)
function culcDichromatLMS(inE,inQ){
	var inTan = inQ.get([2])/inQ.get([1]);
	var eTan = inE.get([2])/inE.get([1]);
	var dichromatLMS;
	
	if(inTan<eTan){
		dichromatLMS = LMS575nm();
	}
	else{
		dichromatLMS = LMS475nm();
	}
	return dichromatLMS;
}
