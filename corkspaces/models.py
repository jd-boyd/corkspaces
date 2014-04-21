from __future__ import absolute_import, print_function, unicode_literals

import datetime

from django.db import models
from django_extensions.db.fields import UUIDField

# Create your models here.
from django.forms.models import model_to_dict


def datetime_to_int(obj):
    """Default JSON serializer."""
    import calendar

    if isinstance(obj, datetime.datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
        millis = int(
            calendar.timegm(obj.timetuple()) * 1000 +
            obj.microsecond / 1000
        )
        return millis
    return obj

class MyModel(object):
    def to_dict(self):
        return model_to_dict(self)

class User(MyModel, models.Model):
    #column definitions
    date_added = models.DateTimeField()
    email = models.CharField(max_length=320)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=32)
    validated = models.BooleanField()

    #relation definitions

    # def __init__(self, email, name, password):
    #     #email, name, password, date_added, validated
    #     self.email = email
    #     self.name = name
    #     self.password = password
    #     self.date_added = datetime.datetime.today()
    #     self.validated = True

    def __repr__(self):
        return "User(%r, %r, %r)" % (self.uid, self.name, self.validated)


class Workspace(MyModel, models.Model):
    #column definitions
    date_added = models.DateTimeField(default=lambda:datetime.datetime.now())
    date_touched = models.DateTimeField(default=lambda:datetime.datetime.now())
    isdropped = models.BooleanField()
    title = models.TextField()
    #user = models.ForeignKey(User)
    
    #relation definitions
    # def __init__(self, uid, title):
    #     ts = datetime.datetime.today()

    #     self.uid = uid
    #     self.title = title
    #     self.isdropped = False
    #     self.date_added = ts
    #     self.date_touched = ts

    # def __repr__(self):
    #     return "<Workspace(%r, %r, %r)>" % (self.cid, self.uid, self.url)

    def __str__(self):
        return "pk=%d, title=%s" % (self.pk,
                                    self.title)

    def drop(self):
        self.isdropped = True


class Entry(MyModel, models.Model):
    #column definitions
    date_added = models.DateTimeField(default=lambda:datetime.datetime.now())
    date_touched = models.DateTimeField(default=lambda:datetime.datetime.now())
    isdropped = models.BooleanField(default=lambda:False)
    workspace = models.ForeignKey(Workspace)
    #user = models.ForeignKey(User)
    
    x = models.IntegerField(default=0)
    y = models.IntegerField(default=0)
    width = models.IntegerField(default=200)
    height = models.IntegerField(default=200)

    content = models.TextField()

    def __str__(self):
        return "pk=%d, workspace=%d, content=%s" % (self.pk,
                                                    self.workspace.pk,
                                                    self.content)
        
        
    #relation definitions
    # def __init__(self, uid, cid, url, title):
    #     ts = datetime.datetime.today()

    #     self.uid = uid
    #     self.isdropped = False
    #     self.date_added = ts
    #     self.date_touched = ts

    # def __repr__(self):
    #     return "<Entry(%r, %r, %r)>" % (self.cid, self.uid, self.url)

    # def as_dict(self):
    #     return {c.name: datetime_to_int(getattr(self, c.name))
    #             for c in self.__table__.columns}

    def drop(self):
        self.isdropped = True



class Validation(MyModel, models.Model):
    #column definitions
    user = models.ForeignKey(User)
    uuid = UUIDField()

    #relation definitions


class Session(MyModel, models.Model):
    #column definitions
    date_added = models.DateTimeField()
    user = models.ForeignKey(User)
    uuid = UUIDField()

    #relation definitions
    # def __init__(self, uid, uuid):
    #     self.uid = uid
    #     self.date_added = datetime.datetime.today()
    #     self.uuid = uuid

    def __repr__(self):
        return "<Session(%r, %r)>" % (self.uid, self.uuid)
