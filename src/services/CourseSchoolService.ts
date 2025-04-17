import BaseService from './BaseService'

const table = 'courseSchool' as const

type TabelaType = typeof table

export default class CourseSchoolService extends BaseService<TabelaType> {
  constructor() {
    super(table)
  }

  async getCoursesBySchoolId(schoolId: string) {
    try {
      const { data, error } = await this.client
        .from(table)
        .select('*')
        .eq('schoolId', schoolId)

      if (error) {
        console.error(error)
        return void 0
      }
      else {
        return data
      }
    }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }
}
