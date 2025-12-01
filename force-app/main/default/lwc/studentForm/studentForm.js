import { LightningElement, track } from 'lwc';
import createStudent from '@salesforce/apex/StudentController.createStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentForm extends LightningElement {

    @track name = '';
    @track email = '';
    @track classValue = '';

    handleInput(event) {
        this[event.target.name] = event.target.value;
    }

    createStudentRecord() {

        // Validation
        if (!this.name) {
            this.showToast("Error", "Name is required", "error");
            return;
        }

        const studentObj = {
            Name: this.name,
            Email__c: this.email,
            Class__c: this.classValue
        };

        createStudent({ student: studentObj })
        .then(result => {
            this.showToast("Success", "Student created successfully", "success");

            // Clear fields
            this.name = '';
            this.email = '';
            this.classValue = '';
        })
        .catch(error => {
            this.showToast("Error", error.body.message, "error");
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}
