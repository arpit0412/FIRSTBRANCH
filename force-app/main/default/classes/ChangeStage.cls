public with sharing class ChangeStage {
@AuraEnabled
public static void updateOppRecord (String recordId){
    System.debug('update the opp record');
  Opportunity oppStage = [Select id, StageName from Opportunity where Id =:recordId LIMIT 1  ];
    oppStage.StageName = 'Qualification';

  
}
update oppStage;  
}