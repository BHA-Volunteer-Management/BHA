from contextlib import contextmanager

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from django.utils import timezone
from api.models import Volunteer
from django.db.models import Sum, Count

class DBMigrationTests(TestCase):
    def setUp(self):
        return

    def test_all_inserted(self, username, password, **kwargs):
        f = open("./test_volunteers.csv")
        lines = f.readlines()
        lines.pop(0)
        for i in xrange(len(lines)):
            username = lines[i].split(",")[-1].rstrip()
            self.assertTrue(User.objects.filter(username=str(i)+username).exists())
        return
