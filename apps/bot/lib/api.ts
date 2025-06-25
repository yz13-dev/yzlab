// Re-export API functions to avoid Vercel monorepo issues
// Fallback to direct fetch calls if package import fails

// API functions using direct fetch calls for Vercel compatibility
const API_BASE_URL = "https://api.yzlab.ru";

export async function getRequests() {
  try {
    const response = await fetch(`${API_BASE_URL}/requests`);
    if (!response.ok) throw new Error('Failed to fetch requests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching requests:', error);
    return { data: null };
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