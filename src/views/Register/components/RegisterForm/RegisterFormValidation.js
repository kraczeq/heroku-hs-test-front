export const emailValidator = (values, errors) =>
{
    const emailRegex = /^[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9A-Z!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if (!values.email)
    {
        errors.email = "This field is required."
    }
    else if (!emailRegex.test(values.email))
    {
        errors.email = "Invalid email format."
    }
}

export const roleValidator = (values, errors) =>
{ 
    if (values.role === "")
    {
        errors.role = "This field is required."
    } 
}

//
// export const nameValidator = (values, errors) =>
// {
//     const numbersRegex = /^[0-9]+$/;
//     if (!values.name)
//     {
//         errors.name = "This field is required.";
//     }
//     else if (values.name[0] === values.name[0].toLowerCase())
//     {
//         errors.name = "Name should start with capital letter"
//     }
//     else if (values.name)
//     {
//         for(let character of values.name)
//         {
//             if (character.match(numbersRegex))
//             {
//                 errors.name = "Name can't have numbers."
//             }
//         }
//     }     
// }

// export const surnameValidator = (values, errors) => 
// {
//     const numbersRegex = /^[0-9]+$/;
//     if (!values.surname)
//     {
//         errors.surname = "This field is required.";
//     }
//     else if (values.name[0] === values.name[0].toLowerCase())
//     {
//         errors.surname = "Surname should start with capital letter"
//     }
//     else if (values.surname)
//     {
//         for(let character of values.surname)
//         {
//             if (character.match(numbersRegex))
//             {
//                 errors.surname = "Surname can't have numbers."
//             }
//         }
//     }    
// }

export const passwordValidator = (values, errors) =>
{
    const minPasswordLength = 7;
    if (!values.password)
    {
        errors.password = "This field is required."
    }
    else if (values.password.length < minPasswordLength)
    {
        errors.password = `Password must be at least ${minPasswordLength} characters long.`
    }
}

export const confirmPasswordValidator = (values, errors) => 
{
    const minPasswordLength = 7;
    if (!values.confirmPassword)
    {
        errors.confirmPassword = "This field is required."
    }
    else if (values.confirmPassword.length < minPasswordLength)
    {
        errors.confirmPassword = `Password must be at least ${minPasswordLength} characters long.`
    }
    else if (values.confirmPassword !== values.password)
    {
        errors.confirmPassword = "Passwords must be the same."
    }
}