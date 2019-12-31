<template>
  <div class="map">
    <v-stage ref="stage" :config="configKonva">
      <v-layer ref="layer">
        <v-group ref="group"> </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { addSubject } from "./scripts";

export default {
  name: "app",
  data: () => {
    return {
      configKonva: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  },
  mounted() {
    const layer = this.$refs.layer.getNode();
    const stage = this.$refs.stage.getNode();

    addSubject(layer, stage);
  },
};
</script>

<style lang="scss">
.map {
  width: 100vw;
  height: 100vh;
}
</style>
