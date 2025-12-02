import { LightningElement, track } from 'lwc';
import createStudent from '@salesforce/apex/StudentController.createStudent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentForm extends LightningElement {

    name = '';
    email = '';
    classValue = '';

    handleInput(event) {
        this[event.target.name] = event.target.value;
    }

    createStudentRecord() {
        const studentObj = {
            Name: this.name,
            Email__c: this.email,
            Class__c: this.classValue
        };

        createStudent({ student: studentObj })
            .then(() => {

                this.showToast("Success", "Student created successfully", "success");

                // CLEAR INPUTS
                this.name = '';
                this.email = '';
                this.classValue = '';

                // VERY IMPORTANT → Fire event
                console.log("CHILD FIRING EVENT studentcreated");
                this.dispatchEvent(new CustomEvent('studentcreated'));

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
