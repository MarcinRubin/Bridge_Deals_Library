from django.urls import path

from .views import (
    ActiveSession,
    GetCSRFToken,
    ProfileDataView,
    ProfileDirectoryView,
    UserLogin,
    UserLogout,
    UserRegistration,
)

urlpatterns = [
    path("register/", UserRegistration.as_view(), name="user-register"),
    path("login/", UserLogin.as_view(), name="user-login"),
    path("logout/", UserLogout.as_view(), name="user-logout"),
    path("active_session/", ActiveSession.as_view(), name="user-view"),
    path("csrf_cookie/", GetCSRFToken.as_view(), name="get-csrf-token"),
    path("directories/", ProfileDirectoryView.as_view(), name="get-update-directories"),
    path("profile_data/", ProfileDataView.as_view(), name="get-update-profile"),
]
