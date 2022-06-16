trigger AgeValidation on Use_case__c (before insert) {
    for(Use_case__c pass:trigger.new){
        if (pass.Age__c >18){
            pass.info__c ='Congratulations, You Are Pass enjoy';
        }
    }
}