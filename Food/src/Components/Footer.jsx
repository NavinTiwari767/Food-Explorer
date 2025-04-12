const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Food Explorer - Built with OpenFoodFacts API</p>
          <p className="mt-2 text-sm text-gray-400">
            This is a demo project for educational purposes
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;