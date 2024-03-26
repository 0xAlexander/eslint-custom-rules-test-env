module.exports = {
    meta: {
      type: "problem",
      docs: {
        description: "Ensure .onSnapshot calls have error handling",
        category: "Best Practices",
        recommended: true,
      },
      fixable: "code",
    },
    create(context) {
      return {
        CallExpression(node) {
          if (node.callee.property && node.callee.property.name === "onSnapshot") {
            if (!hasValidErrorHandling(node.arguments)) {
              context.report({
                node,
                message: ".onSnapshot should have an error handling callback.",
              });
            }
          }
        },
      };
    },
  };
  
  function hasValidErrorHandling(argumentsArray) {
    // here we check for a second argument that is a function
    if (argumentsArray.length >= 2) {
      const errorHandlingArg = argumentsArray[1];
      return errorHandlingArg.type === "FunctionExpression" || errorHandlingArg.type === "ArrowFunctionExpression";
    }
    // here we can add more checks for other patterns that might come up over time
    
    return false; // so here we return false if no valid error handling is found
  }
  