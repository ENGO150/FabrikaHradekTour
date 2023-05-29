function move(url, self)
{
    let parameter = "_blank";

    if (self) parameter = "_self";

    open(url, parameter);
}