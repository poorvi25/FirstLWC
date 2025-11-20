import { LightningElement, track } from 'lwc';

export default class AccountMainPage extends LightningElement {

    handleRecordCreated() {
        console.log('Record created event received by parent');

        // find child component
        //This made the parent refresh the datatable when a new account is created.
        const child = this.template.querySelector('c-account-search');
        
        if (child && typeof child.refreshList === 'function') {
            child.refreshList();   // call child method
        }
    }
}
