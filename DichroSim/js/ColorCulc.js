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
	this.x = Number(x);
	this.y = Number(y);
	this.z = 1-(this.x+this.y);
	this.Y = Number(Y);
	this.X = (this.x/this.y)*this.Y;
	this.Z = (this.z/this.y)*this.Y;
	return	this;
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

function transLMS(inColor){
	//LMS錐体の反応値への変換行列
	//Vos(1978)の錐体分好感度を採用
	var Vos = VosMatrix();
//		math.matrix([	[0.15516, 0.54307, -0.03701],
//							[-0.15516, 0.45692, 0.02969],
//							[0, 0, 0.00732]]);

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