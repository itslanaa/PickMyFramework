# Fuzzy MADM Framework Analyzer

A sophisticated web application that analyzes and ranks web development frameworks using Fuzzy Multi-Attribute Decision Making (MADM) methodology with real GitHub data.

![Framework Analysis Dashboard](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🎯 About

The Fuzzy MADM Framework Analyzer is a research-grade tool that applies advanced decision-making algorithms to evaluate and rank web development frameworks. By leveraging GitHub's extensive repository data and fuzzy logic principles, it provides objective, data-driven insights for framework selection decisions.

### Key Methodology

- **Fuzzy Logic**: Handles uncertainty and imprecision in decision-making
- **Multi-Attribute Decision Making (MADM)**: Evaluates frameworks across multiple criteria
- **Triangular Fuzzy Numbers**: Represents linguistic variables with mathematical precision
- **Real-time Data**: Fetches live statistics from GitHub API

## ✨ Features

### 🔍 Comprehensive Analysis
- **Multi-criteria Evaluation**: Analyzes frameworks based on popularity, community support, maintenance activity, and maturity
- **Fuzzy Logic Processing**: Converts crisp values to fuzzy numbers for uncertainty handling
- **Intelligent Filtering**: Automatically identifies and filters web development frameworks
- **Real-time Data**: Fetches current GitHub statistics including stars, forks, issues, and update frequency

### 📊 Advanced Visualizations
- **Interactive Charts**: Bar charts, radar plots, and pie charts for comprehensive data visualization
- **Ranking Tables**: Sortable and paginated results with detailed metrics
- **Progress Tracking**: Real-time analysis progress with detailed status updates
- **Responsive Design**: Optimized for desktop and mobile viewing

### 📈 Export & Reporting
- **PDF Export**: Generate professional reports with charts and detailed rankings
- **Comprehensive Reports**: Include executive summaries, key insights, and detailed analysis
- **Chart Integration**: Embed high-quality visualizations in exported documents

### 🔧 Technical Features
- **GitHub API Integration**: Secure API key management with rate limit monitoring
- **Performance Optimized**: Efficient data processing and caching
- **Error Handling**: Robust error management and user feedback
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🚀 Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- GitHub Personal Access Token

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/itslanaa/PickMyFramework.git
   cd PickMyFramework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### GitHub API Setup

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following scopes:
   - `public_repo` (for accessing public repository data)
4. Copy the generated token
5. Enter the token in the application when prompted

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist` directory.

## 🎮 Usage

### Basic Workflow

1. **Enter GitHub API Key**: Provide your GitHub personal access token for enhanced rate limits
2. **Automatic Analysis**: The system automatically searches and filters web development frameworks
3. **View Results**: Explore rankings, charts, and detailed metrics
4. **Export Reports**: Generate PDF reports for documentation and sharing

### Analysis Criteria

The application evaluates frameworks based on four key attributes:

- **Popularity** (Weight: 0.2-0.4): GitHub stars and general adoption
- **Community** (Weight: 0.15-0.35): Forks, watchers, and community engagement
- **Maintenance** (Weight: 0.25-0.45): Recent updates and active development
- **Maturity** (Weight: 0.1-0.3): Project age and stability indicators

### Fuzzy Logic Implementation

The system uses triangular fuzzy numbers with five linguistic levels:
- **Excellent**: (0.7, 1.0, 1.0)
- **Good**: (0.5, 0.7, 0.9)
- **Fair**: (0.3, 0.5, 0.7)
- **Poor**: (0.1, 0.3, 0.5)
- **Very Poor**: (0.0, 0.0, 0.3)

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with enhanced IDE support
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server

### Data Visualization
- **Chart.js**: Powerful charting library for interactive visualizations
- **React Chart.js 2**: React wrapper for Chart.js integration

### Export & Reporting
- **jsPDF**: Client-side PDF generation
- **html2canvas**: HTML to canvas conversion for chart embedding

### Icons & UI
- **Lucide React**: Beautiful, customizable SVG icons
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 📊 API Reference

### GitHub API Integration

The application uses the GitHub REST API v3 with the following endpoints:

- `GET /search/repositories`: Search for repositories with specific criteria
- `GET /repos/{owner}/{repo}`: Get detailed repository information

### Rate Limits

- **Without Authentication**: 60 requests per hour
- **With Personal Access Token**: 5,000 requests per hour

## 🤝 Contributing

We welcome contributions to improve the Fuzzy MADM Framework Analyzer! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain consistent formatting with Prettier
- Write meaningful commit messages

### Areas for Contribution

- Additional fuzzy logic algorithms
- New visualization types
- Enhanced export formats
- Performance optimizations
- Accessibility improvements

## 📝 Research & Academic Use

This tool is designed for academic research and can be cited in scientific papers. The implementation follows established fuzzy MADM methodologies and can be used for:

- Framework comparison studies
- Decision support system research
- Fuzzy logic applications in software engineering
- Multi-criteria decision analysis

### Citation

If you use this tool in your research, please cite:

```
Kaka Maulana Abdillah. (2025). A web-based tool for multi-attribute 
decision making in framework selection using fuzzy logic and GitHub data.
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Kaka Maulana Abdillah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🔗 Links

- **Live Demo**: [https://beautiful-paprenjak-6ab44a.netlify.app/](https://beautiful-paprenjak-6ab44a.netlify.app)
- **Documentation**: [https://github.com/itslanaa/PickMyFramework/wiki](https://github.com/itslanaa/PickMyFramework/wiki)
- **Issues**:
[https://github.com/itslanaa/PickMyFramework/issues](https://github.com/itslanaa/PickMyFramework/issues)
- **Discussions**: [https://github.com/itslanaa/PickMyFramework/discussions](https://github.com/itslanaa/PickMyFramework/discussions)

## 🙏 Acknowledgments

- GitHub API for providing comprehensive repository data
- Chart.js community for excellent visualization tools
- React and TypeScript teams for robust development frameworks
- Fuzzy logic research community for theoretical foundations

## 📞 Support

For support, questions, or feature requests:

- 📧 Email: support@fuzzy-madm-analyzer.com
- 💬 GitHub Discussions: [Start a discussion](https://github.com/itslanaa/PickMyFramework/discussions)
- 🐛 Bug Reports: [Create an issue](https://github.com/itslanaa/PickMyFramework/issues)

---

<div align="center">
  <strong>Built with ❤️ for the developer community</strong>
  <br>
  <sub>Making framework selection decisions easier with data-driven insights</sub>
</div>
