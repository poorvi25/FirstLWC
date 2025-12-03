public with sharing class StudentController {

    @AuraEnabled
    public static Student__c createStudent(Student__c student) {
        try {
            insert student;
            return student;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating student: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getAllStudents() {
    return [
        SELECT Id, Name, Email__c, Class__c, Phone__c
        FROM Student__c
        ORDER BY CreatedDate DESC
    ];
}
   @AuraEnabled
   public static void deleteStudent(Id studentId) {
    delete [SELECT Id FROM Student__c WHERE Id = :studentId];
  }

  @AuraEnabled
public static void updateStudent(Student__c student) {
    update student;
}


}
