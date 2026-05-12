from django.shortcuts import render
from apps.products.models import Product

# Create your views here.
def home(request):
    products = Product.objects.all()
    return render(request, 'index.html', {'products': products})

def landing_page(request):
    product = Product.objects.filter(is_active=True).first()
    return render(request, 'landing.html', {'product': product})