from django.contrib import admin
from django.contrib import admin
from .models import Category, Product, ProductColor, ProductImage

# Register your models here.
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductColor)
admin.site.register(ProductImage)

class ProductColorInline(admin.TabularInline):
    model = ProductColor

class ProductImageInline(admin.TabularInline):
    model = ProductImage

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductColorInline, ProductImageInline]

admin.site.unregister(Product)
admin.site.register(Product, ProductAdmin)