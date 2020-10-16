import { InjectionKey, onMounted, ref } from "vue";

export default class ClipboardService {
  static token: InjectionKey<ClipboardService> = Symbol();
  static getInstance(initContent: string) {
    return new ClipboardService(initContent);
  }

  // 初始文本
  initialContent = ref("");
  // 被复制节点
  copyRef = ref<any>(null);
  // 内容
  pasteContent = ref("");
  // 粘贴节点
  pasteRef = ref<any>(null);
  constructor(initialContent: string) {
    this.initialContent.value = initialContent;
    onMounted(() => {
      if (!this.copyRef.value || !this.pasteRef.value) return;
      this.copyRef.value.addEventListener("copy", () => {
        this.pasteContent.value = document.getSelection().toString();
      });
      this.copyRef.value.addEventListener("cut", () => {
        this.pasteContent.value = document.getSelection().toString();
      });
      this.pasteRef.value.addEventListener("paste", () => {
        this.initialContent.value += this.pasteContent.value;
      });
      this.pasteRef.value.addEventListener("cut", () => {
        const selection = document.getSelection();
        const { anchorOffset: start, focusOffset: end } = selection;
        const charArr = this.initialContent.value.split("");
        charArr.splice(start, end - start);
        const result = charArr.join("");
        this.initialContent.value = result;
      });
    });
  }
}
