import { LightningElement, wire, track, api } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';
import deleteStudent from '@salesforce/apex/StudentController.deleteStudent';
import updateStudent from '@salesforce/apex/StudentController.updateStudent';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentList extends LightningElement {

    // Master list from Apex
    @track students = [];

    // Only the current page slice
    @track paginatedStudents = [];

    // Wire result for refreshApex
    wiredResult;

    // Search
    searchKey = '';

    // Sorting
    sortedBy = 'Name';
    sortedDirection = 'asc';

    // Pagination
    page = 1;
    pageSize = 5;   // ⭐ As per your choice
    totalPages = 0;

    // Edit Modal
    isEditModalOpen = false;
    editRecord = {};

    // Columns
    columns = [
        { label: 'Name', fieldName: 'Name', sortable: true },
        { label: 'Email', fieldName: 'Email__c', sortable: true },
        { label: 'Class', fieldName: 'Class__c', sortable: true },
        { label: 'Phone', fieldName: 'Phone__c', sortable: true },

        {
            type: 'button',
            typeAttributes: { label: 'Edit', name: 'edit', variant: 'brand' }
        },
        {
            type: 'button',
            typeAttributes: { label: 'Delete', name: 'delete', variant: 'destructive' }
        }
    ];

    // Load initial data
    @wire(getAllStudents)
    wiredStudents(result) {
        this.wiredResult = result;

        if (result.data) {
            this.students = result.data;
            this.applyAll();   // ⭐ Apply search+sort+pagination
        }
    }

    // ⭐ MAIN PIPELINE: Search → Sort → Pagination
    applyAll() {
        let data = [...this.students];

        // 1️⃣ Search
        if (this.searchKey) {
            const s = this.searchKey.toLowerCase();
            data = data.filter(stu =>
                (stu.Name && stu.Name.toLowerCase().includes(s)) ||
                (stu.Email__c && stu.Email__c.toLowerCase().includes(s)) ||
                (stu.Class__c && stu.Class__c.toLowerCase().includes(s))
            );
        }

        // 2️⃣ Sort
        data.sort((a, b) => {
            let v1 = a[this.sortedBy] ? a[this.sortedBy].toString().toLowerCase() : '';
            let v2 = b[this.sortedBy] ? b[this.sortedBy].toString().toLowerCase() : '';

            return this.sortedDirection === 'asc'
                ? (v1 > v2 ? 1 : -1)
                : (v1 < v2 ? 1 : -1);
        });

        // 3️⃣ Pagination
        this.totalPages = Math.ceil(data.length / this.pageSize);
        if (this.page > this.totalPages) this.page = this.totalPages || 1;

        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;

        this.paginatedStudents = data.slice(start, end);
    }

    // SEARCH
    handleSearchChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.page = 1;          // reset to page 1
        this.applyAll();
    }

    // SORT
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.applyAll();
    }

    // PAGINATION BUTTONS
    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.applyAll();
        }
    }

    previousPage() {
        if (this.page > 1) {
            this.page--;
            this.applyAll();
        }
    }

    get isPrevDisabled() {
        return this.page === 1;
    }

    get isNextDisabled() {
        return this.page === this.totalPages || this.totalPages === 0;
    }

    // EDIT
    openEditModal(row) {
        this.editRecord = { ...row };
        this.isEditModalOpen = true;
    }

    handleEditChange(event) {
        this.editRecord[event.target.name] = event.target.value;
    }

    saveUpdatedRecord() {
        updateStudent({ student: this.editRecord })
            .then(() => {
                this.showToast('Updated', 'Student updated successfully', 'success');
                this.isEditModalOpen = false;
                this.refreshList();
            })
            .catch(err => {
                this.showToast('Error', err.body.message, 'error');
            });
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }

    // DELETE
    handleRowAction(event) {
        const action = event.detail.action.name;
        const row = event.detail.row;

        if (action === 'delete') {
            this.deleteStudent(row.Id);
        } else if (action === 'edit') {
            this.openEditModal(row);
        }
    }

    deleteStudent(studentId) {
        deleteStudent({ studentId })
            .then(() => {
                this.showToast('Deleted', 'Student deleted', 'success');
                this.refreshList();
            })
            .catch(err => {
                this.showToast('Error', err.body.message, 'error');
            });
    }

    // REFRESH
    @api
    refreshList() {
        return refreshApex(this.wiredResult).then(() => {
            this.students = this.wiredResult.data;
            this.applyAll();
        });
    }

    // Toast helper
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
