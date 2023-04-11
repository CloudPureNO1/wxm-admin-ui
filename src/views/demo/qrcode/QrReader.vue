<template>
    <div>
        <img id="fg" :src="imgSrc" style="width:300px;" />

        <div>
            选择二维码图片:
            <input type="file" accept="image/*" @change="readQr" class="hiddenInput" />
            <br/>
            <input type="file"  accept="image/*" @change="readQrNew" class="hiddenInput" />
        </div>

        <div>
            <el-input v-model="qrText" :rows="2" type="textarea" placeholder="..." :readonly="true" style="width:500px;" />
        </div>
    </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import jsqr from 'jsqr'
  import { useFileToBase64 } from '../../../composable/FileConversion'
  import { readQrCode } from '../../../composable/QrCode'

  // 图片的src
  const imgSrc = ref<any>('')
  // 读取到的数据
  const qrText = ref('')

  const readQrNew = async (e:any) => {
    const base64Data = await useFileToBase64(e.target.files[0]) as any
    imgSrc.value = base64Data
    const text = await readQrCode(base64Data)
    qrText.value = text
  }

  const readQr = async (e:any) => {
    const base64Data = await useFileToBase64(e.target.files[0]) as any
    imgSrc.value = base64Data

    // 创建图像元素
    const img = new Image()
    img.src = base64Data
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
      qrText.value = qrData!.data
    }
  }

</script>
