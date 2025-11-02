from rest_framework import serializers
from .models import Transaction, TransactionDetail
from apps.stocks.models import Stock
from apps.stocks.serializers import StockSerializer


class TransactionDetailSerializer(serializers.ModelSerializer):
    stock = StockSerializer(read_only=True)

    class Meta:
        model = TransactionDetail
        fields = ["id", "quantity", "unit_price", "stock"]


class TransactionSerializer(serializers.ModelSerializer):
    client_profile = serializers.StringRelatedField(read_only=True)
    details = TransactionDetailSerializer(source='transactiondetail_set', many=True, read_only=True)

    class Meta:
        model = Transaction
        fields = [
            "id",
            "code",
            "type",
            "total_amount",
            "created_at",
            "is_active",
            "client_profile",
            "details"
        ]
    
    def create(self, validated_data):
        # Extrae los detalles del cuerpo del POST
        details_data = validated_data.pop("details", [])
        transaction = Transaction.objects.create(**validated_data)

        # Crea los detalles relacionados
        for detail in details_data:
            TransactionDetail.objects.create(transaction=transaction, **detail)

        return transaction
