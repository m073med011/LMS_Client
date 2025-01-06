<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Timetable Management</h1>

    <!-- Add Event Button -->
    <div class="mb-4">
      <button 
        @click="openAddEventModal(null)" 
        class="bg-blue-500 dark:text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add New Event
      </button>
    </div>

    <!-- Event Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-[500px]">
        <h2 class="text-xl font-bold mb-4">
          {{ editingEvent ? 'Edit Event' : 'Add New Event' }}
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input 
              v-model="currentEvent.title" 
              type="text" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Event Title"
            />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Start Date</label>
              <input 
                v-model="currentEvent.startDate" 
                type="date" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">End Date</label>
              <input 
                v-model="currentEvent.endDate" 
                type="date" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Start Time</label>
              <input 
                v-model="currentEvent.startTime" 
                type="time" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">End Time</label>
              <input 
                v-model="currentEvent.endTime" 
                type="time" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
              v-model="currentEvent.description"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Event Description"
              rows="3"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Color</label>
            <select 
              v-model="currentEvent.color"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="closeModal" 
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            @click="saveEvent" 
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>

    <!-- Timetable Grid -->
    <div class="grid grid-cols-8 gap-2 border-2 border-gray-200">
      <!-- Header Row -->
      <div 
        v-for="day in ['Time', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" 
        :key="day" 
        class="font-bold text-center p-2 bg-gray-100 border-b"
      >
        {{ day }}
      </div>

      <!-- Time Slots -->
      <template v-for="hour in 24" :key="hour">
        <div class="text-right pr-2 border-r">
          {{ hour - 1 }}:00
        </div>
        
        <!-- Days of Week Cells -->
        <div 
          v-for="(day, dayIndex) in 7" 
          :key="day" 
          class="border p-1 min-h-[50px] relative"
          @dragover.prevent
          @drop.prevent="handleDrop($event, hour - 1, dayIndex)"
        >
          <!-- Events in this time slot -->
          <div 
            v-for="event in getEventsForSlot(hour - 1, dayIndex)" 
            :key="event.id"
            :class="[
              'p-1 mb-1 rounded cursor-move text-white truncate',
              `bg-${event.color}-500`
            ]"
            draggable="true"
            @dragstart="handleDragStart($event, event)"
            @click="openAddEventModal(event)"
          >
            {{ event.title }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const alertmassage =ref("هذا ليس المنتج النهائي")
onMounted(() => {
  alert(alertmassage.value);
 
  
})



// Extended Event interface
interface Event {
  id: number
  title: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  description?: string
  color: string
}

// State
const events = ref<Event[]>([])
const showModal = ref(false)
const editingEvent = ref<Event | null>(null)
const currentEvent = ref<Event>({
  id: 0,
  title: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  description: '',
  color: 'blue'
})

const draggedEvent = ref<Event | null>(null)

// Modal Methods
const openAddEventModal = (event: Event | null = null) => {
  if (event) {
    // Edit existing event
    editingEvent.value = event
    currentEvent.value = { ...event }
  } else {
    // New event
    editingEvent.value = null
    currentEvent.value = {
      id: Date.now(),
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      description: '',
      color: 'blue'
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingEvent.value = null
}

// Event Management
const saveEvent = () => {
  // Validate event
  if (!currentEvent.value.title || 
      !currentEvent.value.startDate || 
      !currentEvent.value.endDate || 
      !currentEvent.value.startTime || 
      !currentEvent.value.endTime) {
    alert('Please fill all required fields')
    return
  }

  if (editingEvent.value) {
    // Update existing event
    const index = events.value.findIndex(e => e.id === editingEvent.value?.id)
    if (index !== -1) {
      events.value[index] = { ...currentEvent.value }
    }
  } else {
    // Add new event
    events.value.push({ ...currentEvent.value })
  }

  closeModal()
}

// Drag and Drop Methods
const handleDragStart = (event: DragEvent, eventItem: Event) => {
  draggedEvent.value = eventItem
  event.dataTransfer?.setData('text/plain', JSON.stringify(eventItem))
}

const handleDrop = (event: DragEvent, targetHour: number, targetDay: number) => {
  if (!draggedEvent.value) return

  // Note: In a real app, you'd need more complex logic to handle multi-day events
  // This is a simplified example
  const movedEvent: Event = {
    ...draggedEvent.value,
    // You might want to adjust date/time based on drop location
  }

  events.value = events.value.filter(e => e.id !== draggedEvent.value?.id)
  events.value.push(movedEvent)
  draggedEvent.value = null
}

// Utility Method to get events for a specific time slot
const getEventsForSlot = (hour: number, dayIndex: number) => {
  return events.value.filter(event => {
    const startDate = new Date(event.startDate)
    const endDate = new Date(event.endDate)
    const startHour = parseInt(event.startTime.split(':')[0])
    
    // Check if event spans multiple days and is in the current time slot
    return startHour === hour
  })
}
</script>

<style scoped>
/* Additional styling can be added here if needed */
</style>