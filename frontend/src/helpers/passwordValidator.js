export function passwordValidator(password) {
    // Define regex patterns for each criteria
    var lowerCasePattern = /[a-z]/;
    var upperCasePattern = /[A-Z]/;
    var digitPattern = /\d/;
    var specialCharPattern = /[^a-zA-Z0-9]/;

    var data = null

    if (password.length < 8 || password.length > 20) {

        data = {
            msg: "Password must be between 8 and 20 characters long.",
            success: false
        }
        return data
    }



    if (!lowerCasePattern.test(password)) {
        data = {
            msg: "Password must contain at least one lowercase letter.",
            success: false
        }
        return data
    }
    if (!upperCasePattern.test(password)) {
        data = {
            msg: "Password must contain at least one uppercase letter.",
            success: false
        }
        return data
    }
    if (!digitPattern.test(password)) {
        data = {
            msg: "Password must contain at least one digit.",
            success: false
        }
        return data
    }
    if (!specialCharPattern.test(password)) {
        data = {
            msg: "Password must contain at least one special character.",
            success: false
        }
        return data
    }


    data = {
        msg:"Password valid",
        success:true
    } 
    return data
}