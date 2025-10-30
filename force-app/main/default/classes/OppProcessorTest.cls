@isTest
private class OppProcessorTest {
    
    @isTest
    private static void testBatchClass(){
        List<Opportunity> oppList = new List<Opportunity>();
        
        for(Integer i=0;i<200;i++){
            oppList.add(
            new Opportunity(Name='Test'+i,
                           StageName='Prospecting',
                           CloseDate=System.today()));
            
        }
        insert oppList;
        Test.startTest();
        OppProcessor oppProcess = new OppProcessor();
        Id batchId = Database.executeBatch(oppProcess, 200);
        Test.stopTest();
        
        List<Opportunity> updatedOpps = [SELECT Id from Opportunity where
                                        LeadSource='Web'];
        
        System.assertEquals(200, updatedOpps.size());
    }

}