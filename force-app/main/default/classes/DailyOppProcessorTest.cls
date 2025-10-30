@isTest
public class DailyOppProcessorTest {
   
    @isTest
    private static void testScheduledApex(){
        List<Opportunity> oppList = new List<Opportunity>();
         String sch = '0 0 0 ? * * *';
        for(Integer i=0;i<500;i++){
            if(i<250){
                oppList.add(new Opportunity(Name='Test'+i,
                                           StageName='Prospecting',
                                           CloseDate=System.today()));
            }else{
                oppList.add(new Opportunity(Name='Test'+i,
                                           StageName='Prospecting',
                                           CloseDate=System.today(),
                                           LeadSource='Other'));
            }
            
        }
        insert oppList;
        
        Test.startTest();
        String jobId = System.schedule('Process Opportunities', sch, new DailyOppProcessor());
        Test.stopTest();
        
        List<Opportunity> updatedoppList = [SELECT Id, LeadSource from Opportunity where LeadSource='Web'];
        System.assertEquals(200, updatedOppList.size());
    }

}