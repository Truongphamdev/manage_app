from rest_framework import serializers
from ....models import PaymentOrder,InvoiceOrder,Order
import django.db.models as models
from django.utils.timezone import now



class PaymentOrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentOrder
        fields = ['order', 'payment_method', 'amount','transaction_id','status']
    CHOICES_PAYMENT_METHOD = (
        ("vnpay", "VNPAY"),
        ("cash", "Cash"),
    )
    def validate_order(self, value):
        if not Order.objects.filter(pk=value.pk).exists():
            raise serializers.ValidationError("Order does not exist.")
        return value
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value
    def validate_payment_method(self, value):
        valid_methods = dict(self.CHOICES_PAYMENT_METHOD).keys()
        if value not in valid_methods:
            raise serializers.ValidationError("Invalid payment method.")
        return value
    def create(self, validated_data):
        payment = PaymentOrder.objects.create(**validated_data)
        order = payment.order
        invoice = InvoiceOrder.objects.filter(order=order).first()
        total_paid = PaymentOrder.objects.filter(order=order).aggregate(
            total=models.Sum('amount')
        )['total'] or 0
        if invoice:
            if total_paid >= order.total_amount:
                invoice.status = 'paid'
            elif total_paid > 0:
                invoice.status = 'partially_paid'
            else:
                invoice.status = 'unpaid'
            invoice.save()
        return payment