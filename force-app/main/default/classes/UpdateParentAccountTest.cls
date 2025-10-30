@isTest
private class UpdateParentAccountTest {
    
    @testSetup
    static void setup(){
        List<Account> accList = new List<Account>();
        
        accList.add(new Account(Name='Parent'));
        
        for(Integer i =0;i<100;i++){
            accList.add(new Account(name='Test Account'+i));
            
        }
        insert accList;
    }
        @isTest
        private static void testQueueable(){
            Id parentId = [SELECT Id from Account where Name = 'Parent'][0].id;
            List<Account> accList = [SELECT Id, Name from Account WHERE Name like '%Test Account%'];
            
            UpdateParentAccount updateJob = new UpdateParentAccount(accList, parentId);
            
            Test.startTest();
            System.enqueueJob(updateJob);
            Test.stopTest();
            
            System.assertEquals(100, [SELECT count() from Account where parentId =: parentId]);
        }
    

}