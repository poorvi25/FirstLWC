public class OppTriggerHandler {

    public static void updateAccAnnualRevenue(List<Opportunity> oppList, Map<Id, Opportunity> oldMap){
        Set<Id> accIds = new Set<Id>();
        if(!oppList.isEmpty()){
            for(Opportunity opp:oppList){
                if((oldMap==null && opp.AccountId !=null)
                  || (oldMap!=null && opp.AccountId!=null
                     && opp.Amount!=oldMap.get(opp.Id).Amount)){
                    accIds.add(opp.AccountId);
                }
                
            }
        }
        List<Account> accList = [Select Id, AnnualRevenue,
                                (select Id, Amount FROM Opportunities)
                                From Account where Id IN:accIds];
        
        if(!accList.isEmpty()){
            for(Account acc: accList){
                Decimal total = 0;
                for(Opportunity opp:acc.Opportunities){
                    total = total + opp.Amount;
                }
                acc.AnnualRevenue = total;
            }
        }
        if(!accList.isEmpty()){
            update accList;
        }
    }
}