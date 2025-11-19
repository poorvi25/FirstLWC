public with sharing class AccountHandler {

    @AuraEnabled
    public static Account createAccount(Account acc) {
        try {
            insert acc;
            return acc;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating account: ' + e.getMessage());
        }
    }
}
