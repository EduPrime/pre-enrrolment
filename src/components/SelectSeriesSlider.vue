<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonCard, IonCardHeader, IonText } from '@ionic/vue'
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'

import SeriesService from '../services/SeriesService'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

//  const onSwiper = (swiper) => {
//      console.log(swiper);
//  };

//  const onSlideChange = () => {
//      console.log('slide change');
//  };

const modules = [Navigation, Pagination, Scrollbar, A11y]

//

interface Props {
  course: string
}

const postgrest = new SeriesService()

const pageWidth = catchPageWidth()
const gSeries = ref()
const boundledSeries = ref()

function groupCourses(courses: any[]): any[] {
  // Ordenar os cursos em ordem alfabética com base no nome
  const sortedCourses = courses.sort((a, b) => a.name.localeCompare(b.name))

  const boundled = []
  for (let i = 0; i < sortedCourses.length; i += 2) {
    boundled.push({ items: [sortedCourses[i], sortedCourses[i+1]] } )
  }
  return boundled
}

onMounted(async () => {
  gSeries.value = await postgrest.getSeries(props.course)
  
})
</script>

<template>
  <!-- @swiper="onSwiper"
        @slideChange="onSlideChange" -->
  <div :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">
    <Swiper
      :modules="modules" :slides-per-view="1" :space-between="10"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide>
        <div class="grid-container">
          <div class="grid-item" v-for="serie in gSeries || []" :key="serie.id">
            <IonCard
              class="series-card"
              style="height: 140px; margin-bottom: 25px; width: 100%; background-image: linear-gradient(to  right, var(--ion-color-tertiary) -50%, #fff 60%  );"
              @click="emits('update:modelValue', serie)"
            >
              <IonCardHeader>
                <div class="flex" style="height: 90px;">
                  <span class="my-auto mx-auto" style="font-size: 32px;">
                    <IonText color="primary">
                      {{ serie.name }}
                    </IonText>
                  </span>
                </div>
              </IonCardHeader>
            </IonCard>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.grid-item{
  display: flex;
  justify-content: center;
  align-items: center;
}

.series-card{
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  cursor: pointer; 
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.series-card:hover{
  transform: scale(1.02); 
}
</style>

<!-- <script>
       // import Swiper core and required modules
       import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

       // Import Swiper Vue.js components
       import { Swiper, SwiperSlide } from 'swiper/vue';

       // Import Swiper styles
       import 'swiper/css';
       import 'swiper/css/navigation';
       import 'swiper/css/pagination';
       import 'swiper/css/scrollbar';

       // Import Swiper styles
       export default {
         components: {
           Swiper,
           SwiperSlide,
         },
         setup() {
           const onSwiper = (swiper) => {
             console.log(swiper);
           };
           const onSlideChange = () => {
             console.log('slide change');
           };
           return {
             onSwiper,
             onSlideChange,
             modules: [Navigation, Pagination, Scrollbar, A11y],
           };
         },
       };
     </script> -->
