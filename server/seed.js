const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ServiceProvider = require("./models/ServiceProvider");

dotenv.config();

const providers = [
  {
    businessName: "Moksha Funeral Services",
    serviceType: "funeral_agency",
    description: "Professional and dignified funeral services across Karnataka",
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43210",
    email: "moksha@funeralservices.com",
    pricing: { basePrice: 25000, pricingDetails: "Includes all arrangements" },
    availability: true,
    isVerified: true,
    rating: 4.8,
  },
  {
    businessName: "Shanti Ambulance Services",
    serviceType: "transportation",
    description: "24/7 respectful transportation services for last rites",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 11111",
    email: "shanti@ambulance.com",
    pricing: { basePrice: 5000, pricingDetails: "Within city limits" },
    availability: true,
    isVerified: true,
    rating: 4.5,
  },
  {
    businessName: "Pushpanjali Flowers",
    serviceType: "flowers",
    description: "Fresh flower arrangements and decorations for funeral ceremonies",
    location: "Delhi, NCR",
    phone: "+91 91234 56789",
    email: "pushpanjali@flowers.com",
    pricing: { basePrice: 3000, pricingDetails: "Full decoration included" },
    availability: true,
    isVerified: true,
    rating: 4.6,
  },
  {
    businessName: "Annapurna Catering",
    serviceType: "catering",
    description: "Sattvic food catering for post-funeral gatherings",
    location: "Chennai, Tamil Nadu",
    phone: "+91 94321 09876",
    email: "annapurna@catering.com",
    pricing: { basePrice: 8000, pricingDetails: "Per 50 people" },
    availability: true,
    isVerified: true,
    rating: 4.7,
  },
  {
    businessName: "Pandit Ramesh Sharma",
    serviceType: "priest",
    description: "Experienced pandit for Hindu last rites and rituals",
    location: "Varanasi, Uttar Pradesh",
    phone: "+91 99887 76655",
    email: "pandit.ramesh@gmail.com",
    pricing: { basePrice: 2100, pricingDetails: "Complete ritual package" },
    availability: true,
    isVerified: true,
    rating: 4.9,
  },
  {
    businessName: "Father Joseph Memorial Services",
    serviceType: "priest",
    description: "Christian funeral services and prayers",
    location: "Kochi, Kerala",
    phone: "+91 88776 55443",
    email: "father.joseph@church.com",
    pricing: { basePrice: 1500, pricingDetails: "Full service included" },
    availability: true,
    isVerified: true,
    rating: 4.8,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");

    await ServiceProvider.deleteMany({});
    console.log("Old providers deleted ✅");

    await ServiceProvider.insertMany(providers);
    console.log("6 Dummy providers added ✅");

    mongoose.connection.close();
    console.log("Done! Database seeded successfully 🎉");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedDB();
