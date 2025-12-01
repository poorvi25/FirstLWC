import { LightningElement, wire, track } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';

export default class StudentList extends LightningElement {
    
    @track students;
    
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Class', fieldName: 'Class__c' },
        { label: 'Phone', fieldName: 'Phone__c' }
    ];

    @wire(getAllStudents)
    wiredStudents({data, error}) {
        if (data) {
            this.students = data;
        } 
        else if (error) {
            console.error('Error:', error);
        }
    }
}
