```mermaid
graph TD
    A[User Visits Website] --> B{Has Account?}
    B -->|Yes| C[Login Page]
    B -->|No| D[Signup Page]
    
    D --> E[Enter User Details]
    E --> F[Select Role]
    F --> G[Create Account]
    G --> H[Email Verification]
    H --> C
    
    C --> I[Enter Credentials]
    I --> J{Valid Credentials?}
    J -->|No| K[Show Error Message]
    K --> I
    J -->|Yes| L{Role Check}
    
    L -->|Admin| M[Admin Dashboard]
    L -->|Supervisor| N[Supervisor Dashboard]
    L -->|Seller| O[Seller Dashboard]
    L -->|Customer| P[Customer Dashboard]
    
    subgraph Admin Dashboard
      M --> M1[View All Users]
      M --> M2[Manage Roles]
      M --> M3[View Factory Analytics]
      M --> M4[Manage Inventory]
      M --> M5[View All Orders]
      M --> M6[Financial Reports]
    end
    
    subgraph Supervisor Dashboard
      N --> N1[Production Overview]
      N --> N2[Manage Workers]
      N --> N3[Quality Control]
      N --> N4[Inventory Status]
      N --> N5[Production Schedule]
    end
    
    subgraph Seller Dashboard
      O --> O1[Customer Management]
      O --> O2[Product Catalog]
      O --> O3[Order Management]
      O --> O4[Sales Analytics]
      O --> O5[Commission Reports]
    end
    
    subgraph Customer Dashboard
      P --> P1[Browse Products]
      P --> P2[Shopping Cart]
      P --> P3[Order History]
      P --> P4[Track Orders]
      P --> P5[Payment Methods]
    end
    
    P1 --> Q[View Product Details]
    Q --> R[Add to Cart]
    R --> P2
    P2 --> S[Proceed to Checkout]
    S --> T[Review Order]
    T --> U[Select Payment Method]
    U --> V[Khalti Payment Gateway]
    V --> W{Payment Successful?}
    W -->|Yes| X[Generate Invoice]
    W -->|No| Y[Show Payment Error]
    Y --> U
    X --> Z[Order Confirmation]
    Z --> P4
    
    M4 --> AA[Add/Edit Products]
    M4 --> AB[Update Stock Levels]
    AB --> AC{Stock Below Threshold?}
    AC -->|Yes| AD[Generate Low Stock Alert]
    AD --> AE[Automated Reorder]
    
    O3 --> AF[View New Orders]
    AF --> AG[Process Orders]
    AG --> AH[Update Order Status]
    AH --> AI[Notify Customer]
    
    N4 --> AJ[View Inventory]
    AJ --> AK[Request Stock]
    AK --> AL[Notify Admin]

