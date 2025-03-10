// Users Collection
db.users.insertMany([
    {
        _id: ObjectId("60a5f0c9e6b3f3001f3e5b01"),
        firstName: "John",
        email: "john.doe@example.com",
        passwordHash: "$2b$10$randomhashvalue123456", // Hashed password
        systemRoles: ["student", "freelancer"],
        accountStatus: "active",
        contactInfo: {
            phoneNumber: "+1-555-123-4567",
            address: {
                street: "123 Learning Lane",
                city: "Eduville",
                country: "United States",
                postalCode: "12345"
            }
        },
        institutions: [
            {
                institutionId: ObjectId("61b5f0c9e6b3f3001f3e5c01"),
                membershipRoles: ["student"],
                joinDate: new Date("2023-01-15"),
                status: "active"
            },
            {
                institutionId: ObjectId("61b5f0c9e6b3f3001f3e5c02"),
                membershipRoles: ["instructor"],
                joinDate: new Date("2023-06-01"),
                status: "active"
            }
        ],
        wallet: {
            balance: Decimal128.fromString("500.50"),
            transactions: [
                {
                    transactionId: ObjectId("62c5f0c9e6b3f3001f3e5d01"),
                    type: "course_purchase",
                    amount: Decimal128.fromString("-49.99"),
                    date: new Date("2023-07-15"),
                    status: "completed"
                }
            ]
        },
        preferences: {
            languagePreference: "en",
            notificationSettings: {
                email: true,
                sms: false,
                push: true
            }
        },
        registrationDate: new Date("2023-01-01")
    },
    {
        _id: ObjectId("60a5f0c9e6b3f3001f3e5b02"),
        firstName: "Emma",
        lastName: "Smith",
        email: "emma.smith@example.com",
        passwordHash: "$2b$10$randomhashvalue789012",
        systemRoles: ["instructor", "admin"],
        accountStatus: "active",
        contactInfo: {
            phoneNumber: "+1-555-987-6543",
            address: {
                street: "456 Education Street",
                city: "Learnington",
                country: "United States",
                postalCode: "67890"
            }
        },
        institutions: [
            {
                institutionId: ObjectId("61b5f0c9e6b3f3001f3e5c02"),
                membershipRoles: ["admin", "instructor"],
                joinDate: new Date("2022-09-01"),
                status: "active"
            }
        ],
        wallet: {
            balance: Decimal128.fromString("1250.75"),
            transactions: [
                {
                    transactionId: ObjectId("62c5f0c9e6b3f3001f3e5d02"),
                    type: "course_sale",
                    amount: Decimal128.fromString("199.99"),
                    date: new Date("2023-08-20"),
                    status: "completed"
                }
            ]
        },
        preferences: {
            languagePreference: "en",
            notificationSettings: {
                email: true,
                sms: true,
                push: false
            }
        },
        registrationDate: new Date("2022-08-15")
    }
]);

// Institutions Collection
db.institutions.insertMany([
    {
        _id: ObjectId("61b5f0c9e6b3f3001f3e5c01"),
        name: "Global Online Learning Platform",
        type: "online_platform",
        description: "Comprehensive online education provider",
        contactEmail: "info@globallearning.com",
        website: "https://www.globallearning.com",
        foundingDate: new Date("2020-01-01"),
        verificationStatus: "verified",
        members: [
            {
                userId: ObjectId("60a5f0c9e6b3f3001f3e5b01"),
                roles: ["student"],
                joinDate: new Date("2023-01-15"),
                status: "active"
            },
            {
                userId: ObjectId("60a5f0c9e6b3f3001f3e5b02"),
                roles: ["admin", "instructor"],
                joinDate: new Date("2022-09-01"),
                status: "active"
            }
        ],
        courses: [
            ObjectId("62c5f0c9e6b3f3001f3e5e01"),
            ObjectId("62c5f0c9e6b3f3001f3e5e02")
        ]
    },
    {
        _id: ObjectId("61b5f0c9e6b3f3001f3e5c02"),
        name: "Tech Innovation University",
        type: "university",
        description: "Leading technology and innovation education center",
        contactEmail: "contact@techinnovation.edu",
        website: "https://www.techinnovation.edu",
        foundingDate: new Date("2018-05-01"),
        verificationStatus: "verified",
        members: [
            {
                userId: ObjectId("60a5f0c9e6b3f3001f3e5b02"),
                roles: ["admin", "instructor"],
                joinDate: new Date("2022-09-01"),
                status: "active"
            }
        ],
        courses: [
            ObjectId("62c5f0c9e6b3f3001f3e5e03")
        ]
    }
]);

// Courses Collection
db.courses.insertMany([
    {
        _id: ObjectId("62c5f0c9e6b3f3001f3e5e01"),
        title: "Introduction to Web Development",
        description: "Learn the basics of web development with HTML, CSS, and JavaScript",
        creator: {
            type: "institution",
            id: ObjectId("61b5f0c9e6b3f3001f3e5c01")
        },
        courseType: "paid",
        price: Decimal128.fromString("49.99"),
        difficulty: "beginner",
        categories: ["web development", "programming"],
        modules: [
            {
                _id: ObjectId("63d5f0c9e6b3f3001f3e5f01"),
                title: "HTML Basics",
                content: "Introduction to HTML structure and elements",
                type: "video",
                duration: 45,
                order: 1
            },
            {
                _id: ObjectId("63d5f0c9e6b3f3001f3e5f02"),
                title: "CSS Styling",
                content: "Learn how to style web pages",
                type: "text",
                duration: 60,
                order: 2
            }
        ],
        enrollmentRules: {
            maxStudents: 1000,
            prerequisites: []
        },
        pricing: {
            basePrice: Decimal128.fromString("49.99"),
            discounts: [
                {
                    type: "early_bird",
                    percentage: 10
                }
            ]
        },
        instructors: [
            {
                userId: ObjectId("60a5f0c9e6b3f3001f3e5b02"),
                role: "primary"
            }
        ]
    },
    {
        _id: ObjectId("62c5f0c9e6b3f3001f3e5e02"),
        title: "Advanced Python Programming",
        description: "Deep dive into Python programming techniques and best practices",
        creator: {
            type: "user",
            id: ObjectId("60a5f0c9e6b3f3001f3e5b01")
        },
        courseType: "paid",
        price: Decimal128.fromString("99.99"),
        difficulty: "advanced",
        categories: ["programming", "python"],
        modules: [
            {
                _id: ObjectId("63d5f0c9e6b3f3001f3e5f03"),
                title: "Advanced Python Concepts",
                content: "Decorators, generators, and metaclasses",
                type: "video",
                duration: 90,
                order: 1
            }
        ],
        enrollmentRules: {
            maxStudents: 500,
            prerequisites: [ObjectId("62c5f0c9e6b3f3001f3e5e01")]
        },
        pricing: {
            basePrice: Decimal128.fromString("99.99"),
            discounts: []
        },
        instructors: [
            {
                userId: ObjectId("60a5f0c9e6b3f3001f3e5b01"),
                role: "primary"
            }
        ]
    }
]);

// Enrollments Collection
db.enrollments.insertMany([
    {
        _id: ObjectId("64d5f0c9e6b3f3001f3e5g01"),
        userId: ObjectId("60a5f0c9e6b3f3001f3e5b01"),
        courseId: ObjectId("62c5f0c9e6b3f3001f3e5e01"),
        enrollmentDate: new Date("2023-07-15"),
        status: "active",
        progress: [
            {
                moduleId: ObjectId("63d5f0c9e6b3f3001f3e5f01"),
                completed: true,
                completedDate: new Date("2023-07-20"),
                score: Decimal128.fromString("85.5")
            },
            {
                moduleId: ObjectId("63d5f0c9e6b3f3001f3e5f02"),
                completed: false,
                completedDate: null,
                score: Decimal128.fromString("0")
            }
        ],
        certificateEarned: false,
        finalGrade: Decimal128.fromString("0")
    }
]);

// Transactions Collection
db.transactions.insertMany([
    {
        _id: ObjectId("65d5f0c9e6b3f3001f3e5h01"),
        courseId: ObjectId("62c5f0c9e6b3f3001f3e5e01"),
        buyerId: ObjectId("60a5f0c9e6b3f3001f3e5b01"),
        sellerId: ObjectId("60a5f0c9e6b3f3001f3e5b02"),
        amount: Decimal128.fromString("49.99"),
        transactionDate: new Date("2023-07-15"),
        status: "completed",
        paymentMethod: "credit_card",
        receiptDetails: {
            invoiceNumber: "INV-2023-001",
            taxInfo: {
                taxRate: Decimal128.fromString("0.08"),
                taxAmount: Decimal128.fromString("4.00")
            }
        }
    }
]);

// Sample Queries to Verify Data
print("Users Count:", db.users.countDocuments());
print("Institutions Count:", db.institutions.countDocuments());
print("Courses Count:", db.courses.countDocuments());
print("Enrollments Count:", db.enrollments.countDocuments());
print("Transactions Count:", db.transactions.countDocuments());