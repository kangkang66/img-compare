package main

import (
	"errors"
	"fmt"
	"math"
	"strconv"
)

//参考：https://juejin.cn/post/6844904016686628877
// 用go实现了图片数据的对比算法，这样前端生成每张图片的数据并上传到服务器，服务器需要检查图片相似度的时候，直接通过此算法计算。

type ImgHashData struct {
	//平均哈希算法
	AverageHash string `json:"average_hash"`
	//感知哈希算法
	PerceptualHash string `json:"perceptual_hash"`
	//颜色分布法
	ColorSeperate []float64 `json:"color_seperate"`
	//内容特征法
	ContentFeature []float64 `json:"content_feature"`
}

type SimilarityResult struct {
	HammingSimilarity float64 `json:"hamming_similarity"`
	CosineSimilarity  float64 `json:"cosine_similarity"`
}
type CompareResult struct {
	AverageHash    SimilarityResult `json:"average_hash"`
	PerceptualHash SimilarityResult `json:"perceptual_hash"`
	ColorSeperate  SimilarityResult `json:"color_seperate"`
	ContentFeature SimilarityResult `json:"content_feature"`
}

func main() {
	img1 := ImgHashData{
		AverageHash:    "1111010011110100111110001111100011101100111010001110100011001000",
		PerceptualHash: "1100",
		ColorSeperate:  []float64{11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 20},
		ContentFeature: []float64{1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0},
	}

	img2 := ImgHashData{
		AverageHash:    "0000000000011100000111000011100010111100100111001111110001111111",
		PerceptualHash: "1000",
		ColorSeperate:  []float64{20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12},
		ContentFeature: []float64{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1},
	}

	///////////////平均哈希算法///////////////
	//计算hamming
	averageHashHamming, err := hammingSimilarity(img1.AverageHash, img2.AverageHash)
	if err != nil {
		return
	}
	//计算余弦
	img1AverageHashFloat, err := parseStrToFloat64(img1.AverageHash)
	if err != nil {
		return
	}
	img2AverageHashFloat, err := parseStrToFloat64(img2.AverageHash)
	if err != nil {
		return
	}
	averageHashCos := cosCompute(img1AverageHashFloat, img2AverageHashFloat)

	///////////////感知哈希算法/////////////
	//计算hamming
	perceptualHashHamming, err := hammingSimilarity(img1.PerceptualHash, img2.PerceptualHash)
	if err != nil {
		return
	}
	//计算余弦
	img1PerceptualHashFloat, err := parseStrToFloat64(img1.PerceptualHash)
	if err != nil {
		return
	}
	img2PerceptualHashFloat, err := parseStrToFloat64(img2.PerceptualHash)
	if err != nil {
		return
	}
	perceptualHashCos := cosCompute(img1PerceptualHashFloat, img2PerceptualHashFloat)

	///////////////颜色分布法/////////////
	//颜色分布法不计算hamming
	//计算余弦
	colorSeperateCos := cosCompute(img1.ColorSeperate, img2.ColorSeperate)

	///////////////内容特征法/////////////
	//计算hamming
	contentFeatureHamming, err := hammingSimilarity(parseFloat64ToString(img1.ContentFeature), parseFloat64ToString(img2.ContentFeature))
	if err != nil {
		return
	}
	//计算余弦
	contentFeatureCos := cosCompute(img1.ContentFeature, img2.ContentFeature)

	result := CompareResult{
		AverageHash: SimilarityResult{
			HammingSimilarity: averageHashHamming,
			CosineSimilarity:  averageHashCos,
		},
		PerceptualHash: SimilarityResult{
			HammingSimilarity: perceptualHashHamming,
			CosineSimilarity:  perceptualHashCos,
		},
		ColorSeperate: SimilarityResult{
			HammingSimilarity: 0,
			CosineSimilarity:  colorSeperateCos,
		},
		ContentFeature: SimilarityResult{
			HammingSimilarity: contentFeatureHamming,
			CosineSimilarity:  contentFeatureCos,
		},
	}

	fmt.Println(result)
}

func hammingSimilarity(str1, str2 string) (similar float64, err error) {
	hammingDistanceValue, err := hammingDistance(str1, str2)
	if err != nil {
		return
	}
	similar = float64(len(str1)-hammingDistanceValue) / float64(len(str1))
	return
}
func hammingDistance(a, b string) (int, error) {
	distance := 0
	if len(a) != len(b) {
		return -1, errors.New("hammingDistance must have same length")
	}
	for i := range a {
		if a[i] != b[i] {
			distance++
		}
	}
	return distance, nil
}

func cosCompute(x, y []float64) float64 {
	var sum, s1, s2 float64
	for i := 0; i < len(x); i++ {
		sum += x[i] * y[i]
		s1 += math.Pow(x[i], 2)
		s2 += math.Pow(y[i], 2)
	}
	if s1 == 0 || s2 == 0 {
		return 0.0
	}
	return sum / (math.Sqrt(s1) * math.Sqrt(s2))
}

func parseStrToFloat64(str string) (result []float64, err error) {
	result = make([]float64, 0, len(str))
	for _, v := range str {
		var vf float64
		vf, err = strconv.ParseFloat(string(v), 64)
		if err != nil {
			err = errors.New("parseStrToFloat64 err:" + err.Error())
			return
		}
		result = append(result, vf)
	}
	return
}

func parseFloat64ToString(value []float64) string {
	result := ""
	for _, v := range value {
		result += strconv.FormatInt(int64(v), 10)
	}
	return result
}
