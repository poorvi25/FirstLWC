@isTest
private class CommonTestSetup {
    
    @testSetup
    static void setup(){
        List<Account> accList = new List<Account>();
        for(Integer i=0;i<2;i++){
            accList.add(new Account(Name='Test'+i));
        }
        insert accList;
    }
    
    @isTest
    static void testMethod1(){
        List<Account> acc=[Select Id, Phone FROM Account
                          where Name='Test0' limit 1];
        acc[0].Phone = '123456';
        update acc[0];
        
        List<Account> acc1 = [Select Id, Phone FROM Account
                          where Name='Test1' limit 1];
        
        delete acc1[0];
    }
    
    @isTest
    static void testMethod2(){
       List<Account> acc=[Select Id, Phone FROM Account
                          where Name='Test0' limit 1];
        
       System.assertEquals(null, acc[0].Phone);
    }

}