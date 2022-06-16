import { LightningElement,api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import Employee_Object  from '@salesforce/schema/Employee__c';
//import EMPLOYEE_NAME from '@salesforce/schema/Employee__c.Name';
//import CITY_FIELD from'@salesforce/schema/Employee__c.City__c';
//import EXP_FIELD from '@salesforce/schema/Employee__c.Exp__c';

export default class RecordEditForm extends LightningElement {

     // Expose a field to make it available in the template
     nameField = NAME_FIELD;

     // Flexipage provides recordId and objectApiName
     @api recordId;
     @api objectApiName;

// ObjectApiName = Employee_Object;
// nameField = EMPLOYEE_NAME;
// cityField = CITY_FIELD;
// expField = EXP_FIELD;
// empId  =  "created employee id will be display here";

// handleSuccess(event){
//     this.empId = event.detail.id;
//     const  events = new showToastEvent({
//         title :"Successful",
//         message:"playerCreated",
//         variant: 'success'
//     });
//     this.dispatchEvent(event);
// }

}