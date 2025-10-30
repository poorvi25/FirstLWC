global class RemindOppOwners implements Schedulable {
    global void execute(SchedulableContext ctx){
        List<Opportunity> oppList = [SELECT Id, Name, OwnerId, CloseDate
                                    FROM Opportunity
                                    where IsClosed = False AND CloseDate < TODAY];
        
        
        TaskUtils.RemindOwners(OppList);
    }

}