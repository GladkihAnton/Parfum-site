from django.urls import path

from gallery import views

urlpatterns = [
    path(r'gallery', views.gallery, name='gallery'),
    path(r'gallery', views.start_function),
    path('gallery_function', views.gallery_function, name='gallery_function'),
    path('gallery_checkbox', views.gallery_checkbox, name='gallery_checkbox'),
    path('update_content', views.update_content, name='update_content'),
]