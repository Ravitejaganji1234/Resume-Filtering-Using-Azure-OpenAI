# AI Resume Filtering System using Azure OpenAI

## 📌 Overview

The **AI Resume Filtering System** is a full-stack application that automatically filters and evaluates resumes based on a given job description.
It uses **Azure OpenAI (GPT models)** to intelligently analyze resumes and determine their relevance for a specific role.

This project demonstrates real-world usage of **LLMs in recruitment automation**, combining frontend, backend, and containerized deployment.

---

## 🧠 Key Features

* AI-based resume matching using job descriptions
* Supports multiple resumes
* Intelligent skill and experience analysis
* Full-stack architecture (Frontend + Backend)
* Dockerized for easy deployment
* Powered by **Azure OpenAI**

---

## 🏗️ Architecture

```
Frontend (React)
        |
        |  REST API
        |
Backend (Spring Boot)
        |
        |
Azure OpenAI (GPT Model)
```

---

## 📂 Project Structure

```
Resume-filtering-system-Azure-OpenAI/
│
├── resume-ai-frontend/        # React frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── demo.html
│   └── package.json
│
├── resume-ai-backend/         # Spring Boot backend
│   ├── src/
│   ├── data/
│   ├── Dockerfile
│   ├── pom.xml
│   └── mvnw
│
├── resume-compose.yml         # Docker Compose file
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript
* Docker

### Backend

* Java
* Spring Boot
* REST APIs
* Azure OpenAI SDK
* Docker

### AI

* Azure OpenAI (GPT models)
* Prompt-based resume analysis

---

## ⚙️ How It Works

1. User enters a **Job Description**
2. User uploads one or more **Resumes**
3. Backend sends resume content + job description to **Azure OpenAI**
4. AI evaluates:

   * Skill match
   * Experience relevance
   * Job alignment
5. Results are returned to the frontend for display

---

## 🔐 Environment Configuration

Set the following environment variables (recommended via Docker or `.env`):

```
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=your_endpoint
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

---

## ▶️ Running the Application (Docker)

From the project root:

```bash
docker-compose -f resume-compose.yml up --build
```

Then access:

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend:** [http://localhost:8080](http://localhost:8080)

---

## 🧪 Running Without Docker

### Backend

```bash
cd resume-ai-backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd resume-ai-frontend
npm install
npm start
```

---

## 📈 Future Enhancements

* Resume scoring and ranking system
* PDF/DOCX parsing improvements
* Authentication for recruiters
* Database integration
* Admin dashboard
* Deployment to Azure Cloud

---

## 🎯 Why This Project Matters

Recruiters spend significant time manually screening resumes.
This project demonstrates how **Generative AI can automate hiring workflows**, reduce bias, and improve efficiency.

It highlights skills in:

* Full-stack development
* Azure OpenAI integration
* Docker & deployment
* Real-world AI application design

---

## 👤 Author

**Ravi Teja**
Cloud & DevOps Engineer

🔗 LinkedIn: www.linkedin.com/in/raviteja-ganji
