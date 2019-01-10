@ECHO OFF
git pull
python newcomic.py
git add .
git commit -m "new comic"
git push
