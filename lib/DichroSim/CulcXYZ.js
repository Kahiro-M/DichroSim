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

		var tmpX = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		var tmpY = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		var tmpZ = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
		tmpX *= 100
		tmpY *= 100
		tmpZ *= 100
	
		return	math.matrix([tmpX,tmpY,tmpZ]);
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
}
