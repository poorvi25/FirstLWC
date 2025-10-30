public class OpportunityTriggerHandler {
    public static void updateAccAnnualRevenue(List<Opportunity> oppList){
        Set<Id> accIds = new Set<Id>();
        if(!oppList.isEmpty()){
            for(Opportunity opp:oppList){
                if(opp.AccountId !=null){
                    accIds.add(opp.AccountId);
                }
                
            }
        }
        List<Account> accList = [Select Id, AnnualRevenue,
                                (select Id, Amount FROM Opportunities)
                                From Account where Id IN:accIds];
    }
}