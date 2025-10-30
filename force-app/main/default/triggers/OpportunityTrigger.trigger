trigger OpportunityTrigger on Opportunity (after insert, after update, after delete) {
    if(Trigger.isInsert){
        if(Trigger.isAfter){
            OppTriggerHandler.updateAccAnnualRevenue(Trigger.new, null);
        }
    }
    if(Trigger.isUpdate){
        if(Trigger.isAfter){
           OppTriggerHandler.updateAccAnnualRevenue(Trigger.new, Trigger.oldmap);
        }
    }
    if(Trigger.isDelete){
        if(Trigger.isAfter){
            OppTriggerHandler.updateAccAnnualRevenue(Trigger.new, null);
        }
    }
}