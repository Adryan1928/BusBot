from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from api.views import ClienteViewSet, QuestaoViewSet
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register('clientes', ClienteViewSet)
router.register('questoes', QuestaoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', view=TemplateView.as_view(template_name='home.html'), name='home'),
] + [path('api/', include(router.urls))]
