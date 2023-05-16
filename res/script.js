function load_panorama()
{
    let ctx = document.getElementById('panorama').getContext('2d');
    let img = new Image();
    const width = 5000;

    ctx.canvas.width = width;
    ctx.canvas.height = width / 2;

    img.onload = function()
    {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, width / 2);
    };

    img.src = './res/img/test.jpg';
}