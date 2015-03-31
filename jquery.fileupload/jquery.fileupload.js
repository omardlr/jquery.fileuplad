$.fn.fileupload = function (url, opt) {
    //Main Authors: Omar De la Rosa And Jose Maldonado!!!
    //Date: 17/3/2015
    
    /*
    Ours variables...
    */     
    $this = this; //this...
    $fobject = this.find("input[type='file']"); //input type file that contains the files...
    max = this.find("input[type='file']")[0].files.length; //total files
    min = 0; //for configurations...
    now = 0; //current [index] file
    step = 0; //how much we go to advance by each file that be processed....
    files = this.find("input[type='file']")[0].files; //files...
    current = 0; //current index of the file to be processed
    url = url || ""; //where we goin to send the file? ahhhhh url......
    imgToUpload = {}; //collection of images to be processed
    Api = {}; //for now it is just for delete a image from de collection.....

    //Make the API
    Api.remove = function (index) {
        if(index)
            delete imgToUpload[index];
    }

    if (url == undefined) { //if we do not pass the url then this return the API..
        return Api;
    }
    
    //Overloads/Functions
    opt = opt || {}
    opt.success = opt.success || function () { }
    opt.error = opt.error || function () { }
    opt.complete = opt.complete || function () { }
    opt.beforeUpload = opt.beforeUpload || function () { }
    //Overloads/vars
    opt.interval = opt.interval || 500;
    opt.cancellable = opt.cancellable || false; //not used for now...

    //Setup
    //Progress bar.... //this is for Bootstrap, i wanna delete this, because it should be configurable
    this.find(".progress-bar")
        .attr("aria-valuenow", "0")
        .attr("aria-valuemin", min)
        .css("width", "0%");
    //Progress bar text
    this.find(".sr-only")
        .text(now + "% Completado");
    //Set Max
    this.find(".progress-bar")
        .attr("aria-valuemax", max);

    //Set the xhrhttp to AJAX and the form data
    xhrhttp = new XMLHttpRequest();
    fData = new FormData();
    //Calcule the step, it have to be a function.....
    step = (100 / max);
    
    $fobject.change(function () {
        for (i = 0; i < $object[0].files.length; i++) {
            imgToUpload[i] = $object[0].files[i];
        }
    })

    //Main Function
    upload = function () {

        xhrhttp.onreadystatechange = function () {
            if (xhrhttp.readyState == 4 && xhrhttp.status == 200) {

                now = now + step;
                $this.find(".progress-bar")
                        .attr("aria-valuenow", now)
                $this.find(".progress-bar")
                        .css("width", now + "%");
                $this.find(".sr-only")
                        .text(now + "% Completado");

                opt.success(files[current].name, xhrhttp.responseText, now);

            } else if (xhrhttp.status != 200 && xhrhttp.readyState != 1) {
                opt.error(files[current].name, xhrhttp.responseText, now);
                
                if(opt.cancellable){
                    clearInterval(myUpload); //No more uploads
                    opt.complete(xhrhttp.responseText);
                }
            }
        } //onreadystatechange

        fData.append(files[current].name, files[current]);
        xhrhttp.open("POST", url, false);
        xhrhttp.setRequestHeader("Cache-Control", "no-cache");
        xhrhttp.send(fData);
        //Clean Vars
        fData = null;
        xhrhttp = null;
        ////Update Vars
        fData = new FormData();
        xhrhttp = new XMLHttpRequest();
        current = current + 1;

        if (current >= max) {
            clearInterval(myUpload)
            opt.complete(xhrhttp.responseText);
        }
    }

    //Call Function
    myUpload = setInterval(upload, parseInt(opt.interval));

return this;
}
