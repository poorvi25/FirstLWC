public class AccountController {
    // @AuraEnabled(cacheable=true) //Can be used in LWC if set true
    // public static List<Account> getAccountsByIndustry(String industry) {
    //     if(String.isBlank(industry)){  //IF WITHOUT entrying 'Search' is entered, it will return the first 10 records
    //         return [SELECT Id, Name, Industry, Phone FROM Account LIMIT 10];
    //     }
    //     return [SELECT Id, Name, Industry, Phone
    //             FROM Account
    //             WHERE Industry = :industry
    //             LIMIT 20];
    // }
@AuraEnabled(cacheable=true) //Can be used in LWC if set true
    public static List<Account> getAccountsByIndustry(String industry,
        Integer offsetVal,
        Integer limitSize,
        String sortField,  //fields to be sorted
        String sortDirection //Asc or desc
    ){
         // ✅ set default values if null
        if (String.isBlank(sortField)) {
            sortField = 'Name';
        }
        if (String.isBlank(sortDirection)) {
            sortDirection = 'ASC';
        }
        if (limitSize == null) {
            limitSize = 10;
        }
        if (offsetVal == null) {
            offsetVal = 0;
        }
        String baseQuery = 'SELECT Id, Name, Industry, Phone FROM Account';
        String whereClause = (String.isBlank(industry)) ? '' : ' WHERE Industry = :industry';
        String orderBy = ' ORDER BY ' + sortField + ' ' + sortDirection + ' NULLS LAST';
        String limitOffset = ' LIMIT :limitSize OFFSET :offsetVal';

        String fullQuery = baseQuery + whereClause + orderBy;
        return Database.query(fullQuery + limitOffset);
    }
}