# Dichromat distance simulator
---
https://dichrosim.web.app/

日本語での解説：https://qiita.com/Kahiro-M/items/5d4cfeadc91073a8d278

## How do you use it?
When you enter chromaticity values to each of color 1 and color 2, and press the top button, the color difference between the two colors is displayed.
The color difference is calculated considering the case of each color sense type.

Each color sense type ......

- C type: normal color sense. 95% of Japanese men are this type. I am also this type.
- P type: L type of cone whose function is weak or not functioning. The difference between red and green is difficult to understand.
- D type: M type in which the cone is weak or not functioning. Like P type, the difference between red and green is difficult to understand, but the combination of colors is slightly different.

## When to use?
 - "Although there is know-how of colorimetry, there is no know-how for color weakness correspondence!"
 - "I would like to correspond to color universal design, but I do not know what color to use!"
 - "I want to tell the color engineering designer how to see the color of the weak color!"
 
You can extract only the conversion script from the contained library to L*a*b*.

## How to use
Enter values into Color 1 and Color 2 respectively, and click the "Calculate Color Difference" button at the top of the screen.
The color difference in each color sense type and the "degree of difference in color" defined in the JIS standard are displayed.

## Description
### Flow of processing
1. Get xy Y values that are two-color chromaticity values (obtained from html)
2. Convert chromaticity values to XYZ values the relationship between XYZ and xyY is [CIE 1931 color space (wiki)](https://ja.wikipedia.org/wiki/CIE_1931_%E8%89%B2%E7%A9%BA%E9%96%93)
3. Convert XYZ values to cone response values (based on cone preference for CIE colorimetric standard observers)
4. Convert to cone response value of each color perception type (conversion to the color appearance of P type and D type color blind person) by [Hans Brettle, Francoise Vienot, John Deutan. Mollon: Computerized simulation of color appearance for dichromats: J. Opt. Soc. Am. A, Vol. 14, No. 10, pp. 2647-2655 (1997)]
5. Inverse conversion from cone response value to XYZ value
6. Convert XYZ values to L*a*b* ([Lab color space (wiki)](https://ja.wikipedia.org/wiki/Lab%E8%89%B2%E7%A9%BA%E9%96%93#CIE_XYZ_%E3%81%8B%E3%82%89%E3%81%AE%E5%A4%89%E6%8F%9B))
7. Calculate the color difference from each type of L*a*b* ([CIE DE 2000](https://qiita.com/hachisukansw/items/860f061a2ab7a4f2d06f))
8. Determine the degree of color difference based on [Japanese Industrial Standards](https://www.toyoink1050plus.com/color/chromatics/basic/005.php)

Processing of 2-7 is summarized as DichroSim library.


### Get xy Y values that are two-color chromaticity values (obtained from html)

```.js
var Color1 = new ColorData();
Color1 = setColorData(	document.formInput.[name of form for x value].value,
          document.formInput.[name of form for y value].value,
          document.formInput.[name of form for Y value].value	);
```

### Convert chromaticity values to XYZ values the relationship between XYZ and xyY
```.js
var culcXYZ = new CulcXYZ;
var commonXYZColor1 = culcXYZ.makeXYZMatrix(Color1);
```

### Convert XYZ values to cone response values
```.js
var beDichromat = new DichromatTrans;
var lmsColor1 = beDichromat.transXYZtoLMS(commonXYZColor1);
```

### Convert to cone response value of each color perception type
```.js
var protanLMSColor1 = beDichromat.transLMStoProtan(lmsColor1);
var deutanLMSColor1 = beDichromat.transLMStoDeutan(lmsColor1);
```

### Inverse conversion from cone response value to XYZ value
```.js
var protanXYZColor1 = beDichromat.transLMStoXYZ(protanLMSColor1);
var deutanXYZColor1 = beDichromat.transLMStoXYZ(deutanLMSColor1);
```

### Convert XYZ values to L*a*b*
```.js
var commonLabColor1 = transXYZtoLab(commonXYZColor1);
var protanLabColor1 = transXYZtoLab(protanXYZColor1);
var deutanLabColor1 = transXYZtoLab(deutanXYZColor1);
```

### Calculate the color difference from each type of L*a*b*
```.js
//CIE delta E 2000
document.formInput.[name of form for C type result].value = 
          ciede2000(commonLabColor1.get([0]),commonLabColor1.get([1]),commonLabColor1.get([2]),
                    commonLabColor2.get([0]),commonLabColor2.get([1]),commonLabColor2.get([2]));

document.formInput.[name of form for P type result].value = 
          ciede2000(protanLabColor1.get([0]),protanLabColor1.get([1]),protanLabColor1.get([2]),
                    protanLabColor2.get([0]),protanLabColor2.get([1]),protanLabColor2.get([2]));

document.formInput.[name of form for D type result].value = 
          ciede2000(deutanLabColor1.get([0]),deutanLabColor1.get([1]),deutanLabColor1.get([2]),
                    deutanLabColor2.get([0]),deutanLabColor2.get([1]),deutanLabColor2.get([2]));

```

### Determine the degree of color difference based on Japanese Industrial Standards
```.js
discriminateDeltaE(document.formInput.[name of form for C type result].value,
                   document.getElementById("[name of form for C type determine result]"));

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

const THRESHOLD_NON_COLORIMETRY_AREA = 0.2;
const THRESHOLD_IDENTIFICATION_COLOR_DIFFERENCE = 0.3;
const THRESHOLD_AAA = 0.4;
const THRESHOLD_AA = 0.8;
const THRESHOLD_A = 1.6;
const THRESHOLD_B = 3.2;
const THRESHOLD_C = 6.5;
const THRESHOLD_D = 13.0;
const THRESHOLD_OTHER_COLOR = 25.0;
```
