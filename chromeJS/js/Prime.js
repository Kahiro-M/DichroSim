//引数が素数だったら1(true),素数ではなかったら0(false)を返す
function isPrime(iInput) {
	if(iInput<2){
			return 0;
		}
	else{
		for(let i=2;i<iInput;i++){
			let ret = iInput%i;
			if(ret==0){
				return 0;
			}
		}
		return 1;
	}
}

//Start～Endまでの間の素数を格納した配列を返す
function getPrimeArray(iInStart,iInEnd){
	let ret = [];
	let tmp = 0;
	
	//先頭と終端の関係チェック
	if(iInStart<iInEnd){
		//問題なし
	}
	else{
		ret.push('引数の関係にエラー有');
		return ret;
	}
	
	//先頭から終端までの素数を配列に格納
	for(let i=iInStart; i<=iInEnd; i++){
		tmp = isPrime(i);
		if(tmp){
			ret.push(i);
		}
	}
	
	//素数がなかった場合、配列にコメントを入れる
	if(ret.length == 0){
		ret.push('無かったよ');
	}
	
	return ret;
}