({
	doInit : function(component, event, helper) {
        
        component.set("v.Message1", "Button1 Intialized");
		component.set("v.Message2", "Button2 Intialized");
		
	},
    
    
    handleClick : function(component, event, helper) {
        
        //component.set("v.Message1", "Button1 Clicked");
		var btn = event.getSource();
        var msg = btn.get("v.label");
        
        if(msg == "ClickMe"){
           component.set("v.Message1", "Button1 Clicked");
	 
        }else{
            component.set("v.Message2", "Another Button Clicked"); 
        }
	},
    
    
    anotherHandleClick : function(component, event, helper) {
        
        component.set("v.Message2", "Another Button Clicked");
		
	}
    
})