<template>
  <div>
    <div class="container mx-auto py-20 px-4">
      <div class="text-center">
        <h1 class="text-4xl font-semibold text-gray-800 font-serif">{{title}}</h1>
        <p class="text-indigo-700 text-sm mt-2 border-b border-gray-400 pb-12">
          Room created by
          <a :href="'http://github.com/' + author.githubUsername">
            <span class="font-semibold border-b border-indigo-700">{{author.name}}</span>
          </a>
        </p>
      </div>
      <div v-if="escaped">
        <div class="container mx-auto py-16 lg:py-32 px-4">
          <h1 class="text-6xl font-semibold text-indigo-700 text-center">You escaped!</h1>
          <div class="mt-16">
            <div>
              <p class="mb-2 font-semibold text-center">Time remaining</p>
              <p class="mb-4 text-center">{{formattedTimeLeft}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-16 mb-32">
          <h2 class="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">Introduction</h2>
          <p class="whitespace-pre-wrap">{{introduction}}</p>
          <MDXProvider :components="components">
            <component :is="roomMarkdown"></component>
          </MDXProvider>
          <!-- <h2 class="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">Tasks</h2>
          <div v-for="(task, i) in tasks" :key="i">
            <div class="whitespace-pre-wrap mb-8">
              <p class="font-semibold">Task {{i + 1}}</p>
              <div v-if="task.reference">
                <alli-card class="inline-block my-4 md:my-0 md:ml-6 md:float-right">
                  <p class="font-semibold text-indigo-700 text-sm mb-2">Reference sheet</p>
                  <p>{{task.reference}}</p>
                </alli-card>
              </div>
              <p>{{task.question}}</p>
            </div>
          </div>-->
          <!-- <h2 class="text-2xl font-semibold text-indigo-700 font-serif mt-8 mb-4">Final Puzzle</h2>
          <p class="whitespace-pre-wrap">{{finalPuzzle.question}}</p>-->
        </div>
      </div>
    </div>
    <div v-if="!escaped" class="fixed bottom-0 inset-x-0 m-4 md:mb-8">
      <div class="max-w-screen-sm mx-auto">
        <div class="p-4 rounded bg-indigo-100 border border-indigo-200 shadow-md">
          <div class="flex items-stretch">
            <div class="self-center flex-1 text-center">
              <p class="text-5xl text-gray-800 font-mono">{{formattedTimeLeft}}</p>
            </div>
            <div class="flex-1">
              <input
                class="p-2 border border-indigo-200 uppercase font-semibold text-center w-full mb-4 shadow-inner"
                v-model="answer"
                placeholder="Answer"
                v-on:keyup.enter="checkAnswer(answer)"
              />
              <button
                :disabled="!answer.length"
                class="disabled:bg-indigo-200 bg-indigo-700 w-full p-2 text-white uppercase font-semibold"
                @click="checkAnswer(answer)"
              >Escape</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256";

import Heading1 from "../components/Heading1";
import Heading2 from "../components/Heading2";
import Link from "../components/Link";
import CodeBlock from "../components/CodeBlock";

import { MDXProvider } from "@mdx-js/vue";

export default {
  name: "Room",
  props: {
    roomId: String,
  },
  components: {
    MDXProvider,
  },
  data() {
    return {
      title: "",
      author: { name: "", githubUsername: "" },
      escaped: false,
      timeLeft: 0,
      introduction: "",
      tasks: [],
      finalAnswer: "",
      answer: "",
      timerInterval: null,
      components: {
        h1: () => Heading1,
        h2: () => Heading2,
        p: () => ({
          render() {
            return <p class="mb-8">{this.$slots.default}</p>;
          },
        }),
        a: () => Link,
        code: () => CodeBlock,
      },
    };
  },
  computed: {
    formattedTimeLeft() {
      var m = Math.floor(this.timeLeft / 60);
      var minutes = ("00" + m).slice(-2);

      var s = this.timeLeft % 60;
      var seconds = ("00" + s).slice(-2);

      return `${minutes}:${seconds}`;
    },
    roomMarkdown() {
      return () => import(`../rooms/${this.roomId}/index.mdx`);
    },
  },
  methods: {
    loadRoom() {
      this.roomMarkdown().then((room) => {
        this.title = room.metadata.title;
        this.author = room.metadata.author;
        this.introduction = room.metadata.introduction;
        this.finalAnswer = room.metadata.finalAnswer;
        this.timeLeft = room.metadata.timeLimit * 60;
      });
    },
    startTimer() {
      this.timerInterval = setInterval(() => (this.timeLeft -= 1), 1000);
    },
    checkAnswer(answer) {
      var userAnswerLower = answer.toLowerCase();
      var finalAnswerLower = this.finalAnswer.toLowerCase();

      if (
        sha256(userAnswerLower).toString() === finalAnswerLower ||
        userAnswerLower === finalAnswerLower
      ) {
        this.escaped = true;
        clearInterval(this.timerInterval);
      } else {
        this.answer = "";
      }
    },
  },
  watch: {
    timeLeft() {
      if (this.timeLeft == 0) {
        clearInterval(this.timerInterval);
      }
    },
  },
  mounted() {
    this.loadRoom();
    this.startTimer();
  },
};
</script>
