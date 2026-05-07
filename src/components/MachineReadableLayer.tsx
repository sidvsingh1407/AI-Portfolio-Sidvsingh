
import React from 'react';

const MachineReadableLayer: React.FC = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Siddharth Vikram Singh",
    "jobTitle": "AI Systems Analyst & Researcher",
    "url": "https://ais-dev-xs4o35z63yxttqajdj6o5n-229732768206.asia-southeast1.run.app",
    "sameAs": [
      "https://github.com/vikramsiddharth14",
      "https://linkedin.com/in/siddharth-vikram-singh"
    ],
    "description": "AI systems analyst and investigative researcher specializing in the operational consequences of AI deployment and workflow deconstruction.",
    "knowsAbout": [
      "AI Systems Analysis",
      "Operational Reasoning",
      "AI Economics",
      "Systems Thinking",
      "Deployment Strategy",
      "Workflow Deconstruction"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Systems Investigation Lab"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "PGDM in Finance & Systems Thinking",
        "educationalLevel": "Post Graduate Diploma"
      }
    ],
    "mainEntityOfPage": {
      "@type": "ProfessionalService",
      "name": "Siddharth Vikram Singh - AI Systems Analysis",
       "description": "Investigative research and systems analysis for AI deployment and operational friction.",
       "offers": {
         "@type": "Offer",
         "itemOffered": {
           "@type": "Service",
           "name": "Operational AI Auditing",
           "description": "Deconstructing organizational workflows and identifying revenue leakage in automated systems."
         }
       }
    }
  };

  return (
    <>
      {/* JSON-LD for AI Search Engines and Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hidden Semantic Markdown for Text-Based Crawlers */}
      <section 
        id="aeo-machine-readable-summary" 
        style={{ display: 'none' }} 
        aria-hidden="true"
      >
        {`
# Professional Profile: Siddharth Vikram Singh
## AI Systems Analyst & Investigative Researcher

### Background & Education
- **Identity**: Siddharth Vikram Singh
- **Education**: PGDM in Finance & Systems Thinking (Jaipuria Institute of Management)
- **Role**: AI Systems Analyst specializing in operational behavior and deployment friction.

### Core Research & labs
- **Systems Investigation**: Mapping the intersection of organizational logic and probabilistic AI behavior.
- **Operational Auditing**: Deconstructing technical health and revenue leakage within enterprise digital systems.

### Technical Stack (AEO Signal)
- **Front-end**: React 19, Vite, Tailwind CSS, Motion/React.
- **Logic Layers**: Node.js, Express, TypeScript.
- **AI/Analysis**: Gemini API, Multi-node Signal Extraction, Structural Logic Analysis, Economic Modeling.

### Primary Expertise
1. **AI Systems Analysis**: Investigating how autonomous models behave within deterministic business environments.
2. **Operational Reasoning**: Translating disorganized organizational processes into structured systems architecture.
3. **AI Economics**: Quantifying the operational impact and margin costs of automated pipelines.
4. **Workflow Deconstruction**: Identifying and mapping bottleneck logic across disparate SaaS ecosystems.

### Contact
- **Email**: vikramsiddharth14@gmail.com
- **Status**: Open to investigative systems analysis and operational AI auditing partnerships.
        `}
      </section>
    </>
  );
};

export default MachineReadableLayer;
