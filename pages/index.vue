<template>
  <section class="section">
    <div class="columns is-vcentered">
      <div class="column is-2 mr-5 is-offset-2">
        <b-image :src="require('@/assets/mecanico.png')"> </b-image>
      </div>
      <div class="column">
        <h1 class="title is-5">
          ¡Bienvenido, yo te ayudaré a encontrar el auto ideal para ti!
          <br /><br />
          Empezaremos con unas preguntas
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
              :name="quest.id"
              :native-value="option.id"
              :disabled="response.id || response.message"
            >
              {{ option.label }}
            </b-radio>
          </div>
        </div>
      </div>
    </div>
    <div class="columns mt-2">
      <div class="column is-offset-7">
        <b-button
          type="is-info"
          :disabled="response.id || response.message"
          @click="findCar"
        >
          Consultar
        </b-button>
      </div>
    </div>
    <br />
    <div v-if="response.id || response.message" class="has-text-centered">
      <div class="columns is-centered is-vcentered">
        <div class="column is-3">
          <div
            v-if="response.message"
            class="notification is-light is-danger p-5"
          >
            No se encontró ningún auto que coincida con su búsqueda
          </div>
          <div v-else class="notification is-light is-info p-5">
            {{ response.response }}
          </div>
        </div>
        <div v-if="response.image" class="column is-4 is-offset-1">
          <b-image
            :src="$store.state.domain + response.image"
            alt="Car picture"
            :rounded="rounded"
          ></b-image>
        </div>
        <div v-else class="column is-3 is-offset-1">
          <b-image
            :src="require('@/assets/no_car.jpeg')"
            alt="Car picture"
          >
          </b-image>
        </div>
      </div>
      <div class="buttons is-centered">
        <b-button type="is-info" @click="reset">
          Nueva consulta
        </b-button>
        <b-button
          v-if="!response.message"
          type="is-success"
          @click="isActive = !isActive"
        >
          Explicación
        </b-button>
        <b-button v-else type="is-primary" @click="toExpert">
          Brindar respuesta
        </b-button>
      </div>
      <b-notification
        v-if="response.reason"
        v-model="isActive"
        type="is-light is-success"
        :closable="false"
        style="width: 40%; text-align: center; margin: auto;"
      >
        {{ response.reason }}
      </b-notification>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      questions: [],
      listQuery: {
        search: '',
        limit: 20,
        page: 1
      },
      responses: [],
      response: {},
      isActive: false
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
    async findCar () {
      if (!this.validResponse()) {
        this.$buefy.toast.open({
          message: 'Por favor, responda todas las perguntas',
          type: 'is-danger'
        })
        return
      }
      const payload = {
        options: this.responses
      }
      const data = await this.$store.dispatch('findCar', payload)
      this.response = data
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
    reset () {
      this.response = {}
      this.responses = []
    },
    toExpert () {
      this.$router.push('/expert?array=' + this.responses)
    }
  }
}
</script>
