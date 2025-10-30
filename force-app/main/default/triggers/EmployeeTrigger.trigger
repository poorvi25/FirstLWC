trigger EmployeeTrigger on Employee__c (before delete, after delete, after undelete) {
    if(Trigger.isDelete){
        if(Trigger.isBefore){
            EmployeeTriggerHandler.validateActiveEmployee(Trigger.old);
        } else if(Trigger.isAfter){
            EmployeeTriggerHandler.updateEmployeeAfterDeletion(Trigger.old);
        } 
            
        }
    if(Trigger.isUndelete){
        EmployeeTriggerHandler.updateUndeleteRecord(Trigger.new);
         }
    }