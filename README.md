# 🚕 Kaali Peeli 

<div align="center">

![Mumbai Taxi](https://img.shields.io/badge/Mumbai-Taxi-yellow?style=for-the-badge&logo=car&logoColor=black)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

*Capturing the spirit of Mumbai's iconic black & yellow taxis* 🏙️

**🌐 [Live Demo on Vercel](https://kaali-peeli.vercel.app)!**

</div>

---

## 🌟 What is Kaali Peeli?

**Kaali Peeli** is more than just code – it's a digital tribute to Mumbai's legendary black and yellow taxis that have been weaving through the city's streets for decades. Just like these iconic cabs connect people across the bustling metropolis, this project aims to provide a common platform to all the Taxi Drivers and daily commuters :).





## ✨ Features

🎯 **Core Features**
- 🚀 Lightning-fast performance (faster than navigating Mumbai traffic!)
- 🎨 Clean, intuitive interface inspired by Mumbai's urban aesthetic
- 📱 Mobile-responsive design (works on every device, from flagging down taxis to booking rides)
- 🔒 Secure and reliable (has JWT authentication)

🌈 **Special Highlights**
- 🗺️ Real-time data processing
- 🎭 Interactive user experience
- 🌐 Cross-platform compatibility

## 🚀 Quick Start

### Prerequisites

Before you hop in, make sure you have:

```bash
# Example prerequisites (customize based on your project)
node.js >= 16.0.0
npm >= 8.0.0
git
```

### Installation

Get your Kaali Peeli up and running in 3 simple steps:

```bash
# 1. Clone the repository
git clone https://github.com/sayan922/Kaali_Peeli.git

#2. To Run the Server
cd Backend
npm i
npm run dev


# 3. To Run the Client
cd frontend
npm i 
npm run dev

#4. Create .env in Backend
PORT=4000
DB_CONNECT=your_db_connection_string
JWT_SECRET= user-video-secret
GOOGLE_MAPS_API=your_API_Key

#5 Create .env in frontend
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_API_Key

```

🎉 **Congratulations!** Your Kaali Peeli is now running at `http://localhost:5173`


## 🏗️ Project Structure

```
Kaali_Peeli/
├── frontend/
│   ├── 🚕 src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level components
│   │   ├── services/          # API calls and logic
│   │   ├── utils/             # Helper functions
│   │   └── assets/            # Static files (images, icons, etc.)
│   └── 📦 package.json        # Frontend dependencies
│
├── backend/
│   ├── controllers/           # Route controllers
│   ├── models/                # Database schemas
│   ├── routes/                # API route definitions
│   ├── services/              # Core logic (e.g., Twilio, Maps)
│   ├── socket.js              # Socket.IO configuration
│   └── 📦 package.json        # Backend dependencies
│
├── 📝 docs/                   # Documentation files
├── 🧪 tests/                  # Test cases
└── 🔧 config/                 # Configuration files (env, constants)
```


## 🛠️ Tech Stack

<div align="center">

![Tech Stack](https://skillicons.dev/icons?i=js,react,nodejs,express,mongodb,git)

</div>

| Frontend          | Backend           | Realtime     | Styling           |
|------------------|------------------|-------------|------------------|
| React.js         | Node.js + Express | Socket.IO   | Tailwind + GSAP  |



## 🤝 Contributing

We welcome contributions like Mumbai welcomes everyone! 

### How to Contribute:

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. 💻 **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔃 **Open** a Pull Request

### Contribution Guidelines:

- 📝 Write clear commit messages
- 🧪 Add tests for new features
- 📖 Update documentation
- 🎨 Follow our coding standards
- 💬 Be respectful in discussions

## 🐛 Bug Reports & Feature Requests

Found a bug? Have a cool idea? We'd love to hear from you!

- 🐛 **Bug Reports**: [Open an issue](https://github.com/sayan922/Kaali_Peeli/issues/new?template=bug_report.md)
- 💡 **Feature Requests**: [Request a feature](https://github.com/sayan922/Kaali_Peeli/issues/new?template=feature_request.md)



## 💝 Acknowledgments

- 🚕 **Mumbai Taxi Drivers** - The real heroes who inspired this project
- 🌟 **Contributors** - Everyone who helped make this project better
- 🏙️ **Mumbai** - The city that never sleeps, just like our servers

## 📞 Connect with Us

<div align="start">

[![GitHub](https://img.shields.io/badge/GitHub-sayan922-black?style=flat-square&logo=github)](https://github.com/sayan922)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/sayan-chakraborty-67a4b9249/)

</div>

---

<div align="start">


[![Star this repo](https://img.shields.io/github/stars/sayan922/Kaali_Peeli?style=social)](https://github.com/sayan922/Kaali_Peeli/stargazers)
[![Fork this repo](https://img.shields.io/github/forks/sayan922/Kaali_Peeli?style=social)](https://github.com/sayan922/Kaali_Peeli/network/members)

</div>