import { LightningElement, track } from 'lwc';
import getAccountsByIndustry from '@salesforce/apex/AccountController.getAccountsByIndustry';

export default class AccountSearch extends LightningElement {
    @track industry = '';
    @track accounts;
    @track error;

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Phone', fieldName: 'Phone' }
    ];

    handleChange(event) {
        this.industry = event.target.value;
    }

    handleSearch() {
        getAccountsByIndustry({ industry: this.industry })
            .then(result => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error.body.message;
                this.accounts = undefined;
            });
    }
}
