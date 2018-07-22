function main() {
	"use strict";

	//htmlから引数を取得
	var Color1 = new ColorData();
	Color1 = setColorData(	document.formInput.Color1_x.value,
						document.formInput.Color1_y.value,
						document.formInput.Color1_Y.value	);
	
	var Color2 = new ColorData();
	Color2 = setColorData(	document.formInput.Color2_x.value,
						document.formInput.Color2_y.value,
						document.formInput.Color2_Y.value	);

	var mColor1 = makeXYZMatrix(Color1);
	var mColor2 = makeXYZMatrix(Color2);
	
	var lmsColor1 = transXYZtoLMS(mColor1);
	var xyzColor1 = transLMStoXYZ(lmsColor1);
	
	var protanColor1 = transLMStoProtan(lmsColor1);
	
	var SumColor = addColor(Color1,Color2);
	var SubColor = subColor(Color1,Color2);
	
	console.log("Color1",Color1);
	console.log("mColor1",mColor1);
	console.log("lmsColor1",lmsColor1);
	console.log("xyzColor1",xyzColor1);
	

//	alert(SumColor);

}
