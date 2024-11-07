// Function to report web vitals, which measures various performance metrics
const reportWebVitals = (onPerfEntry) => {
  // Check if a callback function is provided and that it is a valid function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each metric function with the provided callback to capture and report
      // Core Web Vitals metrics: CLS, FID, FCP, LCP, and TTFB
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

// Export the reportWebVitals function as the default export
export default reportWebVitals;
