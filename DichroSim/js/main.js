function main() {
	"use strict";

	//htmlから引数を取得
	var Color1 = new ColorData();
	Color1 = setColorData(	document.formInput.Color1_x.value,
						document.formInput.Color1_y.value,
						document.formInput.Color1_Y.value	);
	
	var Color2 = new ColorData();
	Color2 = setColorData(	document.formInput.Color2_x.value,
						document.formInput.Color2_y.value,
						document.formInput.Color2_Y.value	);

	var mColor1 = makeXYZMatrix(Color1);
	var mColor2 = makeXYZMatrix(Color2);
	
	var lmsColor1 = transXYZtoLMS(mColor1);
	var lmsColor2 = transXYZtoLMS(mColor2);
	
	var xyzColor1 = transLMStoXYZ(lmsColor1);
	var xyzColor2 = transLMStoXYZ(lmsColor2);
	
	var LabColor1 = transXYZtoLab(mColor1);
	var LabColor2 = transXYZtoLab(mColor2);
	
	var protanLMSColor1 = transLMStoProtan(lmsColor1);
	var protanLMSColor2 = transLMStoProtan(lmsColor2);

	var deutanLMSColor1 = transLMStoDeutan(lmsColor1);
	var deutanLMSColor2 = transLMStoDeutan(lmsColor2);
	
	var protanXYZColor1 = transLMStoXYZ(protanLMSColor1);
	var protanXYZColor2 = transLMStoXYZ(protanLMSColor2);

	var deutanXYZColor1 = transLMStoXYZ(deutanLMSColor1);
	var deutanXYZColor2 = transLMStoXYZ(deutanLMSColor2);

	var protanSmallXYZColor1 = culcSmallXYZ(protanXYZColor1);
	var protanSmallXYZColor2 = culcSmallXYZ(protanXYZColor2);

	var deutanSmallXYZColor1 = culcSmallXYZ(deutanXYZColor1);
	var deutanSmallXYZColor2 = culcSmallXYZ(deutanXYZColor2);

	var SumColor = addColor(Color1,Color2);
	var SubColor = subColor(Color1,Color2);

	document.formInput.Ret1.value= culcColorDelta(LabColor1,LabColor2);	
	
	//コメント領域のHTMLを操作して結果を表示する。
	var IndexElements = document.getElementsByClassName("comment");
	
	//いったんリフレッシュ
	IndexElements[0].innerHTML = "";
	
	//ここから順に書き込んでいく
	IndexElements[0].innerHTML += "inXYZColor1 "+ mColor1+"<br>";	
	IndexElements[0].innerHTML += "inXYZColor2 "+ mColor2+"<br>";	
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
	
}
