import { LightningElement, wire } from 'lwc';
import{getContactFields} from 'lightning/apex/fetchingFields.getContactFields'

export default class Combo extends LightningElement {
    @wire(getContactFields) wiredContactFields;
}