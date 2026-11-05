export const INITIAL_ROOMS = [
  {
    id: 'room-1',
    name: 'chill-lounge',
    topic: 'Lo-Fi beats, casual chit-chat, and open debugging',
    category: 'voice',
    isVoiceActive: true,
    hasScreenShare: false,
    memberCount: 4,
    unreadCount: 0,
    members: [
      { id: 'u1', name: 'Alex', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: false },
      { id: 'u2', name: 'Maya', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: true },
      { id: 'u3', name: 'Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: false },
      { id: 'u4', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', inVoice: false, isMuted: true },
    ]
  },
  {
    id: 'room-2',
    name: 'leetcode-sprint',
    topic: 'Daily grind: Graph & DP patterns. Screen sharing solutions',
    category: 'code',
    isVoiceActive: true,
    hasScreenShare: true,
    memberCount: 3,
    unreadCount: 2,
    members: [
      { id: 'u4', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: false },
      { id: 'u5', name: 'John', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: false },
    ]
  },
  {
    id: 'room-3',
    name: 'lofi-coffee',
    topic: 'Deep focus study session with sound room music stream',
    category: 'voice',
    isVoiceActive: true,
    hasScreenShare: false,
    memberCount: 2,
    unreadCount: 0,
    members: [
      { id: 'u2', name: 'Maya', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: true },
      { id: 'u3', name: 'Dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces', inVoice: true, isMuted: false },
    ]
  },
  {
    id: 'room-4',
    name: 'hackathon-jam',
    topic: 'Brainstorming Collab+ backend architecture & API mocks',
    category: 'code',
    isVoiceActive: false,
    hasScreenShare: false,
    memberCount: 5,
    unreadCount: 3,
    members: []
  },
  {
    id: 'room-5',
    name: 'daily-trivia',
    topic: 'Mini social games & computer science quizzes hosted by AI',
    category: 'games',
    isVoiceActive: false,
    hasScreenShare: false,
    memberCount: 6,
    unreadCount: 1,
    members: []
  }
];

export const INITIAL_MESSAGES = {
  'room-1': [
    {
      id: 'm1',
      sender: {
        id: 'u2',
        name: 'Maya',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
        badge: 'Top Contributor'
      },
      time: '11:42 AM',
      text: 'Hey everyone! Just solved LeetCode #206 (Reverse Linked List) using an iterative two-pointer approach.',
      codeSnippet: {
        language: 'python',
        code: `def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`
      }
    },
    {
      id: 'm2',
      sender: {
        id: 'bot',
        name: 'CollabBot AI',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
        badge: 'Room Bot',
        isAi: true
      },
      time: '11:43 AM',
      text: '⚡ Clean implementation Maya! Time Complexity is O(N) and Auxiliary Space is O(1). You can run this directly in the Command Center Scratchpad with the test runner.',
      suggestedActions: ['Run in Scratchpad', 'Explain Recursively', 'View Complexity Chart']
    },
    {
      id: 'm3',
      sender: {
        id: 'u4',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
        badge: 'Core Team'
      },
      time: '11:45 AM',
      text: 'Look at this architecture diagram for our room streaming server. Thinking we use WebRTC for peer voice & WebSockets for reactive message feeds.',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'm4',
      sender: {
        id: 'u3',
        name: 'Dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        badge: 'Chiller'
      },
      time: '11:47 AM',
      text: 'The soundroom lo-fi playlist is hitting just right today ☕ Who wants to do a quick 20-minute code sprint?'
    }
  ],
  'room-2': [
    {
      id: 'm2-1',
      sender: {
        id: 'u4',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
        badge: 'Core Team'
      },
      time: '11:30 AM',
      text: 'Starting the live sprint! Today we are tackling 3 graph problems: Number of Islands, Course Schedule, and Clone Graph.',
      codeSnippet: {
        language: 'javascript',
        code: `function numIslands(grid) {\n  if (!grid || grid.length === 0) return 0;\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] === '0') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < grid.length; r++) {\n    for (let c = 0; c < grid[0].length; c++) {\n      if (grid[r][c] === '1') { count++; dfs(r, c); }\n    }\n  }\n  return count;\n}`
      }
    }
  ],
  'room-3': [
    {
      id: 'm3-1',
      sender: {
        id: 'u2',
        name: 'Maya',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
        badge: 'Top Contributor'
      },
      time: '11:15 AM',
      text: 'Synthwave focus stream is live. Come vibe and finish tasks ☕'
    }
  ],
  'room-4': [
    {
      id: 'm4-1',
      sender: {
        id: 'u5',
        name: 'John',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
        badge: 'Dev'
      },
      time: '10:50 AM',
      text: 'Drafted the WebSocket message schema for real-time channels.'
    }
  ],
  'room-5': [
    {
      id: 'm5-1',
      sender: {
        id: 'bot',
        name: 'CollabBot AI',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&crop=faces',
        badge: 'Room Bot',
        isAi: true
      },
      time: '11:02 AM',
      text: '🎯 Question 3: What is the time complexity of QuickSort in the worst case?'
    }
  ]
};

export const INITIAL_FRIENDS = [
  {
    id: 'f1',
    name: 'Sarah Chen',
    username: '@sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    status: 'online',
    activityType: 'coding',
    activity: 'VS Code — refactoring auth.ts',
    streak: 12
  },
  {
    id: 'f2',
    name: 'Maya Patel',
    username: '@maya',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    status: 'online',
    activityType: 'leetcode',
    activity: 'LeetCode #15: 3Sum (Rank: Top 5%)',
    streak: 8
  },
  {
    id: 'f3',
    name: 'Devon Miller',
    username: '@devon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
    status: 'voice',
    activityType: 'voice',
    activity: 'In Voice: #chill-lounge 🎙️',
    streak: 4
  },
  {
    id: 'f4',
    name: 'John Doe',
    username: '@johnd',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    status: 'idle',
    activityType: 'github',
    activity: 'Pushed commit to collab-plus/frontend',
    streak: 19
  },
  {
    id: 'f5',
    name: 'Elena Rostova',
    username: '@elena',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
    status: 'offline',
    activityType: 'offline',
    activity: 'Last seen 2 hours ago',
    streak: 3
  }
];

export const INITIAL_DEV_FEEDS = [
  {
    id: 'feed-1',
    type: 'github',
    user: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    title: 'Merged pull request #42 in collab-plus',
    detail: 'feat: add WebRTC mesh audio streaming channels',
    time: '15m ago',
    badge: 'GitHub'
  },
  {
    id: 'feed-2',
    type: 'leetcode',
    user: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
    title: 'Solved Daily Problem: #206 Reverse Linked List',
    detail: 'Beats 98.4% runtime (0ms) in Python 3',
    time: '28m ago',
    badge: 'LeetCode'
  },
  {
    id: 'feed-3',
    type: 'wakatime',
    user: 'Alex Rivers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
    title: 'Milestone reached: 5.2 hrs coding today',
    detail: 'Languages: TypeScript (60%), Python (30%), CSS (10%)',
    time: '1h ago',
    badge: 'WakaTime'
  }
];

export const STARTER_CODE = {
  python: `# Collab+ Python 3 Scratchpad
def two_sum(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers that add up to target.
    """
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []

# Test execution:
test_nums = [2, 7, 11, 15]
test_target = 9
result = two_sum(test_nums, test_target)
print(f"Target: {test_target}")
print(f"Indices: {result} -> Values: {[test_nums[i] for i in result]}")
`,
  javascript: `// Collab+ JavaScript Scratchpad
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];
    
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

const input = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log("Input:", JSON.stringify(input));
console.log("Merged:", JSON.stringify(mergeIntervals(input)));
`,
  typescript: `// Collab+ TypeScript Scratchpad
interface PeerNode {
  id: string;
  name: string;
  role: 'host' | 'peer';
  pingMs: number;
}

const roomPeers: PeerNode[] = [
  { id: 'p1', name: 'Alex', role: 'host', pingMs: 14 },
  { id: 'p2', name: 'Maya', role: 'peer', pingMs: 22 },
  { id: 'p3', name: 'Sarah', role: 'peer', pingMs: 18 }
];

const avgPing = roomPeers.reduce((acc, p) => acc + p.pingMs, 0) / roomPeers.length;
console.log("Active Mesh Peers:", roomPeers.length);
console.log("Average Round-Trip Latency:", avgPing.toFixed(1) + "ms");
`,
  cpp: `// Collab+ C++ Scratchpad
#include <iostream>
#include <vector>
#include <numeric>

int main() {
    std::vector<int> scores = {98, 95, 100, 88, 92};
    double sum = std::accumulate(scores.begin(), scores.end(), 0.0);
    double avg = sum / scores.size();
    
    std::cout << "[Collab+ C++ Runner]" << std::endl;
    std::cout << "Participants: " << scores.size() << std::endl;
    std::cout << "Mean Quiz Score: " << avg << " pts" << std::endl;
    return 0;
}
`
};
