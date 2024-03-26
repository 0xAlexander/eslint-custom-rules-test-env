/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
const mockService = {
  onSnapshot: (
    dataHandler: () => void,
    errorHandler?: (error: any) => void
  ) => {
    // Implementation is intentionally blank for test purposes
  },
};

// this should trigger the async-function-try-catch rule where the body is empty
async function fetchDataWithoutTryCatch() {
  // this is a simulated fetch operation
}

// this should also trigger the async-function-try-catch rule where the body is not empty but not wrapped in try catch
async function fetchDataWithAsyncOperationButNoTryCatch() {
  console.log("Starting fetch operation without try-catch");
  // simulated fetch operation
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log("Fetched data:", data);
}

// this should not trigger the async-function-try-catch rule
async function fetchDataWithTryCatch() {
  try {
    // simulated fetch operation
  } catch (error: any) {
    // Providing a type for the error parameter
    console.error(error);
  }
}

// this should trigger the on-snapshot-error-handling rule
mockService.onSnapshot(() => {
  // data handling from lidl
});

// this should not trigger the on-snapshot-error-handling rule
mockService.onSnapshot(
  () => {
    // data handling from lidl
  },
  (error: any) => {
    console.error(error);
  }
);
/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
// it should be notted that this boi is junior, all i want is to help 😭
