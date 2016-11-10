from contextlib import contextmanager

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from django.utils import timezone
from api.models import Volunteer
from django.db.models import Sum, Count
from django.core.management import call_command

class DBMigrationTests(TestCase):
    
    def setUp(self):
        call_command('accessmigration', 'tests/test_volunteers.csv')
        return

    def test_all_inserted(self, **kwargs):
        f = open("./tests/test_volunteers.csv")
        lines = f.readlines()
        lines.pop(0)
        for i in range(len(lines)):
            username = lines[i].split(",")[-1].rstrip()
            self.assertTrue(User.objects.filter(username=str(i)+username).exists())
        return
