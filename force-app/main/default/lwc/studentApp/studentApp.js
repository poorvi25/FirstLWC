import { LightningElement } from 'lwc';
import { refreshApex } from '@salesforce/apex'; 
export default class StudentApp extends LightningElement {

    handleStudentCreated() {
        console.log("EVENT RECEIVED IN PARENT");

        setTimeout(() => {
            const listCmp = this.template.querySelector('c-student-list');
            console.log("List Component Found: ", listCmp);

            if (listCmp) {
                listCmp.refreshList().then(() => {
                    console.log("REFRESH COMPLETED");
                });
            } else {
                console.error("StudentList NOT found in DOM!");
            }
        }, 100);
    }
}
