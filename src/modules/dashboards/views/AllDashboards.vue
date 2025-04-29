<template>
  <div class="powerbi-wrapper">
    

    <div id="report-container" class="report-container"></div>
    <div>
      <button @click="toggleFullscreen" class="fullscreen-button">🖥️ Tela Cheia</button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { models, service, factories } from 'powerbi-client';

const auth = useAuthStore();

function toggleFullscreen() {
  const elem = document.getElementById('report-container');
  if (!elem) return;

  if (!document.fullscreenElement) {
    elem.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('dashboards/api/powerbi-embed/', {
      headers: {
        Authorization: `Token ${auth.token}`
      }
    });

    const data = res.data;

    const embedConfig = {
      type: 'report',
      id: data.reportId,
      embedUrl: data.embedUrl,
      accessToken: data.embedToken,
      tokenType: models.TokenType.Embed,
      settings: {
        panes: {
          filters: { visible: false },
          pageNavigation: { visible: true }
        }
      }
    };

    const reportContainer = document.getElementById('report-container');
    if (reportContainer) {
      const powerbiService = new service.Service(
        factories.hpmFactory,
        factories.wpmpFactory,
        factories.routerFactory
      );

      powerbiService.reset(reportContainer);
      powerbiService.embed(reportContainer, embedConfig);
    }
  } catch (error) {
    console.error('Erro ao carregar Power BI:', error);
  }
});
</script>

<style scoped>
.powerbi-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.report-container {
  width: 100%;
  height: 85vh; /* Altura padrão, mas muda em fullscreen */
  background-color: #f4f4f4;
  transition: all 0.3s ease;
}

.fullscreen-button {
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 999;
  padding: 10px 15px;
  background: #0078d4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
