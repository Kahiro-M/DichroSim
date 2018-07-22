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

function addColor(Color1, Color2){
	var tmpColor = new ColorData();
	var sumXYZ;
	tmpColor.X = Color1.X+Color2.X;
	tmpColor.Y = Color1.Y+Color2.Y;
	tmpColor.Z = Color1.Z+Color2.Z;
	sumXYZ = tmpColor.X+tmpColor.Y+tmpColor.Z;
	tmpColor.x = tmpColor.X / sumXYZ;
	tmpColor.y = tmpColor.Y / sumXYZ;
	tmpColor.z = tmpColor.Z / sumXYZ;
	
	return tmpColor;
}

function subColor(Color1, Color2){
	var tmpColor = new ColorData();
	tmpColor.X = Color1.X-Color2.X;
	tmpColor.Y = Color1.Y-Color2.Y;
	tmpColor.Z = Color1.Z-Color2.Z;
	tmpColor.x = tmpColor.X / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	tmpColor.y = tmpColor.Y / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	tmpColor.z = tmpColor.Z / (tmpColor.X-tmpColor.Y-tmpColor.Z);
	return tmpColor;
}