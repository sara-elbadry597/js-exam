export class Contact{
    contactInfo(){
        cartona=`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Email not valid *exemple@yyy.zzz
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password *Minimum eight characters, at least one letter and one number:*
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid repassword 
                    </div>
                </div>
            </div>
            <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3" disabled>Submit</button>
        </div>
    </div>`
    document.getElementById("Data").innerHTML = cartona;
    $("input").on("blur",function(){
       this.validateData();
    })}
     validateData(){
    let name = $("#nameInput").val();
    let email = $("#emailInput").val();
    let phone = $("#phoneInput").val();
    let age = $("#ageInput").val();
    let password = $("#passwordInput").val();
    let repassword = $("#repasswordInput").val();
    let regexName= /^[a-zA-z]+$/;
    let regexPhone=/^01[0-25][0-9]{8}$/;
    let regexPass= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let regexMail= /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    let regexAge =/^(?:[1-9][0-9]?|1\d{2})$/;
    let isValidName = regexName.test(name);
    let isValidEmail = regexMail.test(email);
    let isValidPhone = regexPhone.test(phone);
    let isValidAge = regexAge.test(age);
    let isValidPassword = regexPass.test(password);
    let isMatchingPassword = password === repassword;

    $("#nameAlert").toggleClass("d-none", isValidName);
    $("#emailAlert").toggleClass("d-none", isValidEmail);
    $("#phoneAlert").toggleClass("d-none", isValidPhone);
    $("#ageAlert").toggleClass("d-none", isValidAge);
    $("#passwordAlert").toggleClass("d-none", isValidPassword);
    $("#repasswordAlert").toggleClass("d-none", isMatchingPassword);

    let isFormValid = isValidName && isValidEmail && isValidPhone && isValidAge && isValidPassword && isMatchingPassword;
    $("#submitBtn").prop("disabled", !isFormValid);

    return isFormValid;


   }
}
