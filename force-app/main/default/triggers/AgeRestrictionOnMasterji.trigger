trigger AgeRestrictionOnMasterji on masterji__c (before insert , after insert) {

   list<masterji__c> cusList = new list<masterji__c>();
    
    for(masterji__c check:trigger.new)
    {
    
    if( check.Age__c <= 18){
        cusList.add(check); 
         
       }
        else{
            check.addError('Not allowed');
            }
        
    }
    
        
}