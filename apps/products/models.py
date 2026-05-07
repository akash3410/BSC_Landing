from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def total_quantity(self):
        return sum(color.quantity for color in self.colors.all())

    def __str__(self):
        return self.name
    

class ProductColor(models.Model):
    product = models.ForeignKey(Product, related_name='colors', on_delete=models.CASCADE)

    title = models.CharField(max_length=50)  # Red, Blue
    color_code = models.CharField(max_length=10, blank=True)

    quantity = models.IntegerField(default=0)

    image = models.ImageField(upload_to='colors/', blank=True, null=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} - {self.title}"
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)

    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='products/')

    is_active = models.BooleanField(default=True)