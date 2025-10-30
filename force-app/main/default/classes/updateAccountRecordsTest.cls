@isTest
private class updateAccountRecordsTest {
    @isTest
    private static void updateAccountTest(){
        //creating account for test
        Account acc1 = new Account();
        acc1.Name = 'Test Account';
        acc1.Rating = 'Hot';
        insert acc1;
        
        //Creating contact linked with above account
        Contact con1 = new Contact();
        con1.FirstName = 'Test';
        con1.LastName = 'Test';
        con1.AccountId = acc1.Id;
        insert con1;
        
        //create object for sobject class & calling its update method
        updateAccountRecords obj1 = new updateAccountRecords();
        obj1.updateAccount();
        
        //fetching record which was updated above
        List<Account> accList = [Select Id, Rating From Account where Id =: acc1.id];
        System.assertEquals('Cold',accList[0].Rating);
        
    }

}