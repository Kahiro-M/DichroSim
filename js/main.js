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

	var dichromatSim = new DichromatTrans;

	//////計算の前処理//////
	//inputフォームのデータを配列に格納
	var commonXYZColor1 = makeXYZMatrix(Color1);
	var commonXYZColor2 = makeXYZMatrix(Color2);
	

	//////色覚タイプ変換(XYZ->LMS->L'M'S'->X'Y'Z')の処理//////
	//XYZ値をLMS値に変換
	var lmsColor1 = dichromatSim.transXYZtoLMS(commonXYZColor1);
	var lmsColor2 = dichromatSim.transXYZtoLMS(commonXYZColor2);
	
	//LMS値をProtanLMS値に変換
	var protanLMSColor1 = dichromatSim.transLMStoProtan(lmsColor1);
	var protanLMSColor2 = dichromatSim.transLMStoProtan(lmsColor2);

	//LMS値をDeutanLMS値に変換
	var deutanLMSColor1 = dichromatSim.transLMStoDeutan(lmsColor1);
	var deutanLMSColor2 = dichromatSim.transLMStoDeutan(lmsColor2);
	
	//ProtanLMS値をProtanXYZ値に変換
	var protanXYZColor1 = dichromatSim.transLMStoXYZ(protanLMSColor1);
	var protanXYZColor2 = dichromatSim.transLMStoXYZ(protanLMSColor2);

	//DeutanLMS値をDeutanXYZ値に変換
	var deutanXYZColor1 = dichromatSim.transLMStoXYZ(deutanLMSColor1);
	var deutanXYZColor2 = dichromatSim.transLMStoXYZ(deutanLMSColor2);

	//ProtanXYZ値からProtanSmallXYZ値を算出
	var protanSmallXYZColor1 = culcSmallXYZ(protanXYZColor1);
	var protanSmallXYZColor2 = culcSmallXYZ(protanXYZColor2);

	//DeutanXYZ値からDeutanSmallXYZ値を算出
	var deutanSmallXYZColor1 = culcSmallXYZ(deutanXYZColor1);
	var deutanSmallXYZColor2 = culcSmallXYZ(deutanXYZColor2);

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

	
	document.formInput.Ret1.value= culcColorDelta(commonLabColor1,commonLabColor2);	
	document.formInput.Ret2.value= culcColorDelta(protanLabColor1,protanLabColor2);	
	document.formInput.Ret3.value= culcColorDelta(deutanLabColor1,deutanLabColor2);	
	
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


function OpenClose(){
	var obj = document.getElementById('openHere').style;
	obj.display=(obj.display=='none')?'block':'none';
}