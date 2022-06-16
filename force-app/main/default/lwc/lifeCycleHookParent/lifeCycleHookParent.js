import { LightningElement } from 'lwc';

export default class LifeCycleHookParent extends LightningElement {

constructor(){

    super()
    console.log('child constructor  iscalled')
}
connectedCallBack(){
    console.log('child connectedCallback  iscalled')
}
    renderedCallback(){
        console.log('renderedCallback Is  called')
    }

}