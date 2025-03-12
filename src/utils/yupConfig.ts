import { validateCNPJ, validateCep, validatePhone, validateCPF, validateEmail } from 'validations-br'
import * as yup from 'yup'
import { ptShort } from 'yup-locale-pt'

declare module 'yup' {
    interface StringSchema {
        phone(message?: string): StringSchema
        cnpj(message?: string): StringSchema
        zipCode(message?: string): StringSchema
        cpf(message?: string): StringSchema
        email(message?: string): StringSchema
    }
}

const addYupMethod = (schema: any, name: string, validateFn: (val: string) => boolean, defaultMessage: string) => {
    yup.addMethod<yup.StringSchema>(schema, name, function (message) {
      return this.test(name, message || defaultMessage, function (value) {
        const { path, createError } = this
        return validateFn(value || '') || createError({ path, message: message || defaultMessage })
      })
    })
}
  
addYupMethod(yup.string, 'cnpj', validateCNPJ, 'CNPJ inválido')
addYupMethod(yup.string, 'phone', validatePhone, 'Telefone inválido')
addYupMethod(yup.string, 'zipCode', validateCep, 'CEP inválido')
addYupMethod(yup.string, 'cpf', validateCPF, 'CPF inválido')
addYupMethod(yup.string, 'email', validateEmail, 'Email inválido')
  
yup.setLocale(ptShort)