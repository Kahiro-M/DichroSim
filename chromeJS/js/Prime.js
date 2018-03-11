function isPrime(iInput){
	//引数が
	for(let i=2;i<iInput;i++){
		let ret = iInput/i;
		if(ret==0){
			return ret;
		}
	}
	ret = 1;
	return ret;
}