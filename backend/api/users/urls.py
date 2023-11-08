from django.urls import path

from .views import GetCSRFToken, UserLogin, UserLogout, UserRegistration, UserView

urlpatterns = [
    path("register/", UserRegistration.as_view(), name="user-register"),
    path("login/", UserLogin.as_view(), name="user-login"),
    path("logout/", UserLogout.as_view(), name="user-logout"),
    path("profile/", UserView.as_view(), name="user-view"),
    path("csrf_cookie/", GetCSRFToken.as_view(), name="get-csrf-token"),
]
