@isTest
private class AccountTriggerHandlerTest {
    @testSetup
    static void setup(){
       List<Account> accList = new List<Account>();
        for(Integer i=0;i<2;i++){
            Account acc = new Account();
            acc.Name = 'Test' + i;
            acc.BillingCity = 'TestCity';
            acc.BillingCountry = 'TestCountry';
            acc.BillingState = 'TestState';
            acc.BillingStreet = 'TestStreet';
            acc.BillingPostalCode = 'TestPostalCode';
            if(i==0){
            acc.copyBillingToShipping__c = true;
            }
            accList.add(acc); 
    }
        insert accList;
    }
    @isTest
    private static void copyBillingToShippingUpdateTest(){
        
        Account acc = [Select Id, copyBillingToShipping__c
                  from Account where Name =: 'Test1' LIMIT 1];
        
        acc.copyBillingToShipping__c = true;
        test.startTest();
        update acc;
        test.stopTest();
    
    List<Account> updatedAccList = [Select Id, ShippingCountry From Account
                                   where Id =: acc.Id];
    
    System.assertEquals('TestCountry',updatedAccList[0].ShippingCountry);
    
    }
    
    @isTest
    private static void copyBillingToShippingInsertTest(){
      
        
            Account acc = new Account(
            Name = 'insert test',
            BillingCity = 'TestCity',
            BillingCountry = 'TestCountry',
            BillingState = 'TestState',
            BillingStreet = 'TestStreet',
            BillingPostalCode = 'TestPostalCode',
            copyBillingToShipping__c = true);
           
        test.startTest();
        	insert acc;
        test.stopTest();
    
    
    Account insAc = [Select Id, ShippingCountry From Account
                                   where Id =: acc.Id];
    System.assertEquals('TestCountry',insAc.ShippingCountry);
    
    }
}