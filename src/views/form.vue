<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="shadow w-100 border border-dark-400 rounded-sm">
      <h1 class="text-2xl font-bold text-center mt-2">Sign up</h1>
      <form class="flex flex-col">
        <label>
          Email
          <input type="email" v-model="email">
        </label>
        <label>
          Password
          <input type="password" v-model="password">
        </label>
        <label>
          Repeat Password
          <input type="password" v-model="repeatPassword">
        </label>
      </form>
      <div class="flex flex-row justify-end px-5 mb-2">
        <button type="submit" @click="submit" class="border border-dark-900 rounded-lg px-3 py-1 mt-2">Sign up</button>
        <button type="submit" @click="clear" class="border border-dark-900 rounded-lg px-3 py-1 mt-2">Reset</button>
      </div>
      <p class="text-red-500 mx-2">This does not have to be accurate data. No account will be created.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerReset, registerSubmit } from '../aw';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';

const email = ref('');
const password = ref('');
const repeatPassword = ref('');

const router = useRouter();
const store = useStore()

async function submit() {
  await registerSubmit(email.value, password.value, repeatPassword.value);
  await router.push('/success');
}

async function clear() {
  email.value = '';
  password.value = '';
  repeatPassword.value = '';
  store.data.resets++;
  await registerReset();
}
</script>

<style scoped>
label {
  @apply text-lg flex flex-col mt-2 mx-5;
}

input {
  @apply border border-dark-900 rounded-lg px-3 py-1;
}
</style>
