import { Topic, Difficulty, QuestionItem, AnswerEvaluation } from '../types/interview';

export const TOPIC_DETAILS: Record<Topic, {
  iconName: string;
  badge: string;
  description: string;
  popularRoles: string[];
  keyThemes: string[];
}> = {
  'HR Interview': {
    iconName: 'UserCheck',
    badge: 'Behavioral & Fit',
    description: 'Master behavioral questions, the STAR method, strengths & weaknesses, and cultural fit.',
    popularRoles: ['All Roles', 'Campus Placements', 'Internships', 'Management Trainee'],
    keyThemes: ['Tell me about yourself', 'Conflict resolution', 'Teamwork', 'Handling failure', 'Career goals'],
  },
  'SQL': {
    iconName: 'Database',
    badge: 'Data & Queries',
    description: 'Relational databases, joins, aggregations, window functions, indexing, and query optimization.',
    popularRoles: ['Data Analyst', 'Backend Dev', 'Data Engineer', 'Business Analyst'],
    keyThemes: ['INNER/LEFT JOIN', 'GROUP BY & HAVING', 'Subqueries', 'ROW_NUMBER & RANK', 'Indexing'],
  },
  'Python': {
    iconName: 'Code',
    badge: 'Programming',
    description: 'Core syntax, data structures, OOP concepts, list comprehensions, generators, and algorithms.',
    popularRoles: ['Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Full-Stack Dev'],
    keyThemes: ['Mutability & Lists', 'Decorators & Generators', 'OOP & Inheritance', 'Exception Handling', 'Pandas/Numpy basics'],
  },
  'Excel': {
    iconName: 'Table',
    badge: 'Business Analysis',
    description: 'Formulas, XLOOKUP, Pivot Tables, data cleaning, logical functions, and business reporting.',
    popularRoles: ['Financial Analyst', 'Marketing Analyst', 'Consultant', 'Operations'],
    keyThemes: ['XLOOKUP & INDEX/MATCH', 'Pivot Tables & Slicers', 'Conditional Formatting', 'Nested IF/IFS', 'Data Validation'],
  },
  'Power BI': {
    iconName: 'BarChart3',
    badge: 'BI & Dashboards',
    description: 'DAX measures, star schema, Power Query transformations, relationship cardinality, and visual reporting.',
    popularRoles: ['Power BI Developer', 'BI Analyst', 'Analytics Consultant', 'Dashboard Specialist'],
    keyThemes: ['CALCULATE & RELATED', 'Star Schema vs Snowflake', 'Cardinality (1:M)', 'Row vs Filter Context', 'Data Gateway'],
  },
  'Aptitude': {
    iconName: 'BrainCircuit',
    badge: 'Quant & Logic',
    description: 'Quantitative aptitude, logical reasoning, percentages, time & work, probability, and analytical thinking.',
    popularRoles: ['Campus Placement Drives', 'TCS/Infosys/Wipro/Accenture', 'Bank PO', 'Aptitude Screening'],
    keyThemes: ['Time, Speed & Distance', 'Percentages & Profit/Loss', 'Permutations & Probability', 'Syllogisms & Logic', 'Data Interpretation'],
  },
};

export const SAMPLE_QUESTIONS: QuestionItem[] = [
  // HR INTERVIEW - Beginner
  {
    id: 'hr-beg-1',
    topic: 'HR Interview',
    difficulty: 'Beginner',
    question: 'Tell me about yourself and why you are interested in this role.',
    contextOrScenario: 'First round HR screening question. The interviewer wants to know your background, education, and genuine interest in the company.',
    categoryHint: 'Use the Present-Past-Future structure (Degree -> Key Project/Achievement -> Why this company). Keep it under 2 minutes.',
    expectedKeyPoints: ['Current educational background and major', 'Key technical/academic project or internship experience', 'Core strengths relevant to the job', 'Why this specific company matches your aspirations'],
  },
  {
    id: 'hr-beg-2',
    topic: 'HR Interview',
    difficulty: 'Beginner',
    question: 'What are your greatest strengths, and what is one area you are working to improve?',
    contextOrScenario: 'Testing self-awareness, honesty, and whether your weakness is actionable rather than a red flag.',
    categoryHint: 'Mention a concrete strength with proof, and choose a genuine developmental area with the active steps you take to improve it.',
    expectedKeyPoints: ['1-2 real strengths backed by an example', 'A genuine weakness that is not fatal to the job', 'Concrete proactive steps being taken to overcome the weakness'],
  },
  {
    id: 'hr-beg-3',
    topic: 'HR Interview',
    difficulty: 'Beginner',
    question: 'Where do you see yourself in 3 to 5 years?',
    contextOrScenario: 'Interviewer wants to evaluate your career ambition, realistic expectations, and whether you are likely to stay with the company.',
    categoryHint: 'Focus on skill mastery, increasing ownership, taking on mentorship, and growing within the industry.',
    expectedKeyPoints: ['Deepening technical/domain expertise', 'Taking on greater ownership and project delivery', 'Alignment with organizational growth paths'],
  },
  {
    id: 'hr-beg-4',
    topic: 'HR Interview',
    difficulty: 'Beginner',
    question: 'Why should we hire you as a fresher over other applicants with similar academic backgrounds?',
    contextOrScenario: 'Differentiator question testing confidence, research on the role, and enthusiasm.',
    categoryHint: 'Combine your technical competence, fast learning agility, cultural alignment, and proactive problem-solving mindset.',
    expectedKeyPoints: ['Unique blend of academic rigor and hands-on projects', 'Demonstrated fast learning ability outside coursework', 'Strong alignment with company values and mission', 'Eagerness to contribute from day one'],
  },
  {
    id: 'hr-beg-5',
    topic: 'HR Interview',
    difficulty: 'Beginner',
    question: 'What do you know about our company, and what recent news or project of ours impressed you?',
    contextOrScenario: 'Tests candidate preparation, homework, and genuine curiosity about the employer.',
    categoryHint: 'Cite company products, core market, recent press release, or core engineering achievements.',
    expectedKeyPoints: ['Core products, services, or business model', 'Recent milestone or technological initiative', 'Understanding of the company culture or clients'],
  },

  // HR INTERVIEW - Intermediate
  {
    id: 'hr-int-1',
    topic: 'HR Interview',
    difficulty: 'Intermediate',
    question: 'Describe a situation where you had a disagreement with a team member during a college project. How did you resolve it?',
    contextOrScenario: 'Behavioral question testing emotional intelligence, collaboration, and conflict resolution.',
    categoryHint: 'Structure using STAR (Situation, Task, Action, Result). Focus on empathy, active listening, and focusing on project goals.',
    expectedKeyPoints: ['Clear context of the disagreement', 'Listening to the other person\'s viewpoint objectively', 'Proposing a middle-ground or data-driven compromise', 'Positive outcome for the project'],
  },
  {
    id: 'hr-int-2',
    topic: 'HR Interview',
    difficulty: 'Intermediate',
    question: 'Tell me about a time you missed a project deadline or made a critical mistake. How did you handle it?',
    contextOrScenario: 'Evaluates accountability, resilience, and problem-solving under pressure.',
    categoryHint: 'Own the mistake without blaming others; explain the immediate mitigation and the preventive system you introduced.',
    expectedKeyPoints: ['Owning up to the mistake promptly', 'Immediate communication with stakeholders/team', 'Corrective action taken', 'Lessons learned to prevent recurrence'],
  },
  {
    id: 'hr-int-3',
    topic: 'HR Interview',
    difficulty: 'Intermediate',
    question: 'How do you handle tight deadlines when you have multiple competing academic or project assignments?',
    contextOrScenario: 'Evaluates time management, prioritization frameworks, and stress tolerance.',
    categoryHint: 'Mention frameworks like the Eisenhower Matrix, time blocking, communicating early, and breaking tasks into milestones.',
    expectedKeyPoints: ['Prioritization methodology (urgency vs importance)', 'Breaking large deliverables into subtasks', 'Early stakeholder communication if adjustments are needed', 'Maintaining quality'],
  },

  // HR INTERVIEW - Advanced
  {
    id: 'hr-adv-1',
    topic: 'HR Interview',
    difficulty: 'Advanced',
    question: 'Tell me about a time you had to lead a project with ambiguous requirements and no clear direction. What was your strategy?',
    contextOrScenario: 'Senior campus / management trainee level. Evaluates ambiguity handling, initiative, and structured discovery.',
    categoryHint: 'Explain how you defined scope, created prototypes or clarifying questions, aligned stakeholders, and drove progress.',
    expectedKeyPoints: ['Deconstructing ambiguity into hypotheses', 'Proactive stakeholder interviews and requirement gathering', 'Iterative progress with feedback loops', 'Successful delivery'],
  },
  {
    id: 'hr-adv-2',
    topic: 'HR Interview',
    difficulty: 'Advanced',
    question: 'If you joined our company and noticed a major inefficiency in an established team process during your first month, how would you approach changing it?',
    contextOrScenario: 'Assesses diplomatic change management, humility, respect for existing workflows, and data-backed persuasion.',
    categoryHint: 'Do not push sudden changes immediately. First understand historical context, gather evidence, consult mentors, and propose a small pilot.',
    expectedKeyPoints: ['Listening first to understand why the existing process exists', 'Quantifying the inefficiency with data', 'Collaborating with teammates rather than dictating', 'Proposing a low-risk pilot'],
  },

  // SQL - Beginner
  {
    id: 'sql-beg-1',
    topic: 'SQL',
    difficulty: 'Beginner',
    question: 'What is the difference between WHERE and HAVING clauses in SQL? Provide an example for each.',
    contextOrScenario: 'Classic placement technical screening question for data and software roles.',
    categoryHint: 'WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY.',
    expectedKeyPoints: ['WHERE operates on individual records before GROUP BY', 'HAVING operates on aggregated results (SUM, COUNT, AVG)', 'HAVING cannot be used without aggregate or GROUP BY in standard SQL', 'Accurate syntax example'],
  },
  {
    id: 'sql-beg-2',
    topic: 'SQL',
    difficulty: 'Beginner',
    question: 'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with a practical scenario.',
    contextOrScenario: 'Core relational database interview test. Tests visual and logical understanding of set joins.',
    categoryHint: 'Consider two tables: Customers and Orders. Explain what happens when a customer has no orders or an order has no valid customer.',
    expectedKeyPoints: ['INNER JOIN: only matching rows from both tables', 'LEFT JOIN: all rows from left table, NULL for non-matching right table', 'FULL OUTER JOIN: union of matching and non-matching rows from both sides', 'Practical use case'],
  },
  {
    id: 'sql-beg-3',
    topic: 'SQL',
    difficulty: 'Beginner',
    question: 'How do you find the second highest salary from an Employee table without using complex window functions?',
    contextOrScenario: 'The most frequent fresher placement question across IT and analytics companies.',
    categoryHint: 'You can use subqueries with MAX() or LIMIT/OFFSET in MySQL/PostgreSQL.',
    expectedKeyPoints: ['SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)', 'Alternative: ORDER BY salary DESC LIMIT 1 OFFSET 1', 'Handling duplicate salaries with DISTINCT'],
  },

  // SQL - Intermediate
  {
    id: 'sql-int-1',
    topic: 'SQL',
    difficulty: 'Intermediate',
    question: 'What are SQL Window Functions? Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() with an example.',
    contextOrScenario: 'Intermediate analytics and data engineering interview.',
    categoryHint: 'Window functions perform calculations across a set of table rows related to the current row without collapsing them into a single row.',
    expectedKeyPoints: ['Calculation over partition without group collapsing', 'ROW_NUMBER: unique sequential integers (1, 2, 3, 4)', 'RANK: leaves gaps upon ties (1, 2, 2, 4)', 'DENSE_RANK: no gaps upon ties (1, 2, 2, 3)'],
  },
  {
    id: 'sql-int-2',
    topic: 'SQL',
    difficulty: 'Intermediate',
    question: 'What are Database Indexes? What is the difference between a Clustered and a Non-Clustered index, and when can indexing hurt performance?',
    contextOrScenario: 'Evaluates physical database design and query performance understanding.',
    categoryHint: 'Think of a book: clustered index is the page numbers (physical order); non-clustered index is the index at the back of the book.',
    expectedKeyPoints: ['Clustered index dictates the physical sorting of rows (only one per table)', 'Non-clustered index stores pointers/keys to data rows', 'Over-indexing slows down INSERT, UPDATE, and DELETE operations', 'Index lookup vs full table scan'],
  },
  {
    id: 'sql-int-3',
    topic: 'SQL',
    difficulty: 'Intermediate',
    question: 'Write a query to find all customers who have placed at least 3 orders and whose total spend exceeds $1,000.',
    contextOrScenario: 'Tests GROUP BY, COUNT, SUM, and HAVING with multiple condition filters.',
    categoryHint: 'Use GROUP BY customer_id, with HAVING COUNT(order_id) >= 3 AND SUM(order_amount) > 1000.',
    expectedKeyPoints: ['JOIN between Customers and Orders (or grouping Orders)', 'GROUP BY customer_id / customer_name', 'HAVING COUNT(order_id) >= 3', 'AND SUM(amount) > 1000'],
  },

  // SQL - Advanced
  {
    id: 'sql-adv-1',
    topic: 'SQL',
    difficulty: 'Advanced',
    question: 'How do Common Table Expressions (CTEs) work, and how would you use a Recursive CTE to traverse an organizational hierarchy table (Employee and ManagerID)?',
    contextOrScenario: 'Senior data analyst and backend developer interview.',
    categoryHint: 'A recursive CTE has an Anchor member, UNION ALL, and a Recursive member that references the CTE itself until the termination condition is met.',
    expectedKeyPoints: ['WITH RECURSIVE syntax', 'Anchor query selecting top-level bosses (ManagerID IS NULL)', 'UNION ALL with join back to CTE on ManagerID = EmployeeID', 'Termination condition preventing infinite loops'],
  },
  {
    id: 'sql-adv-2',
    topic: 'SQL',
    difficulty: 'Advanced',
    question: 'A critical dashboard query joining 4 large tables has slowed down from 2 seconds to 45 seconds. Walk me through your step-by-step query optimization methodology.',
    contextOrScenario: 'Production troubleshooting scenario.',
    categoryHint: 'Start with EXPLAIN ANALYZE, look for full table scans, evaluate missing indexes, check JOIN order and cardinality, check for SELECT * or non-sargable WHERE predicates.',
    expectedKeyPoints: ['Run EXPLAIN ANALYZE to inspect execution plan', 'Identify costly table scans, nested loops, or disk spills', 'Verify selective indexes on foreign keys and filter columns', 'Refactor subqueries or non-sargable functions (e.g. YEAR(date))', 'Consider materialized views or partitioning'],
  },

  // PYTHON - Beginner
  {
    id: 'py-beg-1',
    topic: 'Python',
    difficulty: 'Beginner',
    question: 'What is the difference between a List and a Tuple in Python? When would you prefer a Tuple over a List?',
    contextOrScenario: 'Core foundational Python question asked in almost every technical interview.',
    categoryHint: 'Focus on mutability, memory allocation, syntax, and hashability (e.g., dictionary keys).',
    expectedKeyPoints: ['Lists are mutable ([...]), tuples are immutable ((...))', 'Tuples consume less memory and have faster iteration', 'Tuples can be used as dictionary keys if elements are hashable', 'Tuples provide data integrity for read-only constants'],
  },
  {
    id: 'py-beg-2',
    topic: 'Python',
    difficulty: 'Beginner',
    question: 'Explain what a List Comprehension is in Python and rewrite this loop into one: `squares = []; for x in range(10): if x % 2 == 0: squares.append(x**2)`',
    contextOrScenario: 'Tests idiomatic Python (Pythonic code) writing.',
    categoryHint: 'Syntax: `[expression for item in iterable if condition]`',
    expectedKeyPoints: ['Concise syntax for creating lists from iterables', 'Correct rewrite: `[x**2 for x in range(10) if x % 2 == 0]`', 'Readability benefits over verbose for-loops'],
  },
  {
    id: 'py-beg-3',
    topic: 'Python',
    difficulty: 'Beginner',
    question: 'What is the difference between `==` and `is` in Python? Give an example where they return different results.',
    contextOrScenario: 'Tests deep understanding of value equality vs object identity in memory.',
    categoryHint: '`==` checks equality of values, whereas `is` checks whether two variables point to the exact same memory location (id(a) == id(b)).',
    expectedKeyPoints: ['`==` tests value equivalence', '`is` tests object identity (memory address)', 'Example: `a = [1, 2]`; `b = [1, 2]`; `a == b` is True, `a is b` is False'],
  },

  // PYTHON - Intermediate
  {
    id: 'py-int-1',
    topic: 'Python',
    difficulty: 'Intermediate',
    question: 'What are Python Generators and the `yield` keyword? How do they differ from regular functions in terms of memory efficiency?',
    contextOrScenario: 'Tests understanding of lazy evaluation and handling large datasets.',
    categoryHint: 'Generators produce values on the fly without storing the entire sequence in RAM, pausing execution at `yield`.',
    expectedKeyPoints: ['Functions containing `yield` return a generator iterator', 'Lazy evaluation: values computed only when requested (`next()`)', 'O(1) memory overhead compared to storing full list in memory', 'Ideal for processing streaming data or large log files'],
  },
  {
    id: 'py-int-2',
    topic: 'Python',
    difficulty: 'Intermediate',
    question: 'What is a Decorator in Python? Explain how it works and write a simple decorator that logs the execution time of a function.',
    contextOrScenario: 'High-frequency Python interview topic evaluating functional programming concepts.',
    categoryHint: 'A decorator is a callable that takes another function as an argument, extends its behavior without modifying it, and returns the modified function.',
    expectedKeyPoints: ['Takes function as argument and returns wrapper', 'Uses `*args, **kwargs` to support any function signature', 'Uses `functools.wraps` to preserve docstrings/metadata', 'Time tracking using `time.time()` or `time.perf_counter()`'],
  },
  {
    id: 'py-int-3',
    topic: 'Python',
    difficulty: 'Intermediate',
    question: 'Explain the Global Interpreter Lock (GIL) in CPython. How does it affect multithreading vs multiprocessing for CPU-bound vs I/O-bound tasks?',
    contextOrScenario: 'System-level Python architecture interview question.',
    categoryHint: 'GIL allows only one native thread to execute Python bytecode at a time.',
    expectedKeyPoints: ['GIL prevents true parallel thread execution in CPU-bound tasks', 'I/O-bound tasks still benefit from multithreading (GIL released during I/O)', 'CPU-bound tasks require multiprocessing to leverage multiple CPU cores', 'AsyncIO as single-threaded concurrency alternative'],
  },

  // PYTHON - Advanced
  {
    id: 'py-adv-1',
    topic: 'Python',
    difficulty: 'Advanced',
    question: 'Explain Python\'s memory management, reference counting, and garbage collection. How does Python detect and clean up circular references?',
    contextOrScenario: 'Senior developer / core architecture placement question.',
    categoryHint: 'Python uses reference counting as primary mechanism, supplemented by a cyclic garbage collector using generational algorithms (Gen 0, 1, 2).',
    expectedKeyPoints: ['Reference counting: object deallocated when count reaches 0', 'Circular reference problem: objects referencing each other never reach 0', 'Cyclic GC tracks container objects (lists, dicts, instances) using doubly linked lists', 'Generational GC (Gen 0, Gen 1, Gen 2) with collection thresholds'],
  },
  {
    id: 'py-adv-2',
    topic: 'Python',
    difficulty: 'Advanced',
    question: 'How do Python Metaclasses work? What is `type` in Python, and when would you use a custom metaclass instead of a class decorator or `__init_subclass__`?',
    contextOrScenario: 'Deep metaprogramming question.',
    categoryHint: 'In Python, classes are themselves instances of metaclasses. The default metaclass is `type`.',
    expectedKeyPoints: ['Metaclass is the class of a class (`Class = Metaclass(...)`)', 'Overrides `__new__` or `__init__` before class creation', 'Use cases: API schema validation, automatic registry, enforcing coding contracts', 'Modern Python prefers `__init_subclass__` for simpler subclass interception'],
  },

  // EXCEL - Beginner
  {
    id: 'xl-beg-1',
    topic: 'Excel',
    difficulty: 'Beginner',
    question: 'What is the difference between VLOOKUP and XLOOKUP in Excel? Why is XLOOKUP considered superior?',
    contextOrScenario: 'Essential business analyst and finance interview screening question.',
    categoryHint: 'VLOOKUP searches left-to-right only and requires column index numbers; XLOOKUP can search in any direction and uses direct array ranges.',
    expectedKeyPoints: ['XLOOKUP searches left, right, top, bottom; VLOOKUP only searches right of key column', 'XLOOKUP defaults to exact match (no FALSE needed)', 'XLOOKUP does not break if columns are inserted/deleted', 'Built-in `if_not_found` argument replaces IFERROR'],
  },
  {
    id: 'xl-beg-2',
    topic: 'Excel',
    difficulty: 'Beginner',
    question: 'How do Pivot Tables work, and what are the four primary areas of the Pivot Table field list?',
    contextOrScenario: 'Evaluates baseline data summarization capabilities.',
    categoryHint: 'Filters, Columns, Rows, and Values.',
    expectedKeyPoints: ['Summarizes large datasets dynamically without formulas', 'Rows: groups categories vertically', 'Columns: organizes dimensions horizontally', 'Values: performs aggregations (SUM, COUNT, AVERAGE)', 'Filters: applies global dataset slicing'],
  },
  {
    id: 'xl-beg-3',
    topic: 'Excel',
    difficulty: 'Beginner',
    question: 'What is the difference between relative, absolute, and mixed cell references in Excel? How do you toggle between them?',
    contextOrScenario: 'Testing fundamental formula hygiene.',
    categoryHint: 'A1 vs $A$1 vs $A1 vs A$1; F4 key toggles the dollar signs.',
    expectedKeyPoints: ['Relative (A1): changes dynamically when copied', 'Absolute ($A$1): stays locked on specific cell', 'Mixed ($A1 or A$1): locks only column or only row', 'F4 shortcut key usage'],
  },

  // EXCEL - Intermediate
  {
    id: 'xl-int-1',
    topic: 'Excel',
    difficulty: 'Intermediate',
    question: 'How does the INDEX and MATCH combination work, and why was it traditionally preferred over VLOOKUP?',
    contextOrScenario: 'Analytics and financial modeling assessment.',
    categoryHint: 'INDEX retrieves the value at row/col coordinate; MATCH locates the position of a lookup value.',
    expectedKeyPoints: ['INDEX(return_range, row_num, [col_num])', 'MATCH(lookup_value, lookup_range, 0) finds relative index', 'Can look to the left of the lookup column', 'Faster performance on large spreadsheets and resilient to column insertions'],
  },
  {
    id: 'xl-int-2',
    topic: 'Excel',
    difficulty: 'Intermediate',
    question: 'Explain how you would write a formula to calculate a tiered sales commission: 5% if sales <= $10,000; 10% on sales between $10,001 and $50,000; and 15% on sales over $50,000.',
    contextOrScenario: 'Tests nested IF statements, IFS function, or lookup table logic.',
    categoryHint: 'Can be solved using nested IF(`=IF(sales<=10000, sales*0.05, IF(sales<=50000, ...))`) or `IFS()` function.',
    expectedKeyPoints: ['Order of conditions is critical (evaluating thresholds logically)', 'Syntax: `=IFS(A2<=10000, A2*0.05, A2<=50000, A2*0.10, A2>50000, A2*0.15)`', 'Alternative marginal bracket breakdown if cumulative tiered commission is requested'],
  },
  {
    id: 'xl-int-3',
    topic: 'Excel',
    difficulty: 'Intermediate',
    question: 'What is the purpose of Data Validation in Excel, and how would you create a dependent (cascading) drop-down list?',
    contextOrScenario: 'Evaluates user interface design and spreadsheet governance.',
    categoryHint: 'Dependent drop-downs update based on prior selection (e.g., Country -> State) using named ranges and the INDIRECT function.',
    expectedKeyPoints: ['Data validation restricts input types to prevent erroneous data', 'Named ranges for parent and child lists', 'Using `=INDIRECT(parent_cell)` in the secondary validation rule', 'Ensuring named range names match parent category items exactly'],
  },

  // EXCEL - Advanced
  {
    id: 'xl-adv-1',
    topic: 'Excel',
    difficulty: 'Advanced',
    question: 'How do Dynamic Array formulas work in modern Excel (e.g., FILTER, UNIQUE, SORT)? What is the `#SPILL!` error and how do you resolve it?',
    contextOrScenario: 'Modern Excel 365 calculation engine assessment.',
    categoryHint: 'Dynamic arrays automatically spill multiple results into adjacent cells without pressing Ctrl+Shift+Enter.',
    expectedKeyPoints: ['Calculation engine automatically outputs array to adjacent cells', 'Spill range operator (`#`) references entire array (e.g., A2#)', '`#SPILL!` occurs when cells in the output path are not empty', 'Resolution: clear blocking cells or delete overlapping content'],
  },
  {
    id: 'xl-adv-2',
    topic: 'Excel',
    difficulty: 'Advanced',
    question: 'Explain how Power Query transforms data in Excel. Walk me through how you would unpivot a dataset where months are columns into a tabular format suitable for analysis.',
    contextOrScenario: 'ETL and automated reporting interview question.',
    categoryHint: 'Power Query handles Extract-Transform-Load via the M language. Unpivoting converts wide cross-tabs into long tall tables.',
    expectedKeyPoints: ['Select identifier columns (e.g., Product, Region)', 'Choose "Unpivot Other Columns" in Power Query Editor', 'Creates Attribute (Month) and Value (Sales) columns', 'Reproducible ETL steps refreshable on new raw data imports'],
  },

  // POWER BI - Beginner
  {
    id: 'pbi-beg-1',
    topic: 'Power BI',
    difficulty: 'Beginner',
    question: 'What is the difference between a Calculated Column and a Measure in Power BI? When would you use each?',
    contextOrScenario: 'The single most common Power BI placement question.',
    categoryHint: 'Calculated column computes row-by-row during refresh and occupies RAM; Measure computes on-the-fly based on visual filter context.',
    expectedKeyPoints: ['Calculated Column: row context, calculated during data load, stored in memory, increases file size', 'Measure: calculated dynamically at query time based on visual slicers/filters', 'Use Calculated Columns for row slicers or grouping dimensions', 'Use Measures for aggregations and KPIs (Total Sales, YoY Growth)'],
  },
  {
    id: 'pbi-beg-2',
    topic: 'Power BI',
    difficulty: 'Beginner',
    question: 'What are the core components of Power BI (Power Query, Data Model, Visualizations) and what role does each play?',
    contextOrScenario: 'Tests holistic architecture understanding of the BI pipeline.',
    categoryHint: 'ETL -> Modeling & Relationships -> Interactive Reporting.',
    expectedKeyPoints: ['Power Query: data ingestion, cleaning, shaping, ETL', 'Data Model: table relationships, keys, DAX measures, star schema', 'Report/Visualizations: charts, cards, slicers, user experience', 'Power BI Service: cloud sharing, scheduled refreshes, workspaces'],
  },
  {
    id: 'pbi-beg-3',
    topic: 'Power BI',
    difficulty: 'Beginner',
    question: 'What is the difference between Star Schema and Snowflake Schema in data modeling? Which is recommended for Power BI and why?',
    contextOrScenario: 'Dimensional modeling fundamentals.',
    categoryHint: 'Star schema has fact table surrounded by single-layer dimension tables; snowflake normalizes dimension tables into sub-dimensions.',
    expectedKeyPoints: ['Star Schema: central Fact table connected directly to Dimension tables', 'Snowflake: dimensions are normalized into hierarchies (e.g., Product -> Subcategory -> Category)', 'Power BI VertiPaq engine is heavily optimized for Star Schema', 'Star schema simplifies DAX, improves compression, and accelerates query performance'],
  },

  // POWER BI - Intermediate
  {
    id: 'pbi-int-1',
    topic: 'Power BI',
    difficulty: 'Intermediate',
    question: 'Explain how the `CALCULATE()` function works in DAX. What is context transition and why is `CALCULATE()` so fundamental?',
    contextOrScenario: 'Evaluates core DAX mastery.',
    categoryHint: 'CALCULATE evaluates an expression in a modified filter context. It is the only function that transforms row context into filter context.',
    expectedKeyPoints: ['Syntax: `CALCULATE(Expression, Filter1, Filter2, ...)`', 'Modifies, overrides, or expands current visual filter context', 'Performs context transition when invoked inside a row context', 'Enables time intelligence, percentage of totals, and conditional aggregations'],
  },
  {
    id: 'pbi-int-2',
    topic: 'Power BI',
    difficulty: 'Intermediate',
    question: 'What is the difference between Active and Inactive relationships in Power BI? How do you utilize an inactive relationship in a DAX measure?',
    contextOrScenario: 'Scenario: Orders table has `OrderDate` and `ShipDate`, both linked to a single `Calendar` date table.',
    categoryHint: 'Only one relationship can be active between two tables. Use `USERELATIONSHIP()` inside `CALCULATE()` to activate an inactive relationship.',
    expectedKeyPoints: ['Only one active relationship allowed between two tables at a time', 'Prevents ambiguous filter paths in relational schema', 'Inactive relationship shown as dotted line', 'Activated inside DAX measure using `CALCULATE(..., USERELATIONSHIP(Orders[ShipDate], Calendar[Date]))`'],
  },
  {
    id: 'pbi-int-3',
    topic: 'Power BI',
    difficulty: 'Intermediate',
    question: 'Explain the difference between Row-Level Security (RLS) and Object-Level Security (OLS) in Power BI. How do you implement dynamic RLS?',
    contextOrScenario: 'Enterprise governance and security question.',
    categoryHint: 'RLS restricts data rows based on user identity; OLS hides entire tables or columns. Dynamic RLS uses `USERPRINCIPALNAME()`.',
    expectedKeyPoints: ['RLS filters rows for viewers; OLS restricts entire columns/tables', 'Create security roles in Power BI Desktop with DAX filter predicates', 'Dynamic RLS matches `USERPRINCIPALNAME()` or `USERNAME()` with user mapping table', 'Assign security groups/users in Power BI Service workspace'],
  },

  // POWER BI - Advanced
  {
    id: 'pbi-adv-1',
    topic: 'Power BI',
    difficulty: 'Advanced',
    question: 'Explain the internal architecture of the Power BI VertiPaq engine. What data compression techniques does it employ (Value, Dictionary, Run Length Encoding)?',
    contextOrScenario: 'High-level BI architecture interview for senior analyst / engineering roles.',
    categoryHint: 'VertiPaq is an in-memory columnar database designed for high compression and multi-threaded analytical scans.',
    expectedKeyPoints: ['Columnar storage: only scans relevant columns instead of entire rows', 'Dictionary / Hash encoding: replaces strings with integer IDs', 'Value encoding: subtracts minimum value to reduce bit width', 'Run Length Encoding (RLE): compresses consecutive repeated values', 'High column cardinality drastically decreases compression efficiency'],
  },
  {
    id: 'pbi-adv-2',
    topic: 'Power BI',
    difficulty: 'Advanced',
    question: 'A large enterprise report with 20 visuals is taking 12 seconds to load. How do you use Performance Analyzer and DAX Studio to diagnose and fix the bottleneck?',
    contextOrScenario: 'Real-world BI tuning scenario.',
    categoryHint: 'Isolate visual display time, DAX query duration, and DirectQuery/External wait time using Performance Analyzer, then optimize SE/FE queries in DAX Studio.',
    expectedKeyPoints: ['Record visual metrics using Performance Analyzer to isolate slowest visual', 'Examine DAX query execution time vs visual rendering time', 'Export query to DAX Studio to check Formula Engine (FE) vs Storage Engine (SE) balance', 'Minimize FE bottlenecks by avoiding iterative measures over large tables', 'Reduce visual count on page and remove high-cardinality slicers'],
  },

  // APTITUDE - Beginner
  {
    id: 'apt-beg-1',
    topic: 'Aptitude',
    difficulty: 'Beginner',
    question: 'A shopkeeper sells an article for $240 and incurs a loss of 20%. At what price should he sell it to gain 20% profit? Walk me through your step-by-step logic.',
    contextOrScenario: 'Classic quantitative placement aptitude question.',
    categoryHint: 'Selling price = Cost Price * (1 - loss%). Find Cost Price first, then compute target Selling Price with 20% gain.',
    expectedKeyPoints: ['SP = $240 at 20% loss means $240 is 80% of CP', 'CP = 240 / 0.80 = $300', 'For 20% gain: New SP = CP * 1.20', 'New SP = 300 * 1.20 = $360'],
  },
  {
    id: 'apt-beg-2',
    topic: 'Aptitude',
    difficulty: 'Beginner',
    question: 'A can complete a piece of work in 12 days, and B can complete the same work in 24 days. If they work together, in how many days will they finish the work?',
    contextOrScenario: 'Time and work problem commonly asked in campus screening tests.',
    categoryHint: 'Use the 1-day work method or LCM total units method.',
    expectedKeyPoints: ['A\'s 1-day work = 1/12; B\'s 1-day work = 1/24', 'Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8', 'Total days required = 8 days', 'LCM method: total units = 24; A does 2 units/day, B does 1 unit/day; 24 / 3 = 8 days'],
  },
  {
    id: 'apt-beg-3',
    topic: 'Aptitude',
    difficulty: 'Beginner',
    question: 'A train 150 meters long is traveling at a speed of 54 km/h. How many seconds will it take to cross an electric pole?',
    contextOrScenario: 'Time, speed, and distance basics with unit conversion.',
    categoryHint: 'Convert km/h to m/s by multiplying by 5/18. Time = Distance / Speed.',
    expectedKeyPoints: ['Convert speed: 54 * (5/18) = 15 m/s', 'Distance to cross pole = train length = 150 meters', 'Time = Distance / Speed = 150 / 15', 'Time = 10 seconds'],
  },

  // APTITUDE - Intermediate
  {
    id: 'apt-int-1',
    topic: 'Aptitude',
    difficulty: 'Intermediate',
    question: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively, while pipe C can empty it in 15 minutes. If all three pipes are opened simultaneously, how long will it take to fill the tank completely?',
    contextOrScenario: 'Pipes and cisterns problem with opposing rates.',
    categoryHint: 'Inflow adds to capacity, outflow subtracts. Find net filling rate per minute.',
    expectedKeyPoints: ['A\'s rate = +1/20, B\'s rate = +1/30, C\'s rate = -1/15', 'Take LCM of 20, 30, 15 = 60 units total tank capacity', 'A fills 3 units/min, B fills 2 units/min, C empties 4 units/min', 'Net fill rate = 3 + 2 - 4 = 1 unit/min', 'Time to fill 60 units = 60 / 1 = 60 minutes (1 hour)'],
  },
  {
    id: 'apt-int-2',
    topic: 'Aptitude',
    difficulty: 'Intermediate',
    question: 'In a group of 8 people, what is the probability that at least 2 people share the same birth month? (Assume each month is equally likely).',
    contextOrScenario: 'Probability and complement rule testing.',
    categoryHint: 'Calculate the complement: P(at least 2 share) = 1 - P(all 8 born in different months).',
    expectedKeyPoints: ['Complement approach: P(at least 1 match) = 1 - P(all unique)', 'Total ways to assign months to 8 people = 12^8', 'Ways to assign distinct months = 12 * 11 * 10 * 9 * 8 * 7 * 6 * 5', 'Compute ratio (~0.053) and subtract from 1: ~94.7% probability'],
  },
  {
    id: 'apt-int-3',
    topic: 'Aptitude',
    difficulty: 'Intermediate',
    question: 'A bag contains 5 red balls, 4 blue balls, and 3 green balls. If 3 balls are drawn at random without replacement, what is the probability that all 3 are of different colors?',
    contextOrScenario: 'Combinations and probability.',
    categoryHint: 'Favorable outcomes: choose 1 Red AND 1 Blue AND 1 Green. Total outcomes: choose 3 from 12.',
    expectedKeyPoints: ['Total balls = 5 + 4 + 3 = 12', 'Total ways to choose 3 balls = 12C3 = (12 * 11 * 10) / (3 * 2 * 1) = 220', 'Favorable ways = 5C1 * 4C1 * 3C1 = 5 * 4 * 3 = 60', 'Probability = 60 / 220 = 3 / 11 (~27.27%)'],
  },

  // APTITUDE - Advanced
  {
    id: 'apt-adv-1',
    topic: 'Aptitude',
    difficulty: 'Advanced',
    question: 'You have 2 identical glass eggs and a 100-story building. You want to find the exact highest floor from which an egg can be dropped without breaking. What is the minimum number of drops guaranteed in the worst case, and what is your strategy?',
    contextOrScenario: 'Classic tech interview puzzle (Google, Microsoft, Goldman Sachs).',
    categoryHint: 'If you drop at equal intervals (e.g., 10 floors), the worst case is 19 drops. Use decreasing step sizes (x + (x-1) + (x-2)... >= 100).',
    expectedKeyPoints: ['Equalize worst-case drops across all floors using decreasing step size: x + (x-1) + ... + 1 >= 100', 'Equation: x(x+1)/2 >= 100 => x = 14', 'First egg dropped at floors 14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99, 100', 'If first egg breaks at floor 14, test 1-13 linearly with 2nd egg: max drops = 14'],
  },
  {
    id: 'apt-adv-2',
    topic: 'Aptitude',
    difficulty: 'Advanced',
    question: 'A car travels around an equilateral triangle track of side length S. It travels side 1 at 20 km/h, side 2 at 30 km/h, and side 3 at 60 km/h. What is the average speed of the car for the entire journey?',
    contextOrScenario: 'Harmonic mean and average speed logic.',
    categoryHint: 'Average speed is NOT the simple arithmetic average of speeds. Average speed = Total Distance / Total Time.',
    expectedKeyPoints: ['Total distance = 3S', 'Time side 1 = S/20; Time side 2 = S/30; Time side 3 = S/60', 'Total time = S(1/20 + 1/30 + 1/60) = S(3/60 + 2/60 + 1/60) = S(6/60) = S/10', 'Average speed = Total Distance / Total Time = 3S / (S/10) = 30 km/h'],
  },
];

export function getSampleQuestionsFor(topic: Topic, difficulty: Difficulty, count: number): QuestionItem[] {
  // First get matching topic and difficulty
  const exactMatches = SAMPLE_QUESTIONS.filter(q => q.topic === topic && q.difficulty === difficulty);
  // Also get adjacent difficulty if we need more
  const topicPool = SAMPLE_QUESTIONS.filter(q => q.topic === topic);

  const selected: QuestionItem[] = [...exactMatches];
  for (const item of topicPool) {
    if (selected.length >= count) break;
    if (!selected.some(s => s.id === item.id)) {
      selected.push(item);
    }
  }

  // If still fewer than requested count, generate dynamic variations
  let i = 1;
  while (selected.length < count) {
    selected.push({
      id: `${topic.toLowerCase().replace(/\s+/g, '-')}-${difficulty.toLowerCase()}-var-${i}`,
      topic,
      difficulty,
      question: `Practice follow-up on ${topic}: How would you explain core ${topic} principles to a non-technical manager?`,
      contextOrScenario: `Applied scenario in a corporate interview setting for ${topic}.`,
      categoryHint: `Focus on business impact, simplicity, and clear structure.`,
      expectedKeyPoints: ['Clarity and absence of jargon', 'Business value orientation', 'Structured storytelling'],
    });
    i++;
  }

  return selected.slice(0, count);
}

// Fallback evaluator when offline or Gemini API key is missing
export function generateOfflineEvaluation(
  question: QuestionItem,
  studentAnswer: string
): AnswerEvaluation {
  const answerTrimmed = studentAnswer.trim();
  const wordCount = answerTrimmed.split(/\s+/).filter(Boolean).length;

  if (wordCount < 6) {
    return {
      score: 2,
      whatWasCorrect: 'You provided an initial attempt, but the response was too brief to demonstrate your knowledge.',
      whatWasMissingOrIncorrect: 'The answer lacked technical depth, supporting examples, or step-by-step reasoning.',
      improvedSampleAnswer: question.sampleAnswer || (question.expectedKeyPoints
        ? `A comprehensive answer should cover: ${question.expectedKeyPoints.join('; ')}.`
        : 'In an actual interview, aim for at least 3-4 structured sentences highlighting the principle, an example, and its impact.'),
      improvementTip: 'Interviewers look for depth. Use the Rule of Three: State your point, give an example or syntax, and explain why it matters.',
      coachCommentary: 'Do not worry — interview skills are built with deliberate practice. Try elaborating on your thought process next time!',
      isAiGenerated: false,
    };
  }

  // Count key points mentioned
  const lowerAnswer = answerTrimmed.toLowerCase();
  const matchedPoints = (question.expectedKeyPoints || []).filter(point => {
    const keywords = point.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    return keywords.some(k => lowerAnswer.includes(k));
  });

  let score = 5;
  if (wordCount > 30) score += 1;
  if (wordCount > 60) score += 1;
  if (matchedPoints.length >= 1) score += 1;
  if (matchedPoints.length >= 2) score += 1;
  if (wordCount > 100 && matchedPoints.length >= 3) score += 1;
  score = Math.min(10, Math.max(3, score));

  return {
    score,
    whatWasCorrect: matchedPoints.length > 0
      ? `Good job addressing key elements such as: ${matchedPoints.slice(0, 2).join(' and ')}. Your explanation shows a solid grasp of fundamentals.`
      : 'Good effort in articulating your thoughts clearly with relevant terminology and positive structure.',
    whatWasMissingOrIncorrect: question.expectedKeyPoints && question.expectedKeyPoints.length > matchedPoints.length
      ? `To make this response top-tier, explicitly address: ${(question.expectedKeyPoints.filter(p => !matchedPoints.includes(p))).slice(0, 2).join('; ')}.`
      : 'Consider adding a brief real-world project example or metric to substantiate your claims.',
    improvedSampleAnswer: question.sampleAnswer || (question.expectedKeyPoints
      ? `High-scoring response breakdown:\n1. Direct Definition: Address the core question directly.\n2. Key Pillars: ${question.expectedKeyPoints.join('. ')}\n3. Practical Impact: "In our final year project, applying this ensured zero performance lag and seamless team alignment."`
      : 'Structure your answer with a direct definition first, followed by a concrete syntax/example, and conclude with the trade-offs or business value.'),
    improvementTip: question.topic === 'HR Interview'
      ? 'Always use the STAR format (Situation, Task, Action, Result) and quantify results with percentages or time saved.'
      : 'Mention edge cases and best practices (e.g. indexing, null handling, performance, exception safety).',
    coachCommentary: score >= 8
      ? 'Outstanding response! You demonstrated strong technical confidence and structured communication.'
      : 'Great foundation. Review the recommended improvement tip to turn this into an interview-winning answer.',
    isAiGenerated: false,
  };
}
