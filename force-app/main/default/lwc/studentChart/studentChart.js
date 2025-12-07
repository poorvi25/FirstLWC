import { LightningElement, wire } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';
import CHART_JS from '@salesforce/resourceUrl/ChartJS';
import { loadScript } from 'lightning/platformResourceLoader';

export default class StudentChart extends LightningElement {
    chartInitialized = false;
    chart;
    classA = 0;
    classB = 0;
    classC = 0;

    renderedCallback() {
        if (this.chartInitialized) return;

        this.chartInitialized = true;

        loadScript(this, CHART_JS)
            .then(() => {
                this.loadChart();
            })
            .catch(e => {
                // optional: console.error(e);
            });
    }

    @wire(getAllStudents)
    wiredStudents({ data }) {
        if (data) {
            this.classA = data.filter(s => s.Class__c === 'A').length;
            this.classB = data.filter(s => s.Class__c === 'B').length;
            this.classC = data.filter(s => s.Class__c === 'C').length;

            if (this.chart) {
                this.chart.data.datasets[0].data = [this.classA, this.classB, this.classC];
                this.chart.update();
            }
        }
    }

    loadChart() {
        const canvas = this.template.querySelector('canvas.chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        this.chart = new window.Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Class A', 'Class B', 'Class C'],
                datasets: [
                    {
                        data: [this.classA, this.classB, this.classC],
                        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
                    }
                ]
            }
        });
    }
}
