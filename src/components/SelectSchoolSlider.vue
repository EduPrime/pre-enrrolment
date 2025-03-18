<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonText } from '@ionic/vue'

// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref, watch } from 'vue'

import SchoolService from '../services/SchoolService'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// const onSwiper = (swiper) => {
//   console.log(swiper);
// };

// const onSlideChange = () => {
//   console.log('slide change');
// };

interface Props {
  query: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])
const modules = [Navigation, Pagination, Scrollbar, A11y]
//

const pageWidth = ref()
const postgrest = new SchoolService()
const schoolList = ref()

watch(() => props.query, async (qValue: string) => {
  console.log('entrou aqui', qValue)
  if (qValue && qValue.length > 0) {
    schoolList.value = await postgrest.searchSchools(qValue)
    console.log('schoolList:', schoolList.value)
  }
  else {
    schoolList.value = await postgrest.getSchools()
  }
})

onMounted(async () => {
  schoolList.value = await postgrest.getSchools()
  pageWidth.value = catchPageWidth()
})
</script>

<template>
  <div
    :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'"
  >
    <!-- @swiper="onSwiper" @slideChange="onSlideChange" -->
    <Swiper
      :modules="modules" :slides-per-view="pageWidth?.pageWidth > 800 ? 3 : schoolList?.length === 1 ? 1 : 1.2"
      :space-between="20" :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="school in schoolList" :key="school.id" @click="emits('update:modelValue', school)">
        <IonCard class="school-card" style="min-height: 100%; width: 100%; margin-bottom: 10%;">
          <IonCardHeader class="ion-padding-top">
            <IonCardTitle style="font-size: 1.2rem; line-height: 110%;">
              {{ school.name }}
            </IonCardTitle>
            <IonCardSubtitle>{{ school.address }}, {{ school.city }} - {{ school.state }}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonText color="white" class="flex" style="width: 100%">
                Telefone:
                <span class="ml-auto">
                  {{ school.phone }}
                </span>
              </IonText>
            </IonItem>

            <IonItem>
              <div>
                <IonText color="white" class="flex" style="width: 100%">
                  <p v-if="school.open">
                    Matriculas abertas
                  </p>
                  <p v-else>
                    Matriculas encerradas
                  </p>
              </IonText>
              </div>
              <div
                style="height: 16px; width: 16px; border-radius: 100%; margin-left: auto"
                :style="school.open ? ' background-color:chartreuse;' : ' background-color: orange;'"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>

.school-card{
  height: 200px;
  cursor: pointer; 
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.school-card:hover {
  background-color: #71438d; 
  transform: scale(1.02); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

ion-item {
  --background: transparent;
  --ion-background-color: transparent;
  --border-color: transparent; 
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
