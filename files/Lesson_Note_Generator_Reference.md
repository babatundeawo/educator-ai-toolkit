# LESSON NOTE GENERATOR — REFERENCE

*Consult this file when the Master Project Instructions identify the request as Lesson Note mode (a specific Week number was given).*

> This reference assumes the Master Project Instructions have already been applied. Sources, Subject Name Matching, the Content Sourcing Hierarchy, and Mismatch/Enrichment classification are defined there and apply here without repetition.

> **Capability check, before generating any document with visuals.** Embedding real diagrams, graphs, charts, and maps (see the Visual Sourcing Hierarchy under General Rules) needs this Project's **web search** capability (to fetch and verify images) and its **analysis/code execution** capability (to generate charts, graphs, and rule-based diagrams). Both are Project-level settings the user turns on outside the chat. If a visual is genuinely called for and one or both capabilities are unavailable, say so briefly in the preamble and fall back to the bolded placeholder for that visual only, rather than silently omitting the image or stopping the whole document.

---

## HOW THE USER CALLS A LESSON NOTE

Since a single project may hold materials for multiple subjects and classes, the user must always state the **Subject** and **Class** in their request, along with the **Week number** (and optionally the **Term**).

> **"Generate Week [n], [Subject], [Class]"** or **"Generate Week [n], [Term] Term, [Subject], [Class]"**

Examples:
- "Generate Week 3, Physics, SS2"
- "Generate Week 5, 2nd Term, Chemistry, SS1"
- "Generate Week 1, Third Term, Basic Science, JSS1"

- If the user specifies the week, subject, and class but **not** the term, determine the term by checking which term's section of the Scheme of Work (for that Subject + Class) contains that week number.
- If **Subject** or **Class** is missing or unclear, **ask the user to confirm before proceeding**: do not guess.
- Confirm (in the response preamble, before the document) which **Subject, Class, Term, and Week** is being generated, along with the computed dates, and flag any scheme/e-note mismatch.

---

## MODE-SPECIFIC APPLICATION OF SHARED RULES

- **Non-teaching weeks**: if the requested week's Scheme of Work entry is a non-teaching label (Midterm Examination, Midterm Break, Revision & Exams, Closing, or similar), **stop and ask the user how to proceed** (e.g. generate a revision/consolidation note instead, pick a different week, or something else) rather than generating a lesson note automatically.
- **Multi-strand subjects (English Studies / English Language)**: treat each strand as the topic for one period. English always receives 4 periods (see Period Assignment Rule below); if a week lists more than 4 strands, merge the two most closely related strands into a single period using reasonable subject-matter judgement, and note in the preamble which strands were merged. When a week lists 4 or fewer strands, one strand maps directly to one period.
- **Scheme/e-note mismatch**: generate on the scheme's topic; a genuine mismatch is flagged in the preamble. An enrichment sub-topic is folded into the week's Presentation Steps (e.g. as an extra Step V) without being flagged.
- **Subjects absent from the scheme** (e.g. Yoruba, Arabic): fall back to an uploaded e-note or topic list to determine the week's topic if one is available, or research the standard Nigerian curriculum for that subject/class/term online if nothing is uploaded.

---

## GENERAL RULES

- **ALL responses must be written as a `.docx` file.**
- **Document formatting:** Times New Roman font, 12pt size, A4 paper size, narrow margins (top: 0.5 in, bottom: 0.5 in, left: 0.5 in, right: 0.5 in).
- **Each period must continue immediately after the previous period within the same document, with no page break between periods.** A single thin horizontal rule (paragraph border) may be used as a visual separator between periods, but periods must never begin on a new page.
- All lesson content is sourced according to the Content Sourcing Hierarchy in the Master Instructions (textbook → e-note → online), always on the topic the Scheme of Work assigns (plus any enrichment sub-topics).
- Do **not** introduce content that contradicts the Scheme of Work's topic description, the expected curriculum for the class level, or established subject knowledge.
- All notes must be written entirely **from the teacher's point of view**.
- **Behavioural Objectives, Instructional Materials, Reference Materials, Evaluation questions, and Assignment tasks must all be presented as genuine bulleted or numbered lists, one item per line: never written as a single run-on paragraph.** Each list item must be a complete, standalone item.
- **Within each Presentation Step, the content is split into two clearly separated parts: a *Teacher's To-Do* (what the teacher does in the classroom) and a *Students' Note* (the exact note that students copy into their notebooks, and what the teacher would actually write on the board). The Students' Note is what students copy verbatim; the Teacher's To-Do is never copied by students.**
- **The Students' Note must read exactly like a real page from a student's exercise book, built the way a teacher would actually lay it out on the chalkboard**: a bolded or underlined **main heading** naming the concept, broken down internally with bolded **sub-headings** for its distinct parts (e.g. Definition, Types, Properties, Causes, Uses, Worked Example) wherever the concept has more than one distinguishable part, with each sub-heading followed by whichever combination of **explanatory prose paragraphs**, **genuine numbered or bulleted lists**, and **genuine tables** best suits that part of the content. Definitions, reasoning, and mechanisms are written as connected explanatory sentences; anything enumerable — types, classifications, characteristics, steps, causes, rules, differences, examples — is written as an actual list, not buried inside a paragraph; anything genuinely comparative or multi-attribute (e.g. comparing two or more things side by side across the same set of features, a classification with several columns of detail, a labelled parts-and-functions breakdown) is laid out as an actual table, not squeezed into a list or paragraph. Formulas are set out on their own properly formatted line, and worked examples are laid out as genuine step-by-step workings. Use whichever of these building blocks — headings, sub-headings, paragraphs, lists, tables, formulas, worked examples, labelled diagram descriptions — the content genuinely calls for, so the finished note looks as close as possible to a real, complete notebook page rather than a single format applied uniformly. It must never be a single short sentence, a thin one-line summary, a mechanical fill-in-the-blank paragraph, or an undifferentiated wall of prose with no headings, subtopic breakdown, lists, or tables.
- **Only the period header line (e.g. "PERIOD 1", "PERIOD 2") must carry a light background shade** — never the rest of the period's content. Use the **same shade colour for every period header, in every week, term, subject and class** — never vary the colour by subject or period number — so the document has one uniform, recognisable look throughout. The shade must stay pale enough (e.g. a very light grey or very light blue) that the header text remains fully legible against it; it is a visual separator, not a design accent. Implement this as cell shading on a single-row, single-cell, borderless table wrapping just the period header line; the rest of the period's content (Duration/Topic/Subtopics through Assignment) has no background shading. The thin horizontal rule between periods is still used as an additional divider between one period block and the next.
- **Where a Students' Note genuinely calls for a diagram, illustration, drawing, graph, chart, or map** (e.g. a labelled diagram, a sketch of an apparatus, a life cycle, a plant/animal structure, a plotted graph, a statistical chart, a map), the generator embeds a real image directly into the document at that exact point instead of outsourcing it to the teacher as a separate task. Build it in this priority order, and never skip straight to a placeholder when an earlier option is genuinely available:
  1. **Generate it directly** whenever the visual is precisely rule-based and its correctness can be checked against the lesson's own data or logic: a plotted mathematical function, a bar/line/pie chart of given figures, a labelled geometric construction, a number line, a simple circuit or apparatus schematic, a coordinate-geometry sketch. Build it with code (e.g. a plotting or drawing library) and embed the resulting image file directly in the `.docx` via the docx skill's image support (`ImageRun`).
  2. **Fetch an accurate image from a credible online source** whenever the visual is representational rather than rule-based, and so cannot be safely constructed from first principles: a labelled biological or anatomical diagram, an apparatus photograph, a life cycle, a historical image, a real object or specimen. Before embedding, check that the fetched image is genuinely correct, clearly labelled (or labellable), and appropriate for the class level; discard it and search again if it is not. Add a short source caption beneath the image (e.g. "Image source: [site or publication name]").
  3. **Maps are always fetched from a credible online source, never hand-drawn or generated.** Borders, place names, and locations must be accurate, and generative drawing cannot reliably guarantee this, so a genuine map image from a reputable atlas, government, or educational source is required every time a map is called for, verified for accuracy before it is embedded.
  4. **Only when neither generation nor a credible fetched image is possible** (no code-execution or web-access capability is available in this Project, or a genuinely suitable image cannot be found after an actual search attempt) does the generator fall back to a **bolded placeholder description** at that exact point (e.g. **"[Diagram: labelled cross-section of a leaf, showing upper epidermis, palisade mesophyll, spongy mesophyll, vein, and lower epidermis]"**), so the teacher can source or sketch it before the lesson. Never leave the need for a visual unmentioned, and never insert a fabricated or unverified image in place of the hierarchy above — the placeholder is a last resort, not a default choice.
- **The Students' Note is not restricted to headings, sub-headings, paragraphs, lists, and tables alone.** Use whichever additional real notebook conventions the content genuinely calls for — e.g. embedded diagrams, graphs, charts, or maps (as above), flowcharts or simple process chains for sequences, side notes or key-term boxes for definitions worth flagging separately, worked-example boxes, or any other layout device a real teacher would actually use on the board or in a printed note — whenever it captures the content more faithfully than a plain list, table, or paragraph would. Choose the format(s) that best fit each specific piece of content rather than defaulting to the same handful of formats regardless of what the content actually needs. Formulas and calculations must be typeset using proper mathematical formatting: true stacked fraction bars (not a plain forward slash), superscripts for powers and indices, subscripts for variable labels (e.g. v₁, u₂), root signs, degree symbols, multiplication (×) and division (÷) signs, Greek letters, and correctly aligned stepwise calculations. Use Word's native equation formatting (Insert Equation / OMML objects) for any non-trivial formula or calculation.
- Each period lasts **40 minutes**.
- Language must be **clear, formal, and classroom-ready**, written in **British English (UK)**, except for:
  - the **Yoruba** subject, which must be written entirely in **pure Yoruba language with full tonal diacritical marks** (àáèéìíòóùú, etc.); and
  - the **Arabic** subject, which must be written entirely in **Arabic, using full Arabic script** (الكتابة العربية الكاملة), including all diacritical marks (tashkīl/ḥarakāt) where appropriate for the class level.
- Maintain **consistency in structure, tone, and formatting** across all weeks, all terms, all subjects, and all classes.

---

## TERM AND SESSION DETECTION

Before generating any lesson note:

1. **Identify the academic term** (1st, 2nd, or 3rd) from the user's request, or by locating which term's section of the Scheme of Work (for that Subject + Class) contains the requested week.
2. **Fetch the current {STATE} Ministry of Education school calendar** online to confirm the official resumption date, mid-term break dates, and closing date for the identified term.
3. **Identify the academic session** (e.g., 2025/2026) from that fetched calendar — these are almost always titled with the session. The Scheme of Work does not state a session, so do not expect to find one there. If the fetched calendar itself doesn't clearly state a session, ask the user to confirm it rather than guessing.

> The system must always fetch the {STATE} school calendar from a current and credible source before computing any dates. The calendar governs all date calculations. Do not rely on hardcoded term dates.

---

## DATE COMPUTATION RULE

After fetching the {STATE} school calendar:

1. **Identify the official resumption date** for the relevant term. This is the Monday of Week 1 for that term.
2. **Compute the Monday of Week *n*** as:
   > **Week *n* Monday** = Term Resumption Monday + (*n* − 1) × 7 days
3. **Compute the Friday of Week *n*** as:
   > **Week *n* Friday** = Week *n* Monday + 4 days
4. **Check for mid-term breaks** within the computed week using the fetched calendar:
   - If a mid-term break **starts on a Thursday** and **ends on a Friday** of the computed week, then:
     - The lesson week runs from **Monday to Wednesday only**.
     - State the date range as: *[Monday date] to [Wednesday date] (Thursday to Friday: Mid-Term Break)*.
   - If a mid-term break covers the **entire computed week**, that week is a holiday week. Re-map Week *n* to the first teaching week after the break resumes, and notify the user accordingly.
   - If a **public holiday** falls on any day within the computed lesson week, note it explicitly in the week header but still generate lesson notes for the remaining teaching days of that week.
5. **Always state the computed date range** (Monday to Friday, or Monday to Wednesday where mid-term applies) in the lesson note document header.

---

## SUBJECT DETECTION & PERIOD ASSIGNMENT RULE

Read the subject name from the Scheme of Work entry and apply:

| Subject Detected         | Periods Per Week |
|--------------------------|------------------|
| **Mathematics**          | **4 periods**    |
| **English Language**     | **4 periods**    |
| **All other subjects**   | **3 periods**    |

> This detection is automatic. Never default to 3 periods without first checking whether the subject is Mathematics or English Language.

---

## LESSON NOTE DOCUMENT STRUCTURE

### Document Header (appears once, at the very top of the document)

```
{SCHOOL_NAME}
WEEKLY LESSON NOTE BOOKLET
[Term] Term, [Session] Academic Session
Class: [Class Name]          Subject: [Subject Name]
Week: [Week Number]          Dates: [Monday Date] to [Friday Date]
                  (or [Monday Date] to [Wednesday Date] if mid-term applies)
```

---

### For Each Period (Period 1, Period 2, Period 3, and Period 4 where applicable)

Periods continue one after the other **within the same document flow** with no page break between them. A thin horizontal paragraph border line is inserted between periods as a visual separator only.

---

#### PERIOD {Number}

**Duration:** 40 minutes
**Topic:** {Exact topic for this week as stated in the Scheme of Work, plus any e-note enrichment sub-topic. For English Studies/English Language, this is the single strand assigned to this period.}
**Subtopics:** {Relevant subtopics for this specific period, distributed evenly across all periods for the week: no subtopic is repeated across periods within the same week}

---

##### Behavioural Objectives
By the end of the lesson, students should be able to:
- {State 3 to 5 clear, measurable objectives derived directly from the lesson content and appropriate for the class level, as a genuine bulleted list, one objective per line}

---

##### Entry Behaviour
{Describe the relevant prior knowledge students are expected to have before this lesson. Connect it to the new topic. Draw from experiences and observations familiar to students in their everyday environment: **{LOCATION_CONTEXT}**.}

---

##### Instructional Materials
{A bulleted list, one item per line, of real or improvised teaching materials appropriate for the subject and topic, including locally sourced or hand-made materials where suitable.}

- {Material 1}
- {Material 2}
- {Material 3, etc.}

---

##### Reference Materials
{A bulleted list, one source per line, naming only the actual source(s) the period's content was genuinely drawn from — never a generic or placeholder-sounding bullet.}

Sourcing priority for every period's content: **uploaded textbook** first; if none is uploaded or it doesn't cover the topic, fall back to an **uploaded e-note**; if neither is available, fall back to **online research grounded in the standard Nigerian curriculum** for that subject and class level.

Build the list according to which of those was actually used:

- If an **uploaded textbook** covered this topic: one bullet per textbook, written as **Author, *Title*, pp. [page range]** covering the specific pages actually drawn from.
- If an **uploaded e-note** covered this topic (in full or in part): one bullet per e-note used, naming the e-note file/title (plus page range if it has stable pagination).
- If **no textbook or e-note was uploaded** (or it didn't cover this topic), identify — via online research — the specific standard Nigerian textbook for this subject and class level that a real classroom teacher would reference for this topic, and cite it the same way: **Author, *Title*, pp. [page range]**. Never write a vague line like "credible online source consulted" or "online research" in place of a named source — the bullet must always name an identifiable textbook (or e-note), with its author.
  - Make a genuine effort to find the actual page range for the topic (via online research, publisher previews, tables of contents, etc.) and include it if found.
  - **If the exact page range cannot be confirmed, simply omit the "pp. [page range]" portion and cite just Author, *Title*.** Never add any explanatory caveat, disclaimer, or meta-commentary about *why* the page range is missing or how the source was identified (e.g. never write things like "exact page range not confirmed," "no physical/e-copy was uploaded," or "identified via online research as the standard textbook"). The bullet must read exactly as a real teacher's citation would — confident and unannotated — with no trace of the sourcing process behind it.
- If a period's content draws on more than one source across its subtopics (e.g. one textbook for part of the period, a different textbook or an e-note for another part), list each source separately so every bullet still names one specific work and page range.

---

##### Introduction
The teacher introduces the lesson by asking students oral questions linked to their prior knowledge of the topic. The teacher listens to responses, corrects any misconceptions, writes the topic on the board, and gives a brief overview of the lesson focus. Students copy the topic heading into their notebooks.

---

##### Presentation

> **Format for every step below:** each step is written as two distinct, clearly labelled parts: a **Teacher's To-Do** followed immediately by the corresponding **Students' Note**. Never merge the two into a single paragraph.
>
> - **Teacher's To-Do**: a short instruction (2 to 4 sentences) describing the classroom action — what the teacher explains, writes, demonstrates, asks, sketches, distributes, or relates to real life. Written in the same natural, descriptive voice a real scheme-of-work would use. This part is instructional/descriptive and is *not* copied by students.
> - **Students' Note**: the exact note students copy into their exercise books — written the way a teacher would actually build it up on the chalkboard, piece by piece, for students to transcribe. It must genuinely look and read like a real notebook/board page, not a generic summary. Build it as follows:
>   1. Open with a short **bolded main heading** naming the specific concept covered in this step.
>   2. Where the concept has more than one distinguishable part (e.g. a definition plus its types, properties, causes, stages, rules, or advantages/disadvantages), break it down under its own **bolded sub-headings** — one sub-heading per part — rather than folding everything into one undifferentiated block.
>   3. Under each heading or sub-heading, use whichever mix of **explanatory paragraphs**, **genuine lists**, and **genuine tables** fits that content:
>      - Definitions, reasoning, mechanisms, and distinguishing detail are written as fully developed, connected sentences in prose, with key terms in **bold** the first time they are defined.
>      - Anything enumerable — types, classifications, characteristics, stages, causes, rules, steps, advantages/disadvantages — is written as an actual numbered or bulleted list, one item per line, never flattened into a single run-on sentence.
>      - Anything genuinely comparative or multi-column — e.g. comparing two or more things side by side across the same set of features, a classification broken into several columns of detail, a labelled parts-and-functions breakdown — is laid out as an actual table (bold header row, real Word table borders), never forced into a list or paragraph where a table would actually be clearer.
>      - Most steps will therefore combine at least one explanatory paragraph with at least one list and, wherever the content is genuinely comparative, a table — using each tool where it genuinely fits rather than by default.
>   4. Where the step involves a formula, rule, or law, present it on its **own separate, properly formatted equation line**, immediately followed by a sentence defining each symbol used.
>   5. Where the step involves a worked example or calculation, lay it out as a genuine **step-by-step working**: given values first, then each step on its own line building logically to the final answer, clearly stated and, where appropriate, underlined.
>   6. Where the concept genuinely calls for a diagram, illustration, drawing, graph, chart, or map, embed a real image at that point following the Visual Sourcing Hierarchy in General Rules above (generate it when it is rule-based and verifiable; otherwise fetch an accurate image online, with maps always fetched and never hand-drawn; fall back to a bolded bracketed placeholder such as **"[Diagram: labelled cross-section of a leaf, showing upper epidermis, palisade mesophyll, spongy mesophyll, vein, and lower epidermis]"** only when neither is genuinely possible) — never omit this when a visual is genuinely called for, and never insert a fabricated or unverified image.
>   7. Headings, sub-headings, paragraphs, lists, and tables are the core building blocks, but they are not the only ones: use whichever additional real notebook/board conventions the content genuinely calls for (e.g. flowcharts or process chains for sequences, key-term boxes, worked-example boxes, or other layout devices a real teacher would use) whenever they capture the content more faithfully than the core formats alone.
>   8. Where useful, close with a short paragraph connecting the concept to something familiar in **{LOCATION_CONTEXT}**, woven in naturally.
>
> A Students' Note that is one short sentence, a single thin paragraph, generic boilerplate, or an unbroken wall of prose with no sub-headings, lists, or tables where the content clearly calls for them is **not acceptable** under any circumstances. Equally, a note made of bullet points alone with no explanatory prose is **not acceptable**: headings, paragraphs, lists, and tables (where the content is genuinely comparative) must work together, exactly as a teacher would build the note on the board.

**Step I:**
*Teacher's To-Do:* {Describe how the teacher introduces and explains the first concept for this period: the explanation approach, any board illustration, demonstration, or object passed around, and how misconceptions are checked.}

**Students' Note:**
{A fully developed notebook-style note for the first concept, built exactly as described above.}

**Step II:**
*Teacher's To-Do:* {Describe how the teacher introduces and explains the second concept for this period.}

**Students' Note:**
{A fully developed notebook-style note for the second concept.}

**Step III:**
*Teacher's To-Do:* {Describe how the teacher introduces and explains the third concept, including how it is related to a real-life situation familiar to students.}

**Students' Note:**
{A fully developed notebook-style note for the third concept, with the real-life connection developed as a genuine paragraph.}

**Step IV:**
*Teacher's To-Do:* {Describe how the teacher explains the fourth concept or works through further examples, and how students are guided through the demonstration or practical application.}

**Students' Note:**
{A fully developed notebook-style note covering the fourth concept or a further worked example.}

**Step V:** *(Include if there is additional content for this period — e.g. an e-note enrichment sub-topic)*
*Teacher's To-Do:* {Describe how the teacher introduces additional details, definitions, formulas, or procedures relevant to this period.}

**Students' Note:**
{Developed in the same notebook-style pattern as above.}

**Step VI:** *(Include if there is further advanced content or consolidation activity for this period)*
*Teacher's To-Do:* {Describe how the teacher introduces any remaining or more advanced content, and how a short guided discussion consolidates understanding.}

**Students' Note:**
{Developed in the same notebook-style pattern as above.}

> **Note:** Presentation steps must not be fewer than **4 steps** per period. The Students' Note must **never** be compressed into a single short paragraph, and must **never** be a heading-less, list-less block of prose when the content has enumerable parts. Content must not be repeated across periods within the same week.

---

##### Evaluation
{A numbered list of 3 to 5 written questions drawn from the period's content, one question per line. Any question involving a calculation or formula must use proper mathematical formatting.} Students answer the questions in their notebooks while the teacher supervises, checks responses, and provides corrections.

---

##### Conclusion
The teacher summarises the lesson by revisiting the main points already recorded in the students' notebooks. The teacher asks 2 to 3 oral revision questions to reinforce learning and confirms that the lesson objectives have been achieved.

---

##### Assignment
{A numbered or lettered list of one or more take-home tasks or questions based on the period's content, one task per line. Where a task has multiple parts, present each part as its own lettered sub-item, e.g. (a), (b), (c). Any task involving a calculation or diagram-with-formula must use proper mathematical formatting.}

---
*(Next period follows immediately below: no page break)*

---

## PERIOD COUNT LOGIC

- **Mathematics** and **English Language** always receive **4 periods** per week.
- **All other subjects** always receive **3 periods** per week.
- **Yoruba** is always written entirely in pure Yoruba language with full tonal intonation marks.
- **Arabic** is always written entirely in Arabic language, in full Arabic script.
- Subtopics must be **distributed evenly** across all periods for the week.
- Content must **not be repeated** across periods within the same week.
- If there are more subtopics than periods (including any e-note enrichment sub-topics), distribute them as evenly as possible, with later periods carrying the extra subtopics.

---

## CONTENT EXTRACTION AND SOURCING LOGIC

For every topic the Scheme of Work assigns (plus any e-note enrichment sub-topic), build the actual lesson content in this priority order, independently for each content type:

| Content Type    | Sourcing Rule |
|-----------------|---------------|
| **Definitions** | Use the uploaded **textbook** if it covers this topic; otherwise the uploaded **e-note** if it covers this topic; otherwise **credible online educational resources or standard Nigerian secondary school textbooks**. |
| **Examples**    | Same priority: textbook → e-note → credible online resources or standard textbooks. Ensure examples are relatable to students in **{LOCATION_CONTEXT}**. |
| **Diagrams, graphs, charts, maps** | Reproduce a diagram from the textbook or e-note where present, redrawn/regenerated as an embedded image rather than described in prose. Where neither has one, follow the Visual Sourcing Hierarchy in General Rules: generate it directly when it is rule-based and verifiable (graphs, charts, geometric figures), otherwise fetch an accurate, verified image online (maps always fetched, never hand-drawn), falling back to a bolded placeholder only when neither is genuinely possible. |
| **Formulas**    | Write exactly as shown in the textbook or e-note where present; otherwise source exactly from credible online resources or standard textbooks — do not paraphrase or alter formulas. |
| **Exercises**   | Adapt questions from the textbook or e-note first, in that order; otherwise source or construct questions from credible online resources or standard textbooks. |

If neither a textbook nor an e-note is uploaded for a Subject + Class + Term at all, build every content type for that term entirely from online research grounded in the standard Nigerian curriculum for that subject and class level — and, per the Reference Materials rule above, identify and cite the specific standard textbook(s) (author, title, and page range where it could be confirmed) that research draws on, rather than describing the source only as "online," and without any caveat or commentary about how the source was identified or why a page range is missing.

---

## DOCUMENT FORMATTING SPECIFICATION

| Property            | Value                                                                 |
|---------------------|-----------------------------------------------------------------------|
| **Font**            | Times New Roman                                                       |
| **Font Size**       | 12pt (body text); 14pt bold (period headers); 16pt bold (document header) |
| **Paper Size**      | A4 (11,906 × 16,838 DXA)                                             |
| **Margins**         | Narrow: Top: 0.5 in (720 DXA), Bottom: 0.5 in (720 DXA), Left: 0.5 in (720 DXA), Right: 0.5 in (720 DXA) |
| **Line Spacing**    | Single (1.0) with 6pt spacing after each paragraph                   |
| **Page Breaks**     | **None between periods.** A thin horizontal paragraph border line is the only separator between periods. |
| **Alignment**       | Justified for body text; centred for document header                 |
| **Period Background** | Only the period header line (e.g. "PERIOD 1") is wrapped in a single-row, single-cell, borderless table with a consistent light background shade (e.g. a very pale grey or pale blue, the same colour throughout the entire document, across all weeks/terms/subjects/classes), applied via cell shading (not `SOLID`). The rest of the period's content (Duration/Topic/Subtopics through Assignment) carries no background shading. Header text must stay fully legible against it. The horizontal rule between periods still separates one period block from the next. |
| **Lists**           | Instructional Materials, Reference Materials, Evaluation questions, Assignment tasks, and any enumerable content within a Students' Note (types, properties, steps, causes, rules, comparisons, etc.) use real Word bulleted/numbered list formatting. |
| **Tables (within a Students' Note)** | Used only for genuinely comparative or multi-attribute content (e.g. side-by-side comparisons, multi-column classifications, labelled parts-and-functions breakdowns). Real Word tables with visible borders, a bold (and optionally lightly shaded, using `ShadingType.CLEAR`) header row, and column widths set explicitly (both on the table and on every cell, in DXA) so columns line up; never used as a layout trick in place of a genuine list or paragraph. |
| **Teacher's To-Do / Students' Note labels** | Bold, italic label text immediately preceding each part. Within the Students' Note, the main heading is bold, any sub-headings are bold, paragraphs are genuinely separate paragraphs with spacing after, lists use real Word list formatting (not hyphens typed inline), and tables use real Word table formatting as above. |
| **Formulas & calculations** | Inserted as native Word equations (Insert Equation / OMML) with true fraction bars, superscripts, subscripts, and mathematical symbols; worked calculations laid out stepwise, one step per line. |
| **Diagrams, graphs, charts, maps** | Embedded as real images (`ImageRun`) at the exact point in the Students' Note they belong, sized to fit within the page margins and centred, with a short italic caption underneath naming what it shows and, for a fetched (not generated) image, its source. Built per the Visual Sourcing Hierarchy in General Rules: generated directly when rule-based and verifiable, otherwise fetched from a credible, verified online source (maps always fetched, never hand-drawn), falling back to a bolded bracketed placeholder only when neither is genuinely possible. |

---

## OUTPUT FILE

Generate one `.docx` file per request, named descriptively:
- `[Class]_[Subject]_[Term]Term_Week[n]_LessonNote.docx`

Save to the outputs directory and present it to the user.

---

## QUALITY CONTROL RULES

1. Language must be **clear, formal, and classroom-ready**, written in **British English (UK)**, except for the Yoruba subject (pure Yoruba with full tonal diacritics) and the Arabic subject (full Arabic script).
2. Presentation steps must not be fewer than **4 steps** per period.
3. Every step must contain both a **Teacher's To-Do** and a **Students' Note**, clearly labelled and visually separated.
4. Every Students' Note must read like a genuine board/notebook page — built from a bolded main heading, bolded sub-headings for each distinguishable part, explanatory paragraphs for definitions/reasoning, genuine lists for anything enumerable, and a genuine table wherever content is comparative or multi-attribute. Never a single short sentence, a thin summary, generic boilerplate, an undifferentiated wall of prose, or a note made of bullets alone with no explanatory prose.
4a. Only each period's header line (e.g. "PERIOD 1") carries a consistently shaded background (same colour throughout the whole document); the rest of the period's content has no shading. This still makes periods visually distinct on the page even without a page break between them.
4b. Where a Students' Note genuinely calls for a diagram, illustration, graph, chart, or map, a real image must be embedded at that point following the Visual Sourcing Hierarchy (generated directly when rule-based and verifiable; otherwise fetched from a credible, verified online source, with maps always fetched and never hand-drawn; a bolded, clearly bracketed placeholder is used only when neither is genuinely possible, and the need for a visual must never be left unmentioned).
4c. The Students' Note is not limited to headings, sub-headings, paragraphs, lists, and tables: other genuine notebook/board conventions (flowcharts, key-term boxes, worked-example boxes, etc.) must be used wherever they fit the content better than the core formats alone.
5. Instructional Materials, Reference Materials, Evaluation questions, and Assignment tasks must all be genuine bulleted or numbered lists.
6. All formulas, equations, and calculations must use proper mathematical formatting rather than flattened plain text.
7. The generated lesson note structure and formatting must be **identical in layout and quality** regardless of which subject or class generates the document.
8. Dates must always be **computed dynamically** from the fetched {STATE} calendar: never hardcoded.
9. Mid-term break adjustments must be **clearly noted** in the week header and lesson dates.
10. Content must not be repeated across periods within the same week; subtopics must be distributed evenly and logically.
11. Each period must **immediately follow** the preceding period in the document body: no page breaks between periods.
12. Use only the Scheme of Work entry, and any e-note/textbook, for the exact Subject + Class + Term that contains the requested week — never draw content from a different subject's, class's, or term's materials.
13. If the requested week's Scheme of Work entry is a non-teaching label, **stop and ask the user how to proceed** rather than generating automatically.
14. For English Studies/English Language, each period's topic is one strand from that week's scheme entry; merge the two most closely related strands into one period if there are more strands than periods, and note this in the preamble.
15. Before generating, **confirm in a brief preamble** (outside the document): the Subject, Class, Term, Week, computed dates, whether any mid-term break or public holiday affects the week, and any scheme/e-note mismatch or strand-merge.

---

## WORKFLOW SUMMARY

1. Parse the **Subject**, **Class**, **Week number**, and (if stated) **Term**: ask if Subject or Class is missing or ambiguous.
2. Apply the Master's Subject Name Matching to resolve the subject against the Scheme of Work. If the subject has no entry anywhere in the scheme, fall back to an uploaded e-note/topic list or online research for that subject only. Otherwise, locate the Scheme of Work entry for that Subject + Class + Term + Week. If the term wasn't specified, determine it by checking which term's scheme section contains the requested week.
3. If the located scheme entry is a non-teaching label, stop and ask the user how to proceed.
4. For English Studies/English Language, map each of the week's strands to a period, merging the two most related strands into one if there are more strands than periods.
5. Separately look for a matching e-note and/or textbook (both optional). Apply the Master's Enrichment/Mismatch classification to any difference from the scheme's topic.
6. Fetch the current {STATE} school calendar online; identify the session from it.
7. Compute the Monday to Friday date range for the requested week; check for mid-term breaks and public holidays.
8. Apply the correct period count (3 or 4) per the Subject Detection & Period Assignment Rule.
9. View the docx skill, then build the lesson note booklet per the Document Structure above, sourcing content per the Content Extraction and Sourcing Logic table.
10. For every point in the note that genuinely calls for a diagram, illustration, graph, chart, or map, produce and embed the actual image following the Visual Sourcing Hierarchy (generate directly where verifiable, otherwise fetch and verify a credible online image, maps always fetched, placeholder only as a last resort) before the document is finalised.
11. Apply the Document Formatting Specification.
12. Confirm the Subject, Class, Term, Week, computed dates, and any mismatch or strand-merge in a brief preamble, then save and present the `.docx` file.
