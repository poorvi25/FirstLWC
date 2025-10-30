public class AccountCalculator {
    
    @future
    public static void countContacts(List<Id> accIds){
        List<Account> accList = [SELECT Id, (SELECT Id from Contacts)
                                FROM Account where Id IN:accIds];
        
        for(Account acc:accList){
            acc.Number_of_Contacts__c = acc.Contacts.size();  
        }
        if(!accList.isEmpty()){
            update accList;
        }

    }

}