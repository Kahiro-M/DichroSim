/**
 * @file 全体で使用する定数に関する記述をする
 * @author Kahiro Matsudaira <0204.kahiro@gmail.com>
 */

 // 全体で使用する定数を宣言する。

// ツールで組み合わせチェックで用いる閾値の定義
//https://www.toyoink1050plus.com/color/chromatics/basic/005.php
//https://www.xrite.co.jp/colorknowledge-blog/90-blog-color/436-blog-20170831.html

//特別に調整された測色器械でも誤差の範囲にあり、人では識別不能
const THRESHOLD_NON_COLORIMETRY_AREA = 0.2;

//十分に調整された測色器械の再現精度の範囲で、訓練を積んだ人が再現性を持って識別できる限界
const THRESHOLD_IDENTIFICATION_COLOR_DIFFERENCE = 0.3;

//	目視判定の再現性からみて、厳格な許容色差の規格を設定できる限界
const THRESHOLD_AAA = 0.4;

//色の隣接比較で、わずかに色差が感じられるレベル。一般の測色器械間の誤差を含む許容色差の範囲	
const THRESHOLD_AA = 0.8;

//色の離間比較では、ほとんど気付かれない色差レベル。一般的には同じ色だと思われているレベル	
const THRESHOLD_A = 1.6;

//印象レベルでは同じ色として扱える範囲。塗料業界やプラスチック業界では色違いでクレームになることがある	
const THRESHOLD_B = 3.2;

//ＪＩＳ標準色票、マンセル色票等の１歩度に相当する色差	
const THRESHOLD_C = 6.5;

//細分化された系統色名で区別ができる程度の色の差で、この程度を超えると別の色名のイメージになる	
const THRESHOLD_D = 13.0;

//完全に別の色
const THRESHOLD_OTHER_COLOR = 25.0;


// 結果表示に使用する文字列
const STRING_NON_COLORIMETRY_AREA = "評価不能領域";
const STRING_IDENTIFICATION_COLOR_DIFFERENCE = "識別限界";
const STRING_AAA = "AAA級許容差";
const STRING_AA = "AA級許容差";
const STRING_A = "A級許容差";
const STRING_B = "B級許容差";
const STRING_C = "C級許容差";
const STRING_D = "D級許容差";
const STRING_OTHER_COLOR = "別の色";


// 結果表示に使用する色
const COLOR_NON_COLORIMETRY_AREA = "#FF1F1F";
const COLOR_IDENTIFICATION_COLOR_DIFFERENCE = "#E33B3B";
const COLOR_AAA = "#C75757";
const COLOR_AA = "#AB7373";
const COLOR_A = "#8F8F8F";
const COLOR_B = "#73ABAB";
const COLOR_C = "#57C7C7";
const COLOR_D = "#3BE3E3";
const COLOR_OTHER_COLOR = "#1FFFFF";


// 入力となる色の形式
const INPUT_TYPE_SRGB = "sRGB";
const INPUT_TYPE_SMALL_XYZ = "xyY";
