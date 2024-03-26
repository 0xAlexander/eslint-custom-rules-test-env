module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Ensure async functions are wrapped in try-catch blocks",
        category: "Best Practices",
        recommended: true,
      },
      fixable: "code",
    },
    create(context) {
      return {
        // here we start by checking both function declarations and arrow functions
        ":function"(node) {
          // and we only proceed if the function is async
          if (node.async) {
            // then we ensure the node.body exists and contains statements
            if (!node.body || !node.body.body || node.body.body.length === 0) {
              context.report({
                node,
                message: "Async function's body is empty or malformed.",
              });
              return;
            }
            
            // and here we check if the try-catch block directly wraps the async function's logic
            if (!hasDirectTryCatch(node.body)) {
              context.report({
                node,
                message: "Async function must be wrapped in a try-catch block.",
              });
            }
          }
        },
      };
    },
  };
  
  function hasDirectTryCatch(body) {
    // failsafe to check for a TryStatement directly within the function's top level body
    return body.body.some(node => node.type === "TryStatement");
  }
  