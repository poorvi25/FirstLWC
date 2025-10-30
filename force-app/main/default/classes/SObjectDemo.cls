public class SObjectDemo {

    public static void Method1(){
        List<Account> accList = [select ID, Name, Phone from Account where CreatedDate=THIS_WEEK]; //fetch data from Account object and store it in list
        //Set<Id> accIds = new Set<Id>();
        //Map<Id, Account> accToMap = new Map<Id, Account>();
        List<Opportunity> oppToCreate = new List<Opportunity>();
        //storing ids to set (as they are unique)
        if(!accList.isEmpty()){
            for(Account acc: accList){
                Opportunity opp = new Opportunity();
                opp.Name = acc.Name;
                opp.CloseDate =System.today();
                opp.StageName ='Prospecting';
                opp.AccountId = acc.Id;
                oppToCreate.add(opp);

            }
        }
        if(!oppToCreate.isEmpty()){
            insert oppToCreate;
        }
      
    
    }
}