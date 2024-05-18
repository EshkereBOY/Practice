from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, first_name, last_name, login, password, phone_number, company=None, is_boss=False):
        if not first_name:
            raise ValueError("first_name обязательный аргумент")

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            login=login,
            phone_number=phone_number,
            company=company,
            is_boss=is_boss,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, login, password):
        user = self.model(
            first_name=first_name,
            login=login,
        )
        user.is_staff=True

        user.set_password(password)
        user.save(using=self._db)
        return user




class User(AbstractBaseUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    login = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12)
    company = models.ForeignKey('Company', on_delete=models.PROTECT, null=True)
    is_boss = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['first_name', 'password']

    def __str__(self):
        return self.login

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff


class Company(models.Model):
    name = models.CharField(max_length=50)
    big_boss = models.OneToOneField('User', on_delete=models.PROTECT, related_name='boss', null=True, blank=True)
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.name
