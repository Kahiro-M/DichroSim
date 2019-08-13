function colorCulc(InputType) {
	"use strict";

	//htmlから引数を取得
	if(InputType == INPUT_TYPE_SMALL_XYZ){
		var Color1 = new ColorData();
		Color1 = setColorData(	document.formInput.Color1_x.value,
							document.formInput.Color1_y.value,
							document.formInput.Color1_Y.value	);
		
		var Color2 = new ColorData();
		Color2 = setColorData(	document.formInput.Color2_x.value,
							document.formInput.Color2_y.value,
							document.formInput.Color2_Y.value	);
	}
	else{
		var Color1 = new RGBData();
		Color1 = setRGBData(	document.formInput.C_Color1_R.value,
							document.formInput.C_Color1_G.value,
							document.formInput.C_Color1_B.value	);
		
		var Color2 = new RGBData();
		Color2 = setRGBData(	document.formInput.C_Color2_R.value,
							document.formInput.C_Color2_G.value,
							document.formInput.C_Color2_B.value	);
	}

	var beDichromat = new DichromatTrans;
	var culcXYZ = new CulcXYZ;

	//////計算の前処理//////
	//inputフォームのデータを配列に格納
	var commonXYZColor1 = culcXYZ.makeXYZMatrix(Color1,InputType);
	var commonXYZColor2 = culcXYZ.makeXYZMatrix(Color2,InputType);
	

	//////色覚タイプ変換(XYZ->LMS->L'M'S'->X'Y'Z')の処理//////
	//XYZ値をLMS値に変換
	var lmsColor1 = beDichromat.transXYZtoLMS(commonXYZColor1);
	var lmsColor2 = beDichromat.transXYZtoLMS(commonXYZColor2);
	
	//LMS値をProtanLMS値に変換
	var protanLMSColor1 = beDichromat.transLMStoProtan(lmsColor1);
	var protanLMSColor2 = beDichromat.transLMStoProtan(lmsColor2);

	//LMS値をDeutanLMS値に変換
	var deutanLMSColor1 = beDichromat.transLMStoDeutan(lmsColor1);
	var deutanLMSColor2 = beDichromat.transLMStoDeutan(lmsColor2);
	
	//ProtanLMS値をProtanXYZ値に変換
	var protanXYZColor1 = beDichromat.transLMStoXYZ(protanLMSColor1);
	var protanXYZColor2 = beDichromat.transLMStoXYZ(protanLMSColor2);

	//DeutanLMS値をDeutanXYZ値に変換
	var deutanXYZColor1 = beDichromat.transLMStoXYZ(deutanLMSColor1);
	var deutanXYZColor2 = beDichromat.transLMStoXYZ(deutanLMSColor2);

	//ProtanXYZ値からProtanSmallXYZ値を算出
	var protanSmallXYZColor1 = culcXYZ.culcSmallXYZ(protanXYZColor1);
	var protanSmallXYZColor2 = culcXYZ.culcSmallXYZ(protanXYZColor2);

	//DeutanXYZ値からDeutanSmallXYZ値を算出
	var deutanSmallXYZColor1 = culcXYZ.culcSmallXYZ(deutanXYZColor1);
	var deutanSmallXYZColor2 = culcXYZ.culcSmallXYZ(deutanXYZColor2);

	//C型におけるColor1とColor2の加算と減算
	var SumColor = addColor(Color1,Color2);
	var SubColor = subColor(Color1,Color2);
		

	//////色覚タイプごとの色差計算処理//////
	//LMS値をLab値に変換(C型での色差計算用)
	var commonLabColor1 = transXYZtoLab(commonXYZColor1);
	var commonLabColor2 = transXYZtoLab(commonXYZColor2);
	
	//LMS値をLab値に変換(P型での色差計算用)
	var protanLabColor1 = transXYZtoLab(protanXYZColor1);
	var protanLabColor2 = transXYZtoLab(protanXYZColor2);
	
	//LMS値をLab値に変換(D型での色差計算用)
	var deutanLabColor1 = transXYZtoLab(deutanXYZColor1);
	var deutanLabColor2 = transXYZtoLab(deutanXYZColor2);

	//CIE delta E 1976
	// document.formInput.Ret1.value= culcColorDelta(commonLabColor1,commonLabColor2);	
	// document.formInput.Ret2.value= culcColorDelta(protanLabColor1,protanLabColor2);	
	// document.formInput.Ret3.value= culcColorDelta(deutanLabColor1,deutanLabColor2);	

	//CIE delta E 2000
	document.formInput.Ret1.value = ciede2000(commonLabColor1.get([0]),commonLabColor1.get([1]),commonLabColor1.get([2]),commonLabColor2.get([0]),commonLabColor2.get([1]),commonLabColor2.get([2]));
	document.formInput.Ret2.value = ciede2000(protanLabColor1.get([0]),protanLabColor1.get([1]),protanLabColor1.get([2]),protanLabColor2.get([0]),protanLabColor2.get([1]),protanLabColor2.get([2]));
	document.formInput.Ret3.value = ciede2000(deutanLabColor1.get([0]),deutanLabColor1.get([1]),deutanLabColor1.get([2]),deutanLabColor2.get([0]),deutanLabColor2.get([1]),deutanLabColor2.get([2]));

	discriminateDeltaE(document.formInput.Ret1.value,document.getElementById("Ret1Text"));
	discriminateDeltaE(document.formInput.Ret2.value,document.getElementById("Ret2Text"));
	discriminateDeltaE(document.formInput.Ret3.value,document.getElementById("Ret3Text"));

	if(InputType == INPUT_TYPE_SMALL_XYZ){
		//特別に行う処理はなし。
	}
	else{
		//ProtanXYZ値をProtanRGB値に変換
		var commonRGBColor1_renew = culcXYZ.transXYZtoRGB(commonXYZColor1);
		var commonRGBColor2_renew = culcXYZ.transXYZtoRGB(commonXYZColor2);
		console.log(culcXYZ.culcSmallXYZ(commonXYZColor1));
		// console.log(culcXYZ.culcSmallXYZ(commonXYZColor2));
		updateCColors(commonRGBColor1_renew,commonRGBColor2_renew);

		//ProtanXYZ値をProtanRGB値に変換
		var protanRGBColor1 = culcXYZ.transXYZtoRGB(protanXYZColor1);
		var protanRGBColor2 = culcXYZ.transXYZtoRGB(protanXYZColor2);
		console.log(culcXYZ.culcSmallXYZ(protanXYZColor1));
		// console.log(culcXYZ.culcSmallXYZ(protanXYZColor2));
		updatePColors(protanRGBColor1,protanRGBColor2);

		//DeutanLMS値をDeutanXYZ値に変換
		var deutanRGBColor1 = culcXYZ.transXYZtoRGB(deutanXYZColor1);
		var deutanRGBColor2 = culcXYZ.transXYZtoRGB(deutanXYZColor2);
		console.log(culcXYZ.culcSmallXYZ(deutanXYZColor1));
		// console.log(culcXYZ.culcSmallXYZ(deutanXYZColor2));
		updateDColors(deutanRGBColor1,deutanRGBColor2);
	}



	//コメント領域のHTMLを操作して結果を表示する。
	var IndexElements = document.getElementsByClassName("comment");
	
	//いったんリフレッシュ
	IndexElements[0].innerHTML = "";
	
	//ここから順に書き込んでいく
	IndexElements[0].innerHTML += "inXYZColor1 "+ commonXYZColor1+"<br>";	
	IndexElements[0].innerHTML += "inXYZColor2 "+ commonXYZColor2+"<br>";	
	IndexElements[0].innerHTML += "<br>";
		
	IndexElements[0].innerHTML += "lmsColor1 "+ lmsColor1+"<br>";		
	IndexElements[0].innerHTML += "lmsColor2 "+ lmsColor2+"<br>";		
	IndexElements[0].innerHTML += "<br>";

	IndexElements[0].innerHTML += "protanLMSColor1 "+ protanLMSColor1+"<br>";		
	IndexElements[0].innerHTML += "protanLMSColor2 "+ protanLMSColor2+"<br>";		
	IndexElements[0].innerHTML += "<br>";

	IndexElements[0].innerHTML += "deutanLMSColor1 "+ deutanLMSColor1+"<br>";		
	IndexElements[0].innerHTML += "deutanLMSColor2 "+ deutanLMSColor2+"<br>";		
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "protanXYZColor1 "+ protanXYZColor1+"<br>";		
	IndexElements[0].innerHTML += "protanXYZColor2 "+ protanXYZColor2+"<br>";		
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "deutanXYZColor1 "+ deutanXYZColor1+"<br>";		
	IndexElements[0].innerHTML += "deutanXYZColor2 "+ deutanXYZColor2+"<br>";		
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "protanSmallXYZColor1 "+ protanSmallXYZColor1.x+", "+protanSmallXYZColor1.y+"<br>";
	IndexElements[0].innerHTML += "protanSmallXYZColor2 "+ protanSmallXYZColor2.x+", "+protanSmallXYZColor2.y+"<br>";
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "deutanSmallXYZColor1 "+ deutanSmallXYZColor1.x+", "+deutanSmallXYZColor1.y+"<br>";
	IndexElements[0].innerHTML += "deutanSmallXYZColor2 "+ deutanSmallXYZColor2.x+", "+deutanSmallXYZColor2.y+"<br>";
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "commonLabColor1 "+ commonLabColor1+"<br>";	
	IndexElements[0].innerHTML += "commonLabColor2 "+ commonLabColor2+"<br>";	
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "protanLabColor1 "+ protanLabColor1+"<br>";	
	IndexElements[0].innerHTML += "protanLabColor2 "+ protanLabColor2+"<br>";	
	IndexElements[0].innerHTML += "<br>";
	
	IndexElements[0].innerHTML += "deutanLabColor1 "+ deutanLabColor1+"<br>";	
	IndexElements[0].innerHTML += "deutanLabColor2 "+ deutanLabColor2+"<br>";	
	IndexElements[0].innerHTML += "<br>";
	

}

discriminateDeltaE = function(resultFormInput,displayResultElement){
	if((Number(resultFormInput))<=THRESHOLD_NON_COLORIMETRY_AREA){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_NON_COLORIMETRY_AREA;
		displayResultElement.style.backgroundColor = COLOR_NON_COLORIMETRY_AREA;
	}
	else if(Number(resultFormInput)<=THRESHOLD_IDENTIFICATION_COLOR_DIFFERENCE){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_IDENTIFICATION_COLOR_DIFFERENCE;
		displayResultElement.style.backgroundColor = COLOR_IDENTIFICATION_COLOR_DIFFERENCE;
	}
	else if(Number(resultFormInput)<=THRESHOLD_AAA){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_AAA;
		displayResultElement.style.backgroundColor = COLOR_AAA;
	}
	else if(Number(resultFormInput)<=THRESHOLD_AA){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_AA;
		displayResultElement.style.backgroundColor = COLOR_AA;
	}
	else if(Number(resultFormInput)<=THRESHOLD_A){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_A;
		displayResultElement.style.backgroundColor = COLOR_A;
	}
	else if(Number(resultFormInput)<=THRESHOLD_B){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_B;
		displayResultElement.style.backgroundColor = COLOR_B;
	}
	else if(Number(resultFormInput)<=THRESHOLD_C){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_C;
		displayResultElement.style.backgroundColor = COLOR_C;
	}
	else if(Number(resultFormInput)<=THRESHOLD_D){
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_D;
		displayResultElement.style.backgroundColor = COLOR_D;
	}
	else{
		displayResultElement.innerHTML = "";
		displayResultElement.innerHTML = STRING_OTHER_COLOR;
		displayResultElement.style.backgroundColor = COLOR_OTHER_COLOR;
	}
}


function openClose(){
	var obj = document.getElementById('openHere');
	//非表示ならインライン要素に変更。表示状態なら非表示に変更。
	if(obj.style.display == "inline-block"){
		obj.style.display = "none";
	}
	else{
		obj.style.display = "inline-block";
	}
}
