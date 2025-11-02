from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Transaction, TransactionDetail
from .serializers import TransactionSerializer, TransactionDetailSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by("-created_at")
    serializer_class = TransactionSerializer

    def create(self, request, *args, **kwargs):
        """
        Crea una transacción junto con sus detalles.
        Espera un JSON así:
        {
          "type": "buy",
          "client_profile_id": 1,
          "details": [
            {"stock_id": 2, "quantity": 5, "unit_price": 120.5},
            {"stock_id": 3, "quantity": 2, "unit_price": 340.0}
          ]
        }
        """
        from apps.users.models import ClientProfile
        from apps.stocks.models import Stock
        data = request.data

        client = ClientProfile.objects.get(id=data["client_profile_id"])
        transaction = Transaction.objects.create(
            code=f"TXN-{Transaction.objects.count() + 1}",
            type=data["type"],
            client_profile=client,
            total_amount=0,
            is_active=True
        )

        total = 0
        for item in data.get("details", []):
            stock = Stock.objects.get(id=item["stock_id"])
            qty = float(item["quantity"])
            price = float(item["unit_price"])
            total += qty * price
            TransactionDetail.objects.create(
                transaction=transaction,
                stock=stock,
                quantity=qty,
                unit_price=price,
            )

        transaction.total_amount = total
        transaction.save()

        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

