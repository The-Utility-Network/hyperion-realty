import urllib.request
import re

url = "https://thegraineledger.com"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    urls = re.findall(r'(?:src|href)=["\'](/?_next/image\?[^"\']+|https?://[^"\']+\.(?:png|jpg|jpeg|svg|webp))["\']', html)
    print("Found images:")
    for u in set(urls):
        print(u)
except Exception as e:
    print(f"Error: {e}")
