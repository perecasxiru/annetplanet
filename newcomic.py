import os
import shutil

src_files = os.listdir("comics")
try:
    for file_name in src_files:
        print(file_name)

        if not os.path.exists("cmc\\"+file_name.split(".")[0].lower()):
            os.makedirs("cmc\\"+file_name.split(".")[0].lower())
            shutil.copy("index.html", "cmc\\"+file_name.split(".")[0].lower() + "\\" + "index.html")
    f = open("num_last.txt", "w")
    print(len(src_files))
    f.write(str(len(src_files)))
    f.close()

except:
    print(e)
    a = input("Error, ha fallat <ENTER> per acabar")
