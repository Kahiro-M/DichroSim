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
	makeXYZMatrix(inColorData){
		var mXYZ = this.culcXYZfromColorData(inColorData);
		return	mXYZ;
	}
}
