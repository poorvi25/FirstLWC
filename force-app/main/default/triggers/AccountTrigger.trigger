trigger AccountTrigger on Account (before insert, after insert, before update, before delete, after update) {
    /*if(Trigger.isInsert){
        if(Trigger.isBefore){
             AccountTriggerHandler.updateAccRating(Trigger.new);            
        }else if(Trigger.isAfter){
            AccountTriggerHandler.createOppAcc(Trigger.new);
        }
    }
    if(Trigger.isUpdate){
        if(Trigger.isBefore){
            AccountTriggerHandler.updateDescOnAcc(Trigger.new, Trigger.oldmap);
        }
        else if(Trigger.isAfter){
            AccountTriggerHandler.updatePhoneOnOpp(Trigger.new, Trigger.oldmap);
           
        }
    }
    //RECURSION PREVENTION DEMO
    if(Trigger.isAfter){
        if(Trigger.isUpdate){
            if(!preventRecursion.firstCall){
                preventRecursion.firstCall= true;
                AccountTriggerHandler.updateAccount(Trigger.new, Trigger.oldmap);
            
            }
            
        }
    }
    
    if(Trigger.isDelete){
        if(Trigger.isBefore){
            AccountTriggerHandler.validateActiveAccounnt(Trigger.old);
        }
    }*/
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            AccountTriggerHandler.copyBillingToShipping(Trigger.new);
        } else if(Trigger.isUpdate){
            AccountTriggerHandler.copyBillingToShipping(Trigger.new);
        }
    }
}