from django.contrib.auth import get_user
from django.shortcuts import render
from rest_framework import generics, viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ViewSetMixin
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Company
from .permissions import IsAdminOrAuthenticatedRead
from .serializers import UserSerializer, CompanySerializer, UserRegSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Company, User




class UserRegistration(APIView):
    def post(self, request):
        serializer = UserRegSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserController(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminOrAuthenticatedRead,)
    filterset_fields = ['id', 'first_name', 'last_name', 'login', 'phone_number', 'is_boss', 'company']

    @action(methods=['patch'], detail=True)
    def update_company(self, request, pk=None):
        company_id = request.data.get('company_id')
        user = get_object_or_404(User, pk=pk)

        if Company.objects.filter(id=company_id).exists():
            user.company = Company.objects.get(pk=company_id)
            user.save()
            return Response({"company_id": user.company_id}, status=status.HTTP_200_OK)
        else:
            return Response({"Ошибка": "Компания с таким id не найдена"}, status=status.HTTP_404_NOT_FOUND)


class CompanyController(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = (IsAdminOrAuthenticatedRead,)

    def partial_update(self, request, pk=None, *args, **kwargs):
        big_boss_id = request.data.get('big_boss_id')
        company = Company.objects.get(pk=pk)
        try:
            boss_user = User.objects.get(pk=big_boss_id)
        except:
            return Response({"Ошибка": "Указанный пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)
        if boss_user.company_id == pk:
            company.big_boss = boss_user
            company.save()
            return Response({"big_boss_id" : big_boss_id}, status=status.HTTP_200_OK)
        return Response({"Ошибка": "Указанный пользователь работает в другой компании"}, status=status.HTTP_404_NOT_FOUND)


@receiver(post_save, sender=Company)
def update_user_is_boss(sender, instance, created, **kwargs):
    if instance.big_boss: #instance = Company
        boss_user = instance.big_boss
        if boss_user.company_id == instance.id:
            boss_user.is_boss = True
            boss_user.save()





