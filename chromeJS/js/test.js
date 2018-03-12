function main() {
	"use strict";
	//alert('inputForm.Start.value:'+ document.inputForm.Start.value);
	//alert('inputForm.End.value:'+ document.inputForm.End.value);
	
	//htmlから引数を取得
	var iInStart = document.inputForm.Start.value;
	var iInEnd = document.inputForm.End.value;
	var aPrime = [];

	//Start～Endまでの間の素数を列挙する
	/*
	let ret = 0;
	for(let i=iInStart; i<iInEnd; i++){
		ret = isPrime(i);
		if(ret){
			alert(i+'は素数');
		}
	}
	*/
	aPrime = getPrimeArray(iInStart,iInEnd);
	console.log('素数は'+aPrime);
	alert(aPrime);

}

//function getPrimeArray(iInStart,iInEnd){
//	let ret = [];
//	let tmp = 0;
//	
//	//先頭と終端の関係チェック
//	if(iInStart<iInEnd){
//		//問題なし
//	}
//	else{
//		ret.push('引数の関係にエラー有');
//		return ret;
//	}
//	
//	//先頭から終端までの素数を配列に格納
//	for(let i=iInStart; i<=iInEnd; i++){
//		tmp = isPrime(i);
//		if(tmp){
//			//console.log(i+'は素数');
//			ret.push(i);
//		}
//	}
//	//console.log(ret);
//	
//	//素数がなかった場合、配列にコメントを入れる
//	if(ret.length == 0){
//		ret.push('無かったよ');
//	}
//	
//	return ret;
//}