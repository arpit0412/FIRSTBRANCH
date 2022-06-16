trigger closeOpportunity on Opportunity (after insert, after update) {
    list<Task> taskinsert = new List<Task>();
    
    for(Opportunity op :Trigger.new){
        Task t1 = new Task();
        t1.Subject = 'Green';
        t1.WhatId = op.Id;
        taskinsert.add(t1);
        
        Task t2 = new Task();
        t2.Subject = 'Blue';
        t2.WhatId = op.Id;
        taskinsert.add(t2);
    }
    if(taskinsert.size() > 0){
        insert taskinsert;
        
    }
    

}