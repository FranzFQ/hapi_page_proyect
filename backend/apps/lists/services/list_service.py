from apps.lists.models import ListItem, ListDetail
from django.utils import timezone

def create_lists(user, title, items):
    """
    Crea una lista y sus detalles asociados.
    """
    lista = ListItem.objects.create(user=user, title=title, created_at=timezone.now(), updated_at=timezone.now())

    for item in items:
        ListDetail.objects.create(list=lista, item_content=item, added_at=timezone.now())

    return lista


def get_all_lists(user=None):
    """
    Devuelve todas las listas (opcionalmente filtradas por usuario).
    """
    if user:
        return ListItem.objects.filter(user=user)
    return ListItem.objects.all()
