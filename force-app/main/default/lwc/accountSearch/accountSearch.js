import { LightningElement, api, track } from 'lwc';
import getAccountsByIndustry from '@salesforce/apex/AccountController.getAccountsByIndustry';
import { NavigationMixin } from 'lightning/navigation';   // 👈 for record navigation

export default class AccountSearch extends NavigationMixin(LightningElement) {
    @track industry = '';
    @track accounts;
    @track error;
    @track isModalOpen = false;
    @track selectedAccount = {};

    
    // Pagination state
    pageSize = 10;
    offsetVal = 0;
    disableNext = false; //for next button
    disablePrev = true; //for prev button

    // default Sorting state
    sortField = 'Name';
    sortDirection = 'ASC';
       columns = [
    { label: 'Name', fieldName: 'Name', sortable: true },
    { label: 'Industry', fieldName: 'Industry', sortable: true },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Website', fieldName: 'Website' },
    {
        type: 'button',
        typeAttributes: { label: 'View Details', name: 'view_details', variant: 'brand' }
    }
];

    // ⚙️ Datatable row click handler
    handleRowAction(event) {
    const actionName = event.detail.action.name;
    if (actionName === 'view_details') {
        this.selectedAccount = event.detail.row;
        this.isModalOpen = true;
    }
}

    closeModal() {
        this.isModalOpen = false;
    }

    navigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.selectedAccount.Id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
    handleChange(event) {
        this.industry = event.target.value;
    }

    handleSearch() {
       this.offsetVal = 0;
        this.fetchAccounts();
    }
fetchAccounts() {
        this.isLoading = true; //show spinner
        this.error = undefined;
        getAccountsByIndustry({
            industry: this.industry,
            offsetVal: this.offsetVal,
            limitSize: this.pageSize,
            sortField: this.sortField,
            sortDirection: this.sortDirection
        })
            .then(result => {
                this.isLoading = false;
                this.accounts = result;
                this.disablePrev = this.offsetVal === 0;
                this.disableNext = result.length < this.pageSize;
                if (result.length === 0) {
                    this.error = 'No Accounts Found.';
                }
            })
            .catch(error => {
                this.isLoading = false;
                this.error = error.body.message;
                this.accounts = undefined;
            });
    }
//Pagiation buttons
    handleNext() {
        this.offsetVal += this.pageSize;
        this.fetchAccounts();
    }

    handlePrev() {
        if (this.offsetVal >= this.pageSize) {
            this.offsetVal -= this.pageSize;
            this.fetchAccounts();
        }
    }

    handleSort(event) {
        this.sortField = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection.toUpperCase();
        this.fetchAccounts();
    }

    @api refreshList() {
    this.fetchAccounts();
}

}