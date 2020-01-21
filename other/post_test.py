import requests
import datetime

URL = 'http://localhost:8080'
humi = 70
temp = 35
now = datetime.datetime.now()

data = {'humi': humi, 'temp': temp, 'time' : now } 
res = requests.post(URL, data=data)
print(res.status_code) 
print(res.text)
