import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Object_name from '@salesforce/schema/Opportunity';
import Opp_type from '@salesforce/schema/Opportunity.Type';
import Opp_Des from '@salesforce/schema/Opportunity.Description';



export default class TestRecordEditForm extends LightningElement {

    objectApiName = Object_name;
    OpportunityType = Opp_type;
    OpportunityDescription = Opp_Des;

    handleSuccess(){
        if( this.recordId !== null ){
            this.dispatchEvent ( new ShowToastEvent({
                title :"success",
                message: "your record is edited",
                variant: "success",
            }),
            );
    }
}
}