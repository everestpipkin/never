import requests
import csv
from bs4 import BeautifulSoup, SoupStrainer
import os
from time import sleep

# Create a file to write our data to, add a headers row
f = csv.writer(open('english4.csv', 'w'))

#f.writerow(['question, answer'])
f.writerow(['title', 'user'])

# Create empty array for your multiple pages to get stored to
pages = []

url = 'https://forum.wordreference.com/forums/english-only.6/page-' 

for link in range(7881,9613):
	pages.append('https://forum.wordreference.com/forums/english-only.6/page-' + str(link))

#for each url we have stored
for item in pages:
	print (item)

	page = requests.get(item)
	if page:
		soup = BeautifulSoup(page.text, 'html.parser')
		
		############HTML############
		#prints out the full html of the page. 
		#print (soup)


		for elem in soup.find_all("a", class_="PreviewTooltip"):
			print (elem.text)
			next_tag = elem.findNext('a')
			print (next_tag.text)
			f.writerow([elem.text, next_tag.text])

		######PARSING FOR INTERNAL DATA######## 
		#text_soup = soup.text
		#split_text_soup = text_soup.split('\n')
		
		##uncomment below to see all the split sections

	#sleep (.1)