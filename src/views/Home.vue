<template>
  <div class="max-w-2xl p-3 py-10 mx-auto">
    <h1 class="mb-2 text-6xl">
      Chat simulator
    </h1>
    <p class="mb-6 text-xl italic">
      The easy way to fake a chat conversation
    </p>

    <p class="mb-4">
      Simulate a fake chat conversation with your friends and colleagues easily in your browser.
    </p>
    <router-link
      to="/simulator"
      class="block p-3 mb-6 text-2xl text-center text-white bg-red-700 rounded shadow"
    >
      Create new fake chat
    </router-link>

    <h2 class="py-1 text-sm italic text-center">
      Example of the chat simulator
    </h2>
    <iframe
      title="Example of the chat simulator"
      src="/year"
      width="100%"
      style="height: 500px;"
    />

    <h2 class="mt-10 mb-6 text-4xl">
      About chat-simulator.com
    </h2>
    <p>
      This is a private project to try out some new web-technologies like Vue3 with Composition api, Tailwindcss, Typescript and newer browser features (drag and drop, image handling).
      Feel free to check out the code on <a
        class="underline hover:no-underline"
        rel="noreferrer"
        href="https://github.com/johannesdz/chat-simulator"
        target="_blank"
      >GitHub</a>. Also i think its quiet useful to set up a quick chat conversation to prank or surprise somebody;-)
    </p>

    <h2 class="my-8 text-4xl">
      Features
    </h2>
    <h3 class="mb-2 text-xl">
      User management
    </h3>
    <ul class="px-5 mb-8 list-disc">
      <li>Create unlimited members</li>
      <li>Set images via drag & drop</li>
      <li>Change color of users</li>
      <li>Spacial members for admin- and "me" messages</li>
    </ul>

    <h3 class="mb-2 text-xl">
      Chat / Messages
    </h3>
    <ul class="px-5 mb-8 list-disc">
      <li>Create unlimited messages</li>
      <li>Edit messages with live editor</li>
      <li>Add images</li>
      <li>Change order of messages via drag & drop</li>
    </ul>

    <h3 class="mb-2 text-xl">
      Player
    </h3>
    <ul class="px-5 mb-8 list-disc">
      <li>Messages will automatically pop in</li>
      <li>Stop / Pause functionality</li>
      <li>Edit messages while in play-mode</li>
    </ul>

    <h3 class="mb-2 text-xl">
      Future features
    </h3>
    <ul class="px-5 mb-8 list-disc">
      <li>Enable browser storage to persist chat</li>
      <li>Enable import / export functionality</li>
      <li>Optimize image payload</li>
      <li>Add smilies functionality</li>
      <li>Add share functionality</li>
    </ul>

    <h2 class="mt-10 mb-6 text-4xl">
      How does it work?
    </h2>
    <p>
      You can generate easily a fake group chat conversation like Whatsapp, Facebook or Telegram. After creating members/users, you can add messages in your chat. Once all messages are set up, you have the possibility to live-preview the chat conversation via the "play" button.<br>
      Until the share functionality is ready, you have the option to screen record the fake conversation. Also be aware, that the created conversation is gone, once you close or refresh the browser.
    </p>

    <h2 class="mt-10 mb-6 text-4xl">
      Need more information?
    </h2>
    <p>Feel free to contact me on info@chat-simulator.com</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {

  },
  setup() {
    return {}
  }
})
</script>
