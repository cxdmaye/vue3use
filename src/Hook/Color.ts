import { reactive, computed } from "vue";

export default function Color() {
  let colorOpt = reactive({
    h: 0,
    s: 0,
    l: 0,
  });

  let color = computed(() => {
    let { h, s, l } = colorOpt;
    return `hsl(${h}deg,${s}%,${l}%)`;
  });

  return {
    colorOpt,
    color,
  };
}
