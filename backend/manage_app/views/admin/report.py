from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import HttpResponse
import csv
from ...permissions import IsAdminRole
from ...models import StockMovement, Product
from ...serializers import StockReportSerializer,ReportRevennueSerializer
from rest_framework.views import APIView
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill


class ReportViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def list(self, request, product_id, start_date, end_date):
        if not product_id or not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp product_id, start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        if product_id:
            product_name = Product.objects.filter(id=product_id).first()
            if not product_name:
                return Response({"error": "Product not found"}, status=404)
        data = {
            "product_id": product_id,
            "product_name": product_name.name,
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = StockReportSerializer(data,many=False)
        return Response(serializer.data)
    def export_report(self,request, product_id, start_date, end_date):
        if product_id:
            product_name = Product.objects.filter(id=product_id).first()
            if not product_name:
                return Response({"error": "Product not found"}, status=404)
        data = {
            "product_id": product_id,
            "product_name": product_name.name,
            "start_date": start_date,
            "end_date": end_date
        }
        
        serializer = StockReportSerializer(data)
        # Tạo workbook và sheet
        wb = Workbook()
        ws = wb.active
        ws.title = "Stock Report"

        # Header
        headers = ['Product ID', 'Product Name', 'Start Date', 'End Date', 
                'Beginning Inventory', 'Imports', 'Exports', 'Ending']
        header_font = Font(bold=True, color="FFFFFF")
        header_fill = PatternFill("solid", fgColor="4F81BD")

        for col_num, header in enumerate(headers, 1):
            cell = ws.cell(row=1, column=col_num, value=header)
            cell.font = header_font
            cell.fill = header_fill
            cell.alignment = Alignment(horizontal="center", vertical="center")

        # Dữ liệu
        row_data = [
            serializer.data['product_id'],
            serializer.data['product_name'],
            serializer.data['start_date'],
            serializer.data['end_date'],
            serializer.data['beginning_inventory'],
            serializer.data['imports'],
            serializer.data['exports'],
            serializer.data['ending'],
        ]
        for col_num, value in enumerate(row_data, 1):
            cell = ws.cell(row=2, column=col_num, value=value)
            if isinstance(value, int) or isinstance(value, float):
                cell.alignment = Alignment(horizontal="right")

        # Response
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={'Content-Disposition': f'attachment; filename=stock_report_{product_id}.xlsx'}
        )
        wb.save(response)
        return response

# báo cáo doanh thu
class ReportRevennueViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]
    def list(self, request, start_date, end_date):
        if not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = ReportRevennueSerializer(data)
        return Response(serializer.data)
    def export_report(self,request, start_date, end_date):
        data = {
            "start_date": start_date,
            "end_date": end_date
        }

        serializer = ReportRevennueSerializer(data)
        # Tạo workbook và sheet
        wb = Workbook()
        ws = wb.active
        ws.title = "Báo cáo doanh thu"

        # Header
        headers = ['Từ Ngày', 'Đến Ngày', 'Tổng Doanh Thu']
        header_font = Font(bold=True, color="FFFFFF")
        header_fill = PatternFill("solid", fgColor="4F81BD")

        for col_num, header in enumerate(headers, 1):
            cell = ws.cell(row=1, column=col_num, value=header)
            cell.font = header_font
            cell.fill = header_fill
            cell.alignment = Alignment(horizontal="center", vertical="center")

        # Dữ liệu
        row_data = [
            serializer.data['start_date'],
            serializer.data['end_date'],
            serializer.data['total_revenue'],
        ]
        for col_num, value in enumerate(row_data, 1):
            cell = ws.cell(row=2, column=col_num, value=value)
            if isinstance(value, int) or isinstance(value, float):
                cell.alignment = Alignment(horizontal="right")

        # Response
        response = HttpResponse(
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            headers={'Content-Disposition': f'attachment; filename=revenue_report.xlsx'}
        )
        wb.save(response)
        return response