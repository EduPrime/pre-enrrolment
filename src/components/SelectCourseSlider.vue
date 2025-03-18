<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonText } from '@ionic/vue'
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref, watch } from 'vue'

import CourseService from '../services/CourseService'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const props = defineProps<Props>()

const emits = defineEmits(['update:modelValue'])

// const onSwiper = (swiper: any) => {
//     console.log(swiper);
// };

// const onSlideChange = () => {
//     console.log('slide change');
// };

const modules = [Navigation, Pagination, Scrollbar, A11y]

//

interface Props {
  school: any
}

const postgrest = new CourseService()

const courseList = ref()
const boundledCourses = ref()
const pageWidth = ref()

function groupCourses(courses: any[]): any[] {
  const boundled = []
  for (let i = 0; i < courses.length; i += 2) {
    boundled.push([ courses[i], courses[i+1] ])
  }
  return boundled
}

watch(() => props.school, async (value) => {
  if (value) {
    // console.log('props.school:', value)

    const allCourses = await postgrest.getCoursesBySchoolId(props.school)
    courseList.value = allCourses?.filter(course => course.name !== 'Maternal')

    console.log('courseList.value', courseList.value)

    // console.log('courseList atualizado:', courseList.value)
  }
}, { immediate: true })

watch(() => courseList.value, (nV) => {
  if (Array.isArray(nV) && nV.length > 0) {
    boundledCourses.value = groupCourses(nV)
  }
  // else {
  //   console.log('courseList não é um array ou está vazio:', nV)
  // }
})

onMounted(() => {
  pageWidth.value = catchPageWidth()
})
</script>

<template>
  <div :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">
    <!-- @swiper="onSwiper"
   @slideChange="onSlideChange" -->
    <Swiper
      :modules="modules" :slides-per-view="1" :space-between="8"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="(group, index) in boundledCourses" :key="index">
        <div class="course-container">
          <IonCard
            class="course-card"
            v-for="course in group" :key="course.id"
            style="height: 140px; margin-bottom: 25px; width: 500px; background-image: linear-gradient(to  right, var(--ion-color-tertiary) -70%, #fff 50%  );"
            @click="emits('update:modelValue', course)"
          >
            <IonCardHeader>
              <IonCardTitle color="primary" style="font-size: 25px;">
                {{ course.name }}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="primary">
                <p>{{ course.description }}</p>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>

.course-container{
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: space-between;
}
.course-card{
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  cursor: pointer; 
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.course-card:hover{
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
