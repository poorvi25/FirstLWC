public class AccountController {
	
    // @AuraEnabled
    // public static List<Account> getAccounts(){
    //     List<Account> accList = new List<Account>();
        
        
    //     accList = [SELECT Id, Name, Phone FROM Account LIMIT 5];
        
    //     return accList;
    // }

    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsByIndustry(String industry) {
        if(String.isBlank(industry)){  //IF WITHOUT entrying 'Search' is entered, it will return the first 10 records
            return [SELECT Id, Name, Industry, Phone FROM Account LIMIT 10];
        }
        return [SELECT Id, Name, Industry, Phone
                FROM Account
                WHERE Industry = :industry
                LIMIT 20];
    }
}