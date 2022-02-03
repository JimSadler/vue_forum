<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <VeeField
      :label="label"
      :name="name"
      :modelValue="modelValue"
      @input="$emit('modelUpdate', $event)"
      :id="name"
      class="form-input"
      rules="required|min:8"
      v-bind="$attrs"
    />
    <VeeErrorMessage :name="name" class="form-error" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    modelValue: { type: String, default: '' },
  },
}
</script>
