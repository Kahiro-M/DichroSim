function main() {
	"use strict";
	//alert('formInput.Start.value:'+ document.formInput.Start.value);
	//alert('formInput.End.value:'+ document.formInput.End.value);
	

	
	//htmlから引数を取得
	var iInStart = document.formInput.Start.value;
	var iInEnd = document.formInput.End.value;
	var aPrime = [];

	//Start～Endまでの間の素数を列挙する
	
	aPrime = getPrimeArray(iInStart,iInEnd);
	console.log('素数は'+aPrime);
	alert(aPrime);

}