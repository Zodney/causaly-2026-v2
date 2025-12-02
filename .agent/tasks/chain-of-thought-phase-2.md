# Chain-of-Thought Phase 2: Real AI Integration

**Status:** Ready to Implement
**Prerequisites:** Phase 1 Complete ✅
**Related:** [Phase 1 Implementation](./.claude/plans/synthetic-churning-kernighan.md)

## Overview

Implement real AI reasoning visualization by connecting GPT-4o with custom prompting to stream chain-of-thought data. This phase replaces the mock data implementation with actual AI reasoning steps.

## Implementation Status

- ✅ **Phase 1 Complete:** Mock data implementation working
- ⏳ **Phase 2:** Real AI integration (this document)

## Goals

1. Stream real reasoning steps from GPT-4o during AI processing
2. Replace mock data generation with actual AI chain-of-thought
3. Maintain existing UI/UX behavior (accordion, progressive steps, auto-collapse)
4. Ensure cost-effective implementation using GPT-4o + custom prompting

## Technical Approach

**Selected Strategy: GPT-4o with Custom Prompting (Option B)**
- Continue using existing `gpt-4o` model
- Add explicit reasoning instructions via system prompt
- Extract reasoning steps during streaming
- Stream data via AI SDK's `StreamData` API
- Structure output to match existing `ThoughtStep` interface

**Why Option B:**
- Cost-effective (no model change needed)
- Full control over reasoning format
- Works with existing OpenAI integration
- Predictable token usage

## Implementation Plan

### Step 1: Enhance API Route

**File:** `src/app/api/chat/route.ts`

#### A. Update Imports
```typescript
import { OpenAIStream, StreamingTextResponse, StreamData } from "ai";
```

#### B. Add System Prompt for Reasoning
```typescript
const systemMessage = {
  role: "system",
  content: "You are a helpful research assistant. Think step-by-step and show your reasoning process. Before providing your final answer, explain your thought process."
};

const messagesWithSystem = [systemMessage, ...messages];
```

#### C. Implement StreamData for Reasoning
```typescript
const data = new StreamData();

// Emit reasoning steps during processing
data.append({
  type: "thought",
  id: Date.now().toString(),
  title: "Understanding the question",
  status: "active",
  timestamp: new Date().toISOString(),
});

const stream = OpenAIStream(response, {
  experimental_streamData: true,
  onStart: async () => {
    data.append({
      type: "thought",
      id: Date.now().toString() + "-1",
      title: "Analyzing query context",
      status: "active",
      timestamp: new Date().toISOString(),
    });
  },
  onToken: async (token) => {
    // Optionally emit reasoning updates during generation
  },
  onCompletion: async (completion) => {
    data.append({
      type: "thought",
      id: Date.now().toString() + "-final",
      title: "Formulating response",
      status: "complete",
      timestamp: new Date().toISOString(),
    });
    data.close();
  },
});

return new StreamingTextResponse(stream, {}, data);
```

### Step 2: Update Frontend for Real Data

**File:** `src/app/page.tsx`

#### A. Enable Data Streaming in useChat
```typescript
const { messages, isLoading, input, handleInputChange, handleSubmit, reload, data } = useChat({
  api: "/api/chat",
  streamProtocol: "data", // Enable data streaming
});
```

#### B. Replace Mock Data Effect with Real Data Handler

**Remove these two useEffect blocks (lines 126-198):**
- Mock step generation effect
- Mock step progression interval

**Add new real data handler:**
```typescript
useEffect(() => {
  if (data) {
    const thoughtData = data.filter((d: any) => d.type === "thought");

    // Group by message ID
    const thoughtsByMessage = thoughtData.reduce((acc: any, d: any) => {
      const messageId = d.messageId || "current";
      if (!acc[messageId]) acc[messageId] = [];
      acc[messageId].push({
        id: d.id,
        title: d.title,
        description: d.description,
        status: d.status,
        timestamp: d.timestamp ? new Date(d.timestamp) : undefined,
        searchResults: d.searchResults,
        images: d.images,
        metadata: d.metadata,
      });
      return acc;
    }, {});

    // Update map with real data
    setMessageThoughts(new Map(Object.entries(thoughtsByMessage)));
  }
}, [data]);
```

#### C. Remove Mock Data Import
Remove this line from imports:
```typescript
import { generateMockThoughtSteps } from "@/lib/mockThoughtSteps";
```

## Files to Modify

1. **`src/app/api/chat/route.ts`**
   - Add StreamData support
   - Implement reasoning step emission
   - Add system prompt for chain-of-thought

2. **`src/app/page.tsx`**
   - Enable data streaming in useChat
   - Replace mock effects with real data handler
   - Remove mock data generator import

## Files to Keep (No Changes)

- `src/components/app/AppChainOfThought.tsx` - UI component stays the same
- `src/components/ai-elements/chain-of-thought.tsx` - Primitive component unchanged
- `src/lib/mockThoughtSteps.ts` - Keep for future testing/development

## Testing Checklist

### Functionality
- [ ] API streams reasoning data correctly
- [ ] Frontend receives and parses data stream
- [ ] Steps update in real-time during AI response
- [ ] Message-to-thought association works correctly
- [ ] Accordion behavior remains unchanged (expand/collapse)
- [ ] Multiple messages each have their own reasoning chains

### Performance
- [ ] No performance degradation (<100ms overhead)
- [ ] Streaming doesn't block UI
- [ ] Memory usage acceptable with multiple reasoning chains
- [ ] Token usage within acceptable limits

### Error Handling
- [ ] Graceful fallback if streaming fails
- [ ] UI handles missing/incomplete reasoning data
- [ ] Console errors properly logged
- [ ] No crashes with rapid successive queries

### Edge Cases
- [ ] Long reasoning chains (10+ steps) work correctly
- [ ] Rapid message sending doesn't cause issues
- [ ] Page refresh maintains message history
- [ ] Browser navigation works correctly

## Rollback Plan

If Phase 2 encounters issues:

1. Revert `src/app/api/chat/route.ts` changes
2. Restore mock data effects in `src/app/page.tsx`
3. Re-add mock data import
4. System falls back to Phase 1 (mock data) immediately

## Success Metrics

- ✅ Real reasoning streams reliably (>99% success rate)
- ✅ No performance degradation (<100ms overhead)
- ✅ Error rate <1% for reasoning data
- ✅ User satisfaction with reasoning clarity
- ✅ Cost per query remains acceptable

## Cost Considerations

**Token Impact:**
- System prompt adds ~30 tokens per request
- Reasoning instructions minimal impact
- StreamData metadata negligible cost
- Monitor usage over 1 week before full rollout

**Optimization Options:**
- Add user toggle to enable/disable reasoning
- Implement caching for similar queries
- Rate limit reasoning for non-premium users

## Future Enhancements

### Phase 3 (Future):
- Advanced reasoning with OpenAI o1 model
- Search result integration with live API calls
- Image generation within reasoning steps
- Multi-step reasoning with tool calls
- Persistent reasoning history across sessions

### Phase 4 (Future):
- User feedback on reasoning quality
- Reasoning step editing/regeneration
- Export reasoning chains
- Reasoning analytics dashboard

## Resources

- [AI SDK StreamData Documentation](https://sdk.vercel.ai/docs/ai-sdk-ui/stream-data)
- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Vercel AI SDK React](https://sdk.vercel.ai/docs/ai-sdk-ui/overview)
- Project Coding Patterns: `.agent/sop/coding_patterns.md`

## Notes

- Phase 1 implementation provides excellent fallback
- UI/UX already validated with mock data
- No breaking changes to existing components
- Can implement incrementally (test with single user first)
