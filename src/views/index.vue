<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="shadow px-2 py-2 block">
      <h1 class="text-center text-xl">Thank you for taking the time to do this survey</h1>
      <p class="text-center mt-2">In the following you will be asked to fill out an example sign up form.</p>
      <p class="text-center">The data does not have to be accurate, but should fit the form.</p>
      <p>Example: If the form asks for an email address the only requirement is that the data is shaped like an email address.</p>
      <button @click="setupAcc" class="bg-red-400 rounded-lg px-2 py-1 float-right mt-2 disabled:bg-red-100" :disabled="disabled || finished">Get started</button>
      <div v-if="disabled">
        <p class="text-red-500 text-lg">The survey is currently not available.</p>
      </div>
      <div v-if="finished">
        <p class="text-red-500 text-lg">You already filled out this survey.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createSession, isAuthenticated } from '../aw';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';

const disabled = ref(false);
const finished = ref(false);

const router = useRouter();
const store = useStore();



async function setupAcc() {
  const currSess = await isAuthenticated();
  console.log(`Authed? ${currSess}`);
  if (!currSess) {
    const success = await createSession();
    disabled.value = !success;
    if (!success) {
      return;
    }
  } else {
    await store.loadData();
    if (store.data.finished) {
      finished.value = true;
      return;
    }
  }
  await router.push('/form');
}
</script>

