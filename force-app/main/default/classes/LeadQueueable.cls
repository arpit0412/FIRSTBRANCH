public class LeadQueueable implements Queueable {
    
    public void execute (QueueableContext context){
        list<Lead> existingRecord  =[Select Id, LeadSource from Lead ];
        for(lead record:existingRecord ){
           record.LeadSource ='Web';
        }
    }

}