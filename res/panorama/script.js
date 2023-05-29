//CONSTANTS
let WIDTH = 1000;
let ASPECT_RATIO = 4/3; //yes constant
const MOVE_PIECES = 1/32;

//CANVAS SHIT
let ctx;
let canvas;
let img; //THE PANORAMA IMAGE
let img_url = "";

//CURRENT IMAGE STATE
let x1 = WIDTH / 4;
let x2; //TODO? Unused
let turn = 0; //NEGATIVE MEANS IT IS TURNED LEFT FROM CENTER, POSITIVE IS RIGHT

let right_stop = 0;
let left_stop = 0;

function load_panorama()
{
    check_param();

    switch (ASPECT_RATIO) //178 = v; 134 = norm; 38 = adam norm; 66 = adam v; 42 = výškové
    {
        case 4/3:
            right_stop = 134;
            left_stop = -8;
            break;

        case 3/4:
            right_stop = 178;
            break;

        case 16/9:
            right_stop = 38;
            left_stop = -9;
            break;

        case 9/16:
            right_stop = 66;
            left_stop = 6;
            break;

        case 47/102:
            right_stop = 42;
            left_stop = 12;
            break;

        case 1621/1216:
            right_stop = 5;
            left_stop = -7;
    }

    ASPECT_RATIO = 1 / ASPECT_RATIO; //FLIP THE RATIO COZ I AM FUCKING DUMB

    canvas = document.getElementById('panorama');
    ctx = canvas.getContext('2d');
    img = new Image(); //IMAGE

    if (WIDTH * ASPECT_RATIO > 600)
    {
        WIDTH = 600 / ASPECT_RATIO;
    }

    ctx.canvas.height = WIDTH * ASPECT_RATIO; //TODO! Possible shit happening
    ctx.canvas.width = WIDTH / 2; //USER WILL SEE A 1/2 OF THE PANORAMA AT THE TIME

    img.onload = function()
    {
        x2 = img.width;
        ctx.drawImage(img, x1, 0, x2, img.height, 0, 0, WIDTH, WIDTH * ASPECT_RATIO); //DRAW A HALF OF img
    };

    img.src = img_url;
}

function turn_left()
{
    if (turn < 0 && (Math.abs(turn) - (1/MOVE_PIECES / 2)) >= left_stop)
    {
        //ctx.drawImage(img, x1, 0, img.width * MOVE_PIECES * (Math.abs(turn) - (1/MOVE_PIECES / 2) + 1), img.height, 0 - x1, 0, img.width * MOVE_PIECES * (Math.abs(turn) - (1/MOVE_PIECES / 2) + 1) * WIDTH/img.width, WIDTH * ASPECT_RATIO); //DRAW A HALF OF img //TODO
        return;
    }

    //MOVE AN 8th TO LEFT
    x1 -= WIDTH * MOVE_PIECES;
    x2 -= WIDTH * MOVE_PIECES;

    ctx.drawImage(img, x1, 0, img.width - WIDTH * MOVE_PIECES, img.height, 0, 0, WIDTH, WIDTH * ASPECT_RATIO); //DRAW

    turn--;
}

function turn_right()
{
    if (turn > 0 && (Math.abs(turn) - (1/MOVE_PIECES / 2)) >= right_stop) //TODO: Broken
    {
        //ctx.drawImage(img, img.width - WIDTH * MOVE_PIECES * (Math.abs(turn) - (1/MOVE_PIECES / 2)), 0, img.width, img.height, 0, 0, WIDTH * MOVE_PIECES * (Math.abs(turn) - (1/MOVE_PIECES / 2)), WIDTH * ASPECT_RATIO); //DRAW RIGHT PART ON THE LEFT SIDE //TODO

        return;
    }

    //MOVE AN 8th TO LEFT
    x1 += WIDTH * MOVE_PIECES;
    x2 += WIDTH * MOVE_PIECES;

    ctx.drawImage(img, x1, 0, img.width + WIDTH * MOVE_PIECES, img.height, 0, 0, WIDTH, WIDTH * ASPECT_RATIO); //DRAW

    turn++;
}

function check_param()
{
    let params = new URLSearchParams(window.location.search);
    img_url = params.get("img");
    x = params.get("aspect_x");
    y = params.get("aspect_y");

    if (img_url == null || x == null || y == null)
    {
        alert("This link seems to be corrupted!");
        open("../index.html", "_self");
    }

    img_url = 'http://207.180.212.190/fht/fabrika_imgs/' + img_url + '.jpg'; //TODO: Change
    if (!x.startsWith(undefined)) ASPECT_RATIO = x / y;
}