public with sharing class dynamicObjectList {
    @AuraEnabled(cacheable=true)
    public static List<FieldDefinition> getfields(string objectname){
        string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY DeveloperName ASC';
        list<FieldDefinition> lstObject = Database.query(query);
        system.debug('lstObject==> '+lstObject);
        // selected object will be removed from drop down
        for(Integer i=0;i<lstObject.Size();i++){
            system.debug('lstObject==> '+lstObject[i].QualifiedApiName);
        }
        return lstObject;
    }
    
    @AuraEnabled(cacheable=true)
    public static list<Configuration__c> configRecordsData(){
        return [ SELECT name, newfields__c FROM Configuration__c];
    }
    
    @AuraEnabled(cacheable=true)
    public static list<string> ComboBoxList(){
        list<string> objects = new  list<string> {'Account','Lead','Opportunity','Contact'};
        list<Configuration__c> config= [select  Name from  Configuration__c];
    for (integer i=0; i<config.size(); i++)
    {
        for(integer j=0; j<objects.size(); j++) {
        
        string objDoner1 = objects.get(j);
        string objDoner2 = config.get(i).Name;
        if(objDoner1 == objDoner2){
            objects.remove(j);
        }
    } 
  }  system.debug('objects'+objects);
    return objects;

} 
@auraEnabled
    public static void deleteConfigRecord(Configuration__c conList){
            delete conList;
    }


}
