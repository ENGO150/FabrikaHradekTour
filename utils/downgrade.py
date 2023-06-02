import os
from PIL import Image

def main():
    for file in os.listdir(os.fsencode(".")):
        filename = os.fsdecode(file)

        if not filename.endswith(".jpg"): continue

        foo = Image.open(filename)

        if foo.size[0] <= 3000 and foo.size[1] <= 3000: continue

        foo = foo.resize((1500, int((1500 / foo.size[0]) * foo.size[1])), Image.LANCZOS)
        foo.save("downscaled/" + filename, quality=95)

if __name__ == "__main__":
    main()