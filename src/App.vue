<template>
  <v-app>
    <v-main>
       <v-app-bar title="Unokalkulator" class="px-5">
            <v-spacer />
            <v-icon color="error" icon="mdi-link-off" size="small"></v-icon>
            <!--<v-icon color="success" icon="mdi-link" size="small"></v-icon>-->
       </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
