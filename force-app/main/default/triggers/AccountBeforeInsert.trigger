trigger AccountBeforeInsert on Account (before insert) {
    for (Account acc : Trigger.new) {
        acc.Description = 'Created by Trigger on ' + Date.today();
    }
}
