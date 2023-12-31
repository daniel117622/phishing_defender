from django.db import models
import re
import requests
import urllib.parse
from bs4 import BeautifulSoup

# Create your models here.
class Rastreador:
    def __init__(valdi, url, ignore_links):
        valdi.session = requests.Session()
        valdi.target_url = url
        valdi.target_links = []
        valdi.links_to_ignore = ignore_links
        valdi.vulnerabilities_found = False
        
    def extract_links_from(valdi, url):
        response = valdi.session.get(url)
        if response.status_code == 200:
            content = response.text  # Utiliza response.text
            return re.findall(r'href="(.*?)"', content)
        else:
            print(f"Fallo al recuperar contenido de {url}")
            return []
        
    def crawl(valdi, url=None):
        if url == None:
            url = valdi.target_url
        href_links = valdi.extract_links_from(url)
        for link in href_links:
            link = urllib.parse.urljoin(url, link)
            
            if "#" in link:
                link = link.split("#")[0]
                
            if valdi.target_url in link and link not in valdi.target_links and link not in valdi.links_to_ignore:
                valdi.target_links.append(link)
                print(link)
                valdi.crawl(link)


    def extract_forms(valdi, url):
        response = valdi.session.get(url)
        parsed_html = BeautifulSoup(response.content, features="lxml")
        return parsed_html.findAll("form")
    
    def submit_form(valdi, form, value, url):
        action = form.get("action")
        post_url = urllib.parse.urljoin(url, action)
        method = form.get("method")
        
        lista_inputs = form.findAll("input")
        post_data = {}
        for input in lista_inputs:
            input_name = input.get("name")
            input_type = input.get("type")
            input_value = input.get("value")
            if input_type == "text":
                input_value = value
                
            post_data[input_name] = input_value
        if method == "post":
            return valdi.session.post(post_url, data=post_data)
        return valdi.session.get(post_url, params=post_data)
    
    def run_scanner(valdi):
        for link in valdi.target_links:
            forms = valdi.extract_forms(link)
            for form in forms:
                print("[♥] Testing form in " + link)
                is_vulnerable_to_xss = valdi.test_xss_in_form(form, link)
                if is_vulnerable_to_xss:
                    print("\n\nCuidado! Se descubrio una vulnerabilidad XSS en: " + link + " en el form: ")
                    print(form)
                    
            if "=" in link:
                print("\n\n[♥] Testing " + link)
                is_vulnerable_to_xss = valdi.test_xss_in_link(link)
                if is_vulnerable_to_xss:
                    print("♣♣♣ Se descubrio una vulnerabilidad XSS en: " + link)
                
    def test_xss_in_link(valdi, url):
        xss_test_script = "<sCript>alert('test')</scriPt>"
        url = url.replace("=","=" + xss_test_script)
        response = valdi.session.get(url)
        return xss_test_script in response.content.decode()
                
    def test_xss_in_form(valdi, form, url):
        xss_test_script = "<script>alert('test')</script>"
        response = valdi.submit_form(form, xss_test_script, url)
        return xss_test_script in response.content.decode()
