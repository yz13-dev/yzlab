// Re-export API functions to avoid Vercel monorepo issues
// Fallback to direct fetch calls if package import fails

const API_BASE_URL = process.env.API_BASE_URL ?? "https://api.yzlab.ru";

// Try to import from package first, fallback to direct implementation
let getRequests: any;
let acceptRequest: any;
let rejectRequest: any;

try {
  const api = await import("@yzlab/api/requests");
  getRequests = api.getRequests;
  acceptRequest = api.acceptRequest;
  rejectRequest = api.rejectRequest;
} catch (error) {
  console.log("Using fallback API implementation");
  
  // Fallback implementation using direct fetch
  getRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      return await response.json();
    } catch (error) {
      console.error('Error fetching requests:', error);
      return { data: null };
    }
  };

  acceptRequest = async (id: string) => {
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
  };

  rejectRequest = async (id: string) => {
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
  };
}

export { getRequests, acceptRequest, rejectRequest }; 