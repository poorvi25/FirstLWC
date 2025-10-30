public class SoqlDemo {

    public static void method1(){
        List<Account> accList = [SELECT Id, Name, (Select Id, FirstName from Contacts) from Account LIMIT 10];
        
        if(!accList.isEmpty()){
            for(Account acc: accList){
                acc.Total_Contacts_c__c = acc.Contacts.size();
            }
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
}