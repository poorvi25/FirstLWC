import { LightningElement, wire } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';

export default class StudentDashboard extends LightningElement {

    totalStudents = 0;
    classA = 0;
    classB = 0;
    classC = 0;

    @wire(getAllStudents)
    wiredStudents({ data }) {
        if (data) {
            this.totalStudents = data.length;
            this.classA = data.filter(s => s.Class__c === 'A').length;
            this.classB = data.filter(s => s.Class__c === 'B').length;
            this.classC = data.filter(s => s.Class__c === 'C').length;
        }
    }
}
