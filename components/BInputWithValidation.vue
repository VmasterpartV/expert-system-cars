<template>
  <ValidationProvider
    v-slot="{ errors, valid }"
    :vid="vid"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
  >
    <b-field
      :class="margin"
      v-bind="$attrs"
      :type="{
        'is-danger': errors[0],
        'is-success': valid && !$attrs.readonly
      }"
      :message="getMessage(errors, valid, $attrs.message)"
    >
      <slot name="input">
        <b-input v-model="innerValue" v-bind="$attrs" />
      </slot>
    </b-field>
  </ValidationProvider>
</template>

<script>
import inputMixin from '~/mixins/input'

export default {
  mixins: [inputMixin],
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    margin: {
      type: String,
      default: 'mb-3'
    }
  },
  methods: {
    getMessage (errors, valid, message) {
      if (errors[0]) {
        return errors[0]
      }
      return message
    }
  }
}
</script>
