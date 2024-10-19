<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <!-- <ion-title>Página Inicial</ion-title> -->
            </ion-toolbar>
        </ion-header>

        <ion-content>

            <div id="block1" class="ion-padding"
                style="padding-bottom: 4rem; background-image: linear-gradient(to bottom right, var(--ion-color-tertiary) -20%, var(--ion-color-lightaccent),var(--ion-color-secondary) 120%  );">
                <div style="max-width: 992px;" class="mx-auto">
                    <ion-grid>
                        <ion-row>
                            <ion-col style="padding: 0;" size="12" size-md="6">

                                <ion-row>
                                    <ion-col class="ion-hide-md-up" size="12">
                                        <img alt="destaque" src="../../public/destaque.png"
                                            style="display: block; margin: 0 auto;">
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-text color="primary">
                                            <h1 class="ion-text-left ion-text-bold" color="tertiary">Pré-matrículas
                                                abertas</h1>
                                        </ion-text>
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-text color="primary">
                                            <ion-label class="ion-text-uppercase">encerra em:</ion-label>
                                        </ion-text>
                                    </ion-col>
                                    <ion-col size="12">
                                        <remainingTime />
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-text color="primary">
                                            <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit blanditiis
                                                suscipit
                                                itaque vel explicabo ducimus dolor rerum, velit soluta fugit sunt
                                                repudiandae id
                                                ipsam, quos perferendis voluptatem reiciendis officiis odio?</p>
                                        </ion-text>
                                    </ion-col>
                                    <ion-col size="12">
                                        <div class="ion-padding-bottom ">
                                            <ion-button href="/inicio#block2" expand="full">Começar Agora</ion-button>
                                            <ion-button href="/inicio#block3" expand="full" color="tertiary">Acompanhar
                                                Pré-Matrícula</ion-button>
                                        </div>
                                    </ion-col>
                                </ion-row>
                            </ion-col>
                            <ion-col class="ion-hide-md-down my-auto" style="padding: 0;" size="12" size-md="6"> <img
                                    alt="destaque" src="../../public/destaque.png"
                                    style="display: block; margin: 0 auto;"></ion-col>
                        </ion-row>

                    </ion-grid>

                </div>
            </div>
            <div id="block2" class="ion-padding-top"
                style="background-color: var(--ion-color-secondary); padding-bottom: 4rem;">
                <div style="max-width: 992px;" class="mx-auto">

                    <div class="ion-padding-vertical"
                        :class="pageWidth?.pageWidth < 992 ? 'ion-padding-start ion-padding-end' : ''">
                        <h2 v-if="etapa < 4" class="dark-background-title" style="padding-left: 6px;">
                            Selecione {{ etapa > 1 && etapa < 3 ? 'o curso' : etapa > 2 && etapa < 4 ? 'a série'
                                : 'a escola' }} </h2>
                                    <h2 v-else class="dark-background-title" style="padding-left: 6px;">
                                        Preencha o formulário
                                    </h2>

                                    <div v-if="etapa == 1" class="ion-padding-top ">
                                        <ion-searchbar @ionInput="handleInput($event)"
                                            placeholder="Buscar Escola..."></ion-searchbar>
                                    </div>
                    </div>
                    <startEnrollment v-model="etapa" :searchbox="queryBlock2" />
                </div>

            </div>

            <div id="block3" class="ion-padding-top"
                style="background-color: var(--ion-color-lightaccent); padding-bottom: 4rem; ">
                <div style="max-width: 992px;" class="mx-auto" :class="pageWidth?.pageWidth < 992 ? 'ion-padding' : ''">
                    <h2 class="dark-background-title" style="padding-left: 6px;">
                        <ion-text color="primary">
                            Acompanhe sua matrícula
                        </ion-text>
                    </h2>
                    <div class="ion-padding-top ">
                        <ion-searchbar placeholder="Buscar Aluno..."></ion-searchbar>
                    </div>
                    <div class="ion-padding-bottom ion-padding-top">
                        <trackEnrollment />
                        <div class="ion-padding-bottom ion-padding-top">
                            <ion-button expand="full" href="/inicio#block2">Começar Agora</ion-button>
                            <ion-button expand="full" color="tertiary">Acompanhar
                                Pré-Matrícula</ion-button>
                        </div>
                    </div>
                </div>

            </div>
            <div id="footer">
                <appFooter />
            </div>

        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import startEnrollment from '@/components/StartEnrollment.vue';
import trackEnrollment from '@/components/TrackEnrollment.vue';
import appFooter from '@/components/AppFooter.vue';
import { catchPageWidth } from '@/utils/useUtils';
import remainingTime from '@/components/RemainingTime.vue'
const etapa = ref(1)
const pageWidth = ref()
// const router = useRouter()

const queryBlock2 = ref()

// const navigateToDetails = () => {
//     router.push('/details');
// };



function handleInput(event: { target: { value: string; }; }) {
    const query = event.target.value.toLowerCase();
    queryBlock2.value = query
}
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://hokeopsqpxnvfhczdhzc.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhva2VvcHNxcHhudmZoY3pkaHpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NzkyNzksImV4cCI6MjA0MDI1NTI3OX0.JC5yB090108l04qPkDYL_gvDQJQX6yH8QwsIEQ58oEg'
// const supabase = createClient(supabaseUrl, supabaseKey)

// const dados = ref()


// onMounted(async () => {
//     const { data, error } = await supabase
//         .from('school')
//         .select('*')
//         dados.value = data

//         console.log(error);

// })

onMounted(() => {
    pageWidth.value = catchPageWidth()
})
</script>

<style scoped>
h1 {
    margin-top: 20px;
    font-size: 1.8rem;
    font-weight: bolder;
}

.dark-background-title {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
