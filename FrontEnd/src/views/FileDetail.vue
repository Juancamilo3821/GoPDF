<template>
  <div class="flex flex-col min-h-screen">
    <app-header />
    <main class="flex-1 py-6 px-4 md:px-6">
      <div class="mx-auto max-w-6xl space-y-6">
        <div class="flex items-center gap-2">
          <router-link to="/dashboard/files">
            <button class="btn-ghost btn-sm gap-1">
              <arrow-left-icon class="h-4 w-4" />
              Volver
            </button>
          </router-link>
          <h1 class="text-2xl font-bold">Detalles del Archivo</h1>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div class="md:col-span-2 space-y-6">
            <div class="card">
              <div class="card-header pb-3">
                <div class="flex items-start justify-between">
                  <div>
                    <h2 class="card-title text-xl">{{ fileName }}</h2>
                    <p class="card-description">Convertido el {{ fileDate }}</p>
                  </div>
                  <span class="badge">PDF</span>
                </div>
              </div>
              <div class="card-content">
                <div class="aspect-[16/9] rounded-lg border bg-muted flex items-center justify-center">
                  <div class="text-center p-4">
                    <file-text-icon class="h-16 w-16 mx-auto text-primary mb-4" />
                    <p class="text-lg font-medium">Vista previa del documento</p>
                    <p class="text-sm text-muted-foreground mt-1">
                      Haz clic en el botón descargar para ver el archivo completo
                    </p>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mt-4">
                  <button class="btn-primary gap-2">
                    <download-icon class="h-4 w-4" />
                    Descargar
                  </button>
                  <button class="btn-outline gap-2">
                    <share-2-icon class="h-4 w-4" />
                    Compartir
                  </button>
                  <button class="btn-outline gap-2 text-destructive">
                    <trash-2-icon class="h-4 w-4" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Información del Archivo</h2>
              </div>
              <div class="card-content">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="flex items-center gap-2 p-3 border rounded-lg">
                    <file-type-icon class="h-5 w-5 text-primary" />
                    <div>
                      <p class="text-sm font-medium">Tipo</p>
                      <p class="text-sm text-muted-foreground">PDF</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 p-3 border rounded-lg">
                    <clock-icon class="h-5 w-5 text-primary" />
                    <div>
                      <p class="text-sm font-medium">Fecha de Conversión</p>
                      <p class="text-sm text-muted-foreground">{{ fileDate }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 p-3 border rounded-lg">
                    <file-text-icon class="h-5 w-5 text-primary" />
                    <div>
                      <p class="text-sm font-medium">Tamaño</p>
                      <p class="text-sm text-muted-foreground">2.5 MB</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 p-3 border rounded-lg">
                    <file-text-icon class="h-5 w-5 text-primary" />
                    <div>
                      <p class="text-sm font-medium">Páginas</p>
                      <p class="text-sm text-muted-foreground">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="card">
              <div class="card-header">
                <h2 class="card-title flex items-center gap-2">
                  <bar-chart-icon class="h-5 w-5" />
                  Reporte de Conversión
                </h2>
              </div>
              <div class="card-content">
                <div class="space-y-4">
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Archivo Original</p>
                    <p class="text-sm text-muted-foreground">documento.docx</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Formato Original</p>
                    <p class="text-sm text-muted-foreground">Microsoft Word</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Tiempo de Conversión</p>
                    <p class="text-sm text-muted-foreground">3.2 segundos</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Estado</p>
                    <span class="status-badge">
                      Completado
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Historial de Acciones</h2>
              </div>
              <div class="card-content">
                <div class="space-y-4">
                  <div v-for="(item, index) in historyItems" :key="index" class="flex items-center justify-between border-b pb-2 last:border-0">
                    <p class="text-sm font-medium">{{ item.action }}</p>
                    <p class="text-xs text-muted-foreground">{{ item.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Archivos Relacionados</h2>
            <p class="card-description">Otros archivos convertidos recientemente</p>
          </div>
          <div class="card-content">
            <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <router-link v-for="(file, index) in relatedFiles" :key="index" :to="`/dashboard/files/${index + 1}`">
                <div class="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div class="flex items-center gap-3">
                    <file-text-icon class="h-8 w-8 text-primary" />
                    <div>
                      <p class="font-medium">{{ file.name }}</p>
                      <p class="text-sm text-muted-foreground">
                        Convertido el {{ file.date }}
                      </p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  FileText, Download, Share2, Trash2, ArrowLeft, 
  Clock, FileType, BarChart 
} from 'lucide-vue-next'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const route = useRoute()
const fileId = route.params.id

const fileName = computed(() => `documento-${fileId}.pdf`)
const fileDate = ref('12/03/2025')

const historyItems = ref([
  { action: "Archivo convertido", time: "Hoy, 14:30" },
  { action: "Archivo descargado", time: "Hoy, 14:35" },
  { action: "Archivo visualizado", time: "Hoy, 15:20" }
])

const relatedFiles = ref([
  { name: 'documento-1.pdf', date: '12/03/2025' },
  { name: 'documento-2.pdf', date: '11/03/2025' },
  { name: 'documento-3.pdf', date: '10/03/2025' }
])
</script>

<style scoped>
.card {
  @apply border rounded-lg shadow-sm overflow-hidden bg-white;
}

.card-header {
  @apply p-6 border-b;
}

.card-title {
  @apply text-xl font-semibold;
}

.card-description {
  @apply text-sm text-muted-foreground;
}

.card-content {
  @apply p-6;
}

.btn-primary {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2;
}

.btn-outline {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2;
}

.btn-ghost {
  @apply inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2;
}

.btn-sm {
  @apply h-9 rounded-md px-3;
}

.badge {
  @apply inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground;
}

.status-badge {
  @apply inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700;
}

.text-destructive {
  @apply text-red-600;
}
</style>

