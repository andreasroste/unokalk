<template>
    <v-container>
        <h1>Hvem skal spille?</h1>
        <v-card title="Legg til spillere" flat class="mt-5">
            <v-card v-if="kunkalk">
                <v-text-field label="Navn" v-for="i in antallmanuelle" v-model="manuellenavn[i-1]" class="mx-5"></v-text-field>
                <v-btn @click="antallmanuelle++" color="primary" class="mx-5 mb-5">Legg til flere</v-btn>
            </v-card>
            <v-table v-else>
                <thead>
                    <tr>
                        <th>Navn</th>
                        <th>Legg til</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="spiller in allespillere" v-key="spiller.id">
                        <td>{{spiller.name}}</td>
                        <td>
                            <v-btn v-if="valgtespillere.includes(spiller)" prepend-icon="mdi-minus" color="primary" size="small" @click="removeSpiller(spiller.id)">Fjern</v-btn>
                            <v-btn v-else prepend-icon="mdi-plus" size="small" color="secondary" @click="addSpiller(spiller.id)">Legg til</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
        <v-row class="mt-5">
            <v-spacer />
            <v-btn append-icon="mdi-arrow-right" @click="startGame">
                Start
            </v-btn>
        </v-row>
    </v-container>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()
    const route = useRoute()

    const kunkalk = ref(true)
    const antallmanuelle = ref(2)
    const manuellenavn = ref([])

    var allespillere = ref([{id: 1, name: "Spiller 1"}, {id: 2, name: "Spiller 2"}, {id: 3, name: "Spiller 3"}])
    var valgtespillere = ref([])

    function addSpiller(id) {
        let spiller = allespillere.value.filter(a => a.id == id)
        valgtespillere.value.push(spiller[0])
    }
    function removeSpiller(id) {
        valgtespillere.value = valgtespillere.value.filter(a => a.id != id)
    }

    function startGame(){
        if(kunkalk.value){
            valgtespillere.value = []
            manuellenavn.value.forEach(a => {
                valgtespillere.value.push({id: valgtespillere.value.length, name: a})
            })
        }



        let spillinfo = {start: (new Date), spillere: valgtespillere.value, kunkalk: kunkalk.value}
        spillinfo = JSON.stringify(spillinfo)
        localStorage.setItem("spillinfo", spillinfo)

        router.push({name: "/spill"})
    }
</script>
