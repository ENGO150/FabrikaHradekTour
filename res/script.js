const points =
[
    [1240, 625, "1;2", 9, 16]
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
                ((Math.abs(x - points[i][0]) <= tolerance || -Math.abs(x - points[i][0]) >= tolerance) &&
                (Math.abs(y - points[i][1]) <= tolerance || -Math.abs(y - points[i][1]) >= tolerance))
            )
            {
                move(points[i][2], points[i][3], points[i][4]);
                break;
            }
        }
    }
}

function open_panorama(img, x, y)
{
    open("./res/panorama.html?img=" + img + "&aspect_x=" + x + "&aspect_y=" + y, "_self");
}

function move(img, x, y)
{
    if (!img.includes(";"))
    {
        open_panorama(img, x, y);
    } else
    {
        let imgs = img.split(";");
        open_panorama(imgs[Math.floor(Math.random() * imgs.length)], x, y);
    }
}