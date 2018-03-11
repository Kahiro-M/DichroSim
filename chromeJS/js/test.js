function main(){
	var iTest = isPrime(5);
	alert('結果は'+iTest)
}
function isPrime(iInput){
	for(var i=2;i<iInput;i++){
		var ret = iInput/i;
		if(ret==0){
			return ret;
		}
	}
	ret = 1;
	return ret;
}

	function test(){
  var count = 1;
  count = count + 2;
  count = count + 3;
  count = count + 4;
  count = count + 5;
  alert('演算結果は  ' + count);
}