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

export const passwordValidator = (values, errors) =>
{
    if (!values.password)
    {
        errors.password = "This field is required."
    }
    else if (values.password.length < 7)
    {
        errors.password = "Password must contain at least 7 characters."
    }
}

