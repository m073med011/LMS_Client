import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

export interface Course {
  _id: string
  title: string
  description: string
  instructor: {
    _id: string
    name: string
    email: string
  }
  materials: Array<{
    _id: string
    title: string
    type: 'video' | 'document' | 'quiz'
    content: string
    order: number
  }>
  enrolledStudents: Array<{
    _id: string
    name: string
    email: string
  }>
  category: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  isPublished: boolean
  price: number
  rating: number
  image: string
  createdAt: string
  updatedAt: string
  meta: { [key: string]: any }
}

interface NewCourseData {
  title: string
  description: string
  category: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  isPublished: boolean
  price: number
  materials: Array<{
    title: string
    type: 'video' | 'document' | 'quiz'
    content: string
    order: number
  }>
}

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [] as Course[],
    myCourses: [] as Course[],
    currentCourse: null as Course | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchCourses() {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        const response = await axios.get(`${config.public.apiBase}/courses`)
        this.courses = response.data.map((course: Course) => ({
          ...course,
          meta: course.meta || {}, 
        }))
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch courses'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchMyCourses() {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        const response = await axios.get(`${config.public.apiBase}/courses/my-courses`)
        this.myCourses = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch my courses'
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchCourse(id: string) {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        const response = await axios.get(`${config.public.apiBase}/courses/${id}`)
        this.currentCourse = { ...response.data, meta: response.data.meta || {} } 
        return this.currentCourse
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch course'
        throw err
      } finally {
        this.loading = false
      }
    },

    async createCourse(courseData: NewCourseData) {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        const response = await axios.post(`${config.public.apiBase}/courses`, courseData)
        this.courses = [...this.courses, response.data]
        return response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to create course'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateCourse(id: string, courseData: Partial<Course>) {
      try {
        const config = useRuntimeConfig()
        const response = await axios.put(`${config.public.apiBase}/courses/${id}`, courseData)
        const updatedCourse = response.data
        
        // Update the course in both lists if it exists
        const courseIndex = this.courses.findIndex(c => c._id === id)
        if (courseIndex !== -1) {
          this.courses[courseIndex] = updatedCourse
        }
        
        const myCourseIndex = this.myCourses.findIndex(c => c._id === id)
        if (myCourseIndex !== -1) {
          this.myCourses[myCourseIndex] = updatedCourse
        }
        
        return updatedCourse
      } catch (error) {
        console.error('Error updating course:', error)
        throw error
      }
    },

    async deleteCourse(id: string) {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        await axios.delete(`${config.public.apiBase}/courses/${id}`)
        this.courses = this.courses.filter(course => course._id !== id)
        if (this.currentCourse?._id === id) {
          this.currentCourse = null
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to delete course'
        throw err
      } finally {
        this.loading = false
      }
    },

    async buyCourse(id: string) {
      try {
        this.loading = true
        this.error = null
        const config = useRuntimeConfig()
        const response = await axios.post(`${config.public.apiBase}/courses/${id}/buy`)
        
        // Update both course lists if the course exists in them
        const courseIndex = this.courses.findIndex(c => c._id === id)
        if (courseIndex !== -1) {
          this.courses[courseIndex] = response.data
        }
        
        // Add the course to myCourses
        if (!this.myCourses.some(c => c._id === id)) {
          this.myCourses.push(response.data)
        }
        
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to buy course'
        throw error
      } finally {
        this.loading = false
      }
    },
  }
})
