# jquery.fileuplad
Plugin for upload files via AJAX compatible with ASPX and PHP and other...(Testing)

#Usage:
```javascript
$("#form").fileupload({
    //Comming Soon
    //cancelable: true,
    //trigger : {
    //      target: "#btnUpload",
    //      event: "click"
    //}
    //Called every time that a file is upload to server and no return error
    success : function(filename,responseText,percent){
        alert("The" + filename + " was upload correctly");
        updateMyCustomProgressVar("#uploadPG",percent);
    },
    //Called every time that a file not upload 
    error : function(filename,responseText,percent){
        alert("The" + filename + " was not upload correctly");
        updateMyCustomProgressVar("#errorPG",percent);
    },
    //all files are sent to the server.
    complte : function(responseText){
    alert("All Done");
    alert(responseText);
    }
    
})
```
