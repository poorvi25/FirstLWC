public class AccountUtility {
    public static List<Account> getHighValueAccounts() {
        return [SELECT Name, Industry, AnnualRevenue 
                FROM Account WHERE AnnualRevenue > 500000];
    }
}
