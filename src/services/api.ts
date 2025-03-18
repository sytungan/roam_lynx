// Base API configuration
const API_BASE_URL = 'https://api.example.com';

// Define common request headers
const commonHeaders = {
  'Content-Type': 'application/json',
};

// Define request options by method
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// Build request with auth token if available
const buildRequest = async (
  method: RequestMethod,
  body?: unknown,
  additionalHeaders?: Record<string, string>
): Promise<RequestInit> => {
  // Get auth token from storage (example)
  const token = localStorage.getItem('auth_token');
  
  const headers: Record<string, string> = {
    ...commonHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(additionalHeaders || {}),
  };

  return {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
};

// Generic API request function
export const apiRequest = async <T>(
  endpoint: string,
  method: RequestMethod = 'GET',
  body?: unknown,
  additionalHeaders?: Record<string, string>
): Promise<T> => {
  try {
    const request = await buildRequest(method, body, additionalHeaders);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, request);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}; 