public class TastUtility {
    public static String taskPriority(String leadStatus){
        if(String.isBlank(leadStatus) || leadStatus.length() > 2){
            return null;
        }
        String taskPriority;
        if(leadStatus == 'CA'){
            taskPriority = 'High';
        }else{
            taskPriority = 'Normal';
        }
        return taskPriority;
    }

}