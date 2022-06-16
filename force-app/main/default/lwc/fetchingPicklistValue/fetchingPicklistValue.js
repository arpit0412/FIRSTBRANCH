import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'; 
import{StageName} from'@salesforce/schema/Opportunity.StageName'
/*
get picklist values
 value  --required
fieldApiName- required h re baba
*/
export default class FetchingPicklistValue extends LightningElement {
@wire(getPicklistValues, {
recordTypeId:'0130000000123456aaa',
fieldApiName:StageName  

})
//error ho to error dede 
//data me pura data dedega 
wirePicklistvalue({data, error}){
if(data){
console.log(`picklist value`)
}
if(error){

}

}


}