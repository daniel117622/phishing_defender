from django.db import models
from django.contrib import admin

class URLRequest(models.Model):
    url = models.CharField(max_length=200)
    last_checked = models.DateTimeField(auto_now_add=True)
    vulnerable = models.BooleanField(default=True)
    lvl = models.IntegerField(default=0)

    def __str__(self):
        vuln = "GOOD"
        if not self.vulnerable:
            vuln = "DANGER"
        text = f"{self.pk}.- [lvl {self.lvl}][{vuln}] {self.url}"
        return text

class Publicacion(models.Model):
    name = models.CharField(max_length=100)
    last_updated = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=200, null=True)
    
    def __str__(self):
        return self.name