public class OppProcessorScheduler implements Schedulable{
    
    public void execute(SchedulableContext sc){
        OppProcessor op = new OppProcessor();
        Database.executeBatch(op, 200);
        
    }

}