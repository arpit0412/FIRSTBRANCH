import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/accountUpdate.getAccountList';

export default class ForEach extends LightningElement {

@wire(getAccountList) accounts;

}