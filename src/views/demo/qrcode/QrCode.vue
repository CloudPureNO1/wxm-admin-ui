<template>
    <div class="wxm-qr-code">
        <qrcode-vue :value="value" :size="size" level="H"/>

        <wxm-qr-code :value="value"/>
    </div>
</template>
<script lang="ts" setup>
  import QrcodeVue from 'qrcode.vue'
  const value = 'wangxm'
  const size = 300
</script>
