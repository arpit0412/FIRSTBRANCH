import { LightningElement } from 'lwc';
import Employee_object  from '@salesforce/schema/Employee__c';
import Name from '@salesforce/schema/Employee__c.name';
import City from '@salesforce/schema/Employee__c.city__c';
import Exp from '@salesforce/schema/Employee__c.Exp__c';

export default class RecordViewForm extends LightningElement {
    nameField= Name;
    cityField =City;
    expField = Exp;
   objectApiName = Employee_object;
   recordId = 'a005j00000CPp7FAAT';
}