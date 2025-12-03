import { LightningElement, wire, track, api } from 'lwc';
import getAllStudents from '@salesforce/apex/StudentController.getAllStudents';
import deleteStudent from '@salesforce/apex/StudentController.deleteStudent';
import updateStudent from '@salesforce/apex/StudentController.updateStudent';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentList extends LightningElement {
    
    @track students = [];
    wiredResult;

    // 🔍 search
    searchKey = '';

    // 🔽 sorting states
    sortedBy = 'Name';
    sortedDirection = 'asc';

    // ✏️ edit modal
    isEditModalOpen = false;
    editRecord = {};

    // 📝 datatable columns
    columns = [
        { label: 'Name', fieldName: 'Name', sortable: true },
        { label: 'Email', fieldName: 'Email__c', sortable: true },
        { label: 'Class', fieldName: 'Class__c', sortable: true },
        { label: 'Phone', fieldName: 'Phone__c', sortable: true },
        {
            type: 'button',
            fixedWidth: 100,
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                variant: 'destructive'
            }
        },
        {
            type: 'button',
            fixedWidth: 100,
            typeAttributes: {
                label: 'Edit',
                name: 'edit',
                variant: 'brand'
            }
        }
    ];

    // 📌 load records
    @wire(getAllStudents)
    wiredStudents(result) {
        this.wiredResult = result;
        if (result.data) {
            this.students = result.data;
        }
    }

    // 🔍 search box
    handleSearchChange(event) {
        this.searchKey = event.target.value.toLowerCase();
        this.filterRecords();
    }

    filterRecords() {
        if (!this.searchKey) {
            this.students = this.wiredResult.data;
            return;
        }

        const s = this.searchKey;

        this.students = this.wiredResult.data.filter(stu =>
            (stu.Name && stu.Name.toLowerCase().includes(s)) ||
            (stu.Email__c && stu.Email__c.toLowerCase().includes(s)) ||
            (stu.Class__c && stu.Class__c.toLowerCase().includes(s))
        );
    }

    // 🗑️ handle delete + edit buttons
    handleRowAction(event) {
        const action = event.detail.action.name;
        const row = event.detail.row;

        if (action === 'delete') {
            this.deleteStudent(row.Id);
        } else if (action === 'edit') {
            this.openEditModal(row);
        }
    }

    // 🗑️ delete student
    deleteStudent(studentId) {
        deleteStudent({ studentId })
            .then(() => {
                this.showToast('Deleted', 'Student deleted successfully', 'success');
                this.refreshList();
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    // ✏️ open modal
    openEditModal(row) {
        this.editRecord = { ...row };
        this.isEditModalOpen = true;
    }

    // 📝 input change inside modal
    handleEditChange(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.editRecord = { 
            ...this.editRecord,
            [field]: value
        };
    }

    // ✔️ save updated student
    saveUpdatedRecord() {
        updateStudent({ student: this.editRecord })
            .then(() => {
                this.showToast('Success', 'Student updated successfully', 'success');
                this.isEditModalOpen = false;
                this.refreshList();
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    closeEditModal() {
        this.isEditModalOpen = false;
    }

    // 🔄 refresh from wire
    @api
    refreshList() {
        return refreshApex(this.wiredResult);
    }

    // 🔽 sorting handler
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        this.sortData(this.sortedBy, this.sortedDirection);
    }

    sortData(field, direction) {
        let data = [...this.students];

        data.sort((a, b) => {
            let v1 = a[field] ? a[field].toString().toLowerCase() : '';
            let v2 = b[field] ? b[field].toString().toLowerCase() : '';

            return direction === 'asc'
                ? (v1 > v2 ? 1 : -1)
                : (v1 < v2 ? 1 : -1);
        });

        this.students = data;
    }

    // 🍞 reuse toast
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}
