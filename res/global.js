function move(url, self)
{
    let parameter = "_blank";

    if (self === true) parameter = "_self";

    open(url, parameter);
}