public class AccountTriggerHandler {
    
    /*public static void validateActiveAccounnt(List<Account> accList){
        if(!accList.isEmpty()){
            for(Account acc: accList){
                if(acc.Active__c == 'Yes'){
                    acc.addError('You cannot delete active account');
                }
            }
        }
    }
    public static void updateAccRating(List<Account> newList){
        if(!newList.isEmpty()){
            for(Account acc:newList){
                if(acc.Industry!=NULL && acc.Industry == 'Energy'){
                    acc.Rating = 'Hot';
                }else{
                    acc.Rating = 'Cold';
                }
            }
        }
        }
    
    public static void createOppAcc(List<Account> accList){
        List<Opportunity> oppList = new List<Opportunity>();
        if(!accList.isEmpty()){
            for(Account acc: accList){
                Opportunity opp = new Opportunity();
                opp.Name = acc.Name;
                opp.CloseDate = System.today();
                opp.StageName = 'Prospecting';
                opp.AccountId= acc.Id;
                oppList.add(opp);
            }
        }
       if(!oppList.isEmpty()){
            insert oppList;
        }
        Database.SaveResult[] srList = Database.insert(oppList, False);
        for(integer i=0; i<srList.size();i++){
            if(!srList[i].isSuccess()){
                String errors = '';
                for(Database.Error err: srList[i].getErrors()){
                    errors = errors + err.getMessage();
                }
                accList[i].addError(errors);
            }
        }
    }
    
   /* public static void updateDescOnAcc(List<Account> acList, Map<Id,Account> oldMap){
        if(!acList.isEmpty()){
            for(Account ac: acList){
                if(ac.Phone != oldmap.get(ac.id).Phone){
                    ac.Description = 'Phone number updated';
                }
            }
        }
    }
    
    public static void updatePhoneOnOpp(List<Account> newList1, Map<Id,Account> oldMap){
        Set<Id> accIds = new Set<Id>();
        List<Opportunity> oppToBeUpdated = new List<Opportunity>();
        if(!newList1.isEmpty()){
            for(Account ac1: newList1){
                accIds.add(ac1.Id);
            }
        }
        List<Account> newAccList = [Select Id, Name, Phone,
                                    (Select Id, Phone__c from Opportunities) 
                                    from Account where Id IN:accIds];
        
        if(!newAccList.isEmpty()){
            for(Account ac2: newAccList){
                for(Opportunity opt: ac2.Opportunities){
                    Opportunity opp = new Opportunity();
                    opp.Id = opt.Id;
                    opp.Phone__c = ac2.Phone;
                    oppToBeUpdated.add(opp);
                }
            }
        }
        
        if(!oppToBeUpdated.isEmpty()){
            update oppToBeUpdated;
        }
    }
    public static void updateAccount(List<Account> ac3, Map<Id, Account> oldMap){
        List<Account> acctobeupdated = new List<Account>();
        for(Account acc3: ac3){
            Account a = new Account();
            a.Id=acc3.Id;
            a.Description='TEST';
            acctobeupdated.add(a);
        }
        if(!acctobeupdated.isEmpty()){
            update acctobeupdated;
        }
    }*/
    public static void copyBillingToShipping(List<Account> accList){
        for(Account acc: accList){
            if(acc.copyBillingToShipping__c){
                acc.shippingCity = acc.BillingCity;
                acc.ShippingCountry = acc.BillingCountry;
                acc.ShippingStreet = acc.BillingStreet;
                acc.ShippingState = acc.BillingState;
                acc.ShippingPostalCode = acc.BillingPostalCode;
            }
            
        }
    }
    }