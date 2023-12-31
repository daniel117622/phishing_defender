from django.urls import path
from . import views

app_name= "base"
urlpatterns = [
    path("blog/", views.blog, name= 'blog'),
    path("comunidad/", views.index, name="index"),
    path("nosotros/", views.nosotrosPage, name="nosotros"),
    path("primeros_pasos/", views.primerosPasos, name="primeros_pasos"),
    path("phishDefender/", views.phishDefender, name="phishDefender"),
]
