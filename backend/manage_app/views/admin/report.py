from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from ...permissions import IsAdminRole
from ...models import Product
from ...serializers import StockReportSerializer, ReportRevenueSerializer
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill

class ReportViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def list(self, request):
        product_id = request.query_params.get('product_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not product_id or not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp product_id, start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        product = Product.objects.filter(pk=product_id).first()
        if not product:
            return Response({"error": "Product not found"}, status=404)
        data = {
            "product_id": int(product_id),
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = StockReportSerializer(data)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def export_report(self, request):
        product_id = request.query_params.get('product_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not product_id or not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp product_id, start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        product = Product.objects.filter(pk=product_id).first()
        if not product:
            return Response({"error": "Product not found"}, status=404)
        data = {
            "product_id": int(product_id),
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

class ReportRevenueViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminRole]

    def list(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        data = {
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = ReportRevenueSerializer(data)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def export_report(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not start_date or not end_date:
            return Response({"error": "Vui lòng cung cấp start_date và end_date"}, status=status.HTTP_400_BAD_REQUEST)
        data = {
            "start_date": start_date,
            "end_date": end_date
        }
        serializer = ReportRevenueSerializer(data)
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
            headers={'Content-Disposition': 'attachment; filename=revenue_report.xlsx'}
        )
        wb.save(response)
        return response