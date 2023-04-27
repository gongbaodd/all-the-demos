<script setup lang="ts">
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { ref, onBeforeUnmount } from "vue";

const tel = ref("");
const code = ref("");
const token = ref("");

const sendCodeContent = ref("send");

let timer: null | number = null;

const sendCode = async () => {
  token.value = await Promise.resolve("fake token");

  let count = 60;
  sendCodeContent.value = `${count}s`;
  timer = setInterval(() => {
    count--;
    sendCodeContent.value = `${count}s`;
    if (count === 0) {
      timer && clearInterval(timer);
      sendCodeContent.value = "send";
    }
  }, 1000);
};

onBeforeUnmount(() => {
  timer && clearInterval(timer);
});
</script>

<template>
  <el-form label-width="120px">
    <el-form-item label="tel">
      <el-input v-model="tel"></el-input>
    </el-form-item>
    <el-form-item label="code">
      <el-input v-model="code" :disabled="token === ''">
        <template #append>
          <el-button
            type="primary"
            :disabled="tel === '' || sendCodeContent !== 'send'"
            @click="sendCode"
            >{{ sendCodeContent }}</el-button
          >
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="token === '' || tel === '' || code === ''"
        >submit</el-button
      >
    </el-form-item>
  </el-form>
</template>
