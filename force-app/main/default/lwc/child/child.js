import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class Child extends NavigationMixin(LightningElement) {

    Paste='here is the navigation ka jaddu';

    
    ShowClick(){
        // const evt= new CustomEvent("child");
        // this.dispatchEvent(evt);
         this[NavigationMixin.Navigate]({
             type: 'standard__navItemPage',
             attributes: {
                 apiName :'Merge',
             },
         });

    }





}