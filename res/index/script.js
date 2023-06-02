let imgs_index = [ 59, 58, 56, 55, 54, 67, 66, 64, 61, 60 ];
let imgs_index_2 = [];
let last_index = -1;

function change_slideshow_img()
{
    let buffer = (imgs_index === undefined || imgs_index.length == 0) ? imgs_index_2 : imgs_index;
    let random_index;

    do
    {
        random_index = Math.floor(Math.random() * buffer.length);
    } while (random_index == last_index);

    document.getElementById("slideshow").src = "http://207.180.212.190/fht/fabrika_imgs/downscaled/" + buffer[random_index] + ".jpg";

    if (imgs_index.includes(buffer[random_index]))
    {
        imgs_index_2.push(buffer[random_index]);
        imgs_index.splice(random_index, 1);
    } else
    {
        imgs_index.push(buffer[random_index]);
        imgs_index_2.splice(random_index, 1);
    }

    last_index = random_index;

    setTimeout(change_slideshow_img, 3000);
}