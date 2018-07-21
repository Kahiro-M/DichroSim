function main() {
	"use strict";

	//htmlから引数を取得
	var Color1 = new ColorData(	document.formInput.Color1_x.value,
								 	document.formInput.Color1_x.value,
								 	document.formInput.Color1_Y.value	);
	var Color2 = new ColorData(	document.formInput.Color2_x.value,
								 	document.formInput.Color2_x.value,
								 	document.formInput.Color2_Y.value	);

	var SumColor = addColor(Color1,Color2);
	var SubColor = subColor(Color1,Color2);
	
	console.log(SumColor);
	console.log(SubColor);
	
	console.log(math.round(math.e, 3));            // 2.718

//	alert(SumColor);

}
