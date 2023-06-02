import os

def main():
    number = 1

    for file in os.listdir(os.fsencode(".")):
        filename = os.fsdecode(file)

        if not filename.endswith(".py"):
            os.rename(filename, str(number) + "." + filename.split(".")[1])
            number += 1
            #print(number)

if __name__ == "__main__":
    main()