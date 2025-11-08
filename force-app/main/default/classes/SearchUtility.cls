public class SearchUtility {
    // SOQL example
    public static List<Account> getTopAccounts() {
        return [SELECT Id, Name, Industry, AnnualRevenue
                FROM Account WHERE AnnualRevenue > 1000000
                ORDER BY AnnualRevenue DESC LIMIT 10];
    }

    // SOSL example
   public static List<List<SObject>> globalSearch(String searchKey) {
        String pattern = '%' + searchKey + '%'; //dynamic search pattern using %
        return [FIND :pattern IN ALL FIELDS RETURNING  //the colon : means we’re inserting a variable value (the Apex variable pattern)
                Account(Id, Name),
                Contact(Id, Name, Email)];
    } 
}

