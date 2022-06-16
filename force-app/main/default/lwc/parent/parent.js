import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {
 count=0;

 clickFn(){
            this.count = this.count++ ;
    }
}