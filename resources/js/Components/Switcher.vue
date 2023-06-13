<script setup></script>
<template>
  <input type="checkbox" class="switch w-16 h-6 sm:w-24 sm:h-8" />
</template>
<style scoped>

.switch {
  appearance: none;
  background-color: #d6d6d6;
  padding: 3px;
  display: flex;
  /* align-items: center; */
  border-radius: 3rem;
  transition: all 0.4s ease-in-out;
}
.switch:checked {
  background-color: #00cd20;
}
.switch::before {
  @apply w-4 sm:w-6;
  content: "";
  display: block;
  aspect-ratio: 1 / 1;
  background-color: #a1a1a1;
  border-radius: 50%;
  transition: all 0.4s ease-in-out;
}
.switch:checked::before {
  background-color: #fff;
  margin-left: 75%;
}
</style>
