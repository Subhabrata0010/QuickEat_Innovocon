# **🍽️ QuickEat – Smart Canteen Management System**  

🚀 **Effortless dining experience with AI-powered table allotment!**  

## **📌 Overview**  
QuickEat is an AI-driven canteen management system designed to eliminate overcrowding and long waiting times during peak lunch hours. It enables students to **pre-order meals**, **get automated table allocations**, and **receive live menu updates**, ensuring a seamless dining experience.  

## **🛠️ Tech Stack**  
### **Backend**  
- 🟠 **AWS REST API** – Handling HTTP requests  
- 🔵 **AWS WebSockets API** – Real-time updates  
- 🟢 **AWS Lambda** – Serverless backend execution  
- 🟣 **Flask** – Lightweight Python backend framework  
- 🟡 **DynamoDB** – NoSQL database for scalability  
- 🔴 **Python** – Core backend logic  

### **Frontend**  
- 🔵 **React** – Dynamic and responsive UI  
- 🟣 **Redux** – State management  

### **Additional Technologies**  
- ⚡ **MERN Stack** – Extending the backend capabilities  
- ☁️ **GCP** – Cloud services integration  
- 📊 **Jupyter Lab** – AI/ML model training and data analysis  

---

## **📌 Features**  
✅ **AI-based Table Allocation** – Smart seating arrangement based on group size and real-time availability.  
✅ **Pre-Order & Live Menu Updates** – Canteen staff can update food availability in real time.  
✅ **Queue Management System** – Students without seats are automatically assigned once vacancies arise.  
✅ **Time Extension for Reorders** – If students want more food, they can extend their seating duration.  
✅ **Student Profile Authentication** – Ensuring authentic table allocations.  

---

## **📌 How It Works?**  
1️⃣ **Students order food online** via QuickEat.  
2️⃣ **AI allocates tables and dining time** based on group size and availability.  
3️⃣ **Live menu updates** keep students informed about food availability.  
4️⃣ **Queue management ensures fair seating** if tables are full.  
5️⃣ **Students can extend time** by reordering.  

📌 *Everything happens in real-time using AWS WebSockets API!*  

---

## **📌 Installation & Setup**  

### **🔧 Backend Setup**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/QuickEat.git
   cd QuickEat
   ```  
2. Install Python dependencies:  
   ```bash
   pip install -r backend/requirements.txt
   ```  
3. Set up AWS credentials for Lambda & DynamoDB.  
4. Run Flask backend:  
   ```bash
   python backend/app.py
   ```  

### **🌐 Frontend Setup**  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the React development server:  
   ```bash
   npm start
   ```  

---

## **📌 API Endpoints**  

### **🔹 Authentication**  
- `POST /login` – Authenticate user  
- `POST /register` – Register a new user  

### **🔹 Orders & Table Management**  
- `GET /menu` – Fetch the live menu  
- `POST /order` – Place a food order  
- `GET /queue-status` – Check the student’s queue position  
- `PATCH /extend-time` – Extend table duration  

*(Full API documentation available in `docs/api.md`)*  

---

## **📌 Contribution Guide**  
We welcome contributions! Please follow these steps:  
1. Fork the repository 📌  
2. Create a new feature branch: `git checkout -b feature-name` ✨  
3. Commit your changes: `git commit -m "Added new feature"` ✅  
4. Push the branch: `git push origin feature-name` 🚀  
5. Submit a Pull Request 🔥  

---

## **📌 License**  
This project is licensed under the **MIT License**.  

🔗 **[Contributors](https://github.com/Subhabrata0010/QuickEat/graphs/contributors)**
