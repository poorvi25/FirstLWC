import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountHandler.createAccount';

export default class CreateAccountForm extends LightningElement {
    @track accName = '';
    @track industry = '';
    @track phone = '';
    @track message;
    @track error;

    handleChange(event) {
        const field = event.target.label;

        if (field === 'Account Name') this.accName = event.target.value;
        if (field === 'Industry') this.industry = event.target.value;
        if (field === 'Phone') this.phone = event.target.value;
    }

    handleCreate() {
        const accountObj = {
            Name: this.accName,
            Industry: this.industry,
            Phone: this.phone
        };

        // call apex imperative
        createAccount({ acc: accountObj })
            .then(result => {
                this.message = 'Account created successfully: ' + result.Name;
                this.error = undefined;

                // clear inputs
                this.accName = '';
                this.industry = '';
                this.phone = '';
               // 🔥 dispatch event so parent can refresh
               //“Hey parent, a new record was created!”
                this.dispatchEvent(new CustomEvent('recordcreated'));

            })
            .catch(error => {
                this.error = error.body.message;
                this.message = undefined;
            });
    }
}
