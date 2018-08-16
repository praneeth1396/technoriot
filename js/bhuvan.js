AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:f2f0c198-f007-4601-86c4-2382d8389a98',
});
var poolData = {
    UserPoolId : 'us-east-1_W9qkWGcIp',
    ClientId : '5snsk43d6vugm18rmqh5t5l98' 
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var cognitoUser;
function check()
{
    cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                //alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
            cognitoUser.getUserAttributes(function(err, result) {
                if (err) {
                    //alert(err);
                    return;
                }
                else
                {
                    //alert(result);
                }
                for (i = 0; i < result.length; i++) {
                    console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
                }
            });
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-1:f2f0c198-f007-4601-86c4-2382d8389a98', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_W9qkWGcIp' : session.getIdToken().getJwtToken()
                }
            });

            // Instantiate aws sdk service objects now that the credentials have been updated.
            // example: var s3 = new AWS.S3();

        });
    }
    else
    {
        console.log("Not Signed in");
    }

}
function logout()
{
    if (cognitoUser != null) {
        cognitoUser.signOut();
      }
}

function authorize(emailList,passList){
    return new Promise(function(resolve,reject){
        console.log("@");
        console.log(emailList);
        console.log(passList);
        //var forms = document.getElementsByClassName('needs-validation');
        var i = 0;
        var final_result = [];
        for(i;i<2;i++){
            var authenticationData = {
                Username : emailList[i],
                Password : passList[i],
            };
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
            var poolData = {
                UserPoolId : 'us-east-1_W9qkWGcIp', // your user pool id here
                ClientId : '5snsk43d6vugm18rmqh5t5l98' // your app client id here
            };
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var userData = {
                Username : emailList[i],
                Pool : userPool
            };
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            var promise = new Promise(function(resolve,reject){
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result) {
                        var accessToken = result.getAccessToken().getJwtToken();
                        
                        //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                        AWS.config.region = 'us-east-1';

                        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                            IdentityPoolId : 'us-east-1:f2f0c198-f007-4601-86c4-2382d8389a98', // your identity pool id here
                            Logins : {
                                // Change the key below according to the specific region your user pool is in.
                                'cognito-idp.us-east-1.amazonaws.com/us-east-1_W9qkWGcIp' : result.getIdToken().getJwtToken()
                            }
                        });                      
                        cognitoUser = userPool.getCurrentUser();
                        if (cognitoUser != null) {
                            cognitoUser.getSession(function(err, session) {
                                if (err) {
                                    //alert(err);
                                    reject(err);
                                }
                                console.log('session validity: ' + session.isValid());
                                cognitoUser.getUserAttributes(function(err, result) {
                                    if (err) {
                                        //alert(err);
                                        reject(err);
                                    }
                                    else{
                                        //alert(result);
                                        resolve(result);         
                                    }
                                });
                                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                                    IdentityPoolId : 'us-east-1:f2f0c198-f007-4601-86c4-2382d8389a98', // your identity pool id here
                                    Logins : {
                                        // Change the key below according to the specific region your user pool is in.
                                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_W9qkWGcIp' : session.getIdToken().getJwtToken()
                                    }
                                });
                    
                                // Instantiate aws sdk service objects now that the credentials have been updated.
                                // example: var s3 = new AWS.S3();
                    
                            });
                        }
                        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                    /*  AWS.config.credentials.refresh((error) => {
                            if (error) {
                                    console.error(error);
                            } else {
                                    // Instantiate aws sdk service objects now that the credentials have been updated.
                                    // example: var s3 = new AWS.S3();

                                    console.log('Successfully logged!');
                                    
                                    //$('#signin').modal('hide');
                            }
                        }); */
                    },

                    onFailure: function(err) {
                        //alert(err.message || JSON.stringify(err));
                        reject(err);
                    },
                });
            });
            event.preventDefault();
            event.stopPropagation();
            promise.then(function(result){
               console.log(result);
               final_result.push(result);
               if(final_result.length == 2)
                    resolve(final_result);
            },function(err){
               console.log(err);
               reject(err); 
            });
        }
    });
    //form.classList.add('was-validated');
}


  //forgot Password
  function forgot(){
    var userData = {
        Username : document.getElementById("validationCustomUsername").value,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: function (data) {
        // successfully initiated reset password request
          console.log('CodeDeliveryData from forgotPassword: ' + data);
    },
    onFailure: function(err) {
        //alert(err.message || JSON.stringify(err));
    },
    //Optional automatic callback
    inputVerificationCode: function(data) {
        console.log('Code sent to: ' + data);
        var verificationCode = prompt('Please input verification code ' ,'');
        var newPassword = prompt('Enter new password ' ,'');
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess() {
                console.log('Password confirmed!');
            },
            onFailure(err) {
                console.log('Password not confirmed!');
            }
        });
    }
    });
    }

    var currentTab = 0;
    var passList = [],emailList = [];
    showTab(currentTab);
    
    function showTab(n){
        var x = document.getElementsByClassName("tab");
        var tab = x[n];
        tab.style.display = "block";
    
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none"; 
        } 
        else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } 
        else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        fixStepIndicator(n);
    }
    function fixStepIndicator(n){
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        x[n].className += " active";
        
    
    }
    function nextPrev(n) {
        var check = validateForm();
        console.log(check);
        var x = document.getElementsByClassName("tab");
    
        if(!check) return false;
    
        x[currentTab].style.display = "none";
        
        currentTab = currentTab + n;
    
        if (currentTab >= x.length) {
            console.log(emailList);
            console.log(passList);
            
            authorize(emailList,passList).then(function(result){
                console.log(result);  
                $.ajax({
                    url: "https://techno-riot.herokuapp.com/send_params",
                    type: "POST",
                    dataType: "text",   
                    crossDomain: true,
                    data: JSON.stringify({
                        "finalResult":result
                    }),
                    contentType: 'application/json',
                    success:function(data){      
                        hideAllElements();
                        console.log("Success");
                        window.location.href = "description_page.html";
                    },
                    error:function(err){
                        console.log(err);
                    }
                });

            },function(err){
                console.log(err);
                window.location.href = "index.html";
            });
            return false;
        }
        showTab(currentTab);
    }
    
    function hideAllElements(){
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";    
        document.getElementById("steps").style.display = "none";
        document.getElementById("reg").style.display = "none";
        document.getElementsByClassName("login100-form-title")[0].innerHTML = "Logged in successfully !";
    }
    
function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for(i=0;i<y.length;i++){
        y[i].classList.remove("invalid");
    }
    for (i = 0; i < y.length; i++) {
        if(y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
        else {
            emailList[currentTab] = y[0].value;
            passList[currentTab] = y[1].value;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}