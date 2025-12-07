import { LightningElement, wire, track, api } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';
import deleteStudent from '@salesforce/apex/StudentController.deleteStudent';
import updateStudent from '@salesforce/apex/StudentController.updateStudent';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentList extends LightningElement {

    @track students = [];
    @track paginatedStudents = [];

    wiredResult;
    searchKey = '';

    // Sorting
    sortedBy = 'Name';
    sortedDirection = 'asc';

    // Pagination
    page = 1;
    pageSize = 5;
    totalPages = 0;

    // Edit modal
    isEditModalOpen = false;
    editRecord = {};

    // Datatable columns
    columns = [
        { label: 'Name', fieldName: 'Name', sortable: true },
        { label: 'Email', fieldName: 'Email__c', sortable: true },
        { label: 'Class', fieldName: 'Class__c', sortable: true },
        { label: 'Phone', fieldName: 'Phone__c', sortable: true },
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                variant: 'brand'
            }
        },
        {
            type: 'button',
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                variant: 'destructive'
            }
        }
    ];

    // Wire: Load students
    @wire(getAllStudents)
    wiredStudents(result) {
        this.wiredResult = result;
        if (result.data) {
            this.students = result.data;
            this.totalPages = Math.ceil(this.students.length / this.pageSize);
            this.updatePaginatedList();
        }
    }

    // SEARCH
    handleSearchChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filterRecords();
    }

    filterRecords() {
        if (!this.searchKey) {
            this.students = this.wiredResult.data;
        } else {
            const s = this.searchKey;
            this.students = this.wiredResult.data.filter(
                stu =>
                    (stu.Name && stu.Name.toLowerCase().includes(s)) ||
                    (stu.Email__c && stu.Email__c.toLowerCase().includes(s)) ||
                    (stu.Class__c && stu.Class__c.toLowerCase().includes(s))
            );
        }
        this.page = 1;
        this.totalPages = Math.ceil(this.students.length / this.pageSize);
        this.updatePaginatedList();
    }

    // SORTING
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortedDirection);
    }

    sortData(field, direction) {
        let clone = [...this.students];

        clone.sort((a, b) => {
            let val1 = a[field] ? a[field].toString().toLowerCase() : '';
            let val2 = b[field] ? b[field].toString().toLowerCase() : '';

            return direction === 'asc'
                ? (val1 > val2 ? 1 : -1)
                : (val1 < val2 ? 1 : -1);
        });

        this.students = clone;
        this.updatePaginatedList();
    }

    // PAGINATION
    updatePaginatedList() {

        //Record per page
        const start = (this.page - 1) * this.pageSize;
        const end = start + this.pageSize;

        this.paginatedStudents = this.students.slice(start, end);
    }

    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
            this.updatePaginatedList();
        }
    }

    previousPage() {
        if (this.page > 1) {
            this.page--;
            this.updatePaginatedList();
        }
    }

    get isPrevDisabled() {
        //Disable prev if page 1
        return this.page === 1;
    }

    get isNextDisabled() {
        //Disable next if last
        return this.page === this.totalPages || this.totalPages === 0;
    }

    // ROW ACTIONS
    handleRowAction(event) {
        const action = event.detail.action.name;
        const row = event.detail.row;

        if (action === 'edit') this.openEditModal(row);
        if (action === 'delete') this.deleteStudent(row.Id);
    }

    // DELETE
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
                this.showToast('Success', 'Student updated', 'success');
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

    // REFRESH LIST
    @api refreshList() {
        return refreshApex(this.wiredResult).then(() => {
            this.students = this.wiredResult.data;
            this.totalPages = Math.ceil(this.students.length / this.pageSize);
            this.updatePaginatedList();
        });
    }

    // TOAST
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
