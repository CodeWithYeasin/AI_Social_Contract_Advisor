# AI Social Contract Advisor

An AI-powered web application designed to analyze social contracts, classify clauses, detect potential risks, and provide translations to facilitate better understanding for users in Bangladesh. Built with a Django backend and Next.js frontend, this tool leverages advanced AI models for accurate contract analysis.

## Features

- **Contract Upload**: Support for PDF and image file uploads.
- **Text Extraction**: Automatic text extraction from uploaded files using OCR technology.
- **Clause Classification**: AI-driven classification of contract clauses using Google's Gemini model.
- **Risk Detection**: Intelligent risk level assessment (Low, Medium, High) based on contract content.
- **Translation Support**: Automatic translation of analysis results to Bengali for local accessibility.
- **User Authentication**: Secure user management with Django's authentication system.
- **Responsive UI**: Modern, responsive frontend built with Next.js and Tailwind CSS.
- **RESTful API**: Backend API for seamless integration and data handling.

## Tech Stack

### Backend
- **Django**: Web framework for building the API.
- **Django REST Framework**: For creating RESTful APIs.
- **Google Gemini API**: For clause classification.
- **Tesseract OCR**: For text extraction from images and PDFs.
- **Pillow**: Image processing library.
- **PyMuPDF**: PDF text extraction.
- **PostgreSQL**: Database (via psycopg2-binary).

### Frontend
- **Next.js**: React framework for server-side rendering and routing.
- **React**: UI library.
- **TypeScript**: Type-safe JavaScript.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Accessible UI components.
- **Axios**: HTTP client for API requests.

## Installation

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL (or SQLite for development)
- Git

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-social-contract-advisor.git
   cd ai-social-contract-advisor
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up the database:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

7. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in your API keys (e.g., Gemini API key).

8. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

## Usage

1. **Sign Up/Login**: Create an account or log in to access the application.
2. **Upload Contract**: Navigate to the upload page and select a PDF or image file containing the contract.
3. **Analyze**: The system will extract text, classify clauses, detect risks, and provide translations.
4. **View Results**: Review the analysis on the results page, including risk levels and translated summaries.
5. **Chat/Consult**: Use the chat feature for additional advice or clarifications.

## API Endpoints

- `POST /api/contract-analysis/`: Upload and analyze a contract file.
  - Requires authentication.
  - Accepts multipart/form-data with `file` field.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini for AI classification.
- Tesseract OCR for text extraction.
- Open-source community for the libraries and frameworks used.

## Contact

For questions or support, please contact [your-email@example.com] or open an issue on GitHub.