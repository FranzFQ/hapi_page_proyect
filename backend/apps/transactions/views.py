from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Transaction, TransactionDetail
from .serializers import TransactionSerializer, TransactionDetailSerializer
from django.utils import timezone
from apps.users.models import ClientProfile
from apps.stocks.models import Stock


class TransactionViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar transacciones y sus detalles.
    """
    queryset = Transaction.objects.all().order_by("-created_at")
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        """
        Crea una transacción junto con sus detalles.
        Espera un JSON así:
        {
          "type": "compra/venta",
          "client_profile_id": 1,
          "details": [
            {"stock_id": 2, "quantity": 5, "unit_price": 120.5},
            {"stock_id": 3, "quantity": 2, "unit_price": 340.0}
          ]
        }
        """
        data = request.data

        try:
            client = ClientProfile.objects.get(id=data["client_profile_id"])
        except ClientProfile.DoesNotExist:
            return Response({"error": "Cliente no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear transacción principal
        transaction = Transaction.objects.create(
            code=f"TXN-{Transaction.objects.count() + 1}",
            type=data.get("type", "buy"),
            client_profile=client,
            total_amount=0,
            created_at=timezone.now(),
            is_active=True
        )

        total = 0
        details_data = data.get("details", [])
        created_details = []

        for item in details_data:
            try:
                stock = Stock.objects.get(id=item["stock_id"])
            except Stock.DoesNotExist:
                return Response({"error": f"Stock ID {item['stock_id']} no encontrado"},
                                status=status.HTTP_400_BAD_REQUEST)

            qty = float(item["quantity"])
            price = float(item["unit_price"])
            subtotal = qty * price
            total += subtotal

            detail = TransactionDetail.objects.create(
                transaction=transaction,
                stock=stock,
                quantity=qty,
                unit_price=price,
            )
            created_details.append(detail)

        # Actualizar monto total
        transaction.total_amount = total
        transaction.save()

        # Serializar respuesta completa
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["get"])
    def details(self, request, pk=None):
        
        # Retorna los detalles de una transacción específica.

        transaction = self.get_object()
        details = TransactionDetail.objects.filter(transaction=transaction)
        serializer = TransactionDetailSerializer(details, many=True)
        return Response(serializer.data)
class TransactionDetailViewSet(viewsets.ModelViewSet):
    """
    API endpoint para gestionar los detalles de las transacciones (CRUD individual).
    """
    queryset = TransactionDetail.objects.all()
    serializer_class = TransactionDetailSerializer

    def perform_create(self, serializer):
        serializer.save()