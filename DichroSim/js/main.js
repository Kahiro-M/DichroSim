function main() {
	"use strict";
	//alert('formInput.Start.value:'+ document.formInput.Start.value);
	//alert('formInput.End.value:'+ document.formInput.End.value);



	//htmlから引数を取得
	var Color1 = new ColorData(	document.formInput.Color1_x.value,
								 	document.formInput.Color1_x.value,
								 	document.formInput.Color1_Y.value	);
	var Color2 = new ColorData(	document.formInput.Color2_x.value,
								 	document.formInput.Color2_x.value,
								 	document.formInput.Color2_Y.value	);


	var SumColor = addColor(Color1,Color2);

	var aPrime = [];

	//Start～Endまでの間の素数を列挙する

	aPrime = getPrimeArray(iInStart,iInEnd);
	console.log('素数は'+aPrime);
	alert(aPrime);

}
