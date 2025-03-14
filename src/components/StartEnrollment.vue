<script setup lang="ts">
import { catchPageWidth } from '@/utils/useUtils'

import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonHeader, IonIcon, IonRow, IonSpinner } from '@ionic/vue'

import { arrowBackOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'

// componentes
import formPreEnrrolment from '../components/FormPreEnrrolment.vue'

import selectCourseSlider from '../components/SelectCourseSlider.vue'
import selectSchoolSlider from '../components/SelectSchoolSlider.vue'

import selectSeriesSlider from '../components/SelectSeriesSlider.vue'
import PreEnrollmentService from '../services/PreEnrollmentService'
import InstitutionService from '../services/InstitutionService'


interface Props {
  searchbox: string
}
const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue'])

const postgrest = new PreEnrollmentService()
const institutionService = new InstitutionService()
const studentId = ref()
const pageWidth = ref()
const loading = ref(false)
const finished = ref(false)
const etapa = ref(1)

const selectedSchool = ref()
const selectedCourse = ref()
const selectedSeries = ref()
const shiftPreference = ref()
const insertedPreEnrollment = ref()

const postStatus = ref()

const preEnrollment = ref({
  id: '',
  institutionId: '',
  schoolId: '',
  courseId: '',
  seriesId: '',
  studentId: '',
  observations: '',
  preenrollmentcode: '',
  datePreenrollment: new Date(),
  preferShift: null,
  createdAt: new Date(),
  updatedAt: null,
  tenantId: null,
  deletedAt: null,
  updatedBy: null,
  status: "ACTIVE",
  situation: "PENDENTE",
})

function resetState(resetAll = true) {
  const oldInstitutionId = preEnrollment.value.institutionId
  
    preEnrollment.value = {
      id: '',
      institutionId: oldInstitutionId,
      schoolId: '',
      courseId: '',
      seriesId: '',
      studentId: '',
      observations: '',
      preenrollmentcode: '',
      datePreenrollment: new Date(),
      preferShift: null,
      createdAt: new Date(),
      updatedAt: null,
      tenantId: null,
      deletedAt: null,
      updatedBy: null,
      status: "ACTIVE",
      situation: "PENDENTE",
    };
    selectedSchool.value = undefined;
    selectedCourse.value = undefined;
    selectedSeries.value = undefined;

    studentId.value = undefined;
    shiftPreference.value = undefined;
    insertedPreEnrollment.value = undefined;
    postStatus.value = undefined;
  } 

function cadastrarOutroAluno() {
  console.log('cadastrar outro aluno')
  resetState(); 
  setTimeout(() => {
    console.log('Etapa atual:', etapa.value);
    etapa.value = 1; 
    console.log('etapa cadastrar outro aluno ', etapa.value)
  }, 0);
}

/*function cadastrarOutroAlunoMesmaTurma() {
  resetState(false); 
  setTimeout(() => {
    console.log('Etapa atual:', etapa.value);
    etapa.value = 4; 
    console.log('etapa cadastrar outro aluno na mesma turma ', etapa.value)
  }, 0);
}*/

watch(selectedSchool, (value) => {
  if (value) {
    preEnrollment.value.schoolId = value.id
    loading.value = true
    finished.value = false

    // console.log('selectedSchool:', value)

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 2
  }
})

watch(selectedCourse, (value) => {
  if (value) {
    preEnrollment.value.courseId = value.id
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 3
  }
})

watch(selectedSeries, (value) => {
  if (value) {
    preEnrollment.value.seriesId = value.id
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 4
  }
})

watch(etapa, (value) => {
  if (value) {
    emits('update:modelValue', value)
  }
})

watch(studentId, (value) => {
  if (value) {
    // loading.value = true
    preEnrollment.value.studentId = value
  }
  else {
    // loading.value = false
  }
})

watch(shiftPreference, (value) => {
  if (value) {
    preEnrollment.value.observations = `A preferência de turno é: ${value}`
    preEnrollment.value.preferShift = value
  }
})

// return emits('postStatus', {
//     duplicated: duplicated.value,
//     loading: true,
//   })

watch(postStatus, async (value) => {
  if (value && value.loading === true) {
    loading.value = true
    finished.value = false

    setTimeout(() => {
      finished.value = true
    }, 500) // 1 segundo antes de loading se tornar false
    console.log('preEnrollment:', preEnrollment.value)
    preEnrollment.value.preenrollmentcode = await postgrest.generateUnicPreEnrollmentCode()

    if (
      preEnrollment.value.preenrollmentcode
      && preEnrollment.value.schoolId
      && preEnrollment.value.courseId
      && preEnrollment.value.seriesId
      && preEnrollment.value.studentId
    ) {
      const data = await postgrest.insertPreEnrollment(preEnrollment.value)
      console.log('data:', data)
      insertedPreEnrollment.value = data
    }

    setTimeout(() => {
      loading.value = false
      finished.value = true
    }, 1500) // 1 segundo depois de finished se tornar true

    etapa.value = 5
  }
  else {
    loading.value = false
    etapa.value = 4
  }
})

const teste = ref()
onMounted(async () => {
  pageWidth.value = catchPageWidth()
  teste.value = await postgrest.getPreEnrollments()
  preEnrollment.value.institutionId = await institutionService.getInstitutionId()
})
</script>

<template>

  <div class="ion-padding-bottom">
    <div style="min-height: 250px; " class="flex wrap">
      <!-- Etapa 1 -->
      <div v-if="etapa === 1" style="min-width: 100%;">
        <selectSchoolSlider v-model="selectedSchool" :query="props.searchbox" />
      </div>
      <!-- Etapa 2 -->
      <div v-else-if="etapa === 2">
        <IonButton color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)">
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>
        <div>
          <selectCourseSlider v-model="selectedCourse" :school="selectedSchool?.id" />
        </div>
      </div>
      <!-- Etapa 3 -->
      <div v-else-if="etapa === 3">
        <IonButton color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)">
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>
        <div class="ion-padding-top">
          <selectSeriesSlider v-model="selectedSeries" :course="selectedCourse?.id" />
        </div>
      </div>
      <div v-else-if="etapa === 4" style="width: 100%;">
        <IonButton color="light" :class="pageWidth?.pageWidth < 992 ? 'ion-margin-start' : 'ion-margin-bottom'"
          @click="etapa = (etapa - 1)">
          <IonIcon :icon="arrowBackOutline" />
        </IonButton>

        <div class="ion-padding-top ">
          <IonGrid style="padding: 0;">
            <IonRow>
              <IonCol style="padding: 0;" size="12">
                <formPreEnrrolment v-model="studentId" :page-width="pageWidth?.pageWidth"
                  @preference="($event) => shiftPreference = $event" @post-status="($event) => postStatus = $event"
                  @studentId="($event) => studentId = $event" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>
      <div v-else-if="etapa === 5" style="width: 100%;">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <ion-card>
                <IonCardHeader>
                  <IonCardTitle style="font-size: 16pt; font-weight: 800;">
                    Pré-Matrícula realizada com sucesso
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Os dados do aluno foram salvos com sucesso! Digite o CPF do responsável caso deseje acompanhar a
                    situação.</p>

                  <div class="flex" style="min-height: 150px;">
                    <IonIcon :icon="checkmarkCircleOutline" class="my-auto mx-auto"
                      style="font-size: 130px; color:lawngreen;" />
                  </div>

                  <div class="flex flex-col gap-2">
                    <IonButton expand="block" color="tertiary" @click="cadastrarOutroAluno" class="button-cadastrarOutroAluno">
                      Cadastrar outro aluno
                    </IonButton>

                  </div>

                  <!--<div class="flex flex-col gap-2">
                    <IonButton expand="block" color="tertiary" @click="cadastrarOutroAlunoMesmaTurma">
                      Cadastrar outro aluno
                    </IonButton>

                  </div>-->
                </IonCardContent>
              </ion-card>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </div>
  </div>
</template>

<style scoped>
ion-spinner {
  width: 80px;
  height: 80px;
}

.button-cadastrarOutroAluno {
  margin-left: auto;
}

</style>
