from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/signup/', SignUpJWT.as_view(), name='token_signup')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
