import { LightningElement, wire, track, api } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';
import { refreshApex } from '@salesforce/apex';   // ✅ MISSING EARLIER
import deleteStudent from '@salesforce/apex/StudentController.deleteStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentList extends LightningElement {
    
    @track students;
    wiredResult;
    
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Class', fieldName: 'Class__c' },
        { label: 'Phone', fieldName: 'Phone__c' },
        { type: 'button',
          typeAttributes: {
            label: 'Delete',
            name: 'delete',
            variant: 'destructive'
        }}
        
    ];

    @wire(getAllStudents)
    wiredStudents(result) {
        this.wiredResult = result;         // store result object
        if (result.data) {
            this.students = result.data;
        }
    }

    handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;

    if (actionName === 'delete') {
        this.deleteStudent(row.Id);
    }
}   

    deleteStudent(studentId) {
    deleteStudent({ studentId: studentId })
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Deleted',
                    message: 'Student deleted',
                    variant: 'success'
                })
            );

            this.refreshList();  // 🔥 refresh table
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error deleting record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
}


    @api
    refreshList() {
        console.log("REFRESH LIST CALLED");
        return refreshApex(this.wiredResult);   // now works correctly
    }
    
}
