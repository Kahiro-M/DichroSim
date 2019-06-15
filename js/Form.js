//formInputの大小関係を調べる
function isOver1(input) {

	if(input>1){
		return 1;
	}
	else{
		return 0;
	}
	return 0;
}

function becomeHigher() {
	var iInStart = Number(document.formInput.Start.value);
	var iInEnd = Number(document.formInput.End.value);

	if(iInStart<iInEnd){
			//OKなので何もしない
		}
	else{
		iInEnd = iInStart+1;
		document.formInput.End.value = iInEnd;
	}
}

function becomeLower() {
	var iInStart = Number(document.formInput.Start.value);
	var iInEnd = Number(document.formInput.End.value);

	if(iInStart<iInEnd){
			//OKなので何もしない
		}
	else{
		iInStart = iInEnd-1;
		document.formInput.Start.value = iInStart;
	}
}
function updateDisplayColor(R,G,B,itemID){
	var tR = become0to255(R);
	var tG = become0to255(G);
	var tB = become0to255(B);
	var element = document.getElementById(itemID);
	var tmpR = Number(tR).toString(16);
	if(tmpR<16){
		tmpR = "0"+tmpR
	}
	var tmpG = Number(tG).toString(16);
	if(tmpG<16){
		tmpG = "0"+tmpG
	}
	var tmpB = Number(tB).toString(16);
	if(tmpB<16){
		tmpB = "0"+tmpB
	}
	element.style.backgroundColor = "#" + tmpR + tmpG + tmpB;
	console.log(itemID,element.style.backgroundColor);


	// //文字部分はRGB値を改変して使用する
	// var invR = Number(255-R).toString(16);
	// if(invR<16){
	// 	invR = "0"+invR
	// }
	// var invG = Number(255-G).toString(16);
	// if(invG<16){
	// 	invG = "0"+invG
	// }
	// var invB = Number(255-B).toString(16);
	// if(invB<16){
	// 	invB = "0"+invB
	// }
	// element.style.color = "#" + invR + invG + invB;
	
	// // element.style.backgroundColor = "#" + Number(R).toString(16) + Number(G).toString(16) + Number(B).toString(16);
}

// function updateCColors(){
// 	var elements = document.getElementsByClassName("sRGB");
// 	//C型の色変更
// 	updateDisplayColor(elements[0].value,elements[1].value,elements[2].value,"displayCColor1");
// 	updateDisplayColor(elements[3].value,elements[4].value,elements[5].value,"displayCColor2");
// 	colorCulc(INPUT_TYPE_SRGB);
// }

function updateCColors(CommonRGB1,CommonRGB2){
	//P型の色変更
	updateDisplayColor(CommonRGB1.get([0]),CommonRGB1.get([1]),CommonRGB1.get([2]),"displayCColor1");
	updateDisplayColor(CommonRGB2.get([0]),CommonRGB2.get([1]),CommonRGB2.get([2]),"displayCColor2");
}

function updatePColors(ProtanRGB1,ProtanRGB2){
	//P型の色変更
	updateDisplayColor(ProtanRGB1.get([0]),ProtanRGB1.get([1]),ProtanRGB1.get([2]),"displayPColor1");
	updateDisplayColor(ProtanRGB2.get([0]),ProtanRGB2.get([1]),ProtanRGB2.get([2]),"displayPColor2");
}

function updateDColors(DeutanRGB1,DeutanRGB2){
	//D型の色変更
	updateDisplayColor(DeutanRGB1.get([0]),DeutanRGB1.get([1]),DeutanRGB1.get([2]),"displayDColor1");
	updateDisplayColor(DeutanRGB2.get([0]),DeutanRGB2.get([1]),DeutanRGB2.get([2]),"displayDColor2");
}

function become0to255(inputValue){
	var tmp = become255(inputValue);
	tmp = become0(inputValue);
	return Number(tmp);
}

function become255(inputValue){
	if(255 < inputValue){
		return 255;
	}
	return inputValue;
}
function become0(inputValue){
	if(inputValue < 0){
		return 0;
	}
	return inputValue;
}