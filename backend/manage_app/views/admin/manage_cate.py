from rest_framework import viewsets, status
from rest_framework.response import Response
from ...permissions import IsAdminRole
from ...models import Category
from django.shortcuts import get_object_or_404

class CategoryViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def create(self, request):
        name = request.data.get('name')
        if not name:
            return Response({"error": "Tên danh mục là bắt buộc"}, status=status.HTTP_400_BAD_REQUEST)
        category = Category.objects.create(name=name)
        return Response({"id": category.id, "name": category.name}, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        name = request.data.get('name')
        if not name:
            return Response({"error": "Tên danh mục là bắt buộc"}, status=status.HTTP_400_BAD_REQUEST)
        category.name = name
        category.save()
        return Response({"id": category.id, "name": category.name}, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        return Response({"status": "Danh mục đã được xóa"}, status=status.HTTP_204_NO_CONTENT)