import Presbyopic from './dist/presbyopic.js'

new Vue({
  el: '#app',
  data: {
    img1: {
      src: {
        raw: '',
        aHash: '',
        pHash: '',
        colorSeperate: '',
        contentFeature: ''
      },
      fingerprint: {
        aHash: '',
        pHash: '',
        colorSeperate: '',
        contentFeature: ''
      }
    },
    img2: {
      src: {
        raw: '',
        aHash: '',
        pHash: '',
        colorSeperate: '',
        contentFeature: ''
      },
      fingerprint: {
        aHash: '',
        pHash: '',
        colorSeperate: '',
        contentFeature: ''
      }
    },
    imgWidth: 8,
    zoneAmount: '4',
    compareResult: {
      aHash: '',
      pHash: '',
      colorSeperate: '',
      contentFeature: ''
    }
  },
  methods: {
    onItemChange (e, picNum = 'img1') {
      const self = this
      const file = e.target.files[0]
      if (!file) {
        return
      }
      if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
        return
      }
      const reader = new FileReader()
      reader.onload = function () {
        const result = this.result
        let img = new Image()
        img.onload = function () {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          self.takeImgSrcs(canvas.toDataURL(), picNum)
          img = null
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    },
    onRangeChange () {
      const raw1 = this.img1.src.raw
      const raw2 = this.img2.src.raw
      raw1 && this.takeImgSrcs(raw1, 'img1')
      raw2 && this.takeImgSrcs(raw2, 'img2')
      raw1 && raw2 && this.compare()
    },
    async takeImgSrcs (base64, picNum = 'img1') {
      this[picNum].src.raw = base64
      const presbyopic = new Presbyopic({
        imgSrc: base64,
        imgWidth: this.imgWidth
      })
      const [data1, data2, data3, data4] = [
        await presbyopic.getHash(),
        await presbyopic.getHash(true),
        await presbyopic.colorSeperate(Number(this.zoneAmount)),
        await presbyopic.contentFeature()
      ]
      this[picNum]['src']['aHash'] = data1.getNewImg()
      this[picNum]['src']['pHash'] = data2.getNewImg()
      this[picNum]['src']['colorSeperate'] = data3.getNewImg()
      this[picNum]['src']['contentFeature'] = data4.getNewImg()

      this[picNum]['fingerprint']['aHash'] = data1.fingerprint
      this[picNum]['fingerprint']['pHash'] = data2.fingerprint
      this[picNum]['fingerprint']['colorSeperate'] = data3.fingerprint
      this[picNum]['fingerprint']['contentFeature'] = data4.fingerprint

      this.compare()
    },
    compare () {
      console.log(this.img1.fingerprint, this.img2.fingerprint)

      if (this.img1.fingerprint.aHash.length === this.img2.fingerprint.aHash.length)
        this.compareResult.aHash = JSON.stringify(Presbyopic.compareFingerprint(this.img1.fingerprint.aHash, this.img2.fingerprint.aHash, 'average hash'), null, 2)
      if (this.img1.fingerprint.pHash.length === this.img2.fingerprint.pHash.length)
        this.compareResult.pHash = JSON.stringify(Presbyopic.compareFingerprint(this.img1.fingerprint.pHash, this.img2.fingerprint.pHash, 'perceive hash'), null, 2)
      if (this.img1.fingerprint.colorSeperate.length === this.img2.fingerprint.colorSeperate.length)
        this.compareResult.colorSeperate = JSON.stringify(Presbyopic.compareFingerprint(this.img1.fingerprint.colorSeperate, this.img2.fingerprint.colorSeperate, 'color seperate'), null, 2)
      if (this.img1.fingerprint.contentFeature.length === this.img2.fingerprint.contentFeature.length)
        this.compareResult.contentFeature = JSON.stringify(Presbyopic.compareFingerprint(this.img1.fingerprint.contentFeature, this.img2.fingerprint.contentFeature, 'content feature'), null, 2)
    }
  }
})