<script lang="ts">
  import Button from "@smui/button";
  import Textfield from "@smui/textfield";
  import { onDestroy } from "svelte";

  let tel = "";
  let code = "";
  let token = "";
  let sendCodeContent = "Send";
  let interval: number | null = null;

  const sendCode = async (e: CustomEvent) => {
    e.preventDefault();

    token = await Promise.resolve("fake token");

    let count = 60;
    sendCodeContent = `${count}s`;
    interval = setInterval(() => {
      count--;
      sendCodeContent = `${count}s`;
      if (count === 0) {
        interval && clearInterval(interval);
        sendCodeContent = "Send";
      }
    }, 1000);
  };

  onDestroy(() => {
    interval && clearInterval(interval);
  });

  const submit = async (e: CustomEvent) => {
    e.preventDefault();
  };

  const handleCodeChange = (e: CustomEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (token) {
      code = target.value;
    } else {
      target.value = "";
    }
  };
</script>

<div>
  <form>
    <div>
      <Textfield type="text" label="tel" bind:value={tel} />
    </div>
    <div>
      <Textfield
        type="text"
        label="code"
        value={code}
        on:input={handleCodeChange}
      >
        <Button slot="trailingIcon" disabled={tel === ""} on:click={sendCode}
          >{sendCodeContent}</Button
        >
      </Textfield>
    </div>
    <div style="margin-top: 2em;">
      <Button variant="raised" on:click={submit}>submit</Button>
    </div>
  </form>
</div>
