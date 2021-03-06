<template>
  <div>
    <div class="detail" v-if="exists">
      <div class="meta">
        <pre>{{this.experiment | pretty}}</pre>
      </div>
      <LineChartContainer class="ssim" :experiment="this.experiment" metric="SSIM"/>
      <CumulativeChart class="ssim-cdf" :experiment="this.experiment" metric="SSIM"/>
      <LineChartContainer class="psnr" :experiment="this.experiment" metric="PSNR"/>
      <CumulativeChart class="psnr-cdf" :experiment="this.experiment" metric="PSNR"/>
      <LineChartContainer class="client-tx" :experiment="this.experiment" metric="client_tx_bytes"/>
      <LineChartContainer class="server-tx" :experiment="this.experiment" metric="server_tx_bytes"/>
      <LineChartContainer class="client-rx" :experiment="this.experiment" metric="client_rx_bytes"/>
      <LineChartContainer class="server-rx" :experiment="this.experiment" metric="server_rx_bytes"/>
      <LineChartContainer
        class="qlog-server-packet-sent"
        v-if="['datagram', 'streamperframe'].includes(this.experiment.handler)"
        :experiment="this.experiment"
        metric="server_packet_sent" />
      <LineChartContainer
        class="qlog-client-packet-received"
        v-if="['datagram', 'streamperframe'].includes(this.experiment.handler)"
        :experiment="this.experiment"
        metric="client_packet_received" />
      <LineChartContainer
        class="qlog-client-packet-sent"
        v-if="['datagram', 'streamperframe'].includes(this.experiment.handler)"
        :experiment="this.experiment"
        metric="client_packet_sent" />
      <LineChartContainer
        class="qlog-server-packet-received"
        v-if="['datagram', 'streamperframe'].includes(this.experiment.handler)"
        :experiment="this.experiment"
        metric="server_packet_received" />
      <LineChartContainer
        class="scream-bitrate"
        v-if="this.experiment.congestionControl === 'scream'"
        :experiment="this.experiment"
        metric="scream-bitrate"/>
      <LineChartContainer
        class="scream-congestion"
        v-if="this.experiment.congestionControl === 'scream'"
        :experiment="this.experiment"
        metric="scream-congestion"/>
      <LineChartContainer
        class="rtcp-overhead"
        v-if="this.experiment.congestionControl === 'scream'"
        :experiment="this.experiment"
        metric="rtcp-overhead"
        />
      <LineChartContainer
        class="scream-queue-length"
        v-if="this.experiment.congestionControl === 'scream'"
        :experiment="this.experiment"
        metric="scream-queue-length"/>
    </div>
    <div v-else>Experiment not found</div>
  </div>
</template>

<script>
import LineChartContainer from '@/components/LineChartContainer.vue';
import Experiment from '@/experiment';
import firestore from '@/db';
import CumulativeChart from '@/components/CumulativeChart.vue';

export default {
  name: 'ExperimentDetail',
  components: { LineChartContainer, CumulativeChart },
  props: {
    id: String,
    commit: String,
  },
  data() {
    return {
      exists: false,
      experiment: [],
    };
  },
  async mounted() {
    firestore.then((db) => {
      db.collection(`experiments/${this.commit}/runs`)
        .doc(this.id)
        .get()
        .then((doc) => {
          this.exists = doc.exists;
          if (doc.exists) {
            this.experiment = new Experiment(doc.id, doc.data());
          }
        });
    });
  },
  filters: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 50% 50%;
}
.meta {
  text-align: left;
  grid-row: 1;
  grid-column: auto;
}
.ssim {
  grid-row: 2;
  grid-column: 1;
}
.ssim-cdf {
  grid-row: 2;
  grid-column: 2;
}
.psnr {
  grid-row: 3;
  grid-column: 1;
}
.psnr-cdf {
  grid-row: 3;
  grid-column: 2;
}
.client-tx {
  grid-row: 5;
  grid-column: 2;
}
.server-tx {
  grid-row: 4;
  grid-column: 1;
}
.client-rx {
  grid-row: 4;
  grid-column: 2;
}
.server-rx {
  grid-row: 5;
  grid-column: 1;
}
.qlog-server-packet-sent {
  grid-row: 6;
  grid-column: 1;
}
.qlog-client-packet-received {
  grid-row: 6;
  grid-column: 2;
}
.qlog-client-packet-sent {
  grid-row: 7;
  grid-column: 2;
}
.qlog-server-packet-received {
  grid-row: 7;
  grid-column: 1;
}
.scream-congestion {
  grid-row: 8;
  grid-column: 1;
}
.scream-bitrate {
  grid-row: 8;
  grid-column: 2;
}
.scream-queue-length {
  grid-row: 9;
  grid-column: 1;
}
.rtcp-overhead {
  grid-row: 9;
  grid-column: 2;
}
</style>
