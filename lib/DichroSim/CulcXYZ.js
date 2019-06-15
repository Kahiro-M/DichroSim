/**
 * XYZ color calculation objects.
 *
 * @package   DichroSim
 * @author    Kahiro Matsudaira <0204.kahiro@gmail.com>
 * @copyright 2018 Kahiro Matsudaira
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache-2.0
 */

//This code must use math.js.

/**
 * XUZ値計算に関するクラス
 * @class CulcXYZ
 */
class CulcXYZ{
	/**
	 * CulcXYZのコンストラクタ
	 * @memberof CulcXYZ
	 */
	constructor(){}
	
	//ColorDataオブジェクトからXYZ配列を算出するメソッド
	//In:ColorData(Object)
	//Return:math.matrix(Object)
	culcXYZfromColorData(inColorData){
		var obj = new ColorData();
		obj.x = Number(inColorData.x);
		obj.y = Number(inColorData.y);
		obj.Y = Number(inColorData.Y);

		var tmpz = 1-(obj.x+obj.y);
		var tmpX = (obj.x/obj.y)*obj.Y;
		var tmpZ = (tmpz/obj.y)*obj.Y;
		
		return	math.matrix([tmpX,obj.Y,tmpZ]);
	}
	
	rgb2xyz(){
		return math.matrix([[0.4124, 0.3576, 0.1805],
		[0.2126, 0.7152, 0.0722],
		[0.0193, 0.1192, 0.9505]]);
		}
	//RGBDataオブジェクトからXYZ配列を算出するメソッド
	//In:RGBData(Object)
	//Return:math.matrix(Object)
	culcXYZfromRGBData(inRGBData){
		//https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
		var r = inRGBData.R / 255;
		var g = inRGBData.G / 255;
		var b = inRGBData.B / 255;

		r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
		g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
		b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

		// var rgbMatrix = math.matrix([inRGBData.R, inRGBData.G, inRGBData.B]);
		// rgbMatrix = math.divide(rgbMatrix,255)
		// if(rgbMatrix.get([0])>0.04045){
		// 	rgbMatrix = math.add(rgbMatrix,0.055);
		// 	rgbMatrix = math.divide(rgbMatrix,1.055);
		// 	rgbMatrix = math.dotPow(rgbMatrix,2.4);
		// }
		// else{
		// 	rgbMatrix = math.divide(rgbMatrix,12.92);
		// }

		//ここまでの計算ではRGB値のそれぞれに対して条件分岐するため
		//行列で処理すると面倒なので、ここまでは各値に対してのみ処理する。
		//ここからは行列全体で処理してOK。
		var rgbMatrix = math.matrix([r, g, b]);
		// var rgb2xyz = math.matrix([[0.4124, 0.3576, 0.1805],
		// 													 [0.2126, 0.7152, 0.0722],
		// 													 [0.0193, 0.1192, 0.9505]]);
		var ret = math.multiply(this.rgb2xyz(),rgbMatrix);
		ret = math.multiply(ret,100);
		return ret;
	}

	//XYZ配列からColorDataオブジェクトを算出するメソッド
	//In:math.matrix(Object)
	//Return:ColorData(Object)
	culcSmallXYZ(inXYZ){
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
	makeXYZMatrix(inColorData,inType){
		if(inType == INPUT_TYPE_SMALL_XYZ){
			var mXYZ = this.culcXYZfromColorData(inColorData);
		}
		else{
			var mXYZ = this.culcXYZfromRGBData(inColorData);
		}
		return	mXYZ;
	}

	transXYZtoRGB(inXYZ){
		var normalizedXYZ = math.divide(inXYZ,100);
		var xyz2rgb = math.inv(this.rgb2xyz());
		var mColor = math.multiply(xyz2rgb,normalizedXYZ);

		var rli = mColor.get([0]);
		var gli = mColor.get([1]);
		var bli = mColor.get([2]);

		var r = rli>0.0032308 ? (1.055*math.pow(rli,1/2.4)-0.055) : rli*12.92;
		var g = gli>0.0032308 ? (1.055*math.pow(gli,1/2.4)-0.055) : gli*12.92;
		var b = bli>0.0032308 ? (1.055*math.pow(bli,1/2.4)-0.055) : bli*12.92;

		var ret = math.multiply(math.matrix([r,g,b]),255);
		var ret = math.round(ret);

		return ret;
	}
}
