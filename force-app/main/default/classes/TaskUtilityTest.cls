@isTest
private class TaskUtilityTest {
    @isTest
    private static void taskPriorityTest(){
        String p = TastUtility.taskPriority('NY');
        System.assertEquals('Normal', p, 'Results are incorrect');
    }
    
    @isTest
    private static void taskPriorityNullTest(){
        String p = TastUtility.taskPriority('IND');
        System.assertEquals(null, p, 'Results are incorrect');
    }
    
    @isTest
    private static void taskPriorityHighTest(){
        String p = TastUtility.taskPriority('CA');
        System.assertEquals('High', p, 'Results are incorrect');
    }

}