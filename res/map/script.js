const points =
[
    [87.6, 78.4, "1;2", 9, 16],
    [86.2, 69.9, "27"],
    [86.5, 68.55, "26"],
    [82.9, 68.9, "4", 16, 9],
    [73, 69.8, "5;6", 16, 9],
    [74.9, 73.9, "7", 16, 9],
    [71.4, 76.3, "8", 16, 9],
    [74.81, 79.88, "9", 16, 9],
    [74.37, 81.66, "10", 16, 9],
    [63.56, 78.55, "11;34", 16, 9],
    [44.81, 68.33, "12;37"],
    [70.87, 81.22, "13;18"],
    [24.62, 72.88, "14", 3, 4],
    [74.62, 75.22, "15", 47, 102],
    [78.31, 72.55, "16", 47, 102],
    [82.18, 75.77, "17", 47, 102],
    [71.37, 83.11, "19", 3, 4],
    [38.12, 60.66, "20;51"],
    [39.25, 60.11, "21", 3, 4],
    [68.18, 80, "22", 3, 4],
    [65, 77.55, "23;24"],
    [38.12, 74.11, "25", 3, 4],
    [40.62, 74.44, "28"],
    [26.25, 73.44, "29", 3, 4],
    [10.5, 61.66, "30"],
    [6.06, 63.33, "31"],
    [42.12, 67.88, "32", 3, 4],
    [65.5, 79.77, "33;35", 3, 4],
    [62.81, 71.22, "36"],
    [39.5, 64.22, "38"],
    [39.37, 65.77, "39;52"],
    [37.31, 62.44, "40"],
    [38.81, 60.55, "41"],
    [42.43, 54, "42"],
    [39.68, 52.22, "43"],
    [38.87, 52.44, "44;46"],
    [38.43, 51, "45"],
    [39, 50, "48;50"],
    [8.62, 61.11, "53"],
    [38.06, 49.55, "47;49"],
    [87.25, 76.44, "3", 9, 16],
    [28.62, 83.11, "68", 1621, 1216],
    [72.06, 60.66, "69;70", 1621, 1216],
    [45.62, 73.11, "71", 3, 4],
    [27.31, 74.33, "72", 3, 4],
    [29.37, 73.44, "73", 3, 4],
    [44.75, 73.22, "74"],
    [43.43, 73.11, "75"],
    [42.43, 73.44, "76"],
    [41.31, 73.66, "77"],
    [65.37, 78.77, "78", 3, 4],
    [78.87, 74.88, "79;80", 9, 16],
    [63.5, 78.22, "81", 3, 4],
    [64.18, 78.33, "82;90", 9, 16],
    [64.68, 78.44, "83;93", 9, 16],
    [38.31, 54, "84", 500, 281],
    [38.5, 53.44, "85", 500, 281],
    [37.18, 58.55, "86"],
    [37.18, 56.22, "87"],
    [37.56, 60, "88", 500, 281],
    [81.62, 75.77, "89", 9, 16],
    [12.43, 76.77, "91;92", 9, 16],
    [62.93, 77.88, "94", 9, 16]
];

const tolerance_x = 0.2;
const tolerance_y = 0.3;

function info()
{
    if (!document.cookie.includes("opened"))
    {
        document.cookie = "opened";
        alert("Můžete klikat na červené tečky pro otevření panoramat.");
    }
}

window.onload = function()
{
    info();

    let img = document.querySelector("img");
    img.onclick = (e) =>
    {
        let x = Math.floor((e.pageX - e.target.offsetLeft) / img.width * 10000) / 100;
        let y = Math.floor((e.pageY - e.target.offsetTop) / img.height * 10000) / 100;

        for (let i = 0; i < points.length; i++)
        {
            if
            (
                ((Math.abs(x - points[i][0]) <= tolerance_x || -Math.abs(x - points[i][0]) >= tolerance_x) &&
                (Math.abs(y - points[i][1]) <= tolerance_y || -Math.abs(y - points[i][1]) >= tolerance_y))
            )
            {
                move_to_panorama(points[i][2], points[i][3], points[i][4]);
                break;
            }
        }

        console.log(x, y);
    }
}

function open_panorama(img, x, y)
{
    open("./res/panorama.html?img=" + img + "&aspect_x=" + x + "&aspect_y=" + y, "_self");
}

function move_to_panorama(img, x, y)
{
    if (!img.includes(";"))
    {
        open_panorama(img, x, y);
    } else
    {
        let imgs = img.split(";");
        let random_index = Math.floor(Math.random() * imgs.length);

        //EXCEPTIONS
        switch (imgs[random_index])
        {
            case "34":
                x = 4;
                y = 3;
                break;

            case "90":
                x = 3;
                y = 4;
                break;
        }

        open_panorama(imgs[random_index], x, y);
    }
}