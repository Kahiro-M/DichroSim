function main() {
	"use strict";

	//htmlから引数を取得
	var Color1 = new ColorData();
	Color1 = culcXYZ(	document.formInput.Color1_x.value,
						document.formInput.Color1_y.value,
						document.formInput.Color1_Y.value	);
	
	var Color2 = new ColorData();
	Color2 = culcXYZ(	document.formInput.Color2_x.value,
						document.formInput.Color2_y.value,
						document.formInput.Color2_Y.value	);

	var mColor1 = makeXYZMatrix(Color1);
	var mColor2 = makeXYZMatrix(Color2);
	
	var lmsColor1 = transLMS(Color1);
	
	var SumColor = addColor(Color1,Color2);
	var SubColor = subColor(Color1,Color2);
	
	console.log(Color1);
	console.log(Color2);
	console.log(SumColor);
	console.log(SubColor);
	console.log(mColor1);
	console.log(mColor2);
	
	console.log(math.round(math.e, 3));            // 2.718

//	alert(SumColor);

}
