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
        this.isLoading = true;   // 🌀 show spinner
        this.error = undefined;
        this.accounts = undefined;

        getAccountsByIndustry({ industry: this.industry })
            .then(result => {
                this.isLoading = false;  // hide spinner
                if (result.length > 0) {
                    this.accounts = result;
                } else {
                    this.error = 'No Accounts Found.';
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.error = error.body.message;
            });
    }
}
