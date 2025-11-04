from django.core.management.base import BaseCommand
from apps.lists.services.list_service import create_lists
from apps.users.models import User

class Command(BaseCommand):
    help = "Crea listas de ejemplo o sincroniza con Supabase"

    def handle(self, *args, **kwargs):
        self.stdout.write("Iniciando creación de listas...")

        try:
            user = User.objects.first()
            if not user:
                self.stdout.write(self.style.ERROR("No se encontró ningún usuario registrado."))
                return

            lista = create_lists(
                user=user,
                title="Lista de ejemplo desde comando",
                items=["AAPL", "MSFT", "GOOGL"]
            )

            self.stdout.write(self.style.SUCCESS(f"Lista creada correctamente: {lista.title}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error: {e}"))
