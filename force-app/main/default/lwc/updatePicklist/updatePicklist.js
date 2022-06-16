import { LightningElement, track } from 'lwc';

export default class UpdatePicklist extends LightningElement {
 handleClick1(){
    this.template.querySelector('lightning-input').value = "First";
   }    
   handleClick2(){
       this.template.querySelector('lightning-input').value = "Second";
   }
   handleClick3(){
       this.template.querySelector('lightning-input').value = "Third";
   }
}
