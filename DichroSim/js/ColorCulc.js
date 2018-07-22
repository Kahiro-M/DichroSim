function ColorData(){
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.Y = 0;
	this.X = 0;
	this.Z = 0;
	return	this;
}


function culcXYZ(x,y,Y){
	var obj = new ColorData();
	obj.x = Number(x);
	obj.y = Number(y);
	obj.z = 1-(obj.x+obj.y);
	obj.Y = Number(Y);
	obj.X = (obj.x/obj.y)*obj.Y;
	obj.Z = (obj.z/obj.y)*obj.Y;
	return	obj;
}

function culcSmallXYZ(inXYZ){
	var obj = new ColorData();
	obj.X = inXYZ.get([0]);
	obj.Y = inXYZ.get([1]);
	obj.Z = inXYZ.get([2]);
	var sumXYZ = obj.X+obj.Y+obj.Z;
	obj.x = obj.X/sumXYZ;
	obj.y = obj.Y/sumXYZ;
	obj.z = obj.Z/sumXYZ;
	return	obj;
}

function makeXYZMatrix(inColorData){
	var tmp = math.matrix([inColorData.X,inColorData.Y,inColorData.Z]);
	return	tmp;
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

function transXYZtoLMS(inColor){
	var Vos = VosMatrix();
	var mColor = makeXYZMatrix(inColor);
	var LMS = math.multiply(Vos,mColor);
	return LMS;
}

function VosMatrix(){
	//LMS錐体の反応値への変換行列
	//Vos(1978)の錐体分好感度を採用
	return math.matrix([	[0.15516, 0.54307, -0.03701],
							[-0.15516, 0.45692, 0.02969],
							[0, 0, 0.00732]]);

}