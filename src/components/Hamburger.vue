<template>
  <div id="hamburger">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#hamburger {
  position: relative;
  height: 20px;
  width: 28px;
  display: inline-block;
  box-sizing: border-box;
}
#hamburger div {
  position: absolute;
  left: 0;
  height: 2px;
  width: 28px;
  background-color: #444;
  border-radius: 2px;
  display: inline-block;
  box-sizing: border-box;
  height: 4px;
}
#hamburger div:nth-of-type(1) {
  bottom: 18px;
}
#hamburger div:nth-of-type(2) {
  bottom: 10px;
}
#hamburger div:nth-of-type(3) {
  bottom: 2px;
}
</style>
