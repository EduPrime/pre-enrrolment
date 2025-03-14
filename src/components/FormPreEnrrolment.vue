<script setup lang="ts">
import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/vue'
import { checkmarkCircleOutline } from 'ionicons/icons'
import { onMounted, ref, watch } from 'vue'
import StudentService from '../services/StudentService'
import PreEnrollmentService from '../services/PreEnrollmentService'
import { Form, Field, ErrorMessage } from 'vee-validate';

interface Props {
  pageWidth: string
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'preference', 'postStatus', 'studentId'])

const next = ref(false)
const incompleteStep = ref(false)
const adicionalRequired = ref(false)
const duplicated = ref(false)
const finished = ref(false)

const shiftPreference = ref()
const preenrollmentcode = ref(`PRE-${generateRandomCode()}`)

const fileName = ref('')
const result = ref()
const studentId = ref()
const someProblems = ref(false)

const studentService = new StudentService()
const preenrollmentService = new PreEnrollmentService()
const studentList = ref()

const docModel = ref('')
const docs = [{ title: 'RG', value: 'rg' }, { title: 'CPF', value: 'cpf' }, { title: 'Certidão de Nascimento', value: 'certidao' }]
const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]
const genders = ['M', 'F']
const responsibles = ['Pai', 'Mãe', 'Ambos', 'Outro']
const residenceZone = ['Urbana', 'Rural']

const student = ref({
  name: undefined as string | undefined,
  birthdate: undefined as string | number | undefined,
  phone: undefined as string | number | undefined,
  email: undefined as string | undefined,
  city: undefined as string | undefined,
  address: undefined as string | undefined,
  postalCode: undefined as string | number | undefined,
  gender: undefined as string | undefined,
  residenceZone: undefined as string | undefined,
  responsibleType: undefined as string | undefined,
  birthCertificate: undefined as string | number | undefined,
  rgNumber: undefined as string | number | undefined,
  cpf: undefined as string | number | undefined,
  photo: undefined as Uint8Array | undefined,
  disability: undefined as string | undefined,
  neighborhood: undefined as string | undefined,
  fatherName: undefined as string | undefined,
  fatherCpf: undefined as string | number | undefined,
  fatherPhone: undefined as string | number | undefined,
  fatherEmail: undefined as string | undefined,
  motherName: undefined as string | undefined,
  motherCpf: undefined as string | number | undefined,
  motherPhone: undefined as string | number | undefined,
  motherEmail: undefined as string | undefined,
  rgIssuer: undefined as string | undefined,
  rgState: undefined as string | undefined,
  rgIssueDate: undefined as string | undefined,
  placeOfBirth: undefined as string | undefined,
  guardianName: undefined as string | undefined,
  guardianPhone: undefined as string | number | undefined,
  guardianCpf: undefined as string | number | undefined,
  guardianEmail: undefined as string | undefined,

})

/*async function buscarEndereco(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

watch(() => student.postalCode, async (novoCep) => {
  console.log('entrou no negocio do CEP')
  const cepLimpo = novoCep?.replace(/\D/g, '');
  if (cepLimpo && cepLimpo.length === 8) {
    const endereco = await buscarEndereco(cepLimpo);
    if (endereco) {
      student.address = endereco.logradouro;
      student.neighborhood = endereco.bairro;
      student.city = endereco.localidade;
    }
  }
});*/

watch(result, async (value) => {
  finished.value = false

  if (value && value.status === 201) {
    console.log('value.data', value.data)
    studentId.value = value.data.at(0).id
    finished.value = true
  }
  else if (value && value.status === 409) {
    finished.value = false
    preenrollmentcode.value = `PRE-${generateRandomCode()}`
    if (value.error.code === '23505') {
      emits('postStatus', {
        loading: false,
      })
      duplicated.value = true
    }

    studentId.value = await studentService.getStudentId(student.value)
  }
  else {
    someProblems.value = true
    finished.value = false
  }
})

watch(studentId, (value) => {
  if (value) {
    console.log('studentId.value', value)
    emits('studentId', value)
  }
}, { immediate: true })

watch(shiftPreference, (value) => {
  if (value) {
    console.log('shiftPreference.value', value)
    emits('preference', value)
  }
}, { immediate: true })

async function submitForm() {
  console.log('student.value', student.value)
  if (student.value.name && student.value.birthdate && student.value.phone && (student.value.cpf || student.value.rgNumber || student.value.birthCertificate)) {
    result.value = await postStudent(student.value)
    if (result.value && result.value.status === 201) {
      emits('studentId', result.value.data.at(0).id)
      emits('postStatus', { loading: true })
    }
    next.value = true
    adicionalRequired.value = false
  }
  else {
    emits('postStatus', { loading: false })
    incompleteStep.value = true
    adicionalRequired.value = true
  }
}

function generateRandomCode(): string {
  return Math.random().toString().slice(2, 10).padStart(8, '0')
}

function nextStep() {
  if (student.value.name && student.value.birthdate) {
    console.log('entrou no nextStep')
    // return next.value = true
    submitForm()
  }
  else {
    incompleteStep.value = true
  }
}

async function postStudent(studentObject: any) {
  try {
    const data = await studentService.insertStudent(studentObject)
    return data
  }
  catch (error) {
    console.error(error)
  }
}

function closeDialog() {
  duplicated.value = false
  return emits('postStatus', {
    loading: true,
  })
}

onMounted(async () => {
  studentList.value = await studentService.getStudents()
})
const disabilities = [
  'TRANSTORNO_DO_ESPECTRO_AUTISTA',
  'TRANSTORNO_DESINTEGRATIVO_DA_INFANCIA_PSICOSE_INFANTIL',
  'TDAH',
  'SINDROME_DE_RETT',
  'SINDROME_DE_ASPERGER',
  'SURDOCEGUEIRA',
  'SURDEZ',
  'DEFICIENCIA_MULTIPLA',
  'DEFICIENCIA_MENTAL',
  'DEFICIENCIA_INTELECTUAL',
  'DEFICIENCIA_FISICA',
  'DEFICIENCIA_AUDITIVA',
  'CEGUEIRA',
  'BAIXA_VISAO',
  'AUTISMO_CLASSICO',
  'ALTAS_HABILIDADES_SUPERDOTACAO',
]
const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  // Converter a imagem para ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()
  student.value.photo = new Uint8Array(arrayBuffer)
  fileName.value = file.name
}

</script>

<template>
  <Form @submit="nextStep()">
  <IonGrid v-if="!finished" :class="Number(props.pageWidth) > 960 ? '' : 'ion-padding-horizontal'">
    <IonRow v-if="!next">

      <!-- Campo Nome -->
      <IonCol size="12">
        <IonItem>
          <Field v-slot="{ field }" name="Nome Completo" rules="required|min:3|max:180">
            <IonInput v-bind="field" v-model="student.name" type="text" label="Nome Completo*" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Nome Completo" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Sexo -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Sexo" rules="required">
            <IonSelect v-bind="field" v-model="student.gender" label="Sexo" label-placement="floating">
              <IonSelectOption v-for="gender in genders" :key="gender" :value="gender">
                {{ gender === 'M' ? 'Masculino' : 'Feminino' }}
              </IonSelectOption>
            </IonSelect>
          </Field>
        </IonItem>
        <ErrorMessage name="Sexo" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Data de nascimento -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Data de nascimento" rules="required|notFuture">
            <IonInput v-bind="field" v-model="student.birthdate" type="date" label="Data de nascimento*" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Data de nascimento" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Turno -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Turno" rules="required">
            <IonSelect v-bind="field" v-model="shiftPreference" label="Preferência de turno" label-placement="floating">
              <IonSelectOption value="MORNING">
                Manhã
              </IonSelectOption>
              <IonSelectOption value="AFTERNOON">
                Tarde
              </IonSelectOption>
              <IonSelectOption value="EVENING">
                Noite
              </IonSelectOption>
            </IonSelect>
          </Field>
        </IonItem>
        <ErrorMessage name="Turno" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Foto -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <label for="upPhoto">{{ fileName || "Foto 📷 " }}</label>
          <input id="upPhoto" @change="handleFileChange" type="file" accept="image/*" hidden />
        </IonItem>
      </IonCol>

      <!-- Campo Telefone -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Telefone" rules="required|phone">
          <IonInput
            v-bind="field"
            v-model="student.phone"
            v-imask="{ mask: '(00) 00000-0000' }"
            type="text"
            label="Telefone*"
            label-placement="floating"
          />
          </Field>
        </IonItem>
        <ErrorMessage name="Telefone" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo E-Mail -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="E-Mail" rules="email">
            <IonInput v-bind="field" v-model="student.email" type="email" label="E-Mail" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="E-Mail" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Bairro -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Bairro" rules="min:3|max:180">
            <IonInput v-bind="field" v-model="student.neighborhood" type="text" label="Bairro" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Bairro" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Cidade -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Cidade" rules="min:3|max:180">
            <IonInput v-bind="field" v-model="student.city" type="text" label="Cidade" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Cidade" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo Endereço -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Endereço" rules="min:3|max:180">
            <IonInput v-bind="field" v-model="student.address" type="text" label="Endereço" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Endereço" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo CEP -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="CEP" rules="cep">
            <IonInput
              v-bind="field"
              v-model="student.postalCode"
              v-imask="{ mask: '00000-000' }"
              type="text"
              label="CEP"
              label-placement="floating"
            />
          </Field>
        </IonItem>
        <ErrorMessage name="CEP" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <!-- Campo CPF -->
      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="CPF" rules="required|cpf">
            <IonInput
              v-bind="field"
              v-model="student.cpf"
              v-imask="{ mask: '000.000.000-00' }"
              type="text"
              label="CPF*"
              label-placement="floating"
            />
          </Field>
        </IonItem>
        <ErrorMessage name="CPF" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Responsável" rules="required">
            <IonSelect v-bind="field" v-model="student.responsibleType" label="Responsável" label-placement="floating">
              <IonSelectOption value="MÃE">
                Mãe
              </IonSelectOption>
              <IonSelectOption value="PAI">
                Pai
              </IonSelectOption>
              <IonSelectOption value="AMBOS">
                Ambos
              </IonSelectOption>
              <IonSelectOption value="OUTRO">
                Guardião
              </IonSelectOption>
            </IonSelect>
          </Field>
        </IonItem>
        <ErrorMessage name="Responsável" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <Field v-slot="{ field }" name="Nome completo do Pai" rules="required|min:3|max:180">
            <IonInput v-bind="field" v-model="student.fatherName" type="text" label="Nome completo do Pai" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Nome completo do Pai" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <Field v-slot="{ field }" name="CPF do Pai" rules="required|cpf">
            <IonInput v-bind="field" v-model="student.fatherCpf" type="text" label="CPF do Pai" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="CPF do Pai" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherPhone" type="text" label="Telefone do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'PAI' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.fatherEmail" type="email" label="E-Mail do Pai" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <Field v-slot="{ field }" name="Nome completo da Mãe" rules="required|min:3|max:180">
            <IonInput v-bind="field" v-model="student.motherName" type="text" label="Nome completo da Mãe" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="Nome completo da Mãe" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <Field v-slot="{ field }" name="CPF da Mãe" rules="required|cpf">
            <IonInput v-bind="field" v-model="student.motherCpf" type="text" label="CPF da Mãe" label-placement="floating" />
          </Field>
        </IonItem>
        <ErrorMessage name="CPF da Mãe" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherPhone" type="text" label="Telefone da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'MÃE' || student.responsibleType === 'AMBOS'">
        <IonItem>
          <IonInput v-model="student.motherEmail" type="email" label="E-Mail da Mãe" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <Field v-slot="{ field }" name="Nome completo do Guardião" rules="required|min:3|max:180">
          <IonInput v-bind="field" v-model="student.guardianName" type="text" label="Nome completo do Guardião" label-placement="floating" />
        </Field>
        </IonItem>
        <ErrorMessage name="Nome completo do Guardião" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianPhone" type="text" label="Telefone do Guardião"
            label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <Field v-slot="{ field }" name="CPF do Guardião" rules="required|cpf">
          <IonInput v-bind="field" v-model="student.guardianCpf" type="text" label="CPF do Guardião" label-placement="floating" />
        </Field>
        </IonItem>
        <ErrorMessage name="CPF do Guardião" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6" v-if="student.responsibleType === 'OUTRO'">
        <IonItem>
          <IonInput v-model="student.guardianEmail" type="text" label="Email do Guardião" label-placement="floating" />
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Zona da Residência">
          <IonSelect v-bind="field" v-model="student.residenceZone" label="Zona de Residência" label-placement="floating">
            <IonSelectOption v-for="zone in residenceZone" :key="zone" :value="zone.toUpperCase()">
              {{ zone }}
            </IonSelectOption>
          </IonSelect>
        </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Deficiência">
          <IonSelect v-bind="field" v-model="student.disability" label="Deficiência" label-placement="floating" multiple>
            <IonSelectOption v-for="disability in disabilities" :key="disability" :value="disability">
              {{ disability.toLowerCase().replaceAll('_', ' ') }}
            </IonSelectOption>
          </IonSelect>
        </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="RG">
          <IonInput v-bind="field" v-model="student.rgNumber" type="text" label="RG" label-placement="floating" />
        </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Data de expedição" rules="notFuture">
          <IonInput v-bind="field" v-model="student.rgIssueDate" type="date" label="Data de expedição" label-placement="floating" />
        </Field>
        </IonItem>
        <ErrorMessage name="Data de expedição" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Estado emissor">
          <IonSelect v-bind="field" v-model="student.rgState" label="Estado emissor" label-placement="floating">
            <IonSelectOption v-for="state in states" :key="state" :value="state">
              {{ state }}
            </IonSelectOption>
          </IonSelect>
        </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Órgão emissor">
            <IonInput v-bind="field" v-model="student.rgIssuer" type="text" label="Órgão emissor" label-placement="floating" />
          </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Naturalidade">
          <IonSelect v-bind="field" v-model="student.placeOfBirth" label="Naturalidade" label-placement="floating">
            <IonSelectOption v-for="state in states" :key="state" :value="state">
              {{ state }}
            </IonSelectOption>
          </IonSelect>
        </Field>
        </IonItem>
      </IonCol>

      <IonCol size="12" size-md="6">
        <IonItem>
          <Field v-slot="{ field }" name="Certidão de Nascimento">
          <IonInput v-bind="field" v-model="student.birthCertificate" type="text" label="Certidão de Nascimento"
            label-placement="floating" />
          </Field>
        </IonItem>
      </IonCol>

      <IonCol>
        <IonButton type="submit" expand="full" color="tertiary">
          Continuar
        </IonButton>
      </IonCol>
    </IonRow>

    <IonRow v-else>
      <!-- Second step fields here -->
    </IonRow>
  </IonGrid>

  <!--<IonAlert :is-open="duplicated" trigger="present-alert" header="Aluno já cadastrado"
    sub-header="Desculpe mas este aluno já foi cadastrado anteriormente."
    message="Caso deseje você pode clicar em 'atualizar' para atualizar os dados que já foram cadastrados anteriormente."
    :buttons="[{
      text: 'Atualizar cadastro',
      handler: () => {
        console.info('Função (Atualizar cadastro) ainda não implementada')
      },
    }, 'Continuar']" @did-dismiss="closeDialog()" />-->

<IonAlert :is-open="duplicated" trigger="present-alert" header="Aluno já cadastrado!"
    message="Desculpe, mas este aluno já foi cadastrado anteriormente."
    :buttons="[{text: 'Fechar',}]" @did-dismiss="closeDialog()" />

  <IonAlert :is-open="someProblems" trigger="present-alert" header="Desculpe, ocorreu um erro ao salvar os dados"
    sub-header="Erro ao salvar os dados do aluno"
    message="Por favor, recarregue a página ou tente novamente mais tarde." :buttons="['Fechar']"
    @did-dismiss="someProblems = false" />

  <IonAlert :is-open="incompleteStep" trigger="present-alert" header="Preencha os campos obrigatórios para continuar"
    sub-header="Campos obrigatórios tem um asterisco (*)"
    :message="adicionalRequired ? `Preencha também Telefone e RG, CPF ou Certidão de Nascimento para efetuar a pré-matrícula` : `Os campos Nome e Data de Nascimento são obrigatórios`"
    :buttons="['Fechar']" @did-dismiss="incompleteStep = false" />
  </form>
</template>

<style scoped>
ion-content {
  --padding-start: 16px;
  --padding-end: 16px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
