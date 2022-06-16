import { LightningElement } from 'lwc';
import { ShowToastEvent } from'lightning/platformShowToastEvent';

export default class ToastEvent extends LightningElement {

    ToastEvent(){
       const event = new ShowToastEvent({
           title:'Records are being Saved',
           message:'successMessage',
           variant:'success',
       })
       this.dispatchEvent(event);
   }
   

}