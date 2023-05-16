function load_panorama()
{
    console.log(window.width);
    var ctx = document.getElementById('panorama').getContext('2d');
    var img = new Image();
    var width_buffer;

    img.onload = function()
    {
        width_buffer = 5000;

        ctx.canvas.width=width_buffer;
        ctx.canvas.height=width_buffer / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width_buffer, width_buffer / 2);
    };

    img.src = './res/img/test.jpg';
}