import { LightningElement, api,  wire , track } from 'lwc';

import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
//confirm msg
import LightningConfirm from 'lightning/confirm';
//picklist field
 import Resume_Object from '@salesforce/schema/presume__c';
 import Country_c from '@salesforce/schema/presume__c.Country__c';
 import STATE from '@salesforce/schema/presume__c.State__c';
 import City_c from '@salesforce/schema/presume__c.City__c';
 import NAME from '@salesforce/schema/presume__c.Name';
 import LAST_NAME from '@salesforce/schema/presume__c.LastName__c';
 import EMAIL from '@salesforce/schema/presume__c.Email__c';
 import ADDRESS from '@salesforce/schema/presume__c.Address__c';
 import PHONE from '@salesforce/schema/presume__c.Phone__c';
 import DOB from '@salesforce/schema/presume__c.DOB__c';
// import PLACE_OF_BIRTH from '@salesforce/schema/presume__c.PlaceOfBirth__c';
// import POSTAL_CODE from '@salesforce/schema/presume__c.PostalCode__c';
// import JOB_TITLE from '@salesforce/schema/presume__c.Job_Title__c';
// import COMPANY_NAME from '@salesforce/schema/presume__c.Comapny_Name__c';
// import JOB_START_DATE from '@salesforce/schema/presume__c.Job_Start_Date__c';
// import JOB_END_DATE from '@salesforce/schema/presume__c.Job_End_Date__c';
// import PROF_CITY from '@salesforce/schema/presume__c.Prof_City__c';
// import PROF_SUMMARY from '@salesforce/schema/presume__c.Profesional_Summary__c';
// import PROJECT_NAME_c from '@salesforce/schema/presume__c.Project_Name__c';
// import PROJECT_DURATION_c from '@salesforce/schema/presume__c.Project_Duration__c';
// import ROLES_c from '@salesforce/schema/presume__c.Roles_And_Responsibilities__c';
// import PROJECT_DESC_c from '@salesforce/schema/presume__c.Project_Description__c';
// import SCHOOL_COLLEGE from '@salesforce/schema/presume__c.School_and_College__c';
// import SCHOOL_COLLEGE_NAME from '@salesforce/schema/presume__c.School_Collage_Name__c';
// import START_DATE from '@salesforce/schema/presume__c.Start_Date__c';
// import END_DATE from '@salesforce/schema/presume__c.End_Date__c';
// import EDUCATION_CITY from '@salesforce/schema/presume__c.EduOfCity__c';
// import certificate from '@salesforce/schema/presume__c.certificate__c';


export default class Presume extends LightningElement {
    //Bacis Details
    fname='';
     lname='';
        email='';

     basicHandler(event)
     {
         if(event.target.label==='First Name')
         {
             this.fname=event.target.value;
         }
         else if(event.target.label==='Last Name')
         {
             this.lname=event.target.value;
         }
         else
        {
             this.email=event.target.value;
         }

     }

      // Personal Detail Fields
            @api myRecordId;
            address='';
            phone='';
            country='';
            state='';
            city='';
            DOB='';
            PlaceOfBirth='';
            postalCode='';

                handleAddress(event)
                {
                this.address = event.target.value;
                }

                handlePhone(event)
                {
                
                this.phone=event.target.value;
                }
                handleCountry(event)
                {
                    
                this.country =  event.target.value;
                }
                handleState(event)
                {
                this.state = event.target.value;
                }
                    
                handleCity(event)
                {
                this.city =  event.target.value;
                }

                handleDOB(event)
                {
                    this.DOB = event.target.value;
                }


                handlePlaceOfBirth(event)
                {
                this.placeOfBirth = event.target.value;
                }

                handlePostalCode(event)
                {
                this.postalCode = event.target.value;
                }

                handleKeyUp(event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                }


            //    picklistfield of object
                @wire(getObjectInfo, { objectApiName: Resume_Object })
                resumeInfo;

            //   picklistfield of countryd
                    @wire(getPicklistValues,{
                                recordTypeId: '$resumeInfo.data.defaultRecordTypeId', 
                        fieldApiName: Country_c
                })
                    Country_cPicklist;

                //picklist of state
                @wire(getPicklistValues, {
                        recordTypeId:'$resumeInfo.data.defaultRecordTypeId',
                fieldApiName: STATE
                    })
                STATEpicklist;

          //picklist of city
             @wire(getPicklistValues,{
                recordTypeId: '$resumeInfo.data.defaultRecordTypeId',
                fieldApiName: City_c
            })
            City_cpicklist;

            //upload 

           get acceptedFormats (){
            return ['.pdf', '.png','.jpg','.jpeg'];
            }
    

            handleUploadFinished(event)
            {
                const uploadedFiles = event.detail.files[1];

                console.log('upload' +uploadedFiles);
                let uploadedFileNames = '';
                for(let i = 0; i < uploadedFiles.length; i++) {
                    uploadedFileNames += uploadedFiles[i].name + ', ';
                }
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                        variant: 'success',
                    }),
                );
            }


            // Professional Detail Fields
             
            jobTitle ='';
            companyName ='';
            jStartDate ='';
            jEndDate ='';
            jobCity ='';
            profSumm ='';

           

                    profDetailHandler(event)
                    {
                        if(event.target.label === 'Professional Summary')
                        {
                            this.summ = event.target.value;
                        }
                    
                        else if(event.target.label === 'Job Title')
                        {
                            this.jobTitle= event.target.value;
                        }
                    
                        else if(event.target.label === 'Comapny Name')
                        {
                            this.companyName = event.target.value;
                        }

                        else if(event.target.label === 'Job Start Date')
                        {
                            this.jStartDate = event.target.value;
                        }
                    
                        else if(event.target.label === 'Job End Date')
                        {
                            this.jEndDate = event.target.value;
                        }

                        else
                        {
                            this.jobCity = event.target.value;
                        }
                    }
                    //add Row Dynamically
                    
                  keyIndex = 0;

                  @track itemList = [ {
                      id :0
                  }];
                  
                  addRow() {
                    ++this.keyIndex;
                    var newItem = [{ id: this.keyIndex }];
                    this.itemList = this.itemList.concat(newItem);
                }

                removeRow(event) {
                    if (this.itemList.length >= 2) {
                        this.itemList = this.itemList.filter(function (element) {
                            return parseInt(element.id) !== parseInt(event.target.accessKey);
                        });
                    }
                }

                removeRow(event) {
                    if (this.itemList.length >= 2) {
                        this.itemList = this.itemList.filter(function (element) {
                            return parseInt(element.id) !== parseInt(event.target.accessKey);
                        });
                    }
                }


                    // Project Details Field
            projectName='';
            projectDuration='';
            projectRole='';
            projectDescription='';



            handleProjectName(event)
                {
                this.projectName = event.target.value;
                }

            handleProjectDuration(event)
                {
                    this.projectDuration = event.target.value;
                }

            handleProjectRole(event)
                {
                    this.projectRole = event.target.value;
                }

            handleProjectDescription(event)
                {
                    this.projectDescription = event.target.value;
                }

    // Education Details Fields

                schCollege = '';
        schCollegeName = '';
        passing10 = '' ;
        eduCity = '';
        edupercent10 = '';
        edupercent12 = '';
        edupercentUG = '';
        passing10= '';
        passing12 ='';
        passingUG = '';
        schName = '';
        

        

    
        eduDetailHandler(event)
            {
            if(event.target.label === 'School Name'){
                this.schCollege = event.target.value;
            }
            
            else if(event.target.label === 'School Name/College Name'){
                this.schCollegeName = event.target.value;
            }

            else if(event.target.label === 'College Name'){
                this.schCollegeName = event.target.value;
            }
            

            else if(event.target.label === 'Passing Year'){
                this.passing10 = event.target.value;
            }

            else if(event.target.label === '12th Passing Year'){
                this.passing12 = event.target.value;
            }

            else if(event.target.label === 'UG Passing Year'){
                this.passingUG = event.target.value;
            }

            else if(event.target.label === 'Percent in 10th')
            {
                this.edupercent10 = event.target.value;
            }

            else if(event.target.label === 'Percent in 12th')
            {
                this.edupercent12 = event.target.value;
            }

            else if(event.target.label === 'Percent in UG')
            {
                this.edupercentUG = event.target.value;
            }
            

            
            else{
                this.eduCity = event.target.value;
            }
        }
     
            @wire(getPicklistValues, {
            recordTypeId:'$resumeInfo.data.defaultRecordTypeId',
            fieldApiName: SCHOOL_COLLEGE
            })
            SCHOOL_COLLEGEpicklist;

                onSave(event)
            {

                //for save the record
                const fields={};
                fields[NAME.fieldApiName]=this.fname;
                fields[LAST_NAME.fieldApiName]=this.lname;
                fields[EMAIL.fieldApiName]=this.email;
                
                const recordInput={apiName:Resume_Object.objectApiName,fields};
                createRecord(recordInput)
                .then(resume=>{
                    console.log("resume:"+JSON.stringify(resume));
                })

              //confirm msg

              const result = LightningConfirm.open({
                  Message : 'this is the confirm msg',
                  variant: 'heardless',
                  label:'Are you want to save detail',

            //     // Text: 'are you sure you want to confirm ',
            //     // confirmButtonLable: 'Delete',
            //     // confirmButtonVariant: 'destructive',
            //     // cancelButtonLabel : 'Never Mind',
            //     // Header: 'confirmDelete'
   
              });

            }

}