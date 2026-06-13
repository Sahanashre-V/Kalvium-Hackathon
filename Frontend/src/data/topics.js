const lesson = (definition) => definition

export const TOPIC_LIBRARY = {
  'DSA': {
    roadmap: [
      {
        id: 'arrays',
        title: 'Arrays',
        status: 'Completed',
        description: 'Build speed with indexing, traversal, and constant-time lookup patterns.',
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists',
        status: 'Completed',
        description: 'Understand node references, pointer updates, and sequential access.',
      },
      {
        id: 'recursion',
        title: 'Recursion',
        status: 'Review',
        description: 'Strengthen call stack thinking and base-case design.',
      },
      {
        id: 'prefix-sum',
        title: 'Prefix Sum',
        status: 'Recommended',
        description: 'Answer range queries quickly with running totals.',
      },
      {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        status: 'Gap',
        description: 'Turn overlapping subproblems into efficient solutions.',
      },
      {
        id: 'graphs',
        title: 'Graphs',
        status: 'Gap',
        description: 'Model relationships, networks, and traversal strategies.',
      },
    ],
    lessons: {
      arrays: lesson({
        id: 'arrays',
        title: 'Arrays',
        duration: '10 min',
        sections: {
          whatIs: [
            'Arrays are one of the simplest ways to store data. They keep items in order and let you reach a specific value using its position.',
            'Because the items are arranged in memory in a predictable way, arrays are ideal when you need fast access and clean iteration.',
          ],
          whyImportant: [
            'Arrays exist because many problems need ordered collections that are easy to scan, update, and reason about.',
            'They are used when the shape of the data is known and indexed access matters more than frequent insertion in the middle.',
          ],
          realWorldExample: {
            title: 'Movie Seat Map',
            inputs: ['Seat number', 'Row', 'Showtime'],
            output: 'Exact seat booking confirmation',
          },
          howItWorks: ['Store values in order', 'Jump directly by index', 'Read or update quickly', 'Traverse when needed'],
          industryApplications: [
            { company: 'Netflix', description: 'Stores ordered recommendation results for quick rendering.' },
            { company: 'Uber', description: 'Keeps route checkpoints and ordered trip events.' },
            { company: 'Google', description: 'Uses array-like structures when batching ranking signals.' },
          ],
          keyTakeaways: [
            'Index access is constant time.',
            'Traversal is simple and fast.',
            'Middle insertions can be expensive.',
            'Arrays are the foundation for many DSA patterns.',
          ],
          checkpoint: {
            question: 'Which operation is typically O(1) on an array?',
            options: ['Access by index', 'Insert in the middle', 'Reverse the entire array', 'Sort the array'],
            correctIndex: 0,
            explanation: 'Arrays are great at direct indexed access because positions map predictably to memory.',
          },
          reinforcement: {
            simplerExplanation:
              'Think of an array like numbered boxes in a row. You can open box 3 immediately because the number tells you exactly where to look.',
            extraExample: {
              title: 'Playlist ordering',
              inputs: ['Track 1', 'Track 2', 'Track 3'],
              output: 'Play the third song immediately by its index',
            },
          },
        },
      }),
      'linked-lists': lesson({
        id: 'linked-lists',
        title: 'Linked Lists',
        duration: '12 min',
        sections: {
          whatIs: [
            'A linked list stores values as nodes connected by references instead of keeping everything side by side.',
            'Each node points to the next one, so the structure can grow or change without shifting an entire block of data.',
          ],
          whyImportant: [
            'Linked lists solve the problem of expensive insertions and deletions inside large ordered collections.',
            'They are useful when the exact size is not known in advance or when changes happen often near the front or middle.',
          ],
          realWorldExample: {
            title: 'Task Handoff Chain',
            inputs: ['Task A', 'Task B', 'Task C'],
            output: 'A chain of follow-up tasks passed from one owner to another',
          },
          howItWorks: ['Start at the head', 'Follow the next reference', 'Update pointers when inserting', 'Stop at null'],
          industryApplications: [
            { company: 'Spotify', description: 'Represents play queues and chained playback state.' },
            { company: 'Uber', description: 'Tracks ordered operations in dispatch pipelines.' },
            { company: 'Database engines', description: 'Use list-like structures for internal memory management.' },
          ],
          keyTakeaways: [
            'Access is sequential, not indexed.',
            'Insertions can be efficient when pointers are known.',
            'Pointer mistakes can break the list.',
            'Great for understanding reference-based thinking.',
          ],
          checkpoint: {
            question: 'Which statement best describes linked lists?',
            options: [
              'All values are stored next to each other',
              'Nodes connect through references',
              'They always support O(1) random access',
              'They are only used in sorting algorithms',
            ],
            correctIndex: 1,
            explanation: 'Linked lists are made of nodes that point to each other, which is why traversal is sequential.',
          },
          reinforcement: {
            simplerExplanation:
              'Imagine a treasure hunt where each clue tells you where the next clue is. You do not jump to the end directly; you follow the chain.',
            extraExample: {
              title: 'Inbox thread',
              inputs: ['Message 1', 'Message 2', 'Message 3'],
              output: 'Open the next message by following the thread link',
            },
          },
        },
      }),
      recursion: lesson({
        id: 'recursion',
        title: 'Recursion',
        duration: '11 min',
        sections: {
          whatIs: [
            'Recursion solves a problem by calling the same function on smaller versions of the problem.',
            'It always needs a base case so the repeated calls eventually stop and return a final answer.',
          ],
          whyImportant: [
            'Recursion exists because many problems naturally break into smaller subproblems that look like the original problem.',
            'It is used for tree traversal, backtracking, divide-and-conquer, and any task that benefits from self-similar structure.',
          ],
          realWorldExample: {
            title: 'Folder Explorer',
            inputs: ['Root folder', 'Nested folders', 'Files'],
            output: 'A complete tree of nested content',
          },
          howItWorks: ['Check the base case', 'Break into a smaller problem', 'Call the same function again', 'Unwind the stack with answers'],
          industryApplications: [
            { company: 'Google Drive', description: 'Traverses nested folders and hierarchical file structures.' },
            { company: 'GitHub', description: 'Processes tree-like repository structures.' },
            { company: 'Compilers', description: 'Use recursive parsing for nested syntax.' },
          ],
          keyTakeaways: [
            'Base case first, always.',
            'Each call should shrink the problem.',
            'The call stack stores unfinished work.',
            'Many tree algorithms are recursive by design.',
          ],
          checkpoint: {
            question: 'Why is a base case essential in recursion?',
            options: ['To make it faster', 'To stop infinite calls', 'To sort the data', 'To use less memory'],
            correctIndex: 1,
            explanation: 'Without a base case, the function would keep calling itself forever and overflow the stack.',
          },
          reinforcement: {
            simplerExplanation:
              'Think of recursion like asking a smaller version of the same question until the answer becomes obvious.',
            extraExample: {
              title: 'Countdown',
              inputs: ['5', '4', '3', '2', '1'],
              output: 'Stop when you reach 0',
            },
          },
        },
      }),
      'prefix-sum': lesson({
        id: 'prefix-sum',
        title: 'Prefix Sum',
        duration: '12 min',
        sections: {
          whatIs: [
            'Prefix sum is a preprocessing technique that stores the running total of values up to each position.',
            'Once the running totals are built, range questions become simple subtraction instead of repeated looping.',
          ],
          whyImportant: [
            'Prefix sums exist because many problems ask for totals over subranges again and again.',
            'They are used when you want faster repeated queries after one linear pass of preprocessing.',
          ],
          realWorldExample: {
            title: 'Household Electricity Bill',
            inputs: ['Daily usage', 'Meter reading', 'Billing period'],
            output: 'Usage across a date range without recounting every day',
          },
          howItWorks: ['Read the first value', 'Keep a running total', 'Store each checkpoint', 'Subtract to answer ranges'],
          industryApplications: [
            { company: 'Amazon', description: 'Speeds up inventory and range-based analytics calculations.' },
            { company: 'Uber', description: 'Helps with location windows and batch distance calculations.' },
            { company: 'Google Analytics', description: 'Uses cumulative totals to summarize event streams.' },
          ],
          keyTakeaways: [
            'Precompute once, query many times.',
            'Range sum becomes subtraction.',
            'Useful for arrays and matrices.',
            'A core optimization pattern in interviews.',
          ],
          checkpoint: {
            question: 'What does a prefix sum array store?',
            options: ['Sorted values', 'Running totals', 'Graph edges', 'Hash map keys'],
            correctIndex: 1,
            explanation: 'Each position stores the cumulative total from the start of the array up to that index.',
          },
          reinforcement: {
            simplerExplanation:
              'Imagine keeping a tally after every item you add. Later, you can answer “how much so far?” without recounting from zero.',
            extraExample: {
              title: 'Expense tracker',
              inputs: ['Lunch', 'Transport', 'Coffee'],
              output: 'Total spending up to each day',
            },
          },
        },
      }),
      'dynamic-programming': lesson({
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        duration: '15 min',
        sections: {
          whatIs: [
            'Dynamic programming is a way to solve problems by saving answers to subproblems so the same work is never repeated unnecessarily.',
            'It usually turns a slow recursive idea into a faster memoized or tabulated solution.',
          ],
          whyImportant: [
            'DP exists because many hard problems contain overlapping subproblems and an optimal substructure.',
            'It is used when brute force would repeat too much work, such as in scheduling, path planning, or sequence comparison.',
          ],
          realWorldExample: {
            title: 'Travel Planning',
            inputs: ['Flight costs', 'Hotel choices', 'Trip length'],
            output: 'Lowest-cost itinerary with the best trade-off',
          },
          howItWorks: ['Define the state', 'Solve smaller states', 'Store computed answers', 'Build the final result'],
          industryApplications: [
            { company: 'Google Maps', description: 'Uses optimization ideas to compare path costs.' },
            { company: 'Amazon', description: 'Helps with resource allocation and logistics planning.' },
            { company: 'Bioinformatics tools', description: 'Align sequences by reusing subproblem results.' },
          ],
          keyTakeaways: [
            'Look for overlapping subproblems.',
            'State definition is the hardest part.',
            'Memoization and tabulation are both valid.',
            'DP is usually about trading memory for speed.',
          ],
          checkpoint: {
            question: 'What is the main reason DP is faster than naive recursion?',
            options: ['It uses more colors', 'It caches repeated subproblem results', 'It always sorts data', 'It avoids loops entirely'],
            correctIndex: 1,
            explanation: 'Dynamic programming stores repeated subproblem answers so they are computed once and reused.',
          },
          reinforcement: {
            simplerExplanation:
              'Imagine solving a puzzle once and saving the answer. If a smaller version appears again, you reuse the saved solution instead of solving it from scratch.',
            extraExample: {
              title: 'Climbing stairs',
              inputs: ['1 step', '2 steps', '3 steps'],
              output: 'Ways to reach the top without recounting each path every time',
            },
          },
        },
      }),
      graphs: lesson({
        id: 'graphs',
        title: 'Graphs',
        duration: '14 min',
        sections: {
          whatIs: [
            'Graphs are structures that model things and the relationships between them.',
            'They are made of nodes and edges, which makes them ideal for maps, networks, dependencies, and connected systems.',
          ],
          whyImportant: [
            'Graphs exist because many real systems are not simple lists or trees; they are web-like and interconnected.',
            'They are used whenever you need to represent routes, relationships, or flows across a network.',
          ],
          realWorldExample: {
            title: 'City Navigation',
            inputs: ['Intersections', 'Roads', 'Traffic rules'],
            output: 'The best route from one place to another',
          },
          howItWorks: ['Create nodes', 'Connect edges', 'Traverse with BFS or DFS', 'Use weights when needed'],
          industryApplications: [
            { company: 'Google Maps', description: 'Calculates routes and traffic-aware navigation.' },
            { company: 'LinkedIn', description: 'Models professional relationships and connection paths.' },
            { company: 'Spotify', description: 'Tracks relationship-based music recommendations.' },
          ],
          keyTakeaways: [
            'Graphs represent relationships.',
            'BFS and DFS are the core traversals.',
            'Weighted graphs support path cost problems.',
            'A lot of “network” problems are graph problems.',
          ],
          checkpoint: {
            question: 'Which traversal explores a graph level by level?',
            options: ['DFS', 'BFS', 'Sorting', 'Hashing'],
            correctIndex: 1,
            explanation: 'Breadth-first search explores all nodes at one depth before moving to the next.',
          },
          reinforcement: {
            simplerExplanation:
              'Picture a map of cities and roads. You are not just storing the cities; you are storing how they connect to one another.',
            extraExample: {
              title: 'Social network',
              inputs: ['User A', 'User B', 'User C'],
              output: 'Friend connections and mutual paths',
            },
          },
        },
      }),
    },
    quizzes: {
      'arrays': [
        {
          id: 1,
          question: 'What makes arrays especially efficient?',
          options: ['Random access by index', 'Automatic graph traversal', 'Infinite resizing', 'Recursive storage'],
          correctIndex: 0,
          explanation: 'Arrays let you jump directly to a position using its index.',
        },
      ],
      'linked-lists': [
        {
          id: 1,
          question: 'What is the main trade-off of linked lists?',
          options: ['Slow indexing, flexible inserts', 'Fast sorting, no pointers', 'Random access, no memory', 'Automatic caching'],
          correctIndex: 0,
          explanation: 'Linked lists are flexible for insertions, but they do not support direct indexed access.',
        },
      ],
      'recursion': [
        {
          id: 1,
          question: 'What does recursion require to stop safely?',
          options: ['A base case', 'A graph', 'A queue', 'A hash map'],
          correctIndex: 0,
          explanation: 'A base case prevents infinite recursive calls.',
        },
      ],
      'prefix-sum': [
        {
          id: 1,
          question: 'What does a prefix sum help answer quickly?',
          options: ['Range totals', 'Tree height', 'Route planning', 'Sorting stability'],
          correctIndex: 0,
          explanation: 'Prefix sums let you compute range totals with subtraction after preprocessing.',
        },
        {
          id: 2,
          question: 'What is the preprocessing complexity for prefix sums?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
          correctIndex: 1,
          explanation: 'You build the running total in a single linear scan.',
        },
      ],
      'dynamic-programming': [
        {
          id: 1,
          question: 'Which idea is central to dynamic programming?',
          options: ['Repeated recalculation', 'Storing subproblem results', 'Sorting every input', 'Removing base cases'],
          correctIndex: 1,
          explanation: 'DP stores answers to overlapping subproblems and reuses them.',
        },
      ],
      'graphs': [
        {
          id: 1,
          question: 'Which structure models relationships between nodes?',
          options: ['Array', 'Graph', 'Stack', 'Queue'],
          correctIndex: 1,
          explanation: 'Graphs are built specifically for nodes and their connections.',
        },
      ],
    },
  },
  React: {
    roadmap: [
      { id: 'components', title: 'Components', status: 'Completed', description: 'Compose reusable UI building blocks.' },
      { id: 'props', title: 'Props', status: 'Completed', description: 'Pass data into components cleanly.' },
      { id: 'state', title: 'State', status: 'Review', description: 'Control interactive UI behavior.' },
      { id: 'hooks', title: 'Hooks', status: 'Recommended', description: 'Use React features in functions.' },
      { id: 'context-api', title: 'Context API', status: 'Gap', description: 'Share state without prop drilling.' },
      { id: 'performance-optimization', title: 'Performance Optimization', status: 'Gap', description: 'Keep apps fast and responsive.' },
    ],
    lessons: {
      components: lesson({
        id: 'components',
        title: 'Components',
        duration: '10 min',
        sections: {
          whatIs: [
            'Components are reusable pieces of UI that package markup, behavior, and styling together.',
            'They are the core building blocks of React because they let you break a large interface into smaller, understandable parts.',
          ],
          whyImportant: [
            'Components exist so you can scale interfaces without repeating yourself everywhere.',
            'They are used when the same visual pattern or behavior appears in multiple places.',
          ],
          realWorldExample: {
            title: 'Product Card',
            inputs: ['Title', 'Price', 'Image'],
            output: 'A reusable card you can render for many products',
          },
          howItWorks: ['Define a function', 'Return UI', 'Pass props', 'Reuse it anywhere'],
          industryApplications: [
            { company: 'Airbnb', description: 'Builds reusable listing cards and search filters.' },
            { company: 'Figma', description: 'Uses components to keep interfaces consistent.' },
            { company: 'Spotify', description: 'Renders repeating playlist and album cards.' },
          ],
          keyTakeaways: [
            'A component is a reusable UI unit.',
            'Reusability improves consistency.',
            'Composition beats duplication.',
            'Most React apps are designed from components up.',
          ],
          checkpoint: {
            question: 'What is a React component?',
            options: ['A database record', 'A reusable UI building block', 'A CSS file', 'A browser tab'],
            correctIndex: 1,
            explanation: 'Components are reusable units of interface and behavior.',
          },
          reinforcement: {
            simplerExplanation:
              'Think of a component like a Lego piece. You can use the same piece again and again to build different things.',
            extraExample: {
              title: 'Button component',
              inputs: ['Label', 'Click action'],
              output: 'A button used across the app',
            },
          },
        },
      }),
      props: lesson({
        id: 'props',
        title: 'Props',
        duration: '9 min',
        sections: {
          whatIs: [
            'Props are inputs passed from a parent component to a child component.',
            'They make components flexible because the same component can display different data without changing its internal code.',
          ],
          whyImportant: [
            'Props exist to move data downward in a predictable, explicit way.',
            'They are used when a component needs to show content, behavior, or configuration from the outside.',
          ],
          realWorldExample: {
            title: 'Profile Card',
            inputs: ['Name', 'Role', 'Avatar'],
            output: 'A personalized user card',
          },
          howItWorks: ['Parent defines values', 'Child receives props', 'Child renders UI', 'UI changes with data'],
          industryApplications: [
            { company: 'Shopify', description: 'Feeds product details into reusable storefront components.' },
            { company: 'Notion', description: 'Uses props for dynamic blocks and configurable views.' },
            { company: 'Slack', description: 'Passes message data into timeline components.' },
          ],
          keyTakeaways: [
            'Props flow from parent to child.',
            'They keep components configurable.',
            'Do not mutate props inside children.',
            'They are the simplest form of component communication.',
          ],
          checkpoint: {
            question: 'Where do props flow?',
            options: ['Child to parent', 'Parent to child', 'Between browsers', 'Only inside state'],
            correctIndex: 1,
            explanation: 'Props are passed downward from parent components to child components.',
          },
          reinforcement: {
            simplerExplanation:
              'Imagine a parent handing a child a note with instructions. The child reads it and displays the right information.',
            extraExample: {
              title: 'Avatar component',
              inputs: ['Image URL', 'Size'],
              output: 'A user picture rendered with the right style',
            },
          },
        },
      }),
      state: lesson({
        id: 'state',
        title: 'State',
        duration: '11 min',
        sections: {
          whatIs: [
            'State is data that belongs to a component and can change over time.',
            'When state changes, React re-renders the component so the UI stays in sync with the new value.',
          ],
          whyImportant: [
            'State exists because interfaces are interactive and need to remember user actions.',
            'It is used for inputs, toggles, loading indicators, counters, and any value that changes inside the app.',
          ],
          realWorldExample: {
            title: 'Shopping Cart Counter',
            inputs: ['Items added', 'Items removed', 'Current count'],
            output: 'Updated cart badge',
          },
          howItWorks: ['Initialize state', 'Update it with events', 'Re-render UI', 'Display the latest value'],
          industryApplications: [
            { company: 'Amazon', description: 'Tracks cart contents and checkout state.' },
            { company: 'Figma', description: 'Updates canvas state while users edit designs.' },
            { company: 'Discord', description: 'Manages live UI state for chat and presence indicators.' },
          ],
          keyTakeaways: [
            'State makes interfaces interactive.',
            'Updating state triggers a re-render.',
            'Keep state as small and local as possible.',
            'Derived values should usually not be stored separately.',
          ],
          checkpoint: {
            question: 'What happens when React state changes?',
            options: ['Nothing', 'The component re-renders', 'The browser restarts', 'The props update automatically'],
            correctIndex: 1,
            explanation: 'React re-renders the component so the UI reflects the new state value.',
          },
          reinforcement: {
            simplerExplanation:
              'State is like a sticky note on your desk. When the note changes, you glance at it again and act on the new information.',
            extraExample: {
              title: 'Theme toggle',
              inputs: ['Dark mode', 'Light mode'],
              output: 'The interface changes when the toggle is clicked',
            },
          },
        },
      }),
      hooks: lesson({
        id: 'hooks',
        title: 'Hooks',
        duration: '12 min',
        sections: {
          whatIs: [
            'Hooks are functions that let React components use features like state, effects, and memoization.',
            'They keep logic reusable and make function components as capable as class components used to be.',
          ],
          whyImportant: [
            'Hooks exist so components can manage behavior without losing simplicity.',
            'They are used whenever you need side effects, shared logic, or stateful behavior inside a function component.',
          ],
          realWorldExample: {
            title: 'Live Search Box',
            inputs: ['Typed query', 'API request', 'Filtered results'],
            output: 'Suggestions that update as the user types',
          },
          howItWorks: ['Call the hook', 'React stores internal state', 'Effects run after render', 'UI stays reactive'],
          industryApplications: [
            { company: 'Spotify', description: 'Uses effects and state for dynamic playback interfaces.' },
            { company: 'Slack', description: 'Updates live message and channel state with hooks.' },
            { company: 'GitHub', description: 'Builds interactive UI logic with custom hooks.' },
          ],
          keyTakeaways: [
            'Hooks start with use.',
            'They must be called at the top level.',
            'They unlock React features in function components.',
            'Custom hooks help share logic cleanly.',
          ],
          checkpoint: {
            question: 'Which hook is commonly used for local component state?',
            options: ['useMemo', 'useState', 'useRef', 'useLayoutEffect'],
            correctIndex: 1,
            explanation: 'useState is the main hook for local state in function components.',
          },
          reinforcement: {
            simplerExplanation:
              'Hooks are like helper plug-ins for function components. They let the component remember things and react to changes.',
            extraExample: {
              title: 'Search suggestions',
              inputs: ['Query text', 'Debounced effect'],
              output: 'A list of suggestions that updates in real time',
            },
          },
        },
      }),
      'context-api': lesson({
        id: 'context-api',
        title: 'Context API',
        duration: '11 min',
        sections: {
          whatIs: [
            'The Context API lets you share data through a component tree without manually passing props at every level.',
            'It is useful when several distant components need the same value, such as theme, user settings, or selected topic state.',
          ],
          whyImportant: [
            'Context exists to solve prop drilling, where data must be forwarded through many components that do not actually use it.',
            'It is used for cross-cutting app state that should be globally accessible but not necessarily managed by an external library.',
          ],
          realWorldExample: {
            title: 'App Theme',
            inputs: ['Dark mode setting', 'Component tree', 'Shared UI preference'],
            output: 'All screens reflect the same theme instantly',
          },
          howItWorks: ['Create a context', 'Provide a value', 'Consume it where needed', 'Update shared state centrally'],
          industryApplications: [
            { company: 'Design systems', description: 'Share theme tokens and UI preferences across components.' },
            { company: 'Admin dashboards', description: 'Expose filters, permissions, and selected workspace data.' },
            { company: 'Product analytics apps', description: 'Share account-level state across multiple views.' },
          ],
          keyTakeaways: [
            'Context reduces prop drilling.',
            'Use it for shared app-wide values.',
            'Do not overuse it for every piece of state.',
            'Great for settings, themes, and selected entities.',
          ],
          checkpoint: {
            question: 'What problem does Context API help solve?',
            options: ['Slow sorting', 'Prop drilling', 'Image compression', 'Routing errors'],
            correctIndex: 1,
            explanation: 'Context allows shared data to skip intermediate components that do not need it.',
          },
          reinforcement: {
            simplerExplanation:
              'Instead of handing the same message through ten people, you put it on a shared notice board everyone can read.',
            extraExample: {
              title: 'Selected topic state',
              inputs: ['Chosen topic', 'Many pages'],
              output: 'All pages read the same topic without repeated props',
            },
          },
        },
      }),
      'performance-optimization': lesson({
        id: 'performance-optimization',
        title: 'Performance Optimization',
        duration: '13 min',
        sections: {
          whatIs: [
            'Performance optimization in React is about keeping the app responsive while reducing unnecessary work.',
            'The goal is to make the UI feel fast even when the app grows in size and complexity.',
          ],
          whyImportant: [
            'It exists because re-rendering too much can make interfaces feel slow or jittery.',
            'It is used when components become expensive, lists get long, or user interactions need to stay snappy.',
          ],
          realWorldExample: {
            title: 'Large Product Grid',
            inputs: ['Hundreds of cards', 'Filters', 'Search text'],
            output: 'Smooth scrolling and fast updates',
          },
          howItWorks: ['Avoid unnecessary renders', 'Split heavy UI', 'Memoize expensive work', 'Load data efficiently'],
          industryApplications: [
            { company: 'Airbnb', description: 'Keeps large listings and filters interactive at scale.' },
            { company: 'Figma', description: 'Maintains fluid editing experiences with heavy canvas logic.' },
            { company: 'Meta', description: 'Optimizes complex feeds and interactive surfaces.' },
          ],
          keyTakeaways: [
            'Performance is a product feature.',
            'Avoid rendering work the user cannot see.',
            'Profile before optimizing.',
            'Small changes add up in large apps.',
          ],
          checkpoint: {
            question: 'What is a common goal of performance optimization?',
            options: ['Add more re-renders', 'Reduce unnecessary work', 'Remove all state', 'Use only CSS'],
            correctIndex: 1,
            explanation: 'Optimization tries to keep the UI fast by avoiding useless computation and rendering.',
          },
          reinforcement: {
            simplerExplanation:
              'Performance is like removing extra steps from a task so the user gets the result faster.',
            extraExample: {
              title: 'Filtered list',
              inputs: ['Search text', 'Long item list'],
              output: 'Only the visible, relevant items re-render',
            },
          },
        },
      }),
    },
    quizzes: {
      components: [
        { id: 1, question: 'What is a React component?', options: ['A reusable UI block', 'A database table', 'A CSS rule', 'A browser tab'], correctIndex: 0, explanation: 'Components are reusable UI building blocks.' },
      ],
      props: [
        { id: 1, question: 'Which direction do props flow?', options: ['Child to parent', 'Parent to child', 'Both ways automatically', 'From browser to server'], correctIndex: 1, explanation: 'Props are passed from parent components to child components.' },
      ],
      state: [
        { id: 1, question: 'What does state control?', options: ['Static HTML only', 'Changing UI data', 'Network ports', 'Build output'], correctIndex: 1, explanation: 'State stores values that change over time and drive rendering.' },
      ],
      hooks: [
        { id: 1, question: 'What do hooks let function components use?', options: ['Only CSS', 'React features like state and effects', 'Database records', 'Server routes'], correctIndex: 1, explanation: 'Hooks unlock stateful and side-effect behavior in function components.' },
      ],
      'context-api': [
        { id: 1, question: 'What issue does Context API reduce?', options: ['Prop drilling', 'Image loading', 'Sorting', 'Animation timing'], correctIndex: 0, explanation: 'Context avoids passing props through layers that do not need them.' },
      ],
      'performance-optimization': [
        { id: 1, question: 'Why optimize React performance?', options: ['To slow the app down', 'To reduce unnecessary work', 'To remove components', 'To add more state'], correctIndex: 1, explanation: 'Optimization keeps interfaces responsive by avoiding wasted renders.' },
      ],
    },
  },
  'Machine Learning': {
    roadmap: [
      { id: 'regression', title: 'Regression', status: 'Completed', description: 'Predict continuous numerical values.' },
      { id: 'classification', title: 'Classification', status: 'Review', description: 'Predict discrete categories and labels.' },
      { id: 'feature-engineering', title: 'Feature Engineering', status: 'Recommended', description: 'Create stronger input signals.' },
      { id: 'model-evaluation', title: 'Model Evaluation', status: 'Gap', description: 'Measure how well a model generalizes.' },
      { id: 'neural-networks', title: 'Neural Networks', status: 'Gap', description: 'Learn layered representations and nonlinear learning.' },
      { id: 'overfitting', title: 'Overfitting', status: 'Gap', description: 'Avoid memorizing the training data too closely.' },
    ],
    lessons: {
      regression: lesson({
        id: 'regression',
        title: 'Regression',
        duration: '10 min',
        sections: {
          whatIs: [
            'Regression is a supervised machine learning technique used to predict continuous numerical values.',
            'Instead of choosing from categories, the model learns a numeric relationship between inputs and an output.',
          ],
          whyImportant: [
            'Regression exists because many real problems ask “how much?” or “how many?” rather than “which class?”',
            'It is used when the answer is a measurable quantity like price, temperature, demand, or time.',
          ],
          realWorldExample: {
            title: 'House Price Prediction',
            inputs: ['Area', 'Bedrooms', 'Location'],
            output: 'Estimated house price',
          },
          howItWorks: ['Collect training data', 'Learn patterns', 'Fit a prediction function', 'Estimate new values'],
          industryApplications: [
            { company: 'Real estate apps', description: 'Estimate listing prices from neighborhood and property details.' },
            { company: 'Retail forecasting', description: 'Predict sales volume from seasonality and traffic.' },
            { company: 'Ride platforms', description: 'Estimate trip time and fare from route signals.' },
          ],
          keyTakeaways: [
            'Regression predicts continuous values.',
            'It is ideal for numeric outputs.',
            'The model learns relationships from data.',
            'Error metrics measure how close predictions are.',
          ],
          checkpoint: {
            question: 'Predicting employee salary from years of experience is:',
            options: ['Classification', 'Regression', 'Clustering', 'Reinforcement Learning'],
            correctIndex: 1,
            explanation: 'Salary is a continuous value, so this is a regression problem.',
          },
          reinforcement: {
            simplerExplanation:
              'Regression is for questions with numeric answers. If you want a value instead of a label, regression is usually the right frame.',
            extraExample: {
              title: 'Delivery time estimate',
              inputs: ['Distance', 'Traffic', 'Weather'],
              output: 'Minutes until delivery',
            },
          },
        },
      }),
      classification: lesson({
        id: 'classification',
        title: 'Classification',
        duration: '10 min',
        sections: {
          whatIs: [
            'Classification is a supervised learning technique that assigns an input to one of several categories.',
            'The model learns class boundaries and predicts labels instead of continuous numbers.',
          ],
          whyImportant: [
            'Classification exists because many decisions are categorical, such as spam or not spam, fraud or not fraud, healthy or unhealthy.',
            'It is used whenever the goal is to sort items into classes with meaning for the business or user.',
          ],
          realWorldExample: {
            title: 'Email Spam Detection',
            inputs: ['Sender', 'Keywords', 'Link patterns'],
            output: 'Spam or not spam',
          },
          howItWorks: ['Feed labeled examples', 'Learn patterns', 'Predict class probabilities', 'Choose the best class'],
          industryApplications: [
            { company: 'Email services', description: 'Separate spam from important messages.' },
            { company: 'Banks', description: 'Detect suspicious transactions or fraud.' },
            { company: 'Healthcare tools', description: 'Classify signs of risk and conditions.' },
          ],
          keyTakeaways: [
            'Classification predicts categories.',
            'It is common in decision-making systems.',
            'Probability scores often matter as much as labels.',
            'Good class balance improves reliability.',
          ],
          checkpoint: {
            question: 'Which problem is classification?',
            options: ['Predicting house price', 'Predicting spam email', 'Predicting calories burned', 'Predicting time in minutes'],
            correctIndex: 1,
            explanation: 'Spam detection assigns an item to one of several categories, so it is classification.',
          },
          reinforcement: {
            simplerExplanation:
              'Classification is like sorting mail into bins. The goal is to choose the correct bucket, not a numeric amount.',
            extraExample: {
              title: 'Loan approval',
              inputs: ['Income', 'Credit history', 'Debt'],
              output: 'Approve or reject',
            },
          },
        },
      }),
      'feature-engineering': lesson({
        id: 'feature-engineering',
        title: 'Feature Engineering',
        duration: '11 min',
        sections: {
          whatIs: [
            'Feature engineering is the process of creating better input variables for a machine learning model.',
            'It transforms raw data into useful signals that make learning easier and more accurate.',
          ],
          whyImportant: [
            'It exists because model quality often depends as much on the input representation as on the algorithm itself.',
            'It is used when raw data is messy, too sparse, or not directly meaningful to the model.',
          ],
          realWorldExample: {
            title: 'Purchase Prediction',
            inputs: ['Days since last visit', 'Average order value', 'Category interest'],
            output: 'A feature set that better predicts purchase likelihood',
          },
          howItWorks: ['Inspect raw data', 'Create derived signals', 'Encode categories', 'Measure feature usefulness'],
          industryApplications: [
            { company: 'E-commerce', description: 'Builds intent and spending features for recommendation models.' },
            { company: 'Fraud systems', description: 'Creates behavioral signals from raw transaction data.' },
            { company: 'Search engines', description: 'Transforms queries and clicks into ranking features.' },
          ],
          keyTakeaways: [
            'Better features often mean better models.',
            'Raw data usually needs transformation.',
            'Domain knowledge is valuable here.',
            'Feature engineering is part art, part measurement.',
          ],
          checkpoint: {
            question: 'What is the purpose of feature engineering?',
            options: ['Delete all data', 'Create more useful inputs for the model', 'Turn models into charts', 'Remove evaluation metrics'],
            correctIndex: 1,
            explanation: 'Feature engineering improves the input representation so the model can learn more effectively.',
          },
          reinforcement: {
            simplerExplanation:
              'It is like preparing ingredients before cooking. Chopping, measuring, and combining them well makes the final dish better.',
            extraExample: {
              title: 'Customer profile',
              inputs: ['Age', 'Purchase frequency', 'Favorite category'],
              output: 'A stronger signal for recommending products',
            },
          },
        },
      }),
      'model-evaluation': lesson({
        id: 'model-evaluation',
        title: 'Model Evaluation',
        duration: '12 min',
        sections: {
          whatIs: [
            'Model evaluation is the process of measuring how well a trained model performs on unseen data.',
            'It tells you whether the model learned a real pattern or just memorized the training set.',
          ],
          whyImportant: [
            'Evaluation exists because a model that looks good during training may fail in the real world.',
            'It is used whenever teams need to compare models, select thresholds, and decide whether a model is ready to ship.',
          ],
          realWorldExample: {
            title: 'Fraud Detection Review',
            inputs: ['Predicted class', 'Actual label', 'Probability score'],
            output: 'Accuracy, precision, recall, and F1 summary',
          },
          howItWorks: ['Split data', 'Predict on validation set', 'Compute metrics', 'Compare against targets'],
          industryApplications: [
            { company: 'Banking', description: 'Checks whether fraud models catch suspicious events reliably.' },
            { company: 'Streaming platforms', description: 'Tests recommendation quality before rollout.' },
            { company: 'Healthcare AI', description: 'Validates medical-risk models carefully before use.' },
          ],
          keyTakeaways: [
            'Train and evaluation are different phases.',
            'Metrics should match the business goal.',
            'A model must work on unseen data.',
            'Evaluation is part of responsible ML.',
          ],
          checkpoint: {
            question: 'Why do we evaluate models on unseen data?',
            options: ['To make training slower', 'To measure generalization', 'To add more labels', 'To avoid features'],
            correctIndex: 1,
            explanation: 'Unseen data shows whether the model generalizes beyond the data it memorized.',
          },
          reinforcement: {
            simplerExplanation:
              'Evaluation is the final exam. Training is practice. If the model fails the exam, it is not ready yet.',
            extraExample: {
              title: 'Movie recommendation test',
              inputs: ['Predicted likes', 'Actual clicks'],
              output: 'A score showing how well recommendations matched reality',
            },
          },
        },
      }),
      'neural-networks': lesson({
        id: 'neural-networks',
        title: 'Neural Networks',
        duration: '13 min',
        sections: {
          whatIs: [
            'Neural networks are layered models that learn patterns by transforming inputs through connected nodes.',
            'Each layer learns a different level of representation, which lets the model handle complex relationships.',
          ],
          whyImportant: [
            'They exist because many problems are too complex for simple linear rules.',
            'They are used when the model needs to capture nonlinear patterns in images, text, audio, and tabular data.',
          ],
          realWorldExample: {
            title: 'Image Recognition',
            inputs: ['Pixels', 'Edges', 'Shapes'],
            output: 'Object label or probability',
          },
          howItWorks: ['Input data', 'Pass through layers', 'Learn weights', 'Produce predictions'],
          industryApplications: [
            { company: 'Photos apps', description: 'Recognize faces, scenes, and objects in images.' },
            { company: 'Voice assistants', description: 'Understand speech and spoken commands.' },
            { company: 'Recommendation systems', description: 'Learn deeper user-item interactions.' },
          ],
          keyTakeaways: [
            'Layers learn progressively richer patterns.',
            'Weights change during training.',
            'Great for nonlinear problems.',
            'Often needs more data and compute.',
          ],
          checkpoint: {
            question: 'What do neural networks learn through training?',
            options: ['Static labels', 'Layer weights', 'Spreadsheet formulas', 'Binary trees'],
            correctIndex: 1,
            explanation: 'Training updates the model weights so the network can learn useful patterns from data.',
          },
          reinforcement: {
            simplerExplanation:
              'Think of layers like a team of helpers, each one improving the raw input a little more before the final answer is given.',
            extraExample: {
              title: 'Handwritten digit recognition',
              inputs: ['Image pixels', 'Stroke patterns'],
              output: 'Digit probability from 0 to 9',
            },
          },
        },
      }),
      overfitting: lesson({
        id: 'overfitting',
        title: 'Overfitting',
        duration: '10 min',
        sections: {
          whatIs: [
            'Overfitting happens when a model learns the training data too well and struggles to perform on new data.',
            'It often memorizes noise or overly specific patterns instead of learning general rules.',
          ],
          whyImportant: [
            'It exists as a warning sign that a model may be too complex for the available data.',
            'It is used as a concept to guide regularization, validation, and model simplification decisions.',
          ],
          realWorldExample: {
            title: 'Exam cramming analogy',
            inputs: ['Memorized answers', 'New question wording'],
            output: 'Poor performance on the real exam',
          },
          howItWorks: ['Fit too closely to training data', 'Lose generality', 'Fail on new examples', 'Need correction'],
          industryApplications: [
            { company: 'Any ML team', description: 'Uses validation curves to detect overfit models.' },
            { company: 'Fraud systems', description: 'Must avoid memorizing quirks that do not generalize.' },
            { company: 'Medical AI', description: 'Needs strong generalization to protect real patients.' },
          ],
          keyTakeaways: [
            'Overfitting hurts generalization.',
            'High training score is not enough.',
            'Validation metrics matter.',
            'Regularization and more data can help.',
          ],
          checkpoint: {
            question: 'What does overfitting usually cause?',
            options: ['Better unseen performance', 'Poor generalization', 'Faster hardware', 'Smaller datasets'],
            correctIndex: 1,
            explanation: 'Overfitting makes the model perform well on training data but poorly on new data.',
          },
          reinforcement: {
            simplerExplanation:
              'It is like memorizing the answer key instead of learning the subject. When the question changes, the model gets confused.',
            extraExample: {
              title: 'Spelling test memory',
              inputs: ['Memorized practice sheet', 'New spelling list'],
              output: 'Good practice score, weak real-world performance',
            },
          },
        },
      }),
    },
    quizzes: {
      regression: [
        { id: 1, question: 'Regression predicts what kind of output?', options: ['Categories', 'Continuous values', 'Graph paths', 'Binary states'], correctIndex: 1, explanation: 'Regression predicts numeric outputs.' },
      ],
      classification: [
        { id: 1, question: 'Which output is best for classification?', options: ['House price', 'Spam or not spam', 'Temperature', 'Delivery minutes'], correctIndex: 1, explanation: 'Classification predicts categories.' },
      ],
      'feature-engineering': [
        { id: 1, question: 'Feature engineering mainly improves what?', options: ['Model inputs', 'GPU count', 'Server uptime', 'Label count'], correctIndex: 0, explanation: 'Feature engineering creates better inputs for the model.' },
      ],
      'model-evaluation': [
        { id: 1, question: 'Why evaluate on unseen data?', options: ['To reduce memory', 'To measure generalization', 'To add labels', 'To remove noise entirely'], correctIndex: 1, explanation: 'Evaluation on unseen data measures generalization.' },
      ],
      'neural-networks': [
        { id: 1, question: 'Neural networks learn mainly by updating what?', options: ['Colors', 'Weights', 'Passwords', 'Folders'], correctIndex: 1, explanation: 'Training updates network weights.' },
      ],
      overfitting: [
        { id: 1, question: 'Overfitting means the model performs well on:', options: ['New data only', 'Training data but not new data', 'Only images', 'Only text'], correctIndex: 1, explanation: 'Overfitting hurts generalization to unseen data.' },
      ],
    },
  },
  'System Design': {
    roadmap: [
      { id: 'scalability', title: 'Scalability', status: 'Completed', description: 'Grow without breaking the system.' },
      { id: 'load-balancing', title: 'Load Balancing', status: 'Review', description: 'Spread traffic across servers.' },
      { id: 'caching', title: 'Caching', status: 'Recommended', description: 'Reduce latency with stored responses.' },
      { id: 'databases', title: 'Databases', status: 'Gap', description: 'Choose storage and query patterns.' },
      { id: 'message-queues', title: 'Message Queues', status: 'Gap', description: 'Decouple services with async work.' },
      { id: 'microservices', title: 'Microservices', status: 'Gap', description: 'Split systems into smaller services.' },
    ],
    lessons: {
      scalability: lesson({
        id: 'scalability',
        title: 'Scalability',
        duration: '12 min',
        sections: {
          whatIs: [
            'Scalability is the ability of a system to handle growth without becoming slow or unstable.',
            'A scalable design keeps the product usable as users, data, and traffic increase.',
          ],
          whyImportant: [
            'It exists because small systems often fail when usage grows suddenly.',
            'It is used when planning architecture that must survive more traffic, more requests, or more data over time.',
          ],
          realWorldExample: {
            title: 'Video App Growth',
            inputs: ['Users', 'Uploads', 'Watch requests'],
            output: 'System capacity that grows with demand',
          },
          howItWorks: ['Measure bottlenecks', 'Add capacity', 'Balance load', 'Scale services horizontally'],
          industryApplications: [
            { company: 'Netflix', description: 'Scales streaming traffic globally during peak events.' },
            { company: 'Uber', description: 'Handles real-time requests across large cities.' },
            { company: 'Amazon', description: 'Keeps commerce stable during traffic spikes.' },
          ],
          keyTakeaways: [
            'Scalability is about growth readiness.',
            'Bottlenecks matter more than raw hardware.',
            'Horizontal scaling is common.',
            'Design for future load, not just current load.',
          ],
          checkpoint: {
            question: 'What does scalability describe?',
            options: ['Static color scheme', 'Handling growth', 'Faster font loading', 'Smaller app size'],
            correctIndex: 1,
            explanation: 'Scalability measures how well a system handles increasing demand.',
          },
          reinforcement: {
            simplerExplanation:
              'Think of a restaurant adding more tables and staff when more customers arrive. The system should grow without falling apart.',
            extraExample: {
              title: 'Traffic spike',
              inputs: ['More users', 'More requests'],
              output: 'Servers and services expand to keep the app responsive',
            },
          },
        },
      }),
      'load-balancing': lesson({
        id: 'load-balancing',
        title: 'Load Balancing',
        duration: '10 min',
        sections: {
          whatIs: [
            'Load balancing distributes incoming traffic across multiple servers or services.',
            'It prevents one machine from becoming overloaded and helps keep response times steady.',
          ],
          whyImportant: [
            'It exists because a single server is often not enough for production traffic.',
            'It is used when systems need reliability, even load distribution, and better fault tolerance.',
          ],
          realWorldExample: {
            title: 'Checkout Traffic',
            inputs: ['Users', 'Checkout requests', 'Available servers'],
            output: 'Requests routed to the least busy backend',
          },
          howItWorks: ['Receive request', 'Choose healthy server', 'Send traffic evenly', 'Recover on failures'],
          industryApplications: [
            { company: 'E-commerce', description: 'Keeps checkout flows stable under heavy demand.' },
            { company: 'Streaming platforms', description: 'Distributes playback and API traffic.' },
            { company: 'Cloud platforms', description: 'Routes traffic to available healthy nodes.' },
          ],
          keyTakeaways: [
            'Load balancing spreads traffic.',
            'Health checks are essential.',
            'It improves resilience and response time.',
            'Often paired with autoscaling.',
          ],
          checkpoint: {
            question: 'What is the main purpose of load balancing?',
            options: ['Compress data', 'Distribute traffic', 'Create caches', 'Normalize labels'],
            correctIndex: 1,
            explanation: 'Load balancing routes requests across multiple servers so no single node is overloaded.',
          },
          reinforcement: {
            simplerExplanation:
              'It is like a traffic controller sending cars to the least crowded lanes so the road keeps moving.',
            extraExample: {
              title: 'Support tickets',
              inputs: ['Many incoming tickets', 'Support agents'],
              output: 'Tickets are routed to available agents evenly',
            },
          },
        },
      }),
      caching: lesson({
        id: 'caching',
        title: 'Caching',
        duration: '10 min',
        sections: {
          whatIs: [
            'Caching stores frequently used data in a faster location so it can be reused quickly.',
            'Instead of recalculating or refetching the same result, the system serves a stored copy.',
          ],
          whyImportant: [
            'Caching exists because repeated work is expensive and often unnecessary.',
            'It is used when the same data or response is requested often and speed matters.',
          ],
          realWorldExample: {
            title: 'News Feed Refresh',
            inputs: ['API response', 'Stored feed snapshot', 'Recent request'],
            output: 'A fast response from cache when the data is still fresh',
          },
          howItWorks: ['Check cache first', 'Return hit if available', 'Fetch on miss', 'Store fresh response'],
          industryApplications: [
            { company: 'Netflix', description: 'Caches thumbnails and metadata to speed up browsing.' },
            { company: 'Amazon', description: 'Caches product details and recommendations.' },
            { company: 'Google', description: 'Uses caching in search and distributed systems.' },
          ],
          keyTakeaways: [
            'Caching reduces latency.',
            'Cache hits are fast, misses are slower.',
            'Freshness and invalidation are important.',
            'It is a major tool for scale.',
          ],
          checkpoint: {
            question: 'What is caching mainly used for?',
            options: ['Increase latency', 'Reuse fast stored data', 'Delete servers', 'Convert SQL to JSON'],
            correctIndex: 1,
            explanation: 'Caching keeps a fast copy of frequently used data for quicker access.',
          },
          reinforcement: {
            simplerExplanation:
              'Caching is like keeping a snack on your desk instead of walking to the kitchen every time you want it.',
            extraExample: {
              title: 'Profile page',
              inputs: ['User name', 'Avatar', 'Preferences'],
              output: 'The page loads instantly from stored data',
            },
          },
        },
      }),
      databases: lesson({
        id: 'databases',
        title: 'Databases',
        duration: '12 min',
        sections: {
          whatIs: [
            'Databases are systems for storing, organizing, and retrieving data reliably.',
            'They help applications manage everything from user accounts to logs, transactions, and analytics.',
          ],
          whyImportant: [
            'They exist because apps need a durable place to keep data that survives restarts and scales with the product.',
            'They are used when the system needs search, consistency, transactions, and controlled access to records.',
          ],
          realWorldExample: {
            title: 'E-commerce Orders',
            inputs: ['Order id', 'Customer', 'Payment status'],
            output: 'A durable record that can be queried later',
          },
          howItWorks: ['Write data', 'Index important fields', 'Query records', 'Replicate for safety'],
          industryApplications: [
            { company: 'Banking systems', description: 'Store transactions with strong consistency.' },
            { company: 'Retail platforms', description: 'Manage catalog and order information.' },
            { company: 'SaaS products', description: 'Persist customer accounts and workspace data.' },
          ],
          keyTakeaways: [
            'Databases store durable application data.',
            'Indexes speed up lookup.',
            'Schema and consistency matter.',
            'Choosing the right database is part of architecture design.',
          ],
          checkpoint: {
            question: 'What is a database mainly for?',
            options: ['Rendering UI', 'Storing and querying data', 'Writing CSS', 'Reducing font size'],
            correctIndex: 1,
            explanation: 'Databases exist to store data reliably and let systems query it efficiently.',
          },
          reinforcement: {
            simplerExplanation:
              'A database is like a well-organized filing cabinet that keeps important records safe and easy to find.',
            extraExample: {
              title: 'User profile storage',
              inputs: ['Name', 'Email', 'Preferences'],
              output: 'A persistent user record that can be loaded later',
            },
          },
        },
      }),
      'message-queues': lesson({
        id: 'message-queues',
        title: 'Message Queues',
        duration: '11 min',
        sections: {
          whatIs: [
            'Message queues store tasks or events temporarily so one service can hand work to another without waiting.',
            'They help systems stay responsive by making work asynchronous and decoupled.',
          ],
          whyImportant: [
            'They exist because some tasks are slow or bursty and should not block the user-facing request path.',
            'They are used when a system needs background processing, retries, or smooth handling of spikes.',
          ],
          realWorldExample: {
            title: 'Order Confirmation Emails',
            inputs: ['New order event', 'Email service', 'Background worker'],
            output: 'Email sent asynchronously after checkout',
          },
          howItWorks: ['Publish event', 'Queue stores it', 'Worker consumes it', 'Retry on failure'],
          industryApplications: [
            { company: 'E-commerce', description: 'Processes payment and fulfillment tasks asynchronously.' },
            { company: 'Streaming apps', description: 'Handles background media processing and notifications.' },
            { company: 'Logistics systems', description: 'Buffers tasks when many requests arrive at once.' },
          ],
          keyTakeaways: [
            'Queues decouple services.',
            'Background jobs reduce request latency.',
            'Retries are easier with queued work.',
            'Great for burst handling and reliability.',
          ],
          checkpoint: {
            question: 'Why use a message queue?',
            options: ['To block requests longer', 'To decouple and process work asynchronously', 'To compress images', 'To remove databases'],
            correctIndex: 1,
            explanation: 'Message queues let services hand off work without making the user wait.',
          },
          reinforcement: {
            simplerExplanation:
              'A queue is like a to-do line for your system. Tasks wait there until a worker picks them up.',
            extraExample: {
              title: 'Video processing',
              inputs: ['Uploaded video', 'Transcoding job'],
              output: 'The video is processed in the background without slowing the upload request',
            },
          },
        },
      }),
      microservices: lesson({
        id: 'microservices',
        title: 'Microservices',
        duration: '13 min',
        sections: {
          whatIs: [
            'Microservices are a system design approach where an application is split into smaller services that each own a focused responsibility.',
            'Each service can be developed, scaled, and deployed independently while still collaborating with others.',
          ],
          whyImportant: [
            'They exist because large monoliths can become difficult to maintain and deploy as they grow.',
            'They are used when teams need independent deployment, clear boundaries, and better scaling for parts of the system.',
          ],
          realWorldExample: {
            title: 'Ride-sharing Platform',
            inputs: ['Booking', 'Payments', 'Driver matching', 'Notifications'],
            output: 'Separate services working together through APIs',
          },
          howItWorks: ['Split responsibilities', 'Expose APIs', 'Communicate over the network', 'Scale services independently'],
          industryApplications: [
            { company: 'Netflix', description: 'Runs many services for playback, catalog, and recommendations.' },
            { company: 'Uber', description: 'Separates booking, maps, payments, and dispatch logic.' },
            { company: 'Amazon', description: 'Uses service boundaries for product, order, and fulfillment systems.' },
          ],
          keyTakeaways: [
            'Services own focused responsibilities.',
            'Independent deployment is a major benefit.',
            'Networking adds complexity.',
            'Good boundaries matter more than service count.',
          ],
          checkpoint: {
            question: 'What is a microservice?',
            options: ['One huge database', 'A small focused service', 'A CSS module', 'A browser cache'],
            correctIndex: 1,
            explanation: 'Microservices are small, focused services that work together as part of a larger system.',
          },
          reinforcement: {
            simplerExplanation:
              'Instead of one giant team doing everything, you split the work into specialized teams that each handle one job well.',
            extraExample: {
              title: 'Food delivery platform',
              inputs: ['Orders', 'Delivery tracking', 'Payments'],
              output: 'Separate services each handle one responsibility',
            },
          },
        },
      }),
    },
    quizzes: {
      scalability: [
        { id: 1, question: 'Scalability is about handling what?', options: ['Growth', 'Text color', 'Animation speed', 'File naming'], correctIndex: 0, explanation: 'Scalability means the system can handle growth.' },
      ],
      'load-balancing': [
        { id: 1, question: 'What does load balancing do?', options: ['Stores files', 'Distributes traffic', 'Compresses data', 'Encrypts passwords'], correctIndex: 1, explanation: 'Load balancing spreads requests across servers.' },
      ],
      caching: [
        { id: 1, question: 'Caching primarily helps with what?', options: ['Slower access', 'Faster reuse of data', 'Removing databases', 'More network hops'], correctIndex: 1, explanation: 'Caching stores frequently used data for faster access.' },
      ],
      databases: [
        { id: 1, question: 'Databases are mainly used to:', options: ['Render UI', 'Store and query data', 'Animate cards', 'Reduce latency only'], correctIndex: 1, explanation: 'Databases store durable data and support queries.' },
      ],
      'message-queues': [
        { id: 1, question: 'Message queues are useful because they:', options: ['Block work longer', 'Decouple services', 'Delete failures', 'Replace storage'], correctIndex: 1, explanation: 'Queues allow asynchronous decoupled work.' },
      ],
      microservices: [
        { id: 1, question: 'Microservices are:', options: ['Large monoliths', 'Small focused services', 'UI widgets', 'Database indexes'], correctIndex: 1, explanation: 'Microservices split systems into smaller focused services.' },
      ],
    },
  },
}

export const TOPIC_KEYS = Object.keys(TOPIC_LIBRARY)

export function normalizeTopicKey(topic) {
  return TOPIC_LIBRARY[topic] ? topic : TOPIC_KEYS[0]
}

export function getTopicRecord(topic) {
  return TOPIC_LIBRARY[normalizeTopicKey(topic)]
}

export function getTopicRoadmap(topic) {
  return getTopicRecord(topic).roadmap
}

export function getTopicLesson(topic, lessonId) {
  const topicRecord = getTopicRecord(topic)
  return topicRecord.lessons[lessonId] || topicRecord.lessons[topicRecord.roadmap[0].id]
}

export function getTopicQuiz(topic, lessonId) {
  const topicRecord = getTopicRecord(topic)
  return topicRecord.quizzes[lessonId] || topicRecord.quizzes[topicRecord.roadmap[0].id] || []
}

export function getTopicLessonOrder(topic) {
  return getTopicRoadmap(topic).map((item) => item.id)
}

export function getTopicLessonIndex(topic, lessonId) {
  return getTopicLessonOrder(topic).indexOf(lessonId)
}

export const TOPIC_SLUGS = {
  DSA: 'dsa',
  React: 'react',
  'Machine Learning': 'machine-learning',
  'System Design': 'system-design',
}

export const SLUG_TO_TOPIC = Object.fromEntries(
  Object.entries(TOPIC_SLUGS).map(([topic, slug]) => [slug, topic]),
)

export function getTopicFromTopicId(topicId) {
  return SLUG_TO_TOPIC[topicId] || TOPIC_KEYS[0]
}

export function getLessonPath(topic, lessonId) {
  const topicId = TOPIC_SLUGS[normalizeTopicKey(topic)]
  return `/lesson/${topicId}/${lessonId}`
}
