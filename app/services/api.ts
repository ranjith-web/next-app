export async function apiRequest(
    endpoint: string,
    options: RequestInit = {}
): Promise<any> {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; // Base URL from .env
    const url = `${baseURL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        // Add additional headers like Authorization here
    };

    // Add auth token if available
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Merge default options with provided options
    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        // Check for HTTP errors
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
        }

        // Parse JSON response
        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}
