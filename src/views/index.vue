<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="shadow px-2 py-2 block">
      <h1 class="text-center text-xl">Thank you for taking the time to do this survey</h1>
      <p class="text-center mt-2">In the following you will be asked to fill out a form.</p>
      <p class="text-center">Please fill out all the fields and then submit the form.</p>
      <p class="text-center text-red-500 text-semibold">Please disable any ad- or tracking-blockers. There are no ads on this page, but I need to track your usage of this page.</p>
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

// please dear god, this is ugly. have mercy.
async function literallyDDOSMyOwnShit() {
  const dankeTim = setInterval(async () => {
    const success = await store.loadData();
    if (success) {
      clearInterval(dankeTim);
    }
  }, 350);
}

async function setupAcc() {
  const currSess = await isAuthenticated();
  console.log(`Authed? ${currSess}`);
  if (!currSess) {
    const success = await createSession();
    await literallyDDOSMyOwnShit(); // why am I doing this? help me god.
    disabled.value = !success;
    if (!success) {
      return;
    }
  } else {
    await store.loadData();
    console.log('loading data')
    if (store.data.finished) {
      finished.value = true;
      return;
    }
  }
  await router.push('/form');
}
</script>

