<template>
    <div  class="ion-padding-bottom" >
        <div style="min-height: 250px; " :class="'flex wrap'">

            <container v-if="loading"
                style="height: 120px; width: 120px; background-color: white; margin: auto; border-radius: 100%;"
                class="flex">

                <ion-icon v-if="finished" :icon="checkmarkCircleOutline" class="my-auto mx-auto"
                    style="font-size: 80px; color:lawngreen;"></ion-icon>
                <ion-spinner v-else class="my-auto mx-auto" name="crescent"></ion-spinner>

            </container>
            <!-- Etapa 1 -->
            <selectSchoolSlider v-else-if="etapa == 1" v-model="selectedSchool" :query="props.searchbox" />
            <!-- Etapa 2 -->
            <div v-else-if="etapa == 2">
                <ion-button color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'" @click="etapa = (etapa - 1)">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-button>
                <div>
                  
                    <selectCourseSlider v-model="selectedCourse" :school="selectedSchool?.id" />
                </div>
            </div>
            <div v-else-if="etapa == 3">
                <ion-button color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'" @click="etapa = (etapa - 1)">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-button>
                <div class="ion-padding-top">
                
                    <selectSeriesSlider v-model="selectedSeries" :course="selectedCourse?.id" />
                </div>
            </div>
            <div style="width: 100%;" v-else-if="etapa == 4">
                <ion-button color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'" @click="etapa = (etapa - 1)">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-button>
                <div class="ion-padding-top ">
                    <ion-grid style="padding: 0;" >
                        <ion-row>
                            <ion-col style="padding: 0;" size="12">
                                    <formEnrollment />

                            </ion-col>

                        </ion-row>
                    </ion-grid>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, watch, defineEmits, onMounted, defineProps } from 'vue';

import { IonSpinner } from '@ionic/vue';

import selectSeriesSlider from '@/components/SelectSeriesSlider.vue';
import selectCourseSlider from '@/components/SelectCourseSlider.vue';
import selectSchoolSlider from '@/components/SelectSchoolSlider.vue';
import formEnrollment from '@/components/FormEnrollment.vue'

import { IonIcon } from '@ionic/vue';
import { checkmarkCircleOutline, arrowBackOutline } from 'ionicons/icons';
import { catchPageWidth } from '@/utils/useUtils';

interface Props {
    searchbox: string
}
const emits = defineEmits(['update:modelValue']);
const props = defineProps<Props>()

const pageWidth = ref()
const loading = ref(false)
const finished = ref(false)
const etapa = ref(1)

const selectedSchool = ref()
const selectedCourse = ref()
const selectedSeries = ref()

watch(selectedSchool, (value) => {
    if (value) {
        loading.value = true
        finished.value = false

        // console.log('selectedSchool:', value)

        setTimeout(() => {
            finished.value = true;
        }, 500); // 1 segundo antes de loading se tornar false

        setTimeout(() => {
            loading.value = false;
            finished.value = true;
        }, 1500); // 1 segundo depois de finished se tornar true

        etapa.value = 2
    }
})


watch(selectedCourse, (value) => {
    if (value) {
        loading.value = true
        finished.value = false

        setTimeout(() => {
            finished.value = true;
        }, 500); // 1 segundo antes de loading se tornar false

        setTimeout(() => {
            loading.value = false;
            finished.value = true;
        }, 1500); // 1 segundo depois de finished se tornar true

        etapa.value = 3
    }
})


watch(selectedSeries, (value) => {
    if (value) {
        loading.value = true
        finished.value = false

        setTimeout(() => {
            finished.value = true;
        }, 500); // 1 segundo antes de loading se tornar false

        setTimeout(() => {
            loading.value = false;
            finished.value = true;
        }, 1500); // 1 segundo depois de finished se tornar true

        etapa.value = 4
    }
})


watch(etapa, (value) => {
    if (value) {
        emits('update:modelValue', value)
    }
})

onMounted(() => {
    pageWidth.value = catchPageWidth()
})
</script>
<style scoped>
ion-spinner {
    width: 80px;
    height: 80px;
}
</style>