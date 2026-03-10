# Dunamis E-Commerce Platform - Entity Models Documentation

## Table of Contents

1. [Entity Relationship Overview](#entity-relationship-overview)
2. [Enumerations](#enumerations)
3. [Entity Models](#entity-models)
4. [Database Relationships](#database-relationships)
5. [Implementation Notes](#implementation-notes)

---

## Entity Relationship Overview

```
User (1) -------- (1) Cart
  |                    |
  |                    |
  | (1)          (Many)|
  |                    |
  |               CartItem (Many) -------- (1) Product
  |                                              |
  | (Many)                                       |
  |                                              |
Order                                            |
  |                                              |
  | (Many)                                       |
  |                                              |
OrderItem (Many) --------------------------------|
  |
  |
Payment (1)
```

**Key Relationships:**

- One User has One Cart
- One User has Many Orders
- One Cart has Many CartItems
- One Order has Many OrderItems
- One Product can be in Many CartItems and OrderItems
- One Order has One Payment

---

## Enumerations

### Role.java

```java
package com.dunamis.model;

public enum Role {
    USER,
    ADMIN
}
```

### OrderStatus.java

```java
package com.dunamis.model;

public enum OrderStatus {
    PENDING,        // Order created, awaiting payment
    PROCESSING,     // Payment confirmed, order being prepared
    SHIPPED,        // Order dispatched for delivery
    DELIVERED,      // Order successfully delivered
    CANCELLED       // Order cancelled by user or admin
}
```

### PaymentStatus.java

```java
package com.dunamis.model;

public enum PaymentStatus {
    PENDING,        // Payment initiated, awaiting confirmation
    COMPLETED,      // Payment successful
    FAILED,         // Payment failed
    REFUNDED        // Payment refunded
}
```

### PaymentMethod.java

```java
package com.dunamis.model;

public enum PaymentMethod {
    MPESA,
    CASH_ON_DELIVERY,
    BANK_TRANSFER
}
```

---

## Entity Models

### 1. User.java

**Purpose:** Represents both regular users and administrators of the platform.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_email", columnList = "email"),
    @Index(name = "idx_role", columnList = "role")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Column(name = "first_name", length = 50)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(name = "last_name", length = 50)
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(name = "phone_number", length = 20)
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
    private String phoneNumber;

    @Column(length = 255)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Column(name = "postal_code", length = 20)
    private String postalCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role = Role.USER;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    // Relationships

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    // Timestamps

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper methods

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public void addOrder(Order order) {
        orders.add(order);
        order.setUser(this);
    }

    public void removeOrder(Order order) {
        orders.remove(order);
        order.setUser(null);
    }
}
```

---

### 2. Product.java

**Purpose:** Represents products available for sale on the platform.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_category", columnList = "category"),
    @Index(name = "idx_brand", columnList = "brand"),
    @Index(name = "idx_name", columnList = "name")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    @NotBlank(message = "Product name is required")
    @Size(min = 3, max = 200, message = "Product name must be between 3 and 200 characters")
    private String name;

    @Column(length = 2000)
    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private BigDecimal price;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String brand;

    @Column(name = "stock_quantity", nullable = false)
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "additional_images", length = 2000)
    private String additionalImages; // Comma-separated URLs

    @Column(precision = 3, scale = 2)
    @DecimalMin(value = "0.0", message = "Rating cannot be negative")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    private Double rating = 0.0;

    @Column(name = "review_count")
    @Min(value = 0, message = "Review count cannot be negative")
    private Integer reviewCount = 0;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "discount_percentage", precision = 5, scale = 2)
    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    private BigDecimal discountPercentage = BigDecimal.ZERO;

    @Column(length = 50)
    private String sku; // Stock Keeping Unit

    @Column(precision = 10, scale = 2)
    private BigDecimal weight; // in kg

    @Column(length = 500)
    private String specifications; // JSON or comma-separated key-value pairs

    // Timestamps

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper methods

    public BigDecimal getDiscountedPrice() {
        if (discountPercentage.compareTo(BigDecimal.ZERO) > 0) {
            BigDecimal discount = price.multiply(discountPercentage).divide(BigDecimal.valueOf(100));
            return price.subtract(discount);
        }
        return price;
    }

    public boolean isInStock() {
        return stockQuantity > 0;
    }

    public void decreaseStock(int quantity) {
        if (quantity > stockQuantity) {
            throw new IllegalArgumentException("Insufficient stock available");
        }
        this.stockQuantity -= quantity;
    }

    public void increaseStock(int quantity) {
        this.stockQuantity += quantity;
    }
}
```

---

### 3. Cart.java

**Purpose:** Represents a user's shopping cart.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CartItem> items = new ArrayList<>();

    // Timestamps

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper methods

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        item.setCart(null);
    }

    public void clearCart() {
        items.clear();
    }

    public BigDecimal getTotalAmount() {
        return items.stream()
            .map(CartItem::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public int getTotalItems() {
        return items.stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
    }

    public CartItem findItemByProduct(Product product) {
        return items.stream()
            .filter(item -> item.getProduct().getId().equals(product.getId()))
            .findFirst()
            .orElse(null);
    }
}
```

---

### 4. CartItem.java

**Purpose:** Represents individual items within a shopping cart.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cart_items", indexes = {
    @Index(name = "idx_cart_product", columnList = "cart_id, product_id", unique = true)
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceAtAddition; // Store price when added to cart

    @CreationTimestamp
    @Column(name = "added_at", nullable = false, updatable = false)
    private LocalDateTime addedAt;

    // Helper methods

    public BigDecimal getSubtotal() {
        return priceAtAddition.multiply(BigDecimal.valueOf(quantity));
    }

    public void increaseQuantity(int amount) {
        this.quantity += amount;
    }

    public void decreaseQuantity(int amount) {
        if (this.quantity - amount < 1) {
            throw new IllegalArgumentException("Quantity cannot be less than 1");
        }
        this.quantity -= amount;
    }
}
```

---

### 5. Order.java

**Purpose:** Represents a customer order.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_order_number", columnList = "order_number", unique = true),
    @Index(name = "idx_created_at", columnList = "created_at")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", unique = true, nullable = false, length = 50)
    private String orderNumber; // e.g., ORD-2024-00001

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Payment payment;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    @Column(name = "subtotal", precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "tax_amount", precision = 10, scale = 2)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(name = "shipping_fee", precision = 10, scale = 2)
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 30)
    private PaymentMethod paymentMethod;

    // Shipping Information

    @Column(name = "shipping_first_name", length = 50)
    @NotBlank(message = "Shipping first name is required")
    private String shippingFirstName;

    @Column(name = "shipping_last_name", length = 50)
    @NotBlank(message = "Shipping last name is required")
    private String shippingLastName;

    @Column(name = "shipping_address", length = 255)
    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    @Column(name = "shipping_city", length = 100)
    @NotBlank(message = "Shipping city is required")
    private String shippingCity;

    @Column(name = "shipping_country", length = 100)
    private String shippingCountry;

    @Column(name = "shipping_postal_code", length = 20)
    private String shippingPostalCode;

    @Column(name = "shipping_phone", length = 20)
    @NotBlank(message = "Shipping phone is required")
    private String shippingPhone;

    @Column(name = "shipping_email", length = 100)
    private String shippingEmail;

    // Delivery Information

    @Column(name = "estimated_delivery_date")
    private LocalDateTime estimatedDeliveryDate;

    @Column(name = "actual_delivery_date")
    private LocalDateTime actualDeliveryDate;

    @Column(name = "tracking_number", length = 100)
    private String trackingNumber;

    // Additional Information

    @Column(name = "customer_notes", length = 500)
    private String customerNotes;

    @Column(name = "admin_notes", length = 500)
    private String adminNotes;

    // Timestamps

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    // Helper methods

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    public void removeOrderItem(OrderItem orderItem) {
        orderItems.remove(orderItem);
        orderItem.setOrder(null);
    }

    public void calculateTotalAmount() {
        this.subtotal = orderItems.stream()
            .map(OrderItem::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        this.totalAmount = subtotal
            .add(taxAmount)
            .add(shippingFee)
            .subtract(discountAmount);
    }

    public String getShippingFullName() {
        return shippingFirstName + " " + shippingLastName;
    }

    public String getFullShippingAddress() {
        return String.format("%s, %s, %s %s",
            shippingAddress, shippingCity, shippingCountry, shippingPostalCode);
    }

    public int getTotalItems() {
        return orderItems.stream()
            .mapToInt(OrderItem::getQuantity)
            .sum();
    }

    public boolean canBeCancelled() {
        return status == OrderStatus.PENDING || status == OrderStatus.PROCESSING;
    }

    public void markAsCancelled() {
        this.status = OrderStatus.CANCELLED;
        this.cancelledAt = LocalDateTime.now();
    }
}
```

---

### 6. OrderItem.java

**Purpose:** Represents individual items within an order.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items", indexes = {
    @Index(name = "idx_order_id", columnList = "order_id"),
    @Index(name = "idx_product_id", columnList = "product_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName; // Store name at time of order

    @Column(name = "product_image_url", length = 500)
    private String productImageUrl; // Store image URL at time of order

    @Column(nullable = false)
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Price is required")
    private BigDecimal price; // Price at time of order

    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    // Helper methods

    public BigDecimal getSubtotal() {
        BigDecimal itemTotal = price.multiply(BigDecimal.valueOf(quantity));
        return itemTotal.subtract(discountAmount);
    }

    public BigDecimal getTotalBeforeDiscount() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
```

---

### 7. Payment.java

**Purpose:** Represents payment information for an order.

```java
package com.dunamis.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_transaction_id", columnList = "transaction_id", unique = true),
    @Index(name = "idx_order_id", columnList = "order_id", unique = true),
    @Index(name = "idx_status", columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Column(name = "transaction_id", unique = true, length = 100)
    private String transactionId; // e.g., M-Pesa transaction ID

    @Column(name = "checkout_request_id", length = 100)
    private String checkoutRequestId; // M-Pesa STK Push request ID

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Amount is required")
    private BigDecimal amount;

    @Column(length = 20)
    private String currency = "KES"; // Kenyan Shilling

    // M-Pesa specific fields

    @Column(name = "mpesa_receipt_number", length = 50)
    private String mpesaReceiptNumber;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber; // Phone number used for payment

    @Column(name = "account_reference", length = 50)
    private String accountReference;

    // Payment timestamps

    @Column(name = "initiated_at")
    private LocalDateTime initiatedAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "failed_at")
    private LocalDateTime failedAt;

    // Additional information

    @Column(name = "failure_reason", length = 500)
    private String failureReason;

    @Column(name = "callback_response", length = 2000)
    private String callbackResponse; // Store raw M-Pesa callback JSON

    // Timestamps

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper methods

    public void markAsCompleted(String transactionId, String receiptNumber) {
        this.status = PaymentStatus.COMPLETED;
        this.transactionId = transactionId;
        this.mpesaReceiptNumber = receiptNumber;
        this.completedAt = LocalDateTime.now();
    }

    public void markAsFailed(String reason) {
        this.status = PaymentStatus.FAILED;
        this.failureReason = reason;
        this.failedAt = LocalDateTime.now();
    }

    public boolean isCompleted() {
        return status == PaymentStatus.COMPLETED;
    }

    public boolean isPending() {
        return status == PaymentStatus.PENDING;
    }
}
```

---

## Database Relationships

### One-to-One Relationships

1. **User ↔ Cart**

   ```java
   // In User.java
   @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
   private Cart cart;

   // In Cart.java
   @OneToOne
   @JoinColumn(name = "user_id", nullable = false, unique = true)
   private User user;
   ```

2. **Order ↔ Payment**

   ```java
   // In Order.java
   @OneToOne(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
   private Payment payment;

   // In Payment.java
   @OneToOne
   @JoinColumn(name = "order_id", nullable = false, unique = true)
   private Order order;
   ```

### One-to-Many Relationships

1. **User → Orders**

   ```java
   // In User.java (One side)
   @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<Order> orders = new ArrayList<>();

   // In Order.java (Many side)
   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   private User user;
   ```

2. **Cart → CartItems**

   ```java
   // In Cart.java (One side)
   @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<CartItem> items = new ArrayList<>();

   // In CartItem.java (Many side)
   @ManyToOne
   @JoinColumn(name = "cart_id", nullable = false)
   private Cart cart;
   ```

3. **Order → OrderItems**

   ```java
   // In Order.java (One side)
   @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
   private List<OrderItem> orderItems = new ArrayList<>();

   // In OrderItem.java (Many side)
   @ManyToOne
   @JoinColumn(name = "order_id", nullable = false)
   private Order order;
   ```

### Many-to-One Relationships

1. **CartItem → Product**

   ```java
   // In CartItem.java
   @ManyToOne
   @JoinColumn(name = "product_id", nullable = false)
   private Product product;
   ```

2. **OrderItem → Product**
   ```java
   // In OrderItem.java
   @ManyToOne
   @JoinColumn(name = "product_id", nullable = false)
   private Product product;
   ```

---

## Implementation Notes

### 1. Required Dependencies

Add these to your `pom.xml`:

```xml
<dependencies>
    <!-- JPA & Hibernate -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>

    <!-- Database Driver (choose one) -->
    <!-- PostgreSQL -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- OR MySQL -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

### 2. Application Properties Configuration

**For PostgreSQL:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/dunamis_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
```

**For MySQL:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dunamis_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

### 3. Cascade Types Explained

- **CascadeType.ALL**: All operations (persist, merge, remove, refresh, detach) cascade to related entities
- **CascadeType.PERSIST**: Only persist operations cascade
- **CascadeType.MERGE**: Only merge operations cascade
- **CascadeType.REMOVE**: Only remove operations cascade
- **orphanRemoval = true**: Automatically delete child entities when removed from parent collection

### 4. Fetch Types

- **FetchType.LAZY**: Data is loaded on demand (better performance for large datasets)
- **FetchType.EAGER**: Data is loaded immediately with parent entity

**Best Practice:** Use LAZY fetching by default and EAGER only when necessary.

### 5. Indexing Strategy

Indexes are created on:

- Foreign keys (user_id, order_id, product_id)
- Frequently queried columns (email, status, category)
- Unique constraints (order_number, transaction_id)

### 6. Important Helper Methods

Each entity includes helper methods for:

- Bidirectional relationship management
- Calculations (totals, subtotals)
- Business logic validation
- Data formatting

### 7. Timestamps

All entities use:

- `@CreationTimestamp`: Automatically set on entity creation
- `@UpdateTimestamp`: Automatically update on entity modification

### 8. Validation

Entities use Jakarta Validation annotations:

- `@NotNull`: Field cannot be null
- `@NotBlank`: String cannot be null or empty
- `@Email`: Must be valid email format
- `@Min/@Max`: Numeric range validation
- `@Size`: String/collection size validation
- `@Pattern`: Regex pattern matching

### 9. Database Schema Creation

When you run your Spring Boot application with `spring.jpa.hibernate.ddl-auto=update`, Hibernate will:

1. Create all tables if they don't exist
2. Add new columns if entity structure changes
3. Create indexes and constraints
4. Establish foreign key relationships

**Warning:** For production, use `ddl-auto=validate` or manage schema with Flyway/Liquibase.

### 10. Order Number Generation

Implement in your OrderService:

```java
public String generateOrderNumber() {
    String year = String.valueOf(LocalDateTime.now().getYear());
    long count = orderRepository.count() + 1;
    return String.format("ORD-%s-%05d", year, count);
}
```

### 11. Password Storage

**Never store plain text passwords!** In your User entity, the password should be hashed:

```java
// In your AuthService
@Autowired
private PasswordEncoder passwordEncoder;

public User createUser(SignupRequest request) {
    User user = new User();
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    // ... set other fields
    return userRepository.save(user);
}
```

### 12. Cart Auto-Creation

When a user registers, automatically create their cart:

```java
// In your AuthService
public User registerUser(SignupRequest request) {
    User user = new User();
    // ... set user fields

    Cart cart = new Cart();
    cart.setUser(user);
    user.setCart(cart);

    return userRepository.save(user); // Cart is saved due to cascade
}
```

---

## Database ER Diagram

```
┌─────────────────┐
│     USER        │
├─────────────────┤
│ id (PK)         │
│ email           │
│ password        │
│ firstName       │
│ lastName        │
│ phoneNumber     │
│ address         │
│ role            │
└────────┬────────┘
         │ 1
         │
         │ 1
┌────────▼────────┐          ┌─────────────────┐
│     CART        │          │     ORDER       │
├─────────────────┤          ├─────────────────┤
│ id (PK)         │          │ id (PK)         │
│ user_id (FK)    │          │ user_id (FK)    │
└────────┬────────┘          │ orderNumber     │
         │ 1                 │ totalAmount     │
         │                   │ status          │
         │ *                 │ paymentStatus   │
┌────────▼────────┐          └────────┬────────┘
│   CART_ITEM     │                   │ 1
├─────────────────┤                   │
│ id (PK)         │                   │ *
│ cart_id (FK)    │          ┌────────▼────────┐
│ product_id (FK) │◄─────────┤   ORDER_ITEM    │
│ quantity        │          ├─────────────────┤
│ priceAtAddition │          │ id (PK)         │
└─────────────────┘          │ order_id (FK)   │
                             │ product_id (FK) │
┌─────────────────┐          │ quantity        │
│    PRODUCT      │          │ price           │
├─────────────────┤          └─────────────────┘
│ id (PK)         │◄─────────────────┘
│ name            │
│ description     │          ┌─────────────────┐
│ price           │          │    PAYMENT      │
│ category        │          ├─────────────────┤
│ stockQuantity   │          │ id (PK)         │
│ imageUrl        │          │ order_id (FK)   │
└─────────────────┘          │ transactionId   │
                             │ paymentMethod   │
                             │ status          │
                             │ amount          │
                             └─────────────────┘
```

---

## Next Steps

1. **Copy all entity files** into your `src/main/java/com/dunamis/model/` package
2. **Copy all enum files** into the same package
3. **Configure database connection** in `application.properties`
4. **Run the application** - Hibernate will create all tables automatically
5. **Create repositories** for each entity (next step in implementation)
6. **Test entity relationships** with sample data

---

## Testing Entities

Create a simple test to verify your entities work correctly:

```java
@SpringBootTest
public class EntityTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testCreateUserWithCart() {
        User user = new User();
        user.setEmail("test@dunamis.com");
        user.setPassword("password123");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setRole(Role.USER);

        Cart cart = new Cart();
        cart.setUser(user);
        user.setCart(cart);

        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertNotNull(savedUser.getCart());
        assertEquals("test@dunamis.com", savedUser.getEmail());
    }
}
```

---

## Summary

This document provides all entity models needed for the Dunamis e-commerce platform with:

✅ **7 Complete Entity Classes** (User, Product, Cart, CartItem, Order, OrderItem, Payment)  
✅ **4 Enumerations** (Role, OrderStatus, PaymentStatus, PaymentMethod)  
✅ **Complete JPA Relationships** (One-to-One, One-to-Many, Many-to-One)  
✅ **Validation Annotations** for data integrity  
✅ **Helper Methods** for business logic  
✅ **Proper Indexing** for query performance  
✅ **Timestamp Tracking** with auto-generation  
✅ **Comprehensive Documentation** and implementation notes

---

**© 2024 Dunamis E-Commerce Platform**  
_Empowered by Technology_