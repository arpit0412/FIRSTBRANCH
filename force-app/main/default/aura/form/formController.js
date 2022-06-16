({
	
        Add:function(component, event, helper){
		var a =component.get("v.Num1");
        var b= component.get("v.Num2");
     var sum= parseInt(a)+ parseInt(b);
        component.set("v.result",sum);
        
        
	},
    
    Sub:function(Component, event, helper){
            var a =component.get("v.Num1");
            var b= component.get("v.Num2");
            var sum= parseInt(a)- parseInt(b);
            component.set("v.result",sum);
    },
 
 
     Mult:function(component, event, helper){
        
   	 	var a =component.get("v.Num1");
        var b= component.get("v.Num2");
        var sum= parseInt(a)* parseInt(b);
        component.set("v.result",sum);
    },
	


   Div: function(component,event,helper){
        var a =component.get("v.Num1");
        var b= component.get("v.Num2");
        var sum= parseInt(a)/ parseInt(b);
        component.set("v.result",sum);

  }



})