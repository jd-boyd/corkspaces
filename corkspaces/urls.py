import os

from django.conf.urls import patterns, include, url
import django.views
from django.contrib import admin

from corkspaces import views

admin.autodiscover()


BASE_DIR = os.path.dirname(os.path.dirname(__file__))

urlpatterns = patterns(
    '',
    url(r'^$', views.index, name='index'),

    url(r'^(?P<ws_id>\d+)/$', views.ws_page, name='ws_page'),

    (r'^\d+/static/(?P<path>.*)$', 'django.views.static.serve',
     {'document_root': os.path.join(BASE_DIR, "static")}),

    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/(?P<ws_id>\d+)/entries/$', views.entries, name='entries'),
    url(r'^api/(?P<ws_id>\d+)/entry/(?P<en_id>\d+)$', views.entry, name='entry'),
    url(r'^api/(?P<ws_id>\d+)/entry/(?P<en_id>\d+)/$', views.entry, name='entry'),
    url(r'^api/(?P<ws_id>\d+)/$', views.workspace, name='workspace'),
)
