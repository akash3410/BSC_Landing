from django.shortcuts import render
from apps.products.models import Product

# Create your views here.
def landing_page(request):
    product = Product.objects.filter(is_active=True).first()
    return render(request, 'landing.html', {'product': product})
