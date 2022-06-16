({
	myAction : function(component, event, helper) {
		const action =component.get("c.ApexConnect")
        //set method parameter
        action.setParams();
    	//define a call back
    	//this executes once we get a responceback from apex method
        action.setCallBack(this,function(response){
			// do post processing here
        });
        $A.enqueueAction(action);
 
  }                    
 })