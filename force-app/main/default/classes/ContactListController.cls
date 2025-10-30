public class ContactListController {
    
    private String sortOrder='FirstName';
    
    public List<Contact> getContacts(){
        List<Contact> results = Database.query(
        'SELECT Id, FirstName , LastName , Email' +
            ' FROM Contact ' +
            ' ORDER BY ' + sortOrder +' ASC ' +
            'LIMIT 20'
        );
        return results;
    }
    public void sortByLastName(){
        this.sortOrder = 'LastName';
    }

    public void sortByFirstName(){
        this.sortOrder = 'FirstName';
    }
}