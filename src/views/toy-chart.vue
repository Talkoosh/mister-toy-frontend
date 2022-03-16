<template>
    <div class="main">
        <h1>Prices By Toy Labels:</h1>
        <DoughnutChart :chartData="pricesData" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DoughnutChart, BubbleChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
    name: 'charts',
    components: { DoughnutChart, BubbleChart },
    data() {
        return {
            pricesData: {
                labels: [],
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0],
                        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    },
                ],
            }
        }
    },
    created() {
        this.toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (label && !this.pricesData.labels.includes(label)) this.pricesData.labels.push(label)
            })
        })

        this.pricesData.labels.forEach((label, idx) => {
            this.toys.forEach(toy => {
                if (toy.labels.includes(label)) this.pricesData.datasets[0].data[idx] += toy.price
            })
        })
    },
    methods: {

    },
    computed: {
        toys() {
            return this.$store.getters.toysForDisplay
        },

    },
});
</script>