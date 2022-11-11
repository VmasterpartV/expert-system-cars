<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column is-2 mr-5 is-offset-2">
        <b-image :src="require('@/assets/mecanico.png')"> </b-image>
      </div>
      <div class="column">
        <h1 class="title is-5">
          ¡Bienvenido, experto!
          <br /><br />
          ¡Juntos ayudaremos a encontrar los mejores automóviles a todo el
          mundo!
        </h1>
      </div>
    </div>

    <div v-if="questions.length > 0" class="columns is-multiline">
      <div
        v-for="(quest, i) in questions"
        :key="quest.id"
        class="column is-offset-1 is-5"
      >
        <br />
        <p class="mb-2">
          <b>{{ quest.label }}</b>
        </p>
        <div v-for="option in quest.options" :key="option.id">
          <div class="block">
            <b-radio
              v-model="responses[i]"
              :name="quest.id.toString()"
              :native-value="option.id"
              :disabled="response.id || response.message"
              @input="findCar()"
            >
              {{ option.label }}
            </b-radio>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div v-if="validResponse()">
      <b-field label="Respuesta" horizontal>
        <b-input v-model="response.response" type="textarea"> </b-input>
      </b-field>
      <b-field label="Explicación" horizontal>
        <b-input v-model="response.reason" type="textarea"> </b-input>
      </b-field>
      <b-field
        label="Imagen"
        horizontal
        class="file is-primary"
        :class="{ 'has-name': !!file }"
      >
        <b-upload v-model="file" class="file-label">
          <span class="file-cta">
            <b-icon class="file-icon" icon="upload"></b-icon>
            <span class="file-label">Click to upload</span>
          </span>
          <span class="file-name" v-if="file">
            {{ file.name }}
          </span>
        </b-upload>
      </b-field>
      <b-field v-if="response.image && !file" label="" horizontal>
        <a :href="$store.state.domain + response.image" target="_blank">
          Ver imagen actual
        </a>
      </b-field>
      <br />
      <div class="buttons is-centered">
        <b-button type="is-info" @click="reset">
          Nueva consulta
        </b-button>
        <b-button type="is-success" @click="save">
          Guardar
        </b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExpertPage',
  data () {
    return {
      questions: [],
      responses: [],
      response: {},
      file: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const data = await this.$store.dispatch('getQuestions', this.listQuery)
      this.questions = data
      console.log(data)
    },
    validResponse () {
      if (this.responses.length < 4) {
        return false
      }
      for (let i = 0; i < this.responses.length; i++) {
        if (this.responses[i] == null) {
          return false
        }
      }
      return true
    },
    async findCar () {
      if (!this.validResponse()) {
        return
      }
      const payload = {
        options: this.responses
      }
      const data = await this.$store.dispatch('findCar', payload)
      this.response = data
      console.log(data)
    },
    reset () {
      this.response = {}
      this.responses = []
      this.file = null
    },
    async save () {
      try {
        const car = {
          id: this.response.id,
          response: this.response.response,
          reason: this.response.reason,
          image: this.file,
          options: this.responses
        }
        if (!this.file) {
          delete car.image
        }
        if (!this.response.id) {
          delete car.id
        }
        console.log(car)

        let data = ''
        if (this.file) {
          data = await this.$store.dispatch('newCarFile', car)
        } else {
          data = await this.$store.dispatch('newCar', car)
        }

        console.log(data)
        this.$buefy.toast.open({
          message: '¡Respuesta guardada correctamente!',
          type: 'is-success'
        })
        this.reset()
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Error al guardar la respuesta :(',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
