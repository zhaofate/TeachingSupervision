import { defineStore } from 'pinia';

export const useMsgsStore = defineStore('msgs', {
  state: () => ({
    msgs: JSON.parse(localStorage.getItem("msgs")) || null,
  }),
  actions: {
    setMsgs(newMsgs) {
      this.msgs = newMsgs;
      localStorage.setItem("msgs",newMsgs)
    },
    getMsgs() {
      return this.msgs;
    }
  },
});
