function ColorData(){
	this.x = 0;
	this.y = 0;
	this.Y = 0;
	return	this;
}

function setColorData(x,y,Y){
	var obj = new ColorData();
	obj.x = Number(x);
	obj.y = Number(y);
	obj.Y = Number(Y);
	return	obj;
}


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

function makeXYZMatrix(inColorData){
	var mXYZ = culcXYZ(inColorData);
	//var tmp = math.matrix([inColorData.X,inColorData.Y,inColorData.Z]);
	return	mXYZ;
}

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

function transLMStoXYZ(inLMS){
	var invVos = math.inv(VosMatrix());
	var mColor = math.multiply(invVos,inLMS);
	var retColor = culcSmallXYZ(mColor);
	return retColor;
}

function transXYZtoLMS(inXYZ){
	var Vos = VosMatrix();
	//var mColor = makeXYZMatrix(inColor);
	var LMS = math.multiply(Vos,inXYZ);
	return LMS;
}

function transLMStoProtan(inLMS){
	var eXYZ = eMatrix();
	var eLMS = transXYZtoLMS(eXYZ);
	return eLMS;
}

function transXYZtoLab(inXYZ){
	var WhitePoint = WhitePointMatrix();
	//心理計測明度(psychometric lightness)
	var PL = 0;
	var threshold = 0.008856;
	var normaliseY = inXYZ.get([1])/WhitePoint.get([1]);
	if(normaliseY>threshold){
		PL = math.cbrt(normaliseY)*116-16;
		}
	else{
		PL = normaliseY*903.29;
	}
	return PL;
}

function VosMatrix(){
	//LMS錐体の反応値への変換行列
	//Vos(1978)の錐体分好感度を採用
	return math.matrix([	[0.15516, 0.54307, -0.03701],
							[-0.15516, 0.45692, 0.02969],
							[0, 0, 0.00732]]);

}

function eMatrix(){
	//XYZ表色系における等エネルギー白色
	return math.matrix(	[0.333, 0.333, 0.333] );
}

function WhitePointMatrix(){
	//D50における白色点のXYZ値(Xn, Yn, Zn) = ( 0.9642, 1.0, 0.8249 )
	return math.matrix(	[0.9642, 1.0, 0.8249] );
}
