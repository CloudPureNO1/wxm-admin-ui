
import jsqr from 'jsqr'  // 二维码扫码、读取、解析

export const readQrCode = (base64:string | ArrayBuffer | null) :Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      // 创建图像元素
      const img = new Image()
      img.src = base64 as any
      img.onload = () => {
        // 将图像绘制到canvas中
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 获取图像数据
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)
        // 二维码解码
        const qrData = jsqr(imageData.data, imageData.width, imageData.height)
        // 字符串转对象
        console.log(qrData!.data, qrData)
        resolve(qrData!.data)
      }
    } catch (err:any) {
      console.error(err)
      reject(err!.message)
    }
  })
}
