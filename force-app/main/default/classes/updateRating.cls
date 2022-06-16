public with sharing class UpdateRating {

@AuraEnabled
    public static void updateStage(String recordId){
        Opportunity opp = [ SELECT Id, Name, StageName FROM Opportunity WHERE id=: recordId LIMIT 1 ];
        opp.StageName = 'Closed Won';
    
    }
    Update opp;

}