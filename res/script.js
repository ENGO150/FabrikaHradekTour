const points =
[
    [1240, 625, "1;2"]
];

const tolerance = 3;

window.onload = function()
{
    document.querySelector("img").onclick = (e) =>
    {
        let x = e.pageX - e.target.offsetLeft;
        let y = e.pageY - e.target.offsetTop;

        for (let i = 0; i < points.length; i++)
        {
            if
            (
                (Math.abs(x - points[i][0]) <= tolerance || -Math.abs(x - points[i][0]) >= tolerance) &&
                (Math.abs(y - points[i][1]) <= tolerance || -Math.abs(y - points[i][1]) >= tolerance)
            )
            {
                move(points[i][2]);
                break;
            }
        }
    }
}

function open_panorama(img)
{
    open("./res/panorama.html?img=" + img, "_self");
}

function move(img)
{
    if (!img.includes(";"))
    {
        open_panorama(img);
    } else
    {
        let imgs = img.split(";");
        open_panorama(imgs[Math.floor(Math.random() * imgs.length)]);
    }
}