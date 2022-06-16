import { LightningElement, track } from 'lwc';

export default class Comp1 extends LightningElement {
  @track  dynamicGreeting='auraaaaa ka poooraaaa';
  greetingChangeHandler(event){
      this.dynamicGreeting =event.target.value;
  }
}