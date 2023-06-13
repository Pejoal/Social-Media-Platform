<script setup>
const props = defineProps({
  show: Boolean,
  dark: {
    tpye: Boolean,
    default: false,
  },
});
</script>

<template>
  <section
    @click="$emit('close')"
    class="hamburger-icon"
    :class="{ active: show }"
  >
    <span class="bar bg-white" :class="{ 'bg-black': props.dark }"></span>
    <span class="bar bg-white" :class="{ 'bg-black': props.dark }"></span>
    <span class="bar bg-white" :class="{ 'bg-black': props.dark }"></span>
  </section>
</template>
<style scoped>
.hamburger-icon {
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 20px;
  z-index: 998;
}
.hamburger-icon.active {
  position: fixed;
  right: 1.6rem;
  top: 1.7rem;
}
.hamburger-icon .bar {
  width: 100%;
  height: 2px;
  position: absolute;
  transition: ease-in-out 0.3s;
  transition-property: top, bottom, transform, opacity;
  left: 0;
  border-radius: 0.5rem;
}
.hamburger-icon .bar:nth-of-type(1) {
  top: 0;
}
.hamburger-icon .bar:nth-of-type(3) {
  bottom: 0;
}
.hamburger-icon .bar:nth-of-type(2) {
  transform: translateY(-50%);
  top: 50%;
}
.hamburger-icon.active .bar:nth-of-type(2) {
  opacity: 0;
}
.hamburger-icon.active .bar:nth-of-type(1) {
  top: 50%;
  transform: rotate(45deg);
}
.hamburger-icon.active .bar:nth-of-type(3) {
  bottom: 40%;
  transform: rotate(-45deg);
}
</style>
