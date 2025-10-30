public class AccVFPageExtension {
    
    Account acc = new Account();
    public String Message {get;set;}
    
    String param;
    public AccVFPageExtension(ApexPages.StandardController stdController){
        Message = 'Enter Values';
        acc = (Account)stdController.getRecord();
        if(acc.Name != null){
            Message = 'Welcome' + acc.Name;
        }
        param = apexpages.currentPage().getparameters().get('retURL');
    }
    
    public PageReference customCancel(){
        PageReference ref = new PageReference('/apex/MyVFPage1');
        return ref;
    }
    
    public PageReference URLreturn(){
        if(param == null){
            PageReference ref = new PageReference('/apex/MyAccVFPage1?retURL=/001/o');
            ref.setRedirect(true);
            return ref;
        }
        return null;
    }
   
}