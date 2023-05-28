//CONSTANTS
const WIDTH = 1000;
let ASPECT_RATIO = 4/3; //yes constant
const MOVE_PIECES = 1/32;

//CANVAS SHIT
let ctx;
let canvas;
let img; //THE PANORAMA IMAGE
let img_url = "";

//CURRENT IMAGE STATE
let x1 = WIDTH / 2;
let x2; //TODO? Unused
let turn = 0; //NEGATIVE MEANS IT IS TURNED LEFT FROM CENTER, POSITIVE IS RIGHT

function load_panorama()
{
    check_param();

    ASPECT_RATIO = 1 / ASPECT_RATIO; //FLIP THE RATIO COZ I AM FUCKING DUMB

    canvas = document.getElementById('panorama');
    ctx = canvas.getContext('2d');
    img = new Image(); //IMAGE

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
    if (turn < 0 && (Math.abs(turn) - (1/MOVE_PIECES / 2)) >= 0)
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
    if (turn > 0 && (Math.abs(turn) - (1/MOVE_PIECES / 2)) >= 0) //TODO: Broken
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