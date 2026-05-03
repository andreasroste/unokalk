<template>
  <v-container>
    <v-card v-if="spillinfo != null" class="p-5">
        <v-alert
        density="compact"
        title="Pågående spill"
        type="warning">
            Det ser ut som at du har et pågående spill fra {{spillinfo.start}}
        </v-alert>
        Spillere:
        <ul>
            <li v-for="spiller in spillinfo.spillere">{{spiller.name}}: {{spiller.poeng}}</li>
        </ul>

        <v-btn color="info" to="/spill" block>Hopp inn i spillet</v-btn>
        <v-btn color="error" @click="sikker = true" block class="mt-5">Slett spillet</v-btn>
        <v-btn color="error" v-if="sikker" @click="slettSpill()" block class="mt-5">Sikker?</v-btn>
        
    </v-card>

    <v-btn color="success" to="/start" block size="large" class="mt-5">Start nytt spill</v-btn>
  </v-container>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    
    var spillinfo = ref(null)
    var sikker = ref(false)

    onMounted(() => {
        let spillinfojson = JSON.parse(localStorage.getItem("spillinfo"))
        if(spillinfojson) {
            spillinfo.value = spillinfojson
            spillinfo.value.start = (new Date(spillinfo.value.start)).toLocaleDateString("nb-NO")
        }
    })

    function slettSpill() {
        localStorage.removeItem("spillinfo")
        spillinfo.value = null
    }
</script>
