from django.urls import path

from gallery import views

urlpatterns = [
    path(r'gallery', views.GalleryDisplay.as_view(), name='gallery'),
    path('gallery_update_content', views.GalleryAjaxUpdate.as_view(), name='gallery_update_content'),
    path('gallery_filter', views.GalleryAjaxFilter.as_view(), name='gallery_filter'),
]
