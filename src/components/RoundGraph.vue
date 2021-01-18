<template>
  <div class="container clip-circle" :style="cssVars">
    <div v-if="showValues" class="text-container">
      <div v-if="dueValue">
        <div class="title">
          {{dueTitle}}
        </div>
        <div class="value">
          ${{dueValue}}
        </div>
        <div class="separator" />
      </div>
      <div>
        <div class="title">
          {{newTitle}}
        </div>
        <div class="value">
          ${{newValue}}
        </div>
      </div>
    </div>
    <div class="glass" />
    <div class="new">
      <img src="/assets/blue-graph.png">
    </div>
    <div v-if="dueValue" class="due">
      <img src="/assets/green-graph.png">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    size: 300,
  }),
  props: {
    dueTitle: String,
    dueValue: {
      type: Number,
      default: 0
    },
    newTitle: String,
    newValue: {
      type: Number,
      default: 0
    },
    showValues: Boolean
  },
  computed: {
    total() {
      return this.dueValue + this.newValue;
    },
    newPos() {
      return  this.newValue ? Math.round(this.dueValue / this.total * this.size) : this.size;
    },
    duePos() {
      return this.dueValue ? 0 : this.size;
    },
    cssVars() {
      return {
        '--size': `${this.size}px`,
        '--center': `${this.size/2}px`,
        '--new-pos': `${this.newPos}px`,
        '--due-pos': `${this.duePos}px`,
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: var(--size);
  height: var(--size);
}
.text-container {
  position: absolute;
  z-index: 12;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 18px;
}
.value {
  font-size: 40px;
  font-weight: 600;
}
.separator {
  height: 2px;
  width: 200px;
  background-color: white;
  margin: 10px;
}
.glass {
  position: absolute;
  z-index: 9;
  width: var(--size);
  height: var(--size);
  background-image: url('/assets/circle-graph.png');
  background-size: var(--size);
}
.new {
  position: absolute;
  top: var(--size);
  z-index: 6;
  animation-name: new-anim;
  animation-duration: 1.5s;
  animation-delay: 2s;
  animation-fill-mode: forwards;
}
.due {
  position: absolute;
  top: var(--size);
  z-index: 3;
  animation-name: due-anim;
  animation-duration: 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}
@keyframes new-anim {
  0% { 
    top: var(--size);
    left: 0;
  }
  100% { 
    top: var(--new-pos);
    left: -300px;
  }
}
@keyframes due-anim {
  0% { top: var(--size); }
  100% { top: var(--due-pos); }
}
.clip-circle { 
  clip-path: circle(var(--center) at var(--center) var(--center));
}
</style>