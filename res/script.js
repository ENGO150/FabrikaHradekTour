//CONSTANTS
const WIDTH = 1000;
const ASPECT_RATIO = 1/2;
const MOVE_PIECES = 1/32;

//CANVAS SHIT
let ctx;
let canvas;
let img; //THE PANORAMA IMAGE

//CURRENT IMAGE STATE
let x1 = WIDTH / 2;
let x2; //TODO? Unused

function load_panorama()
{
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

    img.src = './res/img/test.jpg';
}

function turn_left() //TODO: MOVE THE RIGHT PART TO LEFT
{
    //MOVE AN 8th TO LEFT
    x1 -= WIDTH * MOVE_PIECES;
    x2 -= WIDTH * MOVE_PIECES;

    ctx.drawImage(img, x1, 0, img.width - WIDTH * MOVE_PIECES, img.height, 0, 0, WIDTH, WIDTH * ASPECT_RATIO); //DRAW
}