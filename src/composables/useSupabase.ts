import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue'

export default class UseSupabase {
  private url: string;
  private token: string;

  supabase: any

  constructor() {
    this.url = import.meta.env.VITE_SUPABASE_URL;
    this.token = import.meta.env.VITE_SUPABASE_TOKEN;

    this.supabase = createClient(this.url, this.token)
  }


  async getSchools() {
    try {
      const { data, error } = await this.supabase
        .from('school')
        .select('*');

      if (error) {
        console.error(error);
        return void 0;
      } else {
        return data;
      }
    } catch (error: unknown | any) {
      throw new Error(error);
    }
  }


  async searchSchools(searchTerm?: string) {
    try {
      let query = this.supabase
        .from('school')
        .select('*');

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        return void 0;
      } else {
        return data;
      }
    } catch (error: unknown | any) {
      throw new Error(error);
    }
  }


  async getCoursesBySchoolId(school_id: string) {
    try {
      const courses = ref<any>([]);
      const { data, error } = await this.supabase
        .from('school_course')
        .select('course_id')
        .eq('school_id', school_id);

      if (data) {
        const coursePromises = data.map(async (c: any) => {
          const { data: courseData, error: courseError } = await this.supabase
            .from('course')
            .select('*')
            .eq('id', c.course_id)
            .single();

          if (courseError) {
            console.error(courseError);
            return null;
          }

          return courseData;
        });

        const resolvedCourses = await Promise.all(coursePromises);
        courses.value = resolvedCourses.filter(course => course !== null);
      }

      if (error) {
        console.error(error);
        return void 0;
      } else {
        return courses.value;
      }
    } catch (error: unknown | any) {
      throw new Error(error);
    }
  }


  async getSeries(course_id: string) {
    try {
      const { data, error } = await this.supabase
        .from('series')
        .select('*').eq('course_id', course_id);

      if (error) {
        console.error(error);
        return void 0;
      } else {
        return data;
      }
    } catch (error: unknown | any) {
      throw new Error(error);
    }
  }

}
