import { LightningElement,api, wire, track } from "lwc";
import getfields from "@salesforce/apex/dynamicObjectList.getfields";
import getRecordsData from "@salesforce/apex/dynamicObjectList.configRecordsData";
import { createRecord } from 'lightning/uiRecordApi';  //calling create record method from LDS
import OBJECT_NAME from '@salesforce/schema/Configuration__c';
import SELECTED_OBJECT from '@salesforce/schema/Configuration__c.name';
import SELECTED_FIELD from '@salesforce/schema/Configuration__c.selected_field__c';
//import { refreshApex } from '@salesforce/apex';



const columns =[{label : 'Object', fieldName : "Name"},
                {label : 'Fields', fieldName : "selected_fields__c"},];

export default class TestComponent extends LightningElement {
  @track showCard = false;
  openCardHandle(){
    this.showCard = true;
  }



    @track columns = columns;
    @track recordData = [];
   @track data1 = [];
  @track selected = [];
  @api value = "";
  @api fieldsValue = [];
  @track configurationId;
 // @track fieldsInString;
 //@track fieldsValueStr = [];
//   selectedValue = '';
p
    get options() {
        return [
            {label: 'Account', value: 'Account'},
            {label: 'Contact', value: 'Contact'},
            {label: 'Lead', value: 'Lead'},
            {label: 'Opportunity', value: 'Opportunity'},
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        console.log('selectedValue'+this.value);
    }

 get selectFields() {
    return this.data1;
    //console.log('data1:'+this.data1);
  }
//   get selectedObject() {
//     return this.selected.length ? this.selected : "none";
//   }		

		 @wire(getfields,{
		 objectname: '$value'})
  wiredClass({ data, error }) {
    if (data) {
     let Testdata = JSON.parse(JSON.stringify(data));
        let lstOption = [];
      for (var i = 0;i < Testdata.length;i++) {
          lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
          });
        }
        this.data1 = lstOption;
        this.showLoadingSpinner = false;
    } else if (error) {
      this.error = error;
    }
  }
  
   handleSelectFields(event) {
    
    // this.selected = event.detail.value;
    // console.log('selected'+this.selected);
    this.fieldsValue = event.detail.value;
    
    console.log('fieldsValue='+this.fieldsValue);
    // if(this.fieldsValue.length < 5 ){
    //   this.disableGetRecords = false;
    // }else{
    //   this.disableGetRecords = true;
    // }
    
  }

  clickedButtonLabel;
  //slected = this.fieldsValue.length;
  //console.log('slected==='+slected);
  
  handleSave(event) {
    this.clickedButtonLabel = event.target.label;
    if(this.fieldsValue.length <= 5){
      console.log('clickedButtonLabel'+this.clickedButtonLabel);

      // for(i=0; i<=(this.fieldsValue).length; i++){
      //     fieldsValueStr += JSON.stringify(this.fieldsValue)[i] +', ';
      //     console.log('fieldsValueStr=='+fieldsValueStr);
      //   }
      //let arr =  JSON.stringify(this.fieldsValue).replace(/[\[\]']+/g,'');

    //   let removeComma= () => {
    //     let arr = JSON.stringify(this.fieldsValue);
    //     document.write (arr.join(' '));
    //   }
    
    // removeComma();

    // console.log(arr) 


      // Creating mapping of fields of configuration__c with values
      var fields = {[SELECTED_OBJECT.fieldApiName] : this.value, 
                   [SELECTED_FIELD.fieldApiName ] : JSON.stringify(this.fieldsValue)};
 
      // Record details to pass to create method with api name of Object.
      var objectRecordInput = { apiName : OBJECT_NAME.objectApiName, fields};

      // LDS method to create record.
      createRecord(objectRecordInput).then(response => {
          alert('Account Record created with Id: ' +response.id);
          console.log('response=='+JSON.stringify(response));
          console.log('objectRecordInput=='+objectRecordInput);
          console.log('JSON.stringify(this.fieldsValue)=='+JSON.stringify(this.fieldsValue).length);
         // this.configurationId = response.id;
          window.location.reload();
       })
       .catch(error => {
          alert('Error: ' +JSON.stringify(error));
      });

    } else{
      alert('you cant select more than 5 fields');
    }
  }
   //fetching records in dataTable
   
    @wire(getRecordsData)
    wiredRecord({data, error}){
        if(data){
            this.recordData = data;
        }
        else if(error){
            console.log('error occured');
        }
    }

// import getfields from "@salesforce/apex/dynamicObjectList.getfields";
// import configRecordsData from "@salesforce/apex/dynamicObjectList.configRecordsData";
// import { createRecord } from 'lightning/uiRecordApi';  //calling create record method using lds
// import OBJECT_NAME from '@salesforce/schema/configuration__c';
// import SELECTED_OBJECT from '@salesforce/schema/configuration__c.name';
// import SELECTED_FIELD from '@salesforce/schema/configuration__c.selected_field__c';

// //import Fieldname from '@salesforce/schema/Contact.AccountId';
// //const fields =[Fieldname];

// const columns =[{label : 'Object', fieldName : "Name"},
//                 {label : 'Fields', fieldName : "selected_field__c"},];

// export default class TestComponent extends LightningElement {
//   @track showCard = false;
//   openCardHandle(){
//     this.showCard = true;
//   }



   
//     @track recordData = [];
//     @track columns = columns;
//     @track data1 = [];
//     @track selected = [];
//     @track value = "";    // track lgega idhr for 2way binding
//     @track fieldsValue = [];
 


//     get options() {
//         return [
//             {label: 'Account', value: 'Account'},
//             {label: 'Contact', value: 'Contact'},
//             {label: 'Lead', value: 'Lead'},
//             {label: 'Opportunity', value: 'Opportunity'},
//         ];
//     }

//     handleChange(event) {
//         this.value = event.detail.value;
//         console.log('selectedValue'+this.value);
//     }

//  get selectFields() {
//     return this.data1;
//     //console.log('data1:'+this.data1);
//   }
// //   get selectedObject() {
// //     return this.selected.length ? this.selected : "none";
// //   }		
// 		 @wire(getfields,{
// 		 objectname: '$value'})
//   wiredClass({ data, error }) {
//     if (data) {
//      let Testdata = JSON.parse(JSON.stringify(data));
//         let lstOption = [];
//       for (var i = 0;i < Testdata.length;i++) {
//           lstOption.push({value: Testdata[i].QualifiedApiName,label: Testdata[i].DeveloperName
//           });
//         }
//         this.data1 = lstOption;
//         this.showLoadingSpinner = false;
//     } else if (error) {
//       this.error = error;
//     }
//   }
  
//    handleSelectFields(event) {
    
//     // this.selected = event.detail.value;
//     // console.log('selected'+this.selected);
//     this.fieldsValue = event.detail.value;
    
//       // for(i=0; i<=(this.fieldsValue).length; i++){
//       //   fieldsValueStr += JSON.stringify(this.fieldsValue[i]) +', ';
//       // }
//       //console.log('fieldsValueStr=='+fieldsValueStr);
//     //consolo.log(this.fieldsValue.length);
//     console.log('fieldsValue='+this.fieldsValue);
//     // if(this.fieldsValue.length < 5 ){
//     //   this.disableGetRecords = false;
//     // }else{
//     //   this.disableGetRecords = true;
//     // }
    
//   }

//   clickedButtonLabel;
//   //slected = this.fieldsValue.length;
//   //console.log('slected==='+slected);
  
//   handleSave(event) {
//     this.clickedButtonLabel = event.target.label;
//     if(this.fieldsValue.length <= 5){
//       console.log('clickedButtonLabel'+ this.clickedButtonLabel);

//       // for(i=0; i<=(this.fieldsValue).length; i++){
//       //     fieldsValueStr += JSON.stringify(this.fieldsValue)[i] +', ';
//       //     console.log('fieldsValueStr=='+fieldsValueStr);
//       //   }

//       // Creating mapping of fields of configuration__c with values
//       var fields = {[SELECTED_OBJECT.fieldApiName] : this.value, 
//                    [SELECTED_FIELD.fieldApiName ]:JSON.stringify(this.fieldsValue)};
 
//       // Record details to pass to create method with api name of Object.
//       var objectRecordInput = { apiName : OBJECT_NAME.objectApiName, fields};

//       // LDS method to create record.
//       createRecord(objectRecordInput).then(response => {
//           alert('Account Record created with Id: ' +response.id);
//          // this.configurationId = response.id;
//       }).catch(error => {
//           alert('Error: ' +JSON.stringify(error));
//       });
//     }else{
      
//       alert('you cant select more than 5 fields');
//     }
//   }
//    //fetching records in dataTable
   
//     @wire(configRecordsData)
//     wiredRecord({data, error}){
//         if(data){
//             this.recordData = data;
//         }
//         else if(error){
//             console.log('error occured');
//         }
//     }
// }
}