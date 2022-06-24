import { LightningElement } from 'lwc';

export default class CustomValidationFOrm extends LightningElement {

    contact ={};
    countryOptions=[
        {"label" : "africa", "value": "waka wakaaee aee"},
        {"label" : "srilanka", "value": "Malinga"},
        {"label" : "indore", "value": "city h"},
        {"label" : "ujjain", "value": "Bam"}
]

    SaveBtnClick(){

isInputsCorrect =[...this,this.querySelectorAll("lightning-input")].reduce

    }

    // ----------------------check valid  input of not
        isInputValid(){
            let isValid= true;
            let inputField = this.template.querySelectorAll(".validation");
            inputFields.forEach(inputField)
        }


    // ------------creating contact--
    createContact(){
        if(this.isInputValid()){
            console.log(this.Contact);
        }
    }
}