import { LightningElement, track } from 'lwc';

export default class Merge extends LightningElement {

    @track showSearchComponent = false;
    ShowCard(){
        this.showSearchComponent = true;
    }



}


