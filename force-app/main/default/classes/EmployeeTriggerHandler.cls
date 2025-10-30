public class EmployeeTriggerHandler {
    public static void updateUndeleteRecord(List<Employee__c> empList){
        Set<Id> accIds = new Set<Id>();
        List<Employee__c> empToBeUpdated = new List<Employee__c>();
        if(!empList.isEmpty()){
            for(Employee__c emp: empList){
                if(emp.Name__c!=NULL){
                    accIds.add(emp.Name__c);
                }
                Employee__c empRec = new Employee__c();
                empRec.id = emp.id;
                empRec.Active__c = true;
                empToBeUpdated.add(empRec);
            }
        }
            List<Account> accList = [SELECT Id, Employee_custom_count__c, 
                                (SELECT Id from Employees__r) 
                                 FROM Account where Id IN:accIds];
        
        
        if(!accList.isEmpty()){
            for(Account acc: accList){
                acc.Employee_custom_count__c = acc.Employees__r.size();
            }
            
    }
        if(!accList.isEmpty()){
                update accList;
            }
        if(!empToBeUpdated.isEmpty()){
                update empToBeUpdated;
            }
        
    }
    public static void validateActiveEmployee(List<Employee__c> empList){
        if(!empList.isEmpty()){
            for(Employee__c emp: empList){
                if(emp.Active__c == true){
                    emp.addError('You cannot delete active employee');
                }
            }
        }
    }
    
    public static void updateEmployeeAfterDeletion(List<Employee__c> empList){
        Set<Id> accIds = new Set<Id>();
        if(!empList.isEmpty()){
            for(Employee__c emp: empList){
                if(emp.Name__c!=NULL){
                    accIds.add(emp.Name__c);
                }
            }
        }
        
        List<Account> accList = [SELECT Id, Employee_custom_count__c, 
                                (SELECT Id from Employees__r) 
                                 FROM Account where Id IN:accIds];
        
        
        if(!accList.isEmpty()){
            for(Account acc: accList){
                acc.Employee_custom_count__c = acc.Employees__r.size();
            }
            if(!accList.isEmpty()){
                update accList;
            }
            
        }
    }
}