import { PostgrestClient } from '@supabase/postgrest-js'

const postgresturl = import.meta.env.VITE_DATABASE_URL
export default class BaseService<T> {
    public client!: PostgrestClient
    constructor(private readonly table: string) {
        try {
            this.client = new PostgrestClient(postgresturl,
              {headers: {
                Authorization: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`
              }
            }
            )
        }
        catch(error: any) {
            console.log('Deu erro no client', error.message)
        }
    }
   
    async getById(id: string): Promise<T | null> {
        if (!id)
          return null
    
        const { data, error } = await this.client
          .from(this.table)
          .select('*')
          .eq('id', id)
          .single()
    
        if (error)
          throw new Error(error.message)
        return data
      }

    async getBySchoolId(schoolId: string): Promise<T | null> {
        if (!schoolId)
          return null
    
        const { data, error } = await this.client
          .from(this.table)
          .select('*')
          .eq('schoolId', schoolId)
          .single()
    
        if (error)
          throw new Error(error.message)
        return data
    }
    
    async getAll(
        orderBy?: string,
        ascending = true,
        limit?: number,
      ) {
    
        let query = this.client.from(this.table).select('*')
    
        if (orderBy) {
          query = query.order(orderBy as string, { ascending })
        }
    
        if (limit) {
          query = query.limit(limit)
        }
    
        const { data, error } = await query
    
        if (error)
          throw new Error(error.message)
        return data || []
    }

    async create(record: T): Promise<T | null> {
        const recordWithAudit = {
          ...record
        } as unknown as T
    
        const { data, error } = await this.client
          .from(this.table)
          .insert(recordWithAudit)
          .select()
          .single()
    
        if (error) {
          throw new Error(error.message)
        }
        return data
    }

    async update(id: string, updates: Partial<T>): Promise<T | null> {
        const updatesWithAudit = {
          ...updates,
          updatedAt: new Date().toISOString(),
        } as unknown as Partial<T>
    
        const { data, error } = await this.client
          .from(this.table)
          .update(updatesWithAudit)
          .eq('id', id)
          .select()
          .single()
    
        if (error)
          throw new Error(error.message)
        return data
    }

    async softDelete(id: string): Promise<T | null> {
        const { data, error } = await this.client
          .from(this.table)
          .update({
            deletedAt: new Date().toISOString(),
          } as unknown as Partial<T>)
          .eq('id', id)
          .select()
          .single()
    
        if (error)
          throw new Error(error.message)
        return data
    }
}   
