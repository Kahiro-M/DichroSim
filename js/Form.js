//formInput(RGB値)の範囲を制限する
function colorForcedGamut(InputType){
	if(InputType == INPUT_TYPE_SRGB){
		var tC1R = document.formInput.C_Color1_R.value;
		var tC1G = document.formInput.C_Color1_G.value;
		var tC1B = document.formInput.C_Color1_B.value;
		var tC2R = document.formInput.C_Color2_R.value;
		var tC2G = document.formInput.C_Color2_G.value;
		var tC2B = document.formInput.C_Color2_B.value;

		tC1R = become0to255(tC1R);
		tC1G = become0to255(tC1G);
		tC1B = become0to255(tC1B);
		tC2R = become0to255(tC2R);
		tC2G = become0to255(tC2G);
		tC2B = become0to255(tC2B);
		
		document.formInput.C_Color1_R.value = tC1R;
		document.formInput.C_Color1_G.value = tC1G;
		document.formInput.C_Color1_B.value = tC1B;
		document.formInput.C_Color2_R.value = tC2R;
		document.formInput.C_Color2_G.value = tC2G;
		document.formInput.C_Color2_B.value = tC2B;
	}
	else{
		var Color1 = new ColorData();
		Color1 = setColorData(	document.formInput.Color1_x.value,
							document.formInput.Color1_y.value,
							document.formInput.Color1_Y.value	);
		
		var Color2 = new ColorData();
		Color2 = setColorData(	document.formInput.Color2_x.value,
							document.formInput.Color2_y.value,
							document.formInput.Color2_Y.value	);

		// スペクトル軌跡外なら警告表示する。
		var spectrumElement = document.getElementById("JudgeInclusionSpectrumColor1Text");
		if(judgeInclusion(Color1,SPECTRUM)){
			spectrumElement.innerHTML = "";
		}
		else{
			document.formInput.Color1_x.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color1_y.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color1_Y.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color1_x.style.color= COLOR_OUT_OF_RANGE_TEXT;
			document.formInput.Color1_y.style.color = COLOR_OUT_OF_RANGE_TEXT;
			document.formInput.Color1_Y.style.color = COLOR_OUT_OF_RANGE_TEXT;
			spectrumElement.innerHTML = "";
			spectrumElement.innerHTML = STRING_OUT_OF_RANGE_TEXT;
		}
		
		spectrumElement = document.getElementById("JudgeInclusionSpectrumColor2Text");
		if(judgeInclusion(Color2,SPECTRUM)){
			spectrumElement.innerHTML = "";
		}
		else{
			document.formInput.Color2_x.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color2_y.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color2_Y.style.backgroundColor = COLOR_OUT_OF_RANGE_BACKGROUND;
			document.formInput.Color2_x.style.color= COLOR_OUT_OF_RANGE_TEXT;
			document.formInput.Color2_y.style.color = COLOR_OUT_OF_RANGE_TEXT;
			document.formInput.Color2_Y.style.color = COLOR_OUT_OF_RANGE_TEXT;
			spectrumElement.innerHTML = "";
			spectrumElement.innerHTML = STRING_OUT_OF_RANGE_TEXT;
		}	}
	colorCulc(InputType);
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
	console.log(itemID,element.style.backgroundColor,"#" + tmpR + tmpG + tmpB);
}

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
	var tmp = become255(Number(inputValue));
	tmp = become0(tmp);
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