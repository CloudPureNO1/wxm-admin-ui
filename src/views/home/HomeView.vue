<template>
    <div class="wxm-home">
        <img :src="src" />
        </div>
</template>
<script lang="ts" setup>
  import { init } from './HomeView'
  const { src } = init()
</script>
