@isTest
private class temperatureTest {
    @isTest
    private static void warmTempTest(){
        Decimal c = temperature.FtoC(70);
        System.assertEquals(21.11, c, 'Results are incorrect');
    }
    
    @isTest
    private static void coldTempTest(){
        Decimal c = temperature.FtoC(32);
        System.assertEquals(0, c, 'Results are incorrect');
    }
}