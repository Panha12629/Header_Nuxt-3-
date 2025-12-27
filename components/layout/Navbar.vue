<template>
  <div>
    <!-- Navbar -->
    <header class="w-full select-none fixed top-0 left-0 z-50">
      <div class="hidden lg:flex w-full  
      bg-gradient-to-r from-yellow-200 to-orange-200">
        <!-- Logo -->
        <div class="w-[300px] flex items-center justify-center bg-black rounded-tr-[60px] h-[100px]">
          <span class="text-white text-5xl font-light tracking-wide">LOGO</span>
        </div>
        <div class="flex-1 flex flex-col">
          <!-- Top Nav-->
          <div class="h-[50px] flex items-center px-6 justify-between">
              <nav class="flex gap-20 text-sm font-semibold uppercase">
                <a v-for="item in topNav":key="item" href="#" class="px-4 py-2 rounded-md transition
                        hover:bg-black hover:text-white">{{ item }}</a>
              </nav>

            <!-- User -->
            <div class="relative flex gap-2">
              <template v-if="!user">
                <button @click="$emit('open-login')" class="btn-auth bg-white text-black hover:bg-gray-400">Đăng nhập</button>
                <button class="btn-auth bg-gray-700 text-white hover:bg-gray-800">Đăng ký</button>
              </template>
              <template v-else>
                <button @click="toggleDropdown" class="font-semibold btn-auth flex items-center gap-2 relative">
                  {{ user.name }}
                  <svg :class="{ 'rotate-180': dropdown }" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div v-if="dropdown" class="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                  <a href="#" class="block px-4 py-2 rounded-3xl hover:bg-gray-100">Profile</a>
                  <a href="#" class="block px-4 py-2 rounded-3xl hover:bg-gray-100">Settings</a>
                  <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </template>
            </div>
          </div>

          <!-- Bottom Nav-->
          <div class="h-[48px] bg-black flex items-center px-6 justify-between">
           <nav class="flex gap-20 text-sm text-white">
              <a v-for="item in bottomNav":key="item.label" href="#"class="flex items-center gap-2 hover:text-yellow-300">
                <img :src="item.icon" class="w-6 h-6" />
                <span>{{ item.label }}</span>
              </a>
            </nav>

            <div class="ml-auto flex items-center gap-4">
             <button class="flex items-center px-1 py-0.5 bg-white rounded-md shadow-sm hover:bg-gray-400 focus:outline-none border-radius ">
              <img src="../../public/Images/Flag.png" alt="VN" class="w-30 h-8 rounded-3xl shadow-sm" />
              <span class="text-sm font-medium text-black">Tiếng Việt</span>
            </button>
              <img src="../../public/Images/TurnOn.png" alt="Toggle" class="w-30 h-9" />

            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Navbar -->
        <div class="lg:hidden flex flex-col w-full bg-black text-white shadow-md">
          <div class="flex items-center justify-between h-[90px]  px-4
           bg-gradient-to-r from-yellow-200 to-orange-200">
            <div>
               <span class="text-black text-4xl font-semibold">LOGO</span>
            </div>
            <div class="flex items-center gap-3">
              <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-sm font-medium">Vn </button>
              <button @click="open = !open">
                <Bars3Icon class="w-20 h-10 text-white" />
              </button>
            </div>
          </div>
          <div class="flex justify-around items-center h-[50px] border-t border-gray-700">
            <a v-for="item in bottomNav" :key="item.label" href="#" class="flex flex-col items-center text-xs hover:text-yellow-300">
              <img :src="item.icon" class="w-6 h-6 mb-1" />
            </a>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="open" class="lg:hidden bg-black text-white px-6 py-4 space-y-4">
          <div class="pt-4 border-t border-gray-700 flex gap-4 flex-col">
            <template v-if="!user">
              <button @click="$emit('open-login')" class="btn-auth bg-black text-white hover:bg-gray-800">Đăng nhập</button>
              <button class="btn-auth bg-gray-700 text-white hover:bg-gray-800">Đăng ký</button>
            </template>
            <template v-else>
              <button @click="toggleDropdown" class="btn-auth w-full flex justify-between items-center">
                {{ user.name }}
                <svg :class="{ 'rotate-180': dropdown }" class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-if="dropdown" class="bg-white text-black rounded-lg shadow-lg mt-2">
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
                <button @click="logout" class="w-full text-left px-4 py-2 hover:bg-red-100">Logout</button>
              </div>
            </template>
          </div>
        </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'

const open = ref(false)
const dropdown = ref(false)
const emit = defineEmits(['open-login', 'logout'])

const props = defineProps<{ user: { name: string } | null }>()
const user = ref(props.user)
watch(() => props.user, (val) => (user.value = val))

const topNav = ["lịch trực tiếp","lịch thi đấu","tỷ lệ kèo","kết quả","phòng chat","tin tức"]
const bottomNav = [
  { label: "Bảng Tin", icon:"/images/BangTin.png"  },
  { label: "Reels", icon:"/images/Reels.png"},
  { label: "Highlights", icon: "/images/Higlight.png" },
  { label: "Tip Kèo", icon: "/images/Tipkeo.png"},
  { label: "Phim Ảnh", icon: "/images/PhimAnh.png" },
  { label: "Truyện Tranh", icon:  "/images/TruyTranh.png"},
]

const toggleDropdown = () => { dropdown.value = !dropdown.value }
const logout = () => {
  emit('logout')
  user.value = null
  dropdown.value = false
}
</script>

<style scoped>
.btn-auth {
  padding: 0.4rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-transform: uppercase;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.btn-auth:hover {
  opacity: 0.9;
}
</style>
