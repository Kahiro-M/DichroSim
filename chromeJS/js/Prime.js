//引数が素数だったら1(true),素数ではなかったら0(false)を返す
function isPrime(iInput) {
	for(let i=2;i<iInput;i++){
		let ret = iInput%i;
		if(ret==0){
			return ret;
		}
	}
	ret = 1;
	return ret;
}