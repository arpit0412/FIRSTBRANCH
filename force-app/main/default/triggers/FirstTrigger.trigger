/*
 isBlank- required(khali ni)
addError- showing Error (A popup of required field).

 ---trigger on  lead object, if leadsource is blank->other 
                if industry is blank -> show error popup ('cant be blank')

trigger FirstTrigger on Lead (before insert) {
    for ( Lead leadRecord : trigger.new){            // trigger.new = new space/list for lead (temprory data prkaam krne k liye)
        if(String.isBlank( leadRecord.LeadSource)){
            leadRecord.LeadSource ='other';
        }
        if( String.isBLank(leadRecord.Industry)){
           LeadRecord.addError('Industry can not be blank');
        }
        
    }
        System.debug ('Lead trigger1 is exucting')    ;
   
}

// trigger.new = new space/list for lead (temprory data prkaam krne k liye)


--- before Insert---


trigger FirstTrigger on Lead (before insert) {    
    for ( Lead leadRecord : trigger.new){                    
        if(String.isBlank( leadRecord.LeadSource)){
            leadRecord.LeadSource ='other';
        }
        if( String.isBLank(leadRecord.Industry) && Trigger.isInsert){
           LeadRecord.addError('Industry can not be blank');
        }
        
    }
        System.debug ('Lead trigger1 is executing')    ;
    
}


----- before insert before update after update--- 
isBefore -  before the data is saved 
isAfter -  after data saved

 
trigger FirstTrigger on Lead (before insert, before update, after update) {    
    for ( Lead leadRecord : trigger.new){                    
       // if(String.isBlank( leadRecord.LeadSource)){
        if (trigger.isBefore){
            leadRecord.LeadSource ='other';
        }   
        if( String.isBLank(leadRecord.Industry) && Trigger.isInsert){
           LeadRecord.addError('Industry can not be blank');
        }        
    }
        System.debug ('Lead trigger1 is executing');    
}
*/
trigger FirstTrigger on Lead (before insert, before update, after update) {    
    for ( Lead leadRecord : trigger.new){                    
       // if(String.isBlank( leadRecord.LeadSource)){
        if (trigger.isBefore){
            leadRecord.LeadSource ='other';
        }   
        if( String.isBLank(leadRecord.Industry) && Trigger.isInsert){
           LeadRecord.addError('Industry can not be blank');
        }        
    }
        System.debug ('Lead trigger1 is executing');    
}