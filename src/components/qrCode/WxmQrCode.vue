<template>
    <div class="wxm-qr-code">
        <qrcode-vue :value="value" :size="size" level="H"/>
    </div>
</template>
<script lang="ts" setup>
  import QrcodeVue from 'qrcode.vue'

  type QrCodeType={
    value:string,
    size:number
  }
  // const props=defineProps<QrCodeType>()
  // const props = withDefaults(defineProps<QrCodeType>(), {
  //   size: 222
  // })
  withDefaults(defineProps<QrCodeType>(), {
    size: 200
  })
</script>
