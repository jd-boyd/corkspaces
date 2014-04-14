import datetime
import json

import django.db

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader

from corkspaces import models

# Create your views here.

def index(request):
    return HttpResponse("Hello, world.")


def ws_page(request, ws_id):

    template = loader.get_template('index.html')
    ws = models.Workspace.objects.get(id=ws_id)
    entries = ws.entry_set.all()

    context = RequestContext(request, {
        'workspace': json.dumps(to_json(ws)),
        'entries': json.dumps(to_json(entries)),
    })
    return HttpResponse(template.render(context))


def to_json(data):
    dthandler = lambda obj: (
        obj.isoformat()
        if isinstance(obj, datetime.datetime)
        or isinstance(obj, datetime.date)
        else None)

    if isinstance(data, (list, set, django.db.models.query.QuerySet)):
        data = [datum.to_dict() for datum in data]
    else:
        data = data.to_dict()
    return json.dumps(data, default=dthandler)


def workspace(request, ws_id):
    ws = models.Workspace.objects.get(id=ws_id)
    return HttpResponse(to_json(ws), content_type='application/json')


def entries(request, ws_id):
    entries = models.Workspace.objects.get(id=ws_id).entry_set.all()
    return HttpResponse(to_json(entries), content_type='application/json')


def entry(request, ws_id, en_id):
    entry = models.Entry.objects.get(id=en_id)
    assert entry.workspace.id == int(ws_id)
    return HttpResponse(to_json(entry), content_type='application/json')
