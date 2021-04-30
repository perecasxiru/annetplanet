import os
import shutil

if os.path.exists('cmc'):
    shutil.rmtree("cmc")
if os.path.exists('eng\\cmc'):
    shutil.rmtree("eng\\cmc")
if os.path.exists('cat\\cmc'):
    shutil.rmtree("cat\\cmc")

src_files_eng = os.listdir("comics_eng")
src_files_cat = os.listdir("comics_cat")

try:
    for file_name in src_files_eng:
        if not os.path.exists("eng\\cmc\\"+file_name.split(".")[0].lower()):
            os.makedirs("eng\\cmc\\"+file_name.split(".")[0].lower())
            shutil.copy("eng\\index.html", "eng\\cmc\\"+file_name.split(".")[0].lower() + "\\" + "index.html")

    for file_name in src_files_cat:
        if not os.path.exists("cat\\cmc\\"+file_name.split(".")[0].split("_")[0].lower()):
            os.makedirs("cat\\cmc\\"+file_name.split(".")[0].split("_")[0].lower())
            shutil.copy("cat\\index.html", "cat\\cmc\\"+file_name.split(".")[0].split("_")[0].lower() + "\\" + "index.html")

    f = open("num_last_eng.txt", "w")
    f.write(str(len(src_files_eng)))
    f.close()

    f = open("num_last_cat.txt", "w")
    f.write(str(len(src_files_cat)))
    f.close()

except:
    print(e)
    a = input("Error, ha fallat <ENTER> per acabar")
