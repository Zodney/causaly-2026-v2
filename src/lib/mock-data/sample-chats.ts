/**
 * Mock Chat Data for Testing
 *
 * Pre-saved example conversations for frontend development and testing.
 * Each chat includes user messages, AI responses, and chain-of-thought steps.
 */

import type { Message } from "ai/react";
import type { ThoughtStep } from "@/components/app/AppChainOfThought";

export interface MockChat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
  thoughtSteps: Map<string, ThoughtStep[]>; // Maps message ID to thought steps
}

export const SAMPLE_CHATS: MockChat[] = [
  {
    id: "1",
    title: "Previous research on quantum computing and its applications in modern cryptography",
    timestamp: "2 hours ago",
    messages: [
      {
        id: "msg-1-user",
        role: "user",
        content: "What are the latest developments in quantum computing and how do they affect modern cryptography?",
        createdAt: new Date("2024-12-03T10:00:00"),
      },
      {
        id: "msg-1-assistant",
        role: "assistant",
        content: `# Quantum Computing & Cryptography: 2024 Update

## Key Developments

Recent breakthroughs in quantum computing have significant implications for cryptographic security:

### 1. **Quantum Supremacy Progress**
- IBM's 433-qubit Osprey processor demonstrates increased stability
- Google's error correction advances reduce quantum noise by 40%
- Practical quantum advantage now estimated within 5-7 years

### 2. **Cryptographic Implications**

**Threats:**
- RSA and ECC encryption vulnerable to Shor's algorithm
- Current public-key infrastructure at risk
- "Harvest now, decrypt later" attacks already occurring

**Solutions:**
- NIST Post-Quantum Cryptography standards finalized (2024)
- Lattice-based cryptography showing promise
- Hybrid classical-quantum approaches gaining adoption

## Recommendations

Organizations should begin **crypto-agility** planning:
1. Inventory current cryptographic implementations
2. Prioritize high-value data for migration
3. Test post-quantum algorithms in non-production environments
4. Implement hybrid encryption schemes as transitional measure

The quantum threat is real but manageable with proactive preparation.`,
        createdAt: new Date("2024-12-03T10:00:15"),
      },
    ],
    thoughtSteps: new Map([
      [
        "msg-1-assistant",
        [
          {
            id: "step-1-1",
            phase: "understand",
            title: "Analyzing Query Scope",
            description: "Breaking down the question into quantum computing developments and cryptographic impacts",
            status: "complete",
            duration: 1.2,
          },
          {
            id: "step-1-2",
            phase: "research",
            title: "Searching Academic Databases",
            description: "Querying arXiv, IEEE, and ACM for 2024 quantum computing papers",
            status: "complete",
            duration: 2.8,
          },
          {
            id: "step-1-3",
            phase: "research",
            title: "Retrieving Industry Reports",
            description: "Accessing IBM, Google, and NIST quantum computing updates",
            status: "complete",
            duration: 1.9,
          },
          {
            id: "step-1-4",
            phase: "analyze",
            title: "Evaluating Cryptographic Vulnerabilities",
            description: "Assessing impact of quantum algorithms on current encryption standards",
            status: "complete",
            duration: 2.3,
          },
          {
            id: "step-1-5",
            phase: "synthesize",
            title: "Compiling Comprehensive Response",
            description: "Integrating findings into actionable recommendations",
            status: "complete",
            duration: 1.5,
          },
        ],
      ],
    ]),
  },
  {
    id: "2",
    title: "Analysis of market trends in artificial intelligence technology sector",
    timestamp: "Yesterday",
    messages: [
      {
        id: "msg-2-user",
        role: "user",
        content: "Can you analyze the current market trends in the AI sector and identify emerging opportunities?",
        createdAt: new Date("2024-12-02T14:30:00"),
      },
      {
        id: "msg-2-assistant",
        role: "assistant",
        content: `# AI Market Trends Analysis - Q4 2024

## Market Overview

The global AI market reached **$196B** in 2024, growing at 37% YoY. Key trends shaping the landscape:

## 1. Generative AI Maturation

**Market Dynamics:**
- Enterprise adoption: 65% of Fortune 500 now using GenAI in production
- Average ROI: 3.2x within first 18 months
- Market consolidation: Top 5 providers control 73% market share

**Emerging Niches:**
- Domain-specific fine-tuned models (healthcare, legal, finance)
- Multi-modal AI (text + image + audio integration)
- Edge AI for real-time processing

## 2. AI Infrastructure Boom

**Investment Hotspots:**
- GPU alternatives: NPUs, TPUs, specialized AI chips (+$47B invested)
- Vector databases for RAG applications
- Model optimization tools (quantization, pruning)

## 3. Regulatory Compliance Tech

**Growing Demand:**
- EU AI Act compliance solutions
- Model explainability & audit tools
- Data governance platforms for AI training

## 🎯 Top Opportunities

1. **Vertical AI Solutions** - Industry-specific applications show 4x higher retention
2. **AI Operations (AIOps)** - Managing AI lifecycle, monitoring, governance
3. **Small Language Models** - Cost-effective alternatives for focused tasks
4. **AI Security** - Protecting against prompt injection, model theft, adversarial attacks

## Risk Factors

⚠️ Commoditization of base models
⚠️ Regulatory uncertainty in key markets
⚠️ Talent shortage (data scientists, ML engineers)

The next 18 months will favor specialized, domain-focused AI applications over general-purpose tools.`,
        createdAt: new Date("2024-12-02T14:31:05"),
      },
      {
        id: "msg-2-user-followup",
        role: "user",
        content: "What about the impact of open source AI models on this market?",
        createdAt: new Date("2024-12-02T14:32:00"),
      },
      {
        id: "msg-2-assistant-followup",
        role: "assistant",
        content: `# Open Source AI Impact Analysis

## The Open Source Revolution

Open source models are fundamentally reshaping competitive dynamics:

### Market Disruption

**Llama 3.1 & Mistral Effect:**
- Performance now within 5% of GPT-4 on most benchmarks
- Zero licensing costs enabling new business models
- Fine-tuning ecosystem explosion (10K+ specialized models on HuggingFace)

### Business Model Shifts

**Winners:**
1. **Infrastructure Providers** - AWS, Azure, GCP hosting open models
2. **Fine-tuning Services** - Companies offering customization/training
3. **Application Layer** - Building on commodity models with proprietary data

**Losers:**
1. **Mid-tier Model Providers** - Caught between commoditization & premium players
2. **Pure API Plays** - Margins compressed by open alternatives

### Strategic Implications

For startups:
- ✅ Build defensibility through data moats, not model moats
- ✅ Focus on workflow integration over model performance
- ✅ Leverage open models to prototype quickly

For enterprises:
- ✅ Hybrid approach: proprietary models for core IP, open models for general tasks
- ✅ Invest in MLOps to deploy/manage open source at scale
- ✅ Consider on-premise deployment for sensitive data

## The 2025 Prediction

Open source won't "win" or "lose" - we're heading toward a **bifurcated market**:
- Frontier models (closed) for cutting-edge capabilities
- Open models (fine-tuned) for 80% of production use cases

The value will shift from model ownership to **application quality and integration**.`,
        createdAt: new Date("2024-12-02T14:32:45"),
      },
    ],
    thoughtSteps: new Map([
      [
        "msg-2-assistant",
        [
          {
            id: "step-2-1",
            phase: "understand",
            title: "Defining Analysis Scope",
            description: "Identifying key market segments and metrics for AI sector analysis",
            status: "complete",
            duration: 1.1,
          },
          {
            id: "step-2-2",
            phase: "research",
            title: "Gathering Market Data",
            description: "Accessing Gartner, IDC, and PitchBook databases for AI market intelligence",
            status: "complete",
            duration: 3.2,
          },
          {
            id: "step-2-3",
            phase: "research",
            title: "Analyzing Investment Trends",
            description: "Reviewing VC funding patterns and M&A activity in AI sector",
            status: "complete",
            duration: 2.1,
          },
          {
            id: "step-2-4",
            phase: "analyze",
            title: "Identifying Growth Opportunities",
            description: "Evaluating market gaps and emerging niches",
            status: "complete",
            duration: 1.8,
          },
          {
            id: "step-2-5",
            phase: "synthesize",
            title: "Creating Strategic Recommendations",
            description: "Compiling actionable insights and opportunity assessment",
            status: "complete",
            duration: 1.4,
          },
        ],
      ],
      [
        "msg-2-assistant-followup",
        [
          {
            id: "step-2-6",
            phase: "understand",
            title: "Contextualizing Follow-up",
            description: "Connecting open source question to broader market analysis",
            status: "complete",
            duration: 0.8,
          },
          {
            id: "step-2-7",
            phase: "research",
            title: "Analyzing Open Source Model Performance",
            description: "Comparing Llama 3.1, Mistral, and proprietary model benchmarks",
            status: "complete",
            duration: 1.9,
          },
          {
            id: "step-2-8",
            phase: "analyze",
            title: "Evaluating Business Model Impact",
            description: "Assessing disruption to existing AI service providers",
            status: "complete",
            duration: 1.6,
          },
          {
            id: "step-2-9",
            phase: "synthesize",
            title: "Formulating Strategic Outlook",
            description: "Creating bifurcated market prediction and recommendations",
            status: "complete",
            duration: 1.2,
          },
        ],
      ],
    ]),
  },
  {
    id: "3",
    title: "Literature review summary for biomedical engineering research",
    timestamp: "3 days ago",
    messages: [
      {
        id: "msg-3-user",
        role: "user",
        content: "I need to write a literature review on recent advances in biomedical imaging for cancer detection. Can you help me identify the key papers and themes?",
        createdAt: new Date("2024-11-30T09:15:00"),
      },
      {
        id: "msg-3-assistant",
        role: "assistant",
        content: `# Literature Review: Biomedical Imaging for Cancer Detection (2022-2024)

## Key Themes & Breakthrough Papers

### 1. AI-Enhanced Medical Imaging

**Seminal Works:**
- **Nature Medicine (2024)**: "Deep learning for multi-cancer detection from whole-slide pathology images"
  - 94.6% accuracy across 12 cancer types
  - Dataset: 478,000 annotated slides
  - Citation: Johnson et al., Nature Med. 30, 127-142 (2024)

- **Radiology (2023)**: "Transformer architectures for CT scan analysis"
  - Outperformed CNNs by 8% in lung cancer detection
  - Real-time inference: <2 seconds per scan
  - Citation: Chen et al., Radiology 308(2), e223041 (2023)

### 2. Multi-Modal Fusion Approaches

**Key Innovation:** Combining MRI, PET, and genomic data for comprehensive diagnosis

**Notable Papers:**
- Lancet Oncology (2024): Radiogenomics for glioblastoma prognosis
- JAMA Network (2023): PET/MRI fusion reducing false positives by 34%

### 3. Early Detection Technologies

**Liquid Biopsy + Imaging:**
- Cell (2024): ctDNA analysis combined with low-dose CT for stage I detection
- Science Translational Medicine (2023): Multi-cancer early detection (MCED) validation study

### 4. Emerging Modalities

**Photoacoustic Imaging:**
- Non-invasive, high-resolution tumor vasculature mapping
- Clinical trials ongoing for breast cancer screening

**Raman Spectroscopy:**
- Label-free molecular imaging
- Intraoperative guidance showing promise

## Methodological Trends

1. **Transfer Learning** - Leveraging pre-trained models (95% of recent studies)
2. **Federated Learning** - Privacy-preserving multi-institutional collaboration
3. **Explainable AI (XAI)** - Clinical interpretability requirements driving research

## Gaps & Future Directions

🔍 **Identified Research Gaps:**
- Limited validation on diverse patient populations
- Integration challenges in clinical workflows
- Regulatory pathways for AI-assisted diagnostics

**Recommended Focus Areas:**
- Real-world clinical trial data (beyond retrospective studies)
- Cost-effectiveness analyses
- Clinician-AI interaction studies

## Suggested Review Structure

1. Introduction & Historical Context
2. AI/ML Methods in Medical Imaging (Theme 1)
3. Multi-Modal Integration Approaches (Theme 2)
4. Clinical Validation & Outcomes (Theme 3)
5. Emerging Technologies (Theme 4)
6. Challenges & Future Directions
7. Conclusion

Would you like me to provide detailed summaries of any specific papers or help outline particular sections?`,
        createdAt: new Date("2024-11-30T09:17:30"),
      },
    ],
    thoughtSteps: new Map([
      [
        "msg-3-assistant",
        [
          {
            id: "step-3-1",
            phase: "understand",
            title: "Parsing Research Requirements",
            description: "Identifying scope: biomedical imaging, cancer detection, recent advances",
            status: "complete",
            duration: 0.9,
          },
          {
            id: "step-3-2",
            phase: "research",
            title: "Querying Medical Databases",
            description: "Searching PubMed, Scopus, Web of Science (2022-2024)",
            status: "complete",
            duration: 4.2,
          },
          {
            id: "step-3-3",
            phase: "research",
            title: "Filtering High-Impact Publications",
            description: "Prioritizing Nature, Science, Lancet, JAMA publications",
            status: "complete",
            duration: 2.6,
          },
          {
            id: "step-3-4",
            phase: "analyze",
            title: "Thematic Clustering",
            description: "Grouping papers by methodology and innovation type",
            status: "complete",
            duration: 2.8,
          },
          {
            id: "step-3-5",
            phase: "analyze",
            title: "Identifying Research Gaps",
            description: "Analyzing limitations and future research directions",
            status: "complete",
            duration: 1.7,
          },
          {
            id: "step-3-6",
            phase: "synthesize",
            title: "Structuring Literature Review",
            description: "Creating thematic organization with key citations",
            status: "complete",
            duration: 2.1,
          },
        ],
      ],
    ]),
  },
  {
    id: "4",
    title: "Data synthesis project combining multiple research methodologies",
    timestamp: "1 week ago",
    messages: [
      {
        id: "msg-4-user",
        role: "user",
        content: "How do I combine qualitative and quantitative data in a mixed-methods research design?",
        createdAt: new Date("2024-11-26T16:20:00"),
      },
      {
        id: "msg-4-assistant",
        role: "assistant",
        content: `# Mixed-Methods Research: Integration Strategies

## Core Principles

Mixed-methods research combines qualitative and quantitative approaches to provide richer insights than either method alone.

### Three Main Designs

#### 1. **Convergent Parallel Design**
- Collect QUAL + QUAN data simultaneously
- Analyze independently
- Merge findings in interpretation phase

**Example:**
- Surveys (QUAN) + interviews (QUAL) conducted at same time
- Compare/contrast results to validate or explain patterns

**Strengths:** Efficient, comprehensive validation
**Challenges:** Conflicting results require reconciliation

#### 2. **Explanatory Sequential Design**
- QUAN data first → informs → QUAL follow-up
- Use statistics to identify patterns, then interviews to explain *why*

**Example:**
1. Survey shows 73% employee dissatisfaction (QUAN)
2. Conduct focus groups to understand root causes (QUAL)

**Strengths:** QUAL explains QUAN anomalies
**Challenges:** Time-intensive, two-phase data collection

#### 3. **Exploratory Sequential Design**
- QUAL data first → informs → QUAN instrument development
- Build theory from interviews, then test at scale

**Example:**
1. Ethnographic observation identifies themes (QUAL)
2. Develop survey based on themes, test with n=500 (QUAN)

**Strengths:** Ensures survey relevance
**Challenges:** Requires iteration, potential scope creep

## Integration Techniques

### Data Transformation
- **Quantitizing:** Convert QUAL to QUAN (e.g., code frequency counts)
- **Qualitizing:** Convert QUAN to QUAL (e.g., survey responses → case narratives)

### Joint Displays
Create visual tables showing merged data:

| Theme (QUAL) | Supporting Quote | Prevalence (QUAN) | p-value |
|--------------|------------------|-------------------|---------|
| Workload stress | "I'm drowning..." | 67% report high stress | p<0.01 |

### Triangulation Matrix
Compare findings across methods:
- **Convergence:** Both methods agree (strengthens claim)
- **Complementarity:** Methods reveal different aspects (enriches understanding)
- **Discordance:** Conflict between methods (prompts deeper investigation)

## Practical Workflow

1. **Define Research Questions**
   - Which questions need QUAL vs QUAN vs both?

2. **Choose Integration Model**
   - Sequential (explanatory/exploratory) or parallel (convergent)?

3. **Sampling Strategy**
   - Identical samples vs nested samples?

4. **Data Collection**
   - Tools: NVivo (QUAL), SPSS/R (QUAN)

5. **Analysis & Integration**
   - Separate analysis → Meta-inference
   - Use joint displays to visualize integration

6. **Reporting**
   - Clearly describe integration points
   - Justify methodological choices

## Software Tools

- **NVivo:** Qualitative coding + basic quantitizing
- **MAXQDA:** Mixed-methods analysis with joint displays
- **R + RQDA:** Open-source alternative
- **Dedoose:** Cloud-based, collaborative

## Validity Considerations

- **Legitimation:** Ensure integration is justified, not forced
- **Transparency:** Document decisions at integration points
- **Reflexivity:** Acknowledge researcher biases affecting interpretation

Would you like specific guidance on any particular design or analysis technique?`,
        createdAt: new Date("2024-11-26T16:22:15"),
      },
    ],
    thoughtSteps: new Map([
      [
        "msg-4-assistant",
        [
          {
            id: "step-4-1",
            phase: "understand",
            title: "Clarifying Methodological Question",
            description: "Identifying need for mixed-methods integration guidance",
            status: "complete",
            duration: 0.7,
          },
          {
            id: "step-4-2",
            phase: "research",
            title: "Reviewing Mixed-Methods Literature",
            description: "Accessing Creswell, Teddlie & Tashakkori frameworks",
            status: "complete",
            duration: 1.8,
          },
          {
            id: "step-4-3",
            phase: "analyze",
            title: "Categorizing Integration Strategies",
            description: "Organizing approaches by design type and integration point",
            status: "complete",
            duration: 1.4,
          },
          {
            id: "step-4-4",
            phase: "synthesize",
            title: "Creating Practical Guide",
            description: "Structuring actionable workflow with examples and tools",
            status: "complete",
            duration: 1.9,
          },
        ],
      ],
    ]),
  },
];

/**
 * Helper function to get a mock chat by ID
 */
export function getMockChatById(id: string): MockChat | undefined {
  return SAMPLE_CHATS.find((chat) => chat.id === id);
}

/**
 * Helper function to get all chat history items (without full message content)
 */
export function getChatHistoryItems() {
  return SAMPLE_CHATS.map((chat) => ({
    id: chat.id,
    title: chat.title,
    timestamp: chat.timestamp,
  }));
}
