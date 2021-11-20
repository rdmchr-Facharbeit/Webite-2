<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="shadow min-w-100 border border-dark-400 rounded-sm">
      <div v-if="!submittedFeedback">
        <h1 class="text-center text-2xl font-semibold mb-2">Please rate the previous form</h1>
        <form>
          <div>
            <p class="font-medium mx-2">How intuitive was the previous form?</p>
            <div class="flex items-center justify-between mx-2">
              <p>Not intuitive</p>

              <div>
                <input type="radio" name="intuitive" value="1" v-model="intuitiveness"/>
                <label>1</label>
              </div>

              <div>
                <input type="radio" name="intuitive" value="2" v-model="intuitiveness"/>
                <label>2</label>
              </div>

              <div>
                <input type="radio" name="intuitive" value="3" v-model="intuitiveness"/>
                <label>3</label>
              </div>

              <div>
                <input type="radio" name="intuitive" value="4" v-model="intuitiveness"/>
                <label>4</label>
              </div>

              <div>
                <input type="radio" name="intuitive" value="5" v-model="intuitiveness"/>
                <label>5</label>
              </div>

              <p>Very intuitive</p>
            </div>
          </div>
        </form>
        <button class="border border-dark-900 rounded-lg px-3 py-1 float-right my-2 mr-2" @click="submit">Submit</button>
        <p class="text-red-500" v-if="error">Please select a value</p>
      </div>
      <div v-else>
        <h1 class="mx-2 my-5">
          Thank you 🎉 You can now close this site.
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { submitFeedback } from '../aw';

const intuitiveness = ref<number>();

const submittedFeedback = ref<boolean>(false);

const error = ref(false)

async function submit() {
  submittedFeedback.value = true;
  if (intuitiveness.value) {
    const branch = 'DESIGN_SIX';
    await submitFeedback(intuitiveness.value, branch);
  } else {
    error.value = true;
  }
}
</script>