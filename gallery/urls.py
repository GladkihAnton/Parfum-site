from django.urls import path

from gallery import views

urlpatterns = [
    path(r'gallery', views.GalleryDisplay.as_view(), name='gallery'),
    path('gallery_update_content', views.GalleryUpdateContent.as_view(), name='gallery_update_content'),
]
