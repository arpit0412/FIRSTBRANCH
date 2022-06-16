import { LightningElement } from 'lwc';

export default class LifeCycleHookChild extends LightningElement {


    constructor(){
        super()
        console.log('constructor  called')
    }
    connectedCallback(){
        console.log('connectedcallback  called')
    }
    renderedCallback(){
        console.log('renderCallback  called')
    }
    
}