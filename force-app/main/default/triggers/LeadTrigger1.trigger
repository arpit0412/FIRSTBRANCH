trigger LeadTrigger1 on Lead (before insert, before update) {
    for (Lead leadRecord : trigger.new){
        if(string.isBlank(leadRecord.Rating)){
            leadRecord.Rating ='Warm';
        }
       
    }
    
    System.debug('Lead Trigger2 is executed');
}