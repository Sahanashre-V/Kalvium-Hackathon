from typing import Any


Question = dict[str, Any]


TOPIC_ALIASES = {
    "dsa": "DSA",
    "data structures": "DSA",
    "data structures algorithms": "DSA",
    "data structures and algorithms": "DSA",
    "algorithms": "DSA",
    "react": "React",
    "reactjs": "React",
    "react js": "React",
    "frontend": "React",
    "ml": "ML",
    "machine learning": "ML",
    "ai ml": "ML",
    "system design": "System Design",
    "system-design": "System Design",
    "systemdesign": "System Design",
    "scalability": "System Design",
}


TOPIC_ORDER = {
    "DSA": ["Arrays", "Linked Lists", "Sorting", "Graphs"],
    "React": ["Components", "State Management", "Hooks", "Routing"],
    "ML": ["Data Preparation", "Model Training", "Evaluation", "Deployment"],
}


ASSESSMENT_QUESTIONS: dict[str, list[Question]] = {
    "DSA": [
        {
            "id": "dsa-assess-arrays-1",
            "topic": "DSA",
            "subtopic": "Arrays",
            "difficulty": "easy",
            "question": "Which operation is usually O(1) for an array when accessing by index?",
            "options": ["Search unsorted value", "Access element at index", "Insert at front", "Delete from middle"],
            "answer": "Access element at index",
            "weak_area": "Arrays",
        },
        {
            "id": "dsa-assess-arrays-2",
            "topic": "DSA",
            "subtopic": "Arrays",
            "difficulty": "medium",
            "question": "For two-sum on an unsorted array, which structure usually improves lookup time?",
            "options": ["Queue", "Hash map", "Stack", "Linked list"],
            "answer": "Hash map",
            "weak_area": "Arrays",
        },
        {
            "id": "dsa-assess-linked-1",
            "topic": "DSA",
            "subtopic": "Linked Lists",
            "difficulty": "easy",
            "question": "What does a singly linked list node usually store besides its value?",
            "options": ["Array length", "Next node reference", "SQL index", "Hash salt"],
            "answer": "Next node reference",
            "weak_area": "Linked Lists",
        },
        {
            "id": "dsa-assess-linked-2",
            "topic": "DSA",
            "subtopic": "Linked Lists",
            "difficulty": "hard",
            "question": "Which pointer strategy is commonly used to detect a cycle in a linked list?",
            "options": ["Binary search", "Two pointers moving at different speeds", "Counting sort", "Depth limit only"],
            "answer": "Two pointers moving at different speeds",
            "weak_area": "Linked Lists",
        },
        {
            "id": "dsa-assess-sorting-1",
            "topic": "DSA",
            "subtopic": "Sorting",
            "difficulty": "medium",
            "question": "Which sorting algorithm is typically stable and O(n log n)?",
            "options": ["Merge sort", "Selection sort", "Quickselect", "Linear search"],
            "answer": "Merge sort",
            "weak_area": "Sorting",
        },
        {
            "id": "dsa-assess-sorting-2",
            "topic": "DSA",
            "subtopic": "Sorting",
            "difficulty": "hard",
            "question": "Why can quicksort degrade to O(n^2)?",
            "options": ["Bad pivot choices create unbalanced partitions", "It always copies every value twice", "It requires a graph", "It cannot compare numbers"],
            "answer": "Bad pivot choices create unbalanced partitions",
            "weak_area": "Sorting",
        },
        {
            "id": "dsa-assess-graphs-1",
            "topic": "DSA",
            "subtopic": "Graphs",
            "difficulty": "medium",
            "question": "Which traversal is best for shortest path in an unweighted graph?",
            "options": ["BFS", "Heap sort", "DFS only", "Binary search"],
            "answer": "BFS",
            "weak_area": "Graphs",
        },
        {
            "id": "dsa-assess-graphs-2",
            "topic": "DSA",
            "subtopic": "Graphs",
            "difficulty": "hard",
            "question": "What data structure is central to Dijkstra's algorithm efficiency?",
            "options": ["Priority queue", "Plain string", "Call stack only", "Circular buffer only"],
            "answer": "Priority queue",
            "weak_area": "Graphs",
        },
    ],
    "React": [
        {
            "id": "react-assess-components-1",
            "topic": "React",
            "subtopic": "Components",
            "difficulty": "easy",
            "question": "What should a React component return?",
            "options": ["A database row", "UI description as JSX", "A compiled binary", "A CSS parser"],
            "answer": "UI description as JSX",
            "weak_area": "Components",
        },
        {
            "id": "react-assess-components-2",
            "topic": "React",
            "subtopic": "Components",
            "difficulty": "medium",
            "question": "Why are props useful in React components?",
            "options": ["They pass data from parent to child", "They replace HTTP", "They mutate the DOM directly", "They encrypt state"],
            "answer": "They pass data from parent to child",
            "weak_area": "Components",
        },
        {
            "id": "react-assess-state-1",
            "topic": "React",
            "subtopic": "State Management",
            "difficulty": "easy",
            "question": "Which data should usually live in component state?",
            "options": ["Values that affect rendering over time", "Package-lock content", "Database migrations", "Static build output"],
            "answer": "Values that affect rendering over time",
            "weak_area": "State Management",
        },
        {
            "id": "react-assess-state-2",
            "topic": "React",
            "subtopic": "State Management",
            "difficulty": "hard",
            "question": "What is a common reason to lift state up?",
            "options": ["Sibling components need the same source of truth", "CSS needs more specificity", "The browser cache is empty", "JSX cannot render strings"],
            "answer": "Sibling components need the same source of truth",
            "weak_area": "State Management",
        },
        {
            "id": "react-assess-hooks-1",
            "topic": "React",
            "subtopic": "Hooks",
            "difficulty": "medium",
            "question": "What does useEffect commonly handle?",
            "options": ["Side effects after render", "HTML validation only", "SQL joins", "Image compression"],
            "answer": "Side effects after render",
            "weak_area": "Hooks",
        },
        {
            "id": "react-assess-hooks-2",
            "topic": "React",
            "subtopic": "Hooks",
            "difficulty": "hard",
            "question": "Why does the dependency array of useEffect matter?",
            "options": ["It controls when the effect reruns", "It chooses the CSS file", "It stores server secrets", "It disables JSX"],
            "answer": "It controls when the effect reruns",
            "weak_area": "Hooks",
        },
        {
            "id": "react-assess-routing-1",
            "topic": "React",
            "subtopic": "Routing",
            "difficulty": "medium",
            "question": "What does client-side routing primarily change?",
            "options": ["Visible view without full page reload", "CPU architecture", "Database engine", "NPM license"],
            "answer": "Visible view without full page reload",
            "weak_area": "Routing",
        },
        {
            "id": "react-assess-routing-2",
            "topic": "React",
            "subtopic": "Routing",
            "difficulty": "hard",
            "question": "What should a route parameter usually represent?",
            "options": ["A dynamic part of the URL", "A CSS variable only", "A webpack plugin", "A memory leak"],
            "answer": "A dynamic part of the URL",
            "weak_area": "Routing",
        },
    ],
    "ML": [
        {
            "id": "ml-assess-data-1",
            "topic": "ML",
            "subtopic": "Data Preparation",
            "difficulty": "easy",
            "question": "Why do teams split data into train and test sets?",
            "options": ["To estimate performance on unseen data", "To make files smaller only", "To remove Python", "To avoid labels completely"],
            "answer": "To estimate performance on unseen data",
            "weak_area": "Data Preparation",
        },
        {
            "id": "ml-assess-data-2",
            "topic": "ML",
            "subtopic": "Data Preparation",
            "difficulty": "medium",
            "question": "What is data leakage?",
            "options": ["When training uses information unavailable at prediction time", "When CSV files are large", "When a model has no features", "When labels are strings"],
            "answer": "When training uses information unavailable at prediction time",
            "weak_area": "Data Preparation",
        },
        {
            "id": "ml-assess-training-1",
            "topic": "ML",
            "subtopic": "Model Training",
            "difficulty": "easy",
            "question": "What does a loss function measure?",
            "options": ["Prediction error to optimize", "Disk speed", "CSS size", "API uptime"],
            "answer": "Prediction error to optimize",
            "weak_area": "Model Training",
        },
        {
            "id": "ml-assess-training-2",
            "topic": "ML",
            "subtopic": "Model Training",
            "difficulty": "hard",
            "question": "What can happen when a model overfits?",
            "options": ["It performs well on training data but poorly on new data", "It cannot load a CSV", "It always improves deployment speed", "It removes all bias"],
            "answer": "It performs well on training data but poorly on new data",
            "weak_area": "Model Training",
        },
        {
            "id": "ml-assess-eval-1",
            "topic": "ML",
            "subtopic": "Evaluation",
            "difficulty": "medium",
            "question": "Which metric is useful when false positives and false negatives both matter?",
            "options": ["F1 score", "File size", "DOM depth", "Sort order"],
            "answer": "F1 score",
            "weak_area": "Evaluation",
        },
        {
            "id": "ml-assess-eval-2",
            "topic": "ML",
            "subtopic": "Evaluation",
            "difficulty": "hard",
            "question": "Why inspect a confusion matrix?",
            "options": ["To see error types across classes", "To compress model weights", "To create random labels", "To replace validation"],
            "answer": "To see error types across classes",
            "weak_area": "Evaluation",
        },
        {
            "id": "ml-assess-deploy-1",
            "topic": "ML",
            "subtopic": "Deployment",
            "difficulty": "medium",
            "question": "What is model drift?",
            "options": ["Production data changes over time", "The model file moves folders", "The GPU fan starts spinning", "The feature names are capitalized"],
            "answer": "Production data changes over time",
            "weak_area": "Deployment",
        },
        {
            "id": "ml-assess-deploy-2",
            "topic": "ML",
            "subtopic": "Deployment",
            "difficulty": "hard",
            "question": "Why monitor prediction distributions after deployment?",
            "options": ["To catch drift or unexpected input patterns", "To rebuild CSS", "To avoid using logs", "To delete training data"],
            "answer": "To catch drift or unexpected input patterns",
            "weak_area": "Deployment",
        },
    ],
    "System Design": [
        {
            "id": "sd-assess-scalability-1",
            "topic": "System Design",
            "subtopic": "scalability",
            "difficulty": "easy",
            "question": "What does horizontal scaling add to a system?",
            "options": ["More powerful CPUs", "More servers", "Less redundancy", "A single database"],
            "answer": "More servers",
            "weak_area": "scalability",
        },
        {
            "id": "sd-assess-caching-1",
            "topic": "System Design",
            "subtopic": "caching",
            "difficulty": "medium",
            "question": "What is the main benefit of caching in system design?",
            "options": ["Increase latency", "Reduce repeated computation", "Replace the database", "Remove APIs"],
            "answer": "Reduce repeated computation",
            "weak_area": "caching",
        },
        {
            "id": "sd-assess-load-1",
            "topic": "System Design",
            "subtopic": "load-balancing",
            "difficulty": "medium",
            "question": "What is a primary benefit of load balancers?",
            "options": ["Store long-term data", "Distribute traffic evenly", "Translate APIs", "Compress images"],
            "answer": "Distribute traffic evenly",
            "weak_area": "load-balancing",
        },
        {
            "id": "sd-assess-db-1",
            "topic": "System Design",
            "subtopic": "databases",
            "difficulty": "hard",
            "question": "What is one trade-off when using a distributed database?",
            "options": ["Faster writes always", "Increased consistency complexity", "Less storage space", "Eliminates backups"],
            "answer": "Increased consistency complexity",
            "weak_area": "databases",
        },
    ],
}


LESSONS: dict[str, dict[str, dict[str, Any]]] = {
    "DSA": {
        "Arrays": {
            "explanation": "Arrays store ordered values in contiguous positions, making index access fast. Most array problems revolve around scanning, two pointers, prefix sums, or hash maps for quick lookup.",
            "examples": ["Use a hash map to solve two-sum in one pass.", "Use two pointers to reverse an array or shrink a search window."],
            "key_points": ["Index access is O(1)", "Middle insertions shift elements", "Hash maps pair well with array scans"],
        },
        "Linked Lists": {
            "explanation": "Linked lists store nodes connected by references. They are useful when insertion and deletion by reference matter, but random access is slow.",
            "examples": ["Use slow and fast pointers to find a cycle.", "Reverse a list by rewiring next pointers one node at a time."],
            "key_points": ["Traversal is O(n)", "Pointer updates are the core skill", "Dummy nodes simplify edge cases"],
        },
        "Sorting": {
            "explanation": "Sorting organizes values so later operations like searching, grouping, and merging become easier. Pick algorithms based on stability, memory, and worst-case needs.",
            "examples": ["Sort intervals by start time before merging.", "Use merge sort when stable O(n log n) behavior matters."],
            "key_points": ["Know time complexity", "Stable sorting preserves equal-item order", "Sorting can reveal structure"],
        },
        "Graphs": {
            "explanation": "Graphs model relationships between entities. Use BFS for unweighted shortest paths, DFS for exploration, and priority queues for weighted paths.",
            "examples": ["Use BFS to find minimum clicks between pages.", "Use Dijkstra to route delivery through weighted roads."],
            "key_points": ["Choose adjacency list for sparse graphs", "Track visited nodes", "Match traversal to edge weights"],
        },
    },
    "React": {
        "Components": {
            "explanation": "Components split UI into reusable pieces. Good components receive data through props, render predictable output, and keep responsibilities focused.",
            "examples": ["Create a ProductCard component that receives product props.", "Extract a SearchInput component shared across pages."],
            "key_points": ["Props flow parent to child", "Keep components focused", "Render from data"],
        },
        "State Management": {
            "explanation": "State represents values that change and affect rendering. Keep state close to where it is used, and lift it when multiple components need one source of truth.",
            "examples": ["Store selected tab in state.", "Lift cart items to a parent used by header and checkout."],
            "key_points": ["Avoid duplicate state", "Updates trigger rerenders", "Derived values usually do not need state"],
        },
        "Hooks": {
            "explanation": "Hooks let function components use state, effects, memoization, refs, and shared behavior. The dependency array controls when effects and memoized values update.",
            "examples": ["Fetch profile data in useEffect when userId changes.", "Use useMemo for expensive filtered lists."],
            "key_points": ["Hooks run in consistent order", "Effects handle side effects", "Dependencies must match used values"],
        },
        "Routing": {
            "explanation": "Routing maps URLs to screens in a single-page app. Route params represent dynamic URL parts like product IDs or usernames.",
            "examples": ["Use /products/:id for a product details page.", "Navigate after login to the dashboard route."],
            "key_points": ["URLs should describe app state", "Params are dynamic", "Nested routes model nested UI"],
        },
    },
    "ML": {
        "Data Preparation": {
            "explanation": "Data preparation turns raw data into reliable features. It includes cleaning, splitting, encoding, scaling, and avoiding leakage.",
            "examples": ["Split by time for forecasting data.", "Fit scalers on training data only, then transform validation data."],
            "key_points": ["Prevent leakage", "Handle missing values", "Keep train/test separation clean"],
        },
        "Model Training": {
            "explanation": "Training adjusts model parameters to reduce loss. The goal is not only low training error, but performance that generalizes to new data.",
            "examples": ["Use regularization to reduce overfitting.", "Tune learning rate when loss is unstable."],
            "key_points": ["Loss guides optimization", "Overfitting hurts generalization", "Validation helps choose models"],
        },
        "Evaluation": {
            "explanation": "Evaluation measures whether a model solves the real problem. Choose metrics based on business cost, class imbalance, and error tolerance.",
            "examples": ["Use recall when missed fraud is costly.", "Inspect a confusion matrix for per-class mistakes."],
            "key_points": ["Accuracy can mislead", "Metrics must match goals", "Look at error types"],
        },
        "Deployment": {
            "explanation": "Deployment serves model predictions in real environments. Monitor inputs, outputs, latency, and drift because production data changes.",
            "examples": ["Log prediction confidence over time.", "Alert when input feature ranges shift sharply."],
            "key_points": ["Monitor drift", "Version models", "Design rollback paths"],
        },
    },
}


QUIZ_QUESTIONS: dict[str, dict[str, list[Question]]] = {}


def _build_quiz_questions() -> dict[str, dict[str, list[Question]]]:
    banks: dict[str, dict[str, list[Question]]] = {}
    for domain, subtopics in TOPIC_ORDER.items():
        banks[domain] = {}
        for subtopic in subtopics:
            base = subtopic.lower().replace(" ", "-")
            banks[domain][subtopic] = [
                {
                    "id": f"{domain.lower()}-quiz-{base}-{idx}",
                    "topic": domain,
                    "subtopic": subtopic,
                    "difficulty": ["easy", "medium", "medium", "hard"][idx % 4],
                    "question": prompt,
                    "options": options,
                    "answer": answer,
                    "weak_area": subtopic,
                }
                for idx, (prompt, options, answer) in enumerate(_quiz_prompts(domain, subtopic), start=1)
            ]
    return banks


def _quiz_prompts(domain: str, subtopic: str) -> list[tuple[str, list[str], str]]:
    context = {
        "DSA": "in a coding interview or production data pipeline",
        "React": "while building a customer-facing dashboard",
        "ML": "while shipping a prediction feature",
    }[domain]
    return [
        (f"When using {subtopic} {context}, what should you choose first?", ["The simplest structure that matches the access pattern", "The newest library name", "A random optimization", "Only the largest possible server"], "The simplest structure that matches the access pattern"),
        (f"A bug appears in a {subtopic} solution. What is the best first debugging step?", ["Trace a tiny realistic example", "Rewrite everything immediately", "Ignore edge cases", "Change the product goal"], "Trace a tiny realistic example"),
        (f"Which signal suggests your {subtopic} approach is working?", ["It handles normal and edge cases predictably", "It only works on one demo input", "It hides every error", "It requires manual database edits"], "It handles normal and edge cases predictably"),
        (f"How should you explain a {subtopic} tradeoff to a teammate?", ["State the cost, benefit, and when it matters", "Only say it is faster", "Avoid examples", "Use unrelated jargon"], "State the cost, benefit, and when it matters"),
        (f"Your {subtopic} implementation is slow on large inputs. What should you inspect?", ["The dominant operation and data size", "Only the variable names", "The app logo", "The README heading"], "The dominant operation and data size"),
        (f"What makes a {subtopic} solution maintainable?", ["Clear boundaries and named assumptions", "Hidden side effects everywhere", "Duplicated logic", "Unvalidated magic values"], "Clear boundaries and named assumptions"),
        (f"How do you reduce risk before using {subtopic} in production?", ["Test realistic edge cases", "Skip review", "Delete monitoring", "Hardcode all results"], "Test realistic edge cases"),
        (f"What should documentation for {subtopic} include?", ["Expected inputs, outputs, and limits", "Only the author's name", "No examples", "Unrelated release notes"], "Expected inputs, outputs, and limits"),
        (f"When requirements change, what helps adapt a {subtopic} design?", ["Small focused units", "One giant function", "Global mutation everywhere", "No tests"], "Small focused units"),
        (f"What is a strong review comment for {subtopic} work?", ["This edge case breaks because the input can be empty", "Looks fine maybe", "Use more code", "Change the colors"], "This edge case breaks because the input can be empty"),
        (f"How should errors be handled around {subtopic}?", ["Return clear failures with enough context", "Silently swallow everything", "Crash without a message", "Expose secrets"], "Return clear failures with enough context"),
        (f"What is the best way to improve confidence in {subtopic}?", ["Compare expected and actual behavior on representative cases", "Run it once manually", "Avoid measuring", "Assume correctness"], "Compare expected and actual behavior on representative cases"),
    ]


QUIZ_QUESTIONS = _build_quiz_questions()
