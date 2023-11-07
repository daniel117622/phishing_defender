from django.urls import path
from . import views

# app_name= "learn"
urlpatterns = [
    path("", views.index, name="index"),
    path("nosotros/", views.nosotrosPage, name="nosotros"),
    path("primeros_pasos/", views.primerosPasos, name="primeros_pasos"),
    path("base/", views.base),
]
