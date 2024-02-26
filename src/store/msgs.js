import { defineStore } from 'pinia';

export const useMsgsStore = defineStore('msgs', {
  state: () => ({
    msgs: null
  }),
  actions: {
    setMsgs(newMsgs) {
      this.msgs = newMsgs;
    },
    getMsgs() {
      return this.msgs;
    }
  },
});
