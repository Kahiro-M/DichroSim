//formInputの大小関係を調べる
function isStartLowerThunEnd() {
	let iInStart = Number(document.formInput.Start.value);
	let iInEnd = Number(document.formInput.End.value);

	if(iInStart<iInEnd){
		return 1;
	}
	else{
		return 0;
	}
}

function becomeHigher() {
	let iInStart = Number(document.formInput.Start.value);
	let iInEnd = Number(document.formInput.End.value);
	
	if(iInStart<iInEnd){
			//OKなので何もしない
		}
	else{
		iInEnd = iInStart+1;
		document.formInput.End.value = iInEnd;
	}
}

function becomeLower() {
	let iInStart = Number(document.formInput.Start.value);
	let iInEnd = Number(document.formInput.End.value);
	
	if(iInStart<iInEnd){
			//OKなので何もしない
		}
	else{
		iInStart = iInEnd-1;
		document.formInput.Start.value = iInStart;
	}
}
