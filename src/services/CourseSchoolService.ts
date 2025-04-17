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
        .select('courseId')
        .eq('schoolId', schoolId)

      if (error) {
        console.error(error)
        return void 0
      }
      const courses = await this.client
        .from('course')
        .select('*')
        .in('id', data.map((course) => course.courseId))
      
      return courses.data
      }
    catch (error: unknown | any) {
      throw new Error(error)
    }
  }
}
