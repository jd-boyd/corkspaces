import datetime
import json

import django.db

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import never_cache

from corkspaces import models

# Create your views here.

def index(request):
    ws = models.Workspace.objects.create()
    print "ws:", ws

    entry = ws.entry_set.create(content='Welcome to your new corkspace',
                                x=150, y=150)


    return redirect("/%d" % ws.pk)
    #return HttpResponse("Hello, world.")

@never_cache
def ws_page(request, ws_id):

    template = loader.get_template('index.html')
    ws = models.Workspace.objects.get(id=ws_id)
    entries = ws.entry_set.all()

    context = RequestContext(request, {
        'workspace': to_json(ws),
        'entries': to_json(entries),
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

@never_cache
@csrf_exempt
def entry(request, ws_id, en_id=None):
    if en_id is None and request.method == "POST":
        print "New note"
        entry = models.Workspace.objects.get(id=ws_id).entry_set.create()
        en_id = entry.pk
    else:
        entry = models.Entry.objects.get(id=en_id)
        assert entry.workspace.id == int(ws_id)

    if request.method == "DELETE":
        entry.delete()
        return HttpResponse({
            'workspace': ws_id,
            'id': en_id
            }, content_type='application/json')

    if request.method in ["PUT", "PATCH", "POST"]:
        new_data = json.loads(request.body)

        for f in ['workspace', 'id', 'date_touched', 'isdropped', 'date_added']:
            new_data.pop(f, None)

        for k, v in new_data.items():
            print "updating", k, "with", repr(v)
            setattr(entry, k, v)
        entry.save()

    if request.method == "GET":
        pass

    entry = models.Entry.objects.get(id=en_id)
    return HttpResponse(to_json(entry), content_type='application/json')
