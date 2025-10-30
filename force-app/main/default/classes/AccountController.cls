public class AccountController {
	
    @AuraEnabled
    public static List<Account> getAccounts(){
        List<Account> accList = new List<Account>();
        
        
        accList = [SELECT Id, Name, Phone FROM Account LIMIT 5];
        
        return accList;
    }
}