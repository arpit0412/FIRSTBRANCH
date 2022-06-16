public with sharing class FetchingFields {

    @AuraEnabled(cacheable=true)
     public static List<FieldDefinition> getFields(string objectname){
            string query = 'select DeveloperName,QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY DeveloperName ASC';
            list<FieldDefinition> lstObject = Database.query(query);
            system.debug('lstObject==> '+lstObject);
            return lstObject;
             }

}













// 	//  public  fetchingFields() {

//     // }

//     @AuraEnabled(cacheable=true)
//    public static List  <String>getContactFields(){
//         SObjectType contactType = Schema.getGlobalDescribe().get('Contact');
//         Map<String,Schema.SObjectField> mfields = contactType.getDescribe().fields.getMap();

//         List<String> sObjectDetailsList = new List<String>();
//         for(String s : mfields.keySet()){
//             sObjectDetailsList.add(String.valueOf(mfields.get(s)));
//         }
//         return sObjectDetailsList;
//     }