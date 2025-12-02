/**
 * Mock Thought Steps Generator
 *
 * Generates realistic AI reasoning steps for demonstration purposes.
 * Used in Phase 1 before connecting to real AI chain-of-thought.
 */

export interface ThoughtStep {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "active" | "complete" | "error";
  timestamp?: Date;
  searchResults?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
  images?: Array<{
    url: string;
    alt: string;
    caption?: string;
  }>;
  metadata?: Record<string, any>;
}

/**
 * Generates mock reasoning steps based on query type
 */
export function generateMockThoughtSteps(query: string): ThoughtStep[] {
  const queryLower = query.toLowerCase();

  // Research queries pattern
  if (
    queryLower.includes("research") ||
    queryLower.includes("analyze") ||
    queryLower.includes("study") ||
    queryLower.includes("investigate")
  ) {
    return [
      {
        id: "1",
        title: "Understanding the research question",
        description:
          "Breaking down the query to identify key concepts and research objectives.",
        status: "pending",
        timestamp: new Date(Date.now() - 6000),
      },
      {
        id: "2",
        title: "Identifying relevant knowledge domains",
        description:
          "Determining which academic fields and data sources are most applicable.",
        status: "pending",
        timestamp: new Date(Date.now() - 5000),
        searchResults: [
          {
            title: "PubMed Central",
            url: "https://pubmed.ncbi.nlm.nih.gov",
            snippet: "Biomedical research database",
          },
          {
            title: "Google Scholar",
            url: "https://scholar.google.com",
            snippet: "Academic research papers",
          },
        ],
      },
      {
        id: "3",
        title: "Searching research databases",
        description: "Querying multiple academic databases for relevant literature.",
        status: "pending",
        timestamp: new Date(Date.now() - 4000),
      },
      {
        id: "4",
        title: "Analyzing key findings",
        description:
          "Extracting main insights and methodologies from research papers.",
        status: "pending",
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: "5",
        title: "Synthesizing information",
        description:
          "Combining insights from multiple sources into a coherent answer.",
        status: "pending",
        timestamp: new Date(Date.now() - 2000),
      },
      {
        id: "6",
        title: "Formulating comprehensive response",
        description: "Structuring findings into a clear, actionable response.",
        status: "pending",
        timestamp: new Date(Date.now() - 1000),
      },
    ];
  }

  // Data analysis pattern
  if (
    queryLower.includes("data") ||
    queryLower.includes("statistics") ||
    queryLower.includes("chart") ||
    queryLower.includes("graph") ||
    queryLower.includes("visualize")
  ) {
    return [
      {
        id: "1",
        title: "Understanding data requirements",
        description: "Identifying what data needs to be analyzed or visualized.",
        status: "pending",
        timestamp: new Date(Date.now() - 7000),
      },
      {
        id: "2",
        title: "Loading and validating data",
        description: "Accessing data sources and checking for quality and completeness.",
        status: "pending",
        timestamp: new Date(Date.now() - 6000),
      },
      {
        id: "3",
        title: "Preprocessing data",
        description: "Cleaning and transforming data for analysis.",
        status: "pending",
        timestamp: new Date(Date.now() - 5000),
      },
      {
        id: "4",
        title: "Computing statistics",
        description: "Calculating relevant metrics and statistical measures.",
        status: "pending",
        timestamp: new Date(Date.now() - 4000),
      },
      {
        id: "5",
        title: "Identifying patterns",
        description: "Looking for trends, outliers, and meaningful relationships in the data.",
        status: "pending",
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: "6",
        title: "Selecting visualization approach",
        description: "Choosing the most effective way to present the insights.",
        status: "pending",
        timestamp: new Date(Date.now() - 2000),
      },
      {
        id: "7",
        title: "Generating final output",
        description: "Creating visualizations and summary of findings.",
        status: "pending",
        timestamp: new Date(Date.now() - 1000),
      },
    ];
  }

  // Code generation pattern
  if (
    queryLower.includes("code") ||
    queryLower.includes("implement") ||
    queryLower.includes("function") ||
    queryLower.includes("class") ||
    queryLower.includes("build")
  ) {
    return [
      {
        id: "1",
        title: "Analyzing requirements",
        description: "Understanding the functionality and constraints needed.",
        status: "pending",
        timestamp: new Date(Date.now() - 5000),
      },
      {
        id: "2",
        title: "Designing solution architecture",
        description: "Planning the structure and approach for the code.",
        status: "pending",
        timestamp: new Date(Date.now() - 4000),
      },
      {
        id: "3",
        title: "Writing implementation",
        description: "Generating the code with proper structure and patterns.",
        status: "pending",
        timestamp: new Date(Date.now() - 3000),
      },
      {
        id: "4",
        title: "Adding error handling",
        description: "Implementing validation and edge case handling.",
        status: "pending",
        timestamp: new Date(Date.now() - 2000),
      },
      {
        id: "5",
        title: "Reviewing and optimizing",
        description: "Checking for improvements and best practices.",
        status: "pending",
        timestamp: new Date(Date.now() - 1000),
      },
    ];
  }

  // Default general query pattern
  return [
    {
      id: "1",
      title: "Understanding the question",
      description: "Analyzing the query to identify intent and key concepts.",
      status: "pending",
      timestamp: new Date(Date.now() - 4000),
    },
    {
      id: "2",
      title: "Gathering relevant information",
      description: "Accessing knowledge bases and relevant context.",
      status: "pending",
      timestamp: new Date(Date.now() - 3000),
    },
    {
      id: "3",
      title: "Reasoning through the problem",
      description: "Applying logic and domain knowledge to formulate an answer.",
      status: "pending",
      timestamp: new Date(Date.now() - 2000),
    },
    {
      id: "4",
      title: "Formulating response",
      description: "Structuring the answer in a clear and helpful way.",
      status: "pending",
      timestamp: new Date(Date.now() - 1000),
    },
  ];
}
