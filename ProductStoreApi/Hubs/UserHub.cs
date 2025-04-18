using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Concurrent;
using System.Linq;

namespace ProductStoreApi.Hubs
{
    [Authorize(Roles = "Admin")]
    public class UserHub : Hub
    {
        private static ConcurrentDictionary<string, string> connectedUsers = new();

        public override Task OnConnectedAsync()
        {
            var username = Context.User?.Identity?.Name ?? "Unknown";
            connectedUsers.TryAdd(Context.ConnectionId, username);

            Clients.All.SendAsync("UsersUpdated", connectedUsers.Values.Distinct());

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            connectedUsers.TryRemove(Context.ConnectionId, out _);

            Clients.All.SendAsync("UsersUpdated", connectedUsers.Values.Distinct());

            return base.OnDisconnectedAsync(exception);
        }

        public Task GetConnectedUsers()
        {
            return Clients.Caller.SendAsync("UsersUpdated", connectedUsers.Values.Distinct());
        }
    }
}
