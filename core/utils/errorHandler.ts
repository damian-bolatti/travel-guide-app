// utils/errorHandler.ts
export const handleHTTPError = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'Bad Request: The request was malformed or invalid.';
    case 401:
      return 'Unauthorized: You must log in to access this resource.';
    case 403:
      return 'Forbidden: You do not have permission to access this resource.';
    case 404:
      return 'Not Found: The resource you are looking for could not be found.';
    case 408:
      return 'Request Timeout: The server took too long to respond.';
    case 500:
      return 'Internal Server Error: Something went wrong on the server.';
    case 502:
      return 'Bad Gateway: The server is temporarily unavailable.';
    case 503:
      return 'Service Unavailable: The server is currently down for maintenance.';
    case 504:
      return 'Gateway Timeout: The server is taking too long to respond.';
    default:
      return `Unexpected error: ${statusCode}. Please try again later.`;
  }
};
