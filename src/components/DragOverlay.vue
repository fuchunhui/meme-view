<script setup lang="ts">
import {computed, onBeforeUnmount, ref} from 'vue';

type DragLayer = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
};

type DragMovePayload = {
  id: string;
  x: number;
  y: number;
};

const props = defineProps<{
  layers: DragLayer[];
  bounds: { width: number; height: number };
  disabled?: boolean;
  offset?: { top?: number; left?: number };
}>();

const emit = defineEmits<{
  (event: 'dragStart', payload: DragMovePayload): void;
  (event: 'dragMove', payload: DragMovePayload): void;
  (event: 'dragEnd', payload: DragMovePayload): void;
}>();

const buffer = 20;
const activeId = ref<string | null>(null);
const startPoint = ref({ x: 0, y: 0 });
const startPosition = ref({ x: 0, y: 0 });
const lastPosition = ref({ x: 0, y: 0 });

const overlayOffset = computed(() => ({
  top: props.offset?.top ?? 10,
  left: props.offset?.left ?? 10,
}));

const findLayer = (id: string) => props.layers.find(layer => layer.id === id);

const clampPosition = (layer: DragLayer, nextX: number, nextY: number) => {
  const maxX = props.bounds.width - layer.width + buffer;
  const maxY = props.bounds.height - layer.height + buffer;

  return {
    x: Math.max(Math.min(nextX, maxX), -buffer),
    y: Math.max(Math.min(nextY, maxY), -buffer),
  };
};

const handleMouseMove = (event: MouseEvent) => {
  if (!activeId.value) {
    return;
  }

  const layer = findLayer(activeId.value);
  if (!layer) {
    return;
  }

  const dx = event.clientX - startPoint.value.x;
  const dy = event.clientY - startPoint.value.y;
  const next = clampPosition(layer, startPosition.value.x + dx, startPosition.value.y + dy);
  lastPosition.value = next;

  emit('dragMove', {
    id: layer.id,
    x: next.x,
    y: next.y,
  });
};

const resetListeners = () => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
};

const handleMouseUp = () => {
  if (!activeId.value) {
    return;
  }

  emit('dragEnd', {
    id: activeId.value,
    x: lastPosition.value.x,
    y: lastPosition.value.y,
  });

  activeId.value = null;
  resetListeners();
};

const handleMouseDown = (layer: DragLayer, event: MouseEvent) => {
  if (props.disabled) {
    return;
  }

  activeId.value = layer.id;
  startPoint.value = { x: event.clientX, y: event.clientY };
  startPosition.value = { x: layer.x, y: layer.y };
  lastPosition.value = { x: layer.x, y: layer.y };

  emit('dragStart', {
    id: layer.id,
    x: layer.x,
    y: layer.y,
  });

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

  event.preventDefault();
};

onBeforeUnmount(() => {
  resetListeners();
});

const itemStyle = (layer: DragLayer) => ({
  width: `${layer.width}px`,
  height: `${layer.height}px`,
  transform: `translate(${layer.x}px, ${layer.y}px)`,
});
</script>

<template>
  <div
    class="drag-overlay"
    :class="{
      'drag-overlay--disabled': disabled,
    }"
    :style="{
      width: `${bounds.width}px`,
      height: `${bounds.height}px`,
      top: `${overlayOffset.top}px`,
      left: `${overlayOffset.left}px`,
    }"
  >
    <div
      v-for="layer in layers"
      :key="layer.id"
      class="drag-overlay__item"
      :style="itemStyle(layer)"
      @mousedown="event => handleMouseDown(layer, event as MouseEvent)"
    >
      <span class="drag-overlay__tag">{{ layer.type.toLowerCase() }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.drag-overlay {
  position: absolute;
  pointer-events: auto;
  user-select: none;
  z-index: 2;

  &--disabled {
    pointer-events: none;
    opacity: 0.4;
  }

  &__item {
    position: absolute;
    box-sizing: border-box;
    border: 1px dashed #ff6b6b;
    border-radius: 2px;
    cursor: move;
    background: rgba(255, 107, 107, 0.08);

    &:hover {
      border-color: #ff3b30;
    }
  }

  &__tag {
    position: absolute;
    top: -18px;
    left: 0;
    padding: 0 4px;
    font-size: 10px;
    color: #ff3b30;
    background: #fff1f0;
    border: 1px solid #ff6b6b;
    border-radius: 2px;
    text-transform: lowercase;
  }
}
</style>
