from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.utils import timezone
from .models import Order
from apps.products.models import Product, ProductColor
from .utils import validate_phone

def create_order(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        address = request.POST.get('address')
        product_id = request.POST.get('product_id')
        color_id = request.POST.get('color')
        quantity = int(request.POST.get('quantity', 1))

        product = Product.objects.get(id=product_id)
        color = ProductColor.objects.get(id=color_id)

        # Phone validation
        try:
            validate_phone(phone)
        except:
            return HttpResponse("Invalid phone number")

        # Duplicate protection (5 min rule)
        recent = Order.objects.filter(phone=phone, product=product).order_by('-created_at').first()
        if recent:
            diff = timezone.now() - recent.created_at
            if diff.seconds < 300:
                return HttpResponse("Please wait before ordering again")

        # Stock check
        if color.quantity < quantity:
            return HttpResponse("Out of stock")

        # Amount calculation
        amount = product.price * quantity

        # Create order
        order = Order.objects.create(
            product=product,
            color=color,
            customer_name=name,
            phone=phone,
            address=address,
            quantity=quantity,
            amount=amount
        )

        # Reduce stock
        color.quantity -= quantity
        color.save()

        return redirect(f"/track/?id={order.tracking_id}")
    
def track_order(request):
    tracking_id = request.GET.get('id')
    order = None

    if tracking_id:
        order = Order.objects.filter(tracking_id=tracking_id).first()

    return render(request, 'track.html', {'order': order})