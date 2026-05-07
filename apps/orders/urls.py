from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_order, name='create_order'),
    path('track/', views.track_order, name='track_order'),
]