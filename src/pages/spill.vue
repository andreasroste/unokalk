<template>
  <v-container>
      <v-card class="p-5">
          <h1>Poengtavle</h1>
          <v-table>
            <thead>
                <tr>
                    <th>Navn</th>
                    <th>Poeng</th>
                    <th>Graf</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="spiller in spillere">
                    <td>{{spiller.name}}</td>
                    <td>{{spiller.poeng}}</td>
                    <td><v-sparkline :model-value="spillerpoengarray(spiller.id)" :smooth="10" :stroke-linecap="'round'" :gradient="gradient" :fill=true></v-sparkline></td>
                </tr>
            </tbody>
          </v-table>
          Snitt: {{snitt}}
      </v-card>


      <v-row class="align-center my-5">
        <v-btn block class="pa-2" color="success" prepend-icon="mdi-plus" @click="poengdialog=true">Legg inn poeng</v-btn>
      </v-row>

      <v-row class="align-center my-5">
        <v-btn class="pa-2" @click="nyspillerdialog = true" color="primary">Ny spiller</v-btn>
        <v-btn class="pa-2" @click="sumPoeng" color="primary">Summere</v-btn>
        <v-btn class="pa-2" v-if="!kunkalkulator" color="error">Avslutt tidlig</v-btn>
        <v-btn class="pa-2" href="https://docs.google.com/document/d/1xCRAahDAeSWZ9jZteKSjhIDmXHRHkmAAckj7r0vjez4" color="info">Regler (norsk)</v-btn>
      </v-row>

      <v-dialog v-model="poengdialog" scrollable>
          <v-card>
            <v-toolbar dark color="primary">
              <v-toolbar-title>Legg inn poeng</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="poengdialog = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
            <v-card-text style="padding-top: 20px">
              <v-number-input control-variant="hidden"
                v-for="spiller in spillere"
                :label="spiller.name"
                append-inner-icon="mdi-party-popper"
                @click:append-inner="rundeVinner(spiller.id)"
                :disabled="vinner == spiller.id"
                type="number"
                v-model="poeng_runde[spiller.id]"
              >
              </v-number-input>
              <v-btn
                color="primary"
                block
                style="margin: 20px 0"
                @click="lagreRunde()"
                >Legg inn og begynn ny runde</v-btn
              >
            </v-card-text>
          </v-card>
        </v-dialog>


      <v-dialog v-model="nyspillerdialog">
        <v-card v-if="kunkalkulator">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Legg inn spiller</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="nyspillerdialog = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <v-text-field label="Navn" v-model="manuelltnavn" class="mx-5"></v-text-field>
                <v-btn
                    color="primary"
                    block
                    style="margin: 20px 0"
                    @click="leggtilmanuell(manuelltnavn)">
                    Legg til spiller
                </v-btn>
            </v-card-text>
        </v-card>
      </v-dialog>

      <v-expansion-panels class="mt-10">

      <v-expansion-panel :title="'Runde ' + (i+1)" v-for="runde, i in runder" key="i">
          <v-expansion-panel-text>
          <v-table>
            <thead>
                <tr>
                    <th>Navn</th>
                    <th>Poeng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="spiller in spillere">
                    <td>{{spiller.name}}</td>
                    <td>{{getRundePoeng(i, spiller.id)}}</td>
                </tr>
            </tbody>
          </v-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
      </v-expansion-panels>
  </v-container> 
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    var spillerrunde = ref(1)
    var spillere = ref([])
    var allespillere = ref([])
    var runder = ref([])
    var poengdialog = ref(false)
    var vinner = ref(null)
    var poeng_runde = ref({})
    var kunkalkulator = ref(false)
    var nyspillerdialog = ref(false)
    var manuelltnavn = ref("")
    var snitt = ref(0)
    var gradient = ref(['red', 'green'])

    onMounted(() => {
        let spillinfo = JSON.parse(localStorage.getItem("spillinfo"))
        spillere.value = spillinfo.spillere
        spillere.value.map(o => {
            if(!('poeng' in o)){
                o.poeng = 0
            }
        })
        if('runder' in spillinfo){
            runder.value = spillinfo.runder
        }
        if(spillinfo.kunkalk) {
            kunkalkulator.value = true
        }
    })

    function saveToLocalStorage() {
       let spillinfo = JSON.parse(localStorage.getItem("spillinfo"))
       spillinfo.runder = runder.value
       spillinfo.spillere = spillere.value
       localStorage.setItem("spillinfo", JSON.stringify(spillinfo))
    }

    function lagreRunde() {
       var keys = Object.keys(poeng_runde.value)
       var tot = []
       keys.forEach(k => {
        tot.push({id: k, poeng: Number(poeng_runde.value[k])})
       })
       runder.value.push(tot)
       sumPoeng()
       poengdialog.value=false
       poeng_runde.value = {}
       saveToLocalStorage()
       spillerrunde.value++
       vinner.value = null
    }

    function getRundePoeng(runde, spillerid) {
        let r = runder.value[runde]
        let spillerirunde = r.find(o => o.id == spillerid)
        if(spillerirunde){
            if(spillerirunde.nyspiller){
                return spillerirunde.poeng + " (startpoeng)"
            }else{
                return spillerirunde.poeng
            }
        } else {
            return 0
        }
    }

    function sumPoeng() {
        let r = runder.value
        let s = spillere.value
        let t = {}
        s.map(o => {
            t[o.id] = 0
        })
        r.forEach(o => {
            o.forEach(p => {
                t[p.id] += p.poeng
            })
        })
        let total = 0
        s.map(o => {
            o.poeng = Number(t[o.id])
            total += o.poeng
        })
        snitt.value = Math.round(Number(total/s.length))
    }

    function spillerpoengarray(id) {
        let r = runder.value
        let res = []
        let tot = 0
        r.forEach(a => {
            let poeng = a.filter(o => o.id == id)
            if(poeng && poeng.length > 0) {
                tot += poeng[0].poeng
                res.push(tot)
            }
        })
        return res
    }

    function rundeVinner(id) {
       vinner.value = id
       poeng_runde.value[id] = -20
    }

    function leggtilmanuell(navn){
        let sp = spillere.value
        let id = sp.length
        let obj = {id: id, name: navn, poeng: snitt.value}
        spillere.value.push(obj)
        
        if(runder.value.length > 0) {
            runder.value[runder.value.length-1].push({id: id, poeng: snitt.value, nyspiller: true})
        }
        saveToLocalStorage()
        nyspillerdialog.value = false
    }


</script>
