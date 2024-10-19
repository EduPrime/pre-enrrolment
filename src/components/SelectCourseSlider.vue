<template>

   <div 
   :style="pageWidth?.pageWidth > 992 ? 'max-width: 992px' : 'width: 100vw;'">

   <!-- @swiper="onSwiper" 
   @slideChange="onSlideChange" -->
    <swiper
        :modules="modules" 
        :slides-per-view="boundledCourses?.length > 1 ? 1.4 : 1" 
        :space-between="10" 
        :scrollbar="{ draggable: true }"
      >
            <swiper-slide 
                v-for="courses in boundledCourses" 
                :key="courses">
                    <div>
                       <ion-card style="height: 160px; margin-bottom: 25px;  background-image: linear-gradient(to  right, var(--ion-color-tertiary) -70%, #fff 50%  );" @click="emits('update:modelValue', course)" v-for="course in courses.items" :key="course">
                            <ion-card-header>
                                <ion-card-title color="primary">{{ course.name }}</ion-card-title>
                            </ion-card-header>
                            <ion-card-content>
                              <ion-text color="primary">

                                <p>{{ course.description }}</p>
                              </ion-text>
                            </ion-card-content>
                       </ion-card>
                    </div>
            </swiper-slide>

    </swiper>
   </div>
</template>
<script setup lang="ts">
import { defineEmits, ref, defineProps, watch, onMounted } from 'vue';
import UseSupabase from '@/composables/useSupabase';
import { catchPageWidth } from '@/utils/useUtils';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// const onSwiper = (swiper: any) => {
//     console.log(swiper);
// };

// const onSlideChange = () => {
//     console.log('slide change');
// };

const modules = [Navigation, Pagination, Scrollbar, A11y];


// 

interface Props {
    school: any
}

const emits = defineEmits(['update:modelValue']);
const props = defineProps<Props>()
const supabase = new UseSupabase()

const courseList = ref()
const boundledCourses = ref()
const pageWidth = ref()

function groupCourses(courses: any[]): any[] {
    const boundled = [];
    for (let i = 0; i < courses.length; i += 2) {
        boundled.push({ items: courses.slice(i, i + 2) });
    }
    return boundled;
}

watch(() => props.school, async (value) => {
    if (value) {
        console.log('props.school:', value);
        
        courseList.value = await supabase.getCoursesBySchoolId(props.school);
        console.log('courseList atualizado:', courseList.value);
    }
}, { immediate: true });

watch(() => courseList.value, (nV) => {
     
    if (Array.isArray(nV) && nV.length > 0) {
        
        boundledCourses.value = groupCourses(nV);
    } else {
        console.log('courseList não é um array ou está vazio:', nV);
    }
});


onMounted(() => {
    pageWidth.value = catchPageWidth()
})
</script>

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