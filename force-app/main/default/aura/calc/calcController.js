({
	addFunction : function(component, event, helper) {
		var a = component.get("v.aval");
        var b = component.get("v.bval");
        var sum = parseInt(a)+parseInt(b);
        component.set("v.result", sum);
	},
    subFunction : function(component, event, helper) {
		var a = component.get("v.aval");
        var b = component.get("v.bval");
        var sum = parseInt(a)-parseInt(b);
        component.set("v.result", sum);
	},
    mulFunction : function(component, event, helper) {
		var a = component.get("v.aval");
        var b = component.get("v.bval");
        var sum = parseInt(a)*parseInt(b);
        component.set("v.result", sum);
	},
    divFunction : function(component, event, helper) {
		var a = component.get("v.aval");
        var b = component.get("v.bval");
        var sum = parseInt(a)/parseInt(b);
        component.set("v.result", sum);
	},
})