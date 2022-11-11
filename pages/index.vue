<template>
  <section class="section">
    <div v-if="questions.length > 0">
      <div v-for="(quest, i) in questions" :key="quest.id">
        <br />
        <p class="mb-2">
          {{ quest.label }}
        </p>
        <div v-for="option in quest.options" :key="option.id">
          <div class="block">
            <b-radio
              v-model="responses[i]"
              :name="quest.id"
              :native-value="option.id"
            >
              {{ option.label }}
            </b-radio>
          </div>
        </div>
      </div>
      <br />
      {{ responses }}
      <br /><br />
      <b-button type="is-primary" @click="findCar">Consultar</b-button>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

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
      responses: []
    }
  },
  components: {
    Card
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
    findCar () {
      if (this.responses.length < 4) {
        this.$buefy.toast.open({
          message: 'Por favor, responda todas las perguntas',
          type: 'is-danger'
        })
        return
      }
      console.log(this.responses)
    }
  }
}
</script>
