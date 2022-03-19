var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as PerceptualHash from './hashAlgorithm.js';
import * as ColorSeperate from './colorSeperate.js';
import * as ContentFeature from './contentFeature.js';
import * as Utils from './utils.js';
var FeatureMethod;
(function (FeatureMethod) {
    FeatureMethod["AverageHash"] = "average hash";
    FeatureMethod["PerceptualHash"] = "perceive hash";
    FeatureMethod["ColorSeperate"] = "color seperate";
    FeatureMethod["ContentFeature"] = "content feature";
})(FeatureMethod || (FeatureMethod = {}));
class ChainHandler {
    constructor({ imgData, fingerprint, method }) {
        this.imgData = imgData;
        this.fingerprint = fingerprint;
        this.method = method;
    }
    getNewImg() {
        return Utils.getSrcFromImageData(this.imgData);
    }
}
export default class Presbyopic {
    constructor({ imgSrc = '', imgWidth = 8 }) {
        this.imgSrc = imgSrc;
        this.imgWidth = imgWidth;
    }
    static compareFingerprint(fingerprint1, fingerprint2, method) {
        if (!method) {
            throw new Error(`Param "method" must be one of "perceptual hash", "color seperate" or "content feature", but found "${method}"`);
        }
        if (typeof fingerprint1 !== typeof fingerprint2) {
            throw new Error(`Type ${typeof fingerprint1} of fingerprint1 could not compare with type ${typeof fingerprint2} of fingerprint2.`);
        }
        if (method === FeatureMethod.ColorSeperate || method === FeatureMethod.ContentFeature) {
            if (fingerprint1.length !== fingerprint2.length) {
                throw new Error(`The length of two fingerprint must be equal, but found fingerprint1's length is ${fingerprint1.length} and fingerprint2's length is ${fingerprint2.length}`);
            }
        }
        if (method === FeatureMethod.AverageHash || method === FeatureMethod.PerceptualHash) {
            fingerprint1 = fingerprint1;
            fingerprint2 = fingerprint2;
            const hammingDistance = Utils.hammingDistance(fingerprint1, fingerprint2);
            return {
                hammingSimilarity: ((fingerprint1.length - hammingDistance) / fingerprint1.length).toFixed(2),
                cosineSimilarity: (Utils.cosineSimilarity(fingerprint1.split('').map(f => Number(f)), fingerprint2.split('').map(f => Number(f)))).toFixed(2),
                method
            };
        }
        if (method === FeatureMethod.ColorSeperate || FeatureMethod.ContentFeature) {
            fingerprint1 = fingerprint1;
            fingerprint2 = fingerprint2;
            const hammingDistance = Utils.hammingDistance(fingerprint1.join(''), fingerprint2.join(''));
            return {
                hammingSimilarity: method === FeatureMethod.ColorSeperate ? undefined : ((fingerprint1.length - hammingDistance) / fingerprint1.length).toFixed(2),
                cosineSimilarity: (Utils.cosineSimilarity(fingerprint1, fingerprint2)).toFixed(2),
                method
            };
        }
    }
    compressImg() {
        return __awaiter(this, void 0, void 0, function* () {
            return Utils.compressImg(this.imgSrc, this.imgWidth);
        });
    }
    compressFingerprint() {
        return __awaiter(this, void 0, void 0, function* () {
            const imgData = yield Utils.compressImg(this.imgSrc, this.imgWidth);
            return imgData;
        });
    }
    getHash(isPHash = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgData = yield this.compressImg();
            const grayImgData = PerceptualHash.createGrayscale(imgData);
            const fingerprint = isPHash ? PerceptualHash.getPHashFingerprint(grayImgData) : PerceptualHash.getAHashFingerprint(grayImgData);
            return new ChainHandler({
                imgData: grayImgData,
                fingerprint,
                method: FeatureMethod.PerceptualHash
            });
        });
    }
    colorSeperate(zoneAmount = 4) {
        return __awaiter(this, void 0, void 0, function* () {
            const imgData = yield this.compressImg();
            const simplifiedList = ColorSeperate.simplifyColorData(imgData, zoneAmount);
            const zonedList = ColorSeperate.seperateListToColorZone(simplifiedList);
            const fingerprint = ColorSeperate.getFingerprint(zonedList, zoneAmount);
            return new ChainHandler({
                imgData,
                fingerprint,
                method: FeatureMethod.ColorSeperate
            });
        });
    }
    contentFeature() {
        return __awaiter(this, void 0, void 0, function* () {
            const imgData = yield this.compressImg();
            const threshold = ContentFeature.OTSUAlgorithm(imgData);
            const newImgData = ContentFeature.binaryzation(imgData, threshold);
            const fingerprint = ContentFeature.getContentFeatureFingerprint(newImgData);
            return new ChainHandler({
                imgData: newImgData,
                fingerprint,
                method: FeatureMethod.ContentFeature
            });
        });
    }
}
