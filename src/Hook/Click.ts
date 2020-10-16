import { ref, Ref } from "vue";

export default function Click() {
  const x: Ref<number> = ref(0);

  const counter = () => {
    x.value++;
  };

  return {
    x,
    counter,
  };
}
