from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ...permissions import IsAdminRole
from ...models import Product, Supplier, Category
from ...serializers import ProductSerializer, SupplierSerializer, CategorySerializer, CreateProductSerializer, UpdateProductSerializer

class ManageProductViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def list(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        product = Product.objects.filter(ProductID=pk).first()  # đổi lại nếu model dùng ProductID
        if product:
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        return Response({"error": "không tìm thấy sản phẩm"}, status=status.HTTP_404_NOT_FOUND)

    def form_data(self, request):
        suppliers = SupplierSerializer(Supplier.objects.all(), many=True).data
        categories = CategorySerializer(Category.objects.all(), many=True).data
        return Response({"suppliers": suppliers, "categories": categories})

    def create(self, request):
        print("create validated_data:", request.data)
        serializer = CreateProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "Sản phẩm đã được tạo"}, status=status.HTTP_201_CREATED)
        return Response({"error": "Dữ liệu không hợp lệ", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        product = Product.objects.filter(ProductID=pk).first()
        if not product:
            return Response({"error": "không tìm thấy sản phẩm"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UpdateProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "Sản phẩm đã được cập nhật"}, status=status.HTTP_200_OK)
        return Response({"error": "Dữ liệu không hợp lệ", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        product = Product.objects.filter(ProductID=pk).first()
        if product:
            product.delete()
            return Response({"status": "Sản phẩm đã bị xóa"}, status=status.HTTP_200_OK)
        return Response({"error": "không tìm thấy sản phẩm"}, status=status.HTTP_404_NOT_FOUND)