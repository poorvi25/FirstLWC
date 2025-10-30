public class updateAccountRecords {
    public void updateAccount(){
        List<Account> accToBeUpdated = new List<Account>();
        Set<Id> accidSet = new Set<Id>();
        for(Contact con : [SELECT Id, Account.Id from Contact where Name LIKE '%TEST%'
                           AND Account.Id !=NULL]){
                               if(!accidSet.contains(con.Account.Id)){
                                 Account acc = new Account();
                                 acc.Id = con.Account.Id;
                                 acc.Active__c = 'Yes';
                                 acc.Rating = 'Cold';
                                 accToBeUpdated.add(acc);
                                 accidSet.add(con.account.id);
                               }
                           }
        if(!accToBeUpdated.isEmpty()){
            update accToBeUpdated;
        }
    }

}