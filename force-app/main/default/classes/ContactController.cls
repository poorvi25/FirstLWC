public with sharing class ContactController{
    //with sharing is record level security
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId){
        try {
            return[
                SELECT AccountId, Id, FirstName
                FROM Contact
                WHERE AccountId = :accId
                WITH SECURITY_ENFORCED //Object & field level security
            ];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}