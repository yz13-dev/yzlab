// Re-export API functions to avoid Vercel monorepo issues
// Fallback to direct fetch calls if package import fails

// API functions using direct fetch calls for Vercel compatibility
const API_BASE_URL = "https://api.yzlab.ru";

export async function getRequests() {
  try {
    console.log('Fetching requests from:', `${API_BASE_URL}/requests`);
    const response = await fetch(`${API_BASE_URL}/requests`);
    console.log('Response status:', response.status);
    
    if (!response.ok) throw new Error('Failed to fetch requests');
    
    const result = await response.json();
    console.log('API response:', result);
    
    return result; // Return data array directly
  } catch (error) {
    console.error('Error fetching requests:', error);
    return []; // Return empty array instead of { data: null }
  }
}

export async function acceptRequest(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}/accept`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to accept request');
    return await response.json();
  } catch (error) {
    console.error('Error accepting request:', error);
    throw error;
  }
}

export async function rejectRequest(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/requests/${id}/reject`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to reject request');
    return await response.json();
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
}

export async function createRequest(data: {
  url: string;
  type: string;
  name?: string;
  description?: string;
  email?: string | null;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create request');
    return await response.json();
  } catch (error) {
    console.error('Error creating request:', error);
    throw error;
  }
} 