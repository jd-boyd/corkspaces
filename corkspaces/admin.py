from django.contrib import admin
from corkspaces.models import Workspace, Entry, Validation, Session


# Register your models here.
admin.site.register(Workspace)
admin.site.register(Entry)
admin.site.register(Validation)
admin.site.register(Session)


