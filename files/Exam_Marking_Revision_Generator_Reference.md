# EXAMINATION, MARKING GUIDE & REVISION FILE GENERATOR — REFERENCE

*Consult this file when the Master Project Instructions identify the request as Exam/Marking Guide mode or Revision File mode (a Term was given, no Week number).*

> This reference assumes the Master Project Instructions have already been applied. Sources, Subject Name Matching, the Content Sourcing Hierarchy, and Mismatch/Enrichment classification are defined there and apply here without repetition.

---

## HOW THE USER WILL PROMPT YOU

The user must always state the **Term**, **Subject**, and **Class** in their request, and make clear whether they want an **exam** or a **revision file**. Example prompts:

- "Generate First Term Examination for Physics SS2"
- "Create 2nd term exam: Basic Science, JSS1"
- "Third term, Mathematics, JSS3"
- "Generate a revision file for Second Term, Physics, SS2"
- "Create revision notes for First Term, Basic Science, JSS1"

If the Term, Subject, Class, or request type (exam vs. revision file) is missing or unclear, **ask the user to confirm before proceeding**: do not guess.

---

## MODE-SPECIFIC APPLICATION OF SHARED RULES

- **Non-teaching weeks**: automatically excluded from the term's topic list used for question composition and topic spread (see Examination Composition Rules below) — no need to ask the user, unlike Lesson Note mode.
- **Multi-strand subjects (English Studies / English Language)**: treat each strand across the term as its own topic entry for the topic list and spread rule — i.e. the term's "topics" are the full set of strand-instances across all its weeks, not one entry per week.
- **Scheme/e-note mismatch**: generate using the scheme's topic list; a genuine mismatch is flagged in the preamble. An enrichment sub-topic is folded into the topic spread without being flagged.
- **Subjects absent from the scheme** (e.g. Yoruba, Arabic): fall back to the term's uploaded e-note to determine its topic list if one is available, or research the standard Nigerian curriculum for that subject/class/term online if nothing is uploaded.

---

## EXAMINATION COMPOSITION RULES

### First Term or Second Term request
Use **only** that single term's Scheme of Work topic list for 100% of the questions (both Section A and Section B), sourcing content per the Master's Content Sourcing Hierarchy. Do not pull topics from other terms.

### Third Term request
Pull questions from all three terms' Scheme of Work topic lists in this ratio:

| Source | Objective (Section A) | Theory (Section B) |
|---|---|---|
| 1st Term topics | 5 questions | 1 question |
| 2nd Term topics | 5 questions | 1 question |
| 3rd Term topics | 20 questions | 4 questions (3 regular + 1 extra) |
| **Total** | **30 questions** | **6 questions offered** |

Note: the percentages discussed conceptually are 20% / 20% / 60% (1st / 2nd / 3rd term), realized as the fixed question counts above.

### Topic spread
Within any single term, distribute questions evenly across **all topics listed in the Scheme of Work for that term, plus any enrichment sub-topics from an uploaded e-note** — not just the topics that happen to appear in an optional uploaded e-note, but also not less than what a more detailed e-note actually covers. Do not cluster questions on only one or two topics.

### Variation across requests
Each time an exam is generated (even for the same Subject/Class/Term), vary question selection, angle, and phrasing. Do not reproduce an identical paper on repeat requests.

---

## SECTION A: OBJECTIVE (30 marks)

- 30 questions, 1 mark each.
- Each question has exactly 4 options, lettered **A to D**.
- **Each question and its 4 options must be written on a single paragraph/line**: stem and options run together (e.g., `1. What is the SI unit of force? A. Newton B. Joule C. Watt D. Pascal`). Do not place options on separate lines.
- **Term-specific composition:**
  - 1st/2nd term request → all 30 questions from that term's Scheme of Work topics.
  - 3rd term request → 5 from 1st term topics, 5 from 2nd term topics, 20 from 3rd term topics (order them in a randomized/mixed sequence, not grouped by source).
- **Answer distribution:** correct answers (A/B/C/D) must be well and randomly distributed across the 30 questions. Avoid long runs of the same correct letter (no more than 2 to 3 in a row), and avoid any one letter being heavily over-represented.

---

## SECTION B: THEORY

### First Term or Second Term request
- 5 questions, all from that term's Scheme of Work topics.
- Candidate answers **any 4 of 5**.
- 10 marks per question answered → 40 marks total.
- Each question has structured subparts, e.g. 1a, 1b, 1ci, 1cii.

### Third Term request
- 6 questions total: 1 from 1st term topics, 1 from 2nd term topics, 4 from 3rd term topics (3 "regular" + 1 "extra," both sourced from 3rd term topics).
- Candidate answers **any 5 of 6**.
- 8 marks per question answered → 40 marks total.
- Each question has structured subparts, e.g. 1a, 1b, 1ci, 1cii, with marks per subpart summing to 8 (or 10 for 1st/2nd term papers).

**Total exam: 30 (Objective) + 40 (Theory) = 70 marks**, regardless of term.

---

## CANDIDATE INSTRUCTIONS (auto-drafted, no fixed wording required)

Draft standard instructions near the top of the question paper, adapting the Section B count to the term:

- "Answer ALL questions in Section A."
- "Answer ANY FOUR (4) questions in Section B." (1st/2nd term papers)
- "Answer ANY FIVE (5) questions in Section B." (3rd term papers)
- Plus any other standard candidate guidance you judge appropriate (e.g., writing legibly, attempting all required questions).

---

## DOCUMENT HEADER: QUESTION PAPER

Centered, bold, on separate lines, slightly larger than body text (enough to look like a letterhead but not so large the paper exceeds 2 pages):

```
{SCHOOL_NAME}
{SCHOOL_ADDRESS}
SUBJECT: [from Scheme of Work]
CLASS: [from Scheme of Work]
[TERM] TERM EXAMINATION
```

Below the header, leave blank fill-in lines (do NOT auto-fill date/time):
```
Name: _______________________________
Date: _____________  Time Allowed: _____________
```

Then the candidate instructions above, then Section A, then Section B.

---

## DOCUMENT HEADER: MARKING GUIDE

Simpler header only (no school name/address/letterhead), bold and centered:

```
MARKING GUIDE: [SUBJECT] [CLASS] [TERM] TERM EXAMINATION
```

### Section A in the Marking Guide
Just the answer key, compactly listed, e.g.:
`1-A, 2-C, 3-B, 4-D, 5-A, ...` (through 30)

### Section B in the Marking Guide
**Repeat the full original question text** (including all subparts) above each model answer, then provide the model answer with **marks allocated per subpart**, summing to 8 or 10 marks depending on term, e.g.:
```
Question 1
1a. [question text]: Model answer ... (3 marks)
1b. [question text]: Model answer ... (3 marks)
1ci. [question text]: Model answer ... (2 marks)
1cii. [question text]: Model answer ... (2 marks)
Total: 10 marks
```

---

## WORD DOCUMENT FORMATTING (both files)

- Font: **Times New Roman, 11pt** for body text.
- Margins: **Narrow (0.5" on all sides)**.
- Line spacing: single, with minimal extra spacing between questions, to keep the **question paper within 2 pages**. If 2 pages cannot be achieved without sacrificing required content, prioritize completeness but keep formatting as compact as possible.
- Headers (school name/address/subject/class/term, or the marking guide title line): **bold, centered, slightly larger font** than the 11pt body.
- No strict page limit on the Marking Guide.

---

## OUTPUT FILES

Generate two separate .docx files per request, named descriptively, e.g.:
- `[Class]_[Subject]_[Term]Term_Questions.docx`
- `[Class]_[Subject]_[Term]Term_MarkingGuide.docx`

Save both to the outputs directory and present both files together at the end of the response, immediately after your preamble.

---

## REVISION FILE (separate request type from the exam)

Triggered when the user asks for a "revision file," "revision notes," or similar, for a given Term + Subject + Class.

### Source rule (important difference from the exam)
Unlike the exam, the revision file is **always 100% from the single requested term's Scheme of Work topic list**: even if the user asks for a "Third Term revision file," do **not** mix in 1st/2nd term topics. No ratio splitting applies here. Content for each topic is still built using the Master's Content Sourcing Hierarchy, and any scheme/e-note mismatch is still flagged.

### Content structure
A single Word document containing two parts, in this order:

1. **Summary Notes**: concise key-point notes organized under a heading for each topic in that term's **Scheme of Work** list, plus any enrichment sub-topics from an uploaded e-note. Cover every topic listed; don't skip any.
2. **Practice Questions**: theory-style questions only (no objective/A-D questions). Spread questions evenly across all topics covered, the same way as exam topic spread. Each question is immediately followed by its full answer/explanation directly underneath it (no separate answer key, no withheld answers: this is a self-study document).

There is no fixed mark allocation and no "answer any X of Y" instruction for the revision file: it's a study aid, not a graded exam, so every question presented gets an answer.

### Header (simpler, like the marking guide)
Bold, centered:
```
REVISION NOTES: [SUBJECT] [CLASS] [TERM] TERM
```

### Formatting
Same body formatting as the exam files: Times New Roman 11pt, narrow margins (0.5" all sides). No 2-page limit on this file: let it run as long as needed to properly cover the term's content.

### Variation across requests
Same as the exam: vary phrasing/question selection on repeat requests rather than reproducing an identical file.

### Output file
One .docx file, named:
- `[Class]_[Subject]_[Term]Term_RevisionFile.docx`

Save to the outputs directory and present it to the user.

---

## WORKFLOW SUMMARY

**If the request is for an exam:**
1. Parse Term, Subject, Class: ask if any are missing/ambiguous.
2. Apply the Master's Subject Name Matching to resolve the subject against the Scheme of Work. If the subject has no entry anywhere in the scheme, fall back to the term's uploaded e-note or online research for that subject only. Otherwise, locate the Scheme of Work entry for that Subject + Class (+ relevant term(s)), excluding non-teaching weeks. Separately look for any matching e-note/textbook (optional), and apply the Master's Enrichment/Mismatch classification to any difference from the scheme.
3. Apply the correct term-based composition ratio using the Scheme's topic lists (Examination Composition Rules above).
4. Draft Section A (30 objective questions, single-paragraph format, randomized answer key) and Section B (theory, term-appropriate count/marks/subparts), building content per the Master's Content Sourcing Hierarchy, spreading questions across all scheme topics, and varying content from prior generations.
5. View the docx skill, then build the formatted Question Paper (header + instructions + Sections A & B).
6. Build the formatted Marking Guide (header + Section A key + Section B full questions/model answers/mark allocations).
7. Save both files with descriptive names and present them, with your preamble noting any mismatch flagged in step 2.

**If the request is for a revision file:**
1. Parse Term, Subject, Class: ask if any are missing/ambiguous.
2. Locate the Scheme of Work entry for that single term only (no cross-term mixing, even for Third Term requests), and separately look for a matching e-note/textbook (optional). Apply the Master's Enrichment/Mismatch classification.
3. View the docx skill, then build the Summary Notes section covering every topic in the Scheme of Work for that term, sourced per the Master's Content Sourcing Hierarchy.
4. Add the Practice Questions section (theory-style, evenly spread across topics, each with its answer directly underneath).
5. Apply the simpler header and standard body formatting above.
6. Save the single file with a descriptive name and present it to the user.
