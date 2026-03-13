export const companyProfile = {
  name: 'Orion Technologies',
  sector: 'Cloud AI Infrastructure',
  founded: 2016,
  products: 'AI compute platform for startups',
  initialFinancials: {
    cash: 82_000_000,
    quarterlyRevenue: 28_000_000,
    quarterlyExpenses: 32_000_000,
    valuation: 320_000_000,
    dilution: 0,
    employees: 430,
  },
  expenseBreakdown: [
    { category: 'Engineering Salaries', amount: 14_000_000 },
    { category: 'Servers & Infrastructure', amount: 11_000_000 },
    { category: 'Marketing', amount: 4_000_000 },
    { category: 'Office & Admin', amount: 3_000_000 },
  ],
};

export const stages = [
  {
    id: 1,
    title: 'THE VC EMAIL',
    quarter: 'Q1 — Month 3',
    email: {
      from: 'Horizon Ventures',
      subject: 'Strategic Investment Opportunity',
      body: `Dear CEO,\n\nWe have been following Orion Technologies closely and are impressed by your AI compute platform and the traction you have achieved in the startup ecosystem.\n\nWe are prepared to invest $120M in exchange for 25% equity in Orion Technologies.\n\nConditions:\n• One board seat for Horizon Ventures\n• Aggressive expansion into the Asian market within 12 months\n• We consider an increased burn rate acceptable during the growth phase\n\nThis offer is valid for 10 business days.\n\nAt $120M for 25%, this implies a company valuation of $480M — a significant premium over your current position.\n\nWe believe this partnership will transform Orion into the dominant global AI infrastructure provider.\n\nBest regards,\nSarah Chen\nManaging Partner, Horizon Ventures`,
    },
    context: [
      'Your company loses $4M per quarter.',
      'Current runway is approximately 20 months.',
      'This deal would value the company at $480M — a 50% premium.',
      'Accepting means giving up 25% ownership and significant board influence.',
    ],
    options: [
      {
        id: 'accept',
        label: 'ACCEPT THE DEAL',
        description: 'Take the $120M for 25% equity. Gain massive runway but dilute significantly and accept VC influence.',
        effects: {
          cashDelta: 120_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 6_000_000,
          valuationDelta: 160_000_000,
          dilutionDelta: 25,
          employeeDelta: 80,
        },
        narrative: 'You accept the deal. $120M lands in the company account within 3 weeks. The board now includes Sarah Chen from Horizon Ventures, who immediately pushes for aggressive Asia expansion. Hiring ramps up — 80 new engineers are onboarded. But your burn rate increases by $6M per quarter due to the expansion. Your runway, however, extends to nearly 4 years. The pressure to grow fast is real.',
      },
      {
        id: 'negotiate',
        label: 'NEGOTIATE BETTER TERMS',
        description: 'Counter-offer: $120M for only 18% equity, or push for $150M at 25%. Try to retain more control.',
        effects: {
          cashDelta: 120_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 4_000_000,
          valuationDelta: 200_000_000,
          dilutionDelta: 18,
          employeeDelta: 50,
        },
        narrative: 'After two weeks of intense negotiations, Horizon agrees to $120M for 18% equity — implying a $667M valuation. They drop the mandatory board seat demand but retain observer rights. You hire 50 new engineers for a measured Asia expansion. Burn rate increases by $4M/quarter, but you retain significantly more control. A masterful negotiation.',
      },
      {
        id: 'reject',
        label: 'REJECT THE OFFER',
        description: 'Decline the investment. Preserve equity but maintain the cash pressure. Bet on organic growth.',
        effects: {
          cashDelta: 0,
          quarterlyRevenueDelta: 2_000_000,
          quarterlyExpensesDelta: 0,
          valuationDelta: 0,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You reject the offer, believing Orion can grow organically. The team rallies — morale is high knowing their equity isn\'t diluted. However, the $4M quarterly loss continues. You tighten spending and manage to grow revenue by $2M/quarter through sales hustle. The clock is ticking. You have 20 months of runway and no safety net.',
      },
    ],
  },
  {
    id: 2,
    title: 'THE CLOUD PARTNERSHIP',
    quarter: 'Q2 — Month 6',
    email: {
      from: 'Titan Cloud (Major Cloud Provider)',
      subject: 'Exclusive Infrastructure Partnership Proposal',
      body: `Dear CEO,\n\nTitan Cloud is the world's third-largest cloud provider with 22% global market share.\n\nWe propose hosting Orion's entire AI compute platform exclusively on Titan Cloud infrastructure.\n\nOur offer:\n• $60M in infrastructure credits over 3 years\n• Joint co-marketing campaigns across 14 countries\n• Priority access to our next-gen GPU clusters\n\nCondition:\n• 5-year platform exclusivity agreement with Titan Cloud\n\nThis partnership would dramatically reduce your infrastructure costs while giving you access to our global data center network spanning 42 regions.\n\nWe see Orion as a key strategic partner in the AI compute space.\n\nRegards,\nDavid Liu\nVP Strategic Partnerships, Titan Cloud`,
    },
    context: [
      'Servers & Infrastructure currently costs $11M per quarter.',
      'This deal would cut that by ~$8M/quarter through credits.',
      '5-year exclusivity means you cannot use AWS, Azure, or GCP.',
      'Vendor lock-in could impact future negotiations and flexibility.',
    ],
    options: [
      {
        id: 'accept',
        label: 'ACCEPT — FULL EXCLUSIVITY',
        description: 'Sign the 5-year exclusive deal. Slash costs by $8M/quarter but lock yourself to one provider.',
        effects: {
          cashDelta: 5_000_000,
          quarterlyRevenueDelta: 3_000_000,
          quarterlyExpensesDelta: -8_000_000,
          valuationDelta: 40_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You sign the exclusivity deal. Infrastructure costs plummet by $8M per quarter. The co-marketing drives $3M in new quarterly revenue from Titan Cloud\'s customer base. However, three months later, a major customer complains about Titan Cloud\'s latency in Southeast Asia. You\'re locked in and cannot switch. The cost savings are enormous, but the strategic risk is real.',
      },
      {
        id: 'negotiate',
        label: 'NEGOTIATE — 3-YEAR TERM & MORE CREDITS',
        description: 'Counter with a 3-year term instead of 5, and push for $80M in credits. Reduce lock-in risk.',
        effects: {
          cashDelta: 5_000_000,
          quarterlyRevenueDelta: 2_000_000,
          quarterlyExpensesDelta: -6_000_000,
          valuationDelta: 30_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'After negotiations, Titan agrees to a 3-year exclusivity term with $80M in credits. Your infrastructure costs drop by $6M/quarter. The shorter term gives you an exit window. Co-marketing brings in $2M in new quarterly revenue. It\'s a balanced deal — significant savings without permanent lock-in.',
      },
      {
        id: 'reject',
        label: 'REJECT — STAY MULTI-CLOUD',
        description: 'Decline the deal entirely. Maintain infrastructure independence but keep bearing the full $11M/quarter cost.',
        effects: {
          cashDelta: 0,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 0,
          valuationDelta: 10_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You reject the deal, preserving Orion\'s multi-cloud independence. Your infrastructure costs remain at $11M/quarter. However, enterprise customers value your multi-cloud flexibility — two new clients sign specifically because you\'re not locked to one provider. Your valuation ticks up slightly on the strength of your independent positioning.',
      },
    ],
  },
  {
    id: 3,
    title: 'THE REVENUE CRISIS',
    quarter: 'Q3 — Month 12',
    email: {
      from: 'VP of Sales (Internal)',
      subject: '⚠️ URGENT: Major Client Churn Alert',
      body: `CEO,\n\nI need to inform you of a serious revenue event.\n\nTwo of our enterprise clients — NovaTech ($5.2M annual contract) and DataStream Labs ($3.8M annual contract) — have informed us they are terminating their contracts effective end of this quarter.\n\nReasons cited:\n• NovaTech is building in-house AI infrastructure\n• DataStream Labs has been acquired by a competitor\n\nCombined impact:\n• Revenue drops by $9M per quarter immediately\n• New quarterly revenue: ~$19M (was $28M)\n• With expenses at $32M, we now lose $13M per quarter\n• At this bleed rate, runway collapses to approximately 6 quarters\n\nWe need to act immediately.\n\nGavin Patel\nVP Sales, Orion Technologies`,
    },
    context: [
      'Two major clients are leaving — $9M/quarter revenue loss.',
      'The company is now losing $13M per quarter.',
      'Runway has collapsed to approximately 6 quarters.',
      'This is an existential crisis. You must cut costs, raise capital, or find replacement revenue.',
    ],
    options: [
      {
        id: 'layoffs',
        label: 'EMERGENCY LAYOFFS',
        description: 'Cut 120 employees across non-critical teams. Saves $5M/quarter in salaries. Risk: product development delays.',
        effects: {
          cashDelta: 0,
          quarterlyRevenueDelta: -9_000_000,
          quarterlyExpensesDelta: -5_000_000,
          valuationDelta: -30_000_000,
          dilutionDelta: 0,
          employeeDelta: -120,
        },
        narrative: 'You announce layoffs of 120 employees — 28% of the company. Engineering, marketing, and support are all hit. Morale drops sharply. Glassdoor reviews mention "toxic leadership." Several senior engineers leave voluntarily in solidarity. But the math works: costs drop by $5M/quarter. The bleeding slows from $13M to $8M per quarter. You\'ve bought time, but at a heavy human cost.',
      },
      {
        id: 'debt',
        label: 'RAISE DEBT — BANK LOAN',
        description: 'Take an $80M bank loan at 9% annual interest. Collateral: Orion\'s patent portfolio. Buys runway but adds $1.8M/quarter in interest payments.',
        effects: {
          cashDelta: 80_000_000,
          quarterlyRevenueDelta: -9_000_000,
          quarterlyExpensesDelta: 1_800_000,
          valuationDelta: -20_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You take the $80M loan. The bank demands your patent portfolio as collateral — if Orion fails, they own your IP. Interest payments of $1.8M/quarter begin immediately, adding to expenses. But $80M in fresh cash extends runway significantly. The revenue hole still bleeds at $13M+/quarter, but you now have the time to find replacement customers. The question is whether you can grow fast enough to outrun the debt.',
      },
      {
        id: 'acquire',
        label: 'ACQUIRE A COMPETITOR',
        description: 'Buy CloudMesh (small AI startup) for $25M. They bring $8M/quarter in revenue and 45 engineers. Aggressive but could plug the revenue hole.',
        effects: {
          cashDelta: -25_000_000,
          quarterlyRevenueDelta: -1_000_000,
          quarterlyExpensesDelta: 2_000_000,
          valuationDelta: 10_000_000,
          dilutionDelta: 0,
          employeeDelta: 45,
        },
        narrative: 'You acquire CloudMesh for $25M in cash. The deal closes in 6 weeks. Their 45 engineers and $8M/quarter revenue inject life into Orion. Net revenue impact is only -$1M (lost $9M, gained $8M). Integration costs add $2M/quarter temporarily, but the combined company is stronger. CloudMesh\'s clients are sticky enterprise accounts. This was an expensive but potentially game-changing move.',
      },
    ],
  },
  {
    id: 4,
    title: 'THE GPU PIVOT',
    quarter: 'Q4 — Month 18',
    email: {
      from: 'Head of Product (Internal)',
      subject: 'New Market Opportunity: Dedicated GPU Clusters',
      body: `CEO,\n\nI\'ve been receiving inbound interest from over 40 AI startups asking about dedicated GPU infrastructure.\n\nThe market is exploding. NVIDIA H100 GPUs are backordered 9+ months. Startups are desperate for reliable GPU compute.\n\nI\'m proposing we build Orion GPU Clusters — a dedicated GPU-as-a-Service offering.\n\nInvestment required:\n• $90M capital expenditure for GPU hardware procurement\n• $12M for data center buildout and cooling infrastructure\n• 6 months to first revenue\n\nProjected returns:\n• $60M annual revenue at full capacity (starting Month 24)\n• 65% gross margins (vs our current 45%)\n• Positions Orion as a top-3 GPU cloud provider\n\nRisk:\n• Demand is uncertain beyond current hype cycle\n• GPU prices could drop 40% in 18 months\n• Requires significant cash outlay during a vulnerable period\n\nThis could be our Netflix moment — a pivot that defines the next decade.\n\nMira Dasgupta\nHead of Product, Orion Technologies`,
    },
    context: [
      'AI GPU demand is at an all-time high, but the hype cycle is uncertain.',
      'Full investment: $102M for hardware + buildout.',
      'Potential revenue: $60M/year at full capacity (starting in 6 months).',
      'This is a "bet the company" decision. High risk, high reward.',
    ],
    options: [
      {
        id: 'invest_full',
        label: 'INVEST FULLY — $102M',
        description: 'Go all-in on GPU clusters. Bet the company on the AI infrastructure boom. Maximum risk, maximum potential upside.',
        effects: {
          cashDelta: -102_000_000,
          quarterlyRevenueDelta: 15_000_000,
          quarterlyExpensesDelta: 4_000_000,
          valuationDelta: 180_000_000,
          dilutionDelta: 0,
          employeeDelta: 60,
        },
        narrative: 'You approve the full $102M GPU investment. It\'s the largest single expenditure in Orion\'s history. 60 new datacenter engineers are hired. Within 4 months, the first GPU clusters go live. Demand is insatiable — the waitlist hits 200 companies in the first week. Revenue from GPU services ramps to $15M/quarter and climbing. Analysts upgrade Orion\'s valuation by $180M. The pivot is working, but you\'ve burned through a massive amount of cash.',
      },
      {
        id: 'pilot',
        label: 'PILOT PROGRAM — $30M',
        description: 'Test with a small GPU cluster first ($30M). Lower risk, but slower to market. Validate demand before committing fully.',
        effects: {
          cashDelta: -30_000_000,
          quarterlyRevenueDelta: 5_000_000,
          quarterlyExpensesDelta: 1_500_000,
          valuationDelta: 60_000_000,
          dilutionDelta: 0,
          employeeDelta: 15,
        },
        narrative: 'You approve a $30M pilot GPU program. A small cluster of 256 H100s goes live in 3 months. The waitlist fills immediately — demand is validated within weeks. Revenue from the pilot adds $5M/quarter. It\'s not the explosive growth of a full commitment, but you\'ve proven the model with minimal risk. You can expand later with confidence. Valuation increases by $60M on the validated opportunity.',
      },
      {
        id: 'reject',
        label: 'REJECT — TOO RISKY',
        description: 'Decline the GPU pivot. The market is overhyped and cash is too precious. Stay focused on the core platform.',
        effects: {
          cashDelta: 0,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 0,
          valuationDelta: -40_000_000,
          dilutionDelta: 0,
          employeeDelta: -5,
        },
        narrative: 'You decline the GPU investment, citing cash constraints and market uncertainty. Mira Dasgupta, your Head of Product, resigns a month later, taking 4 senior engineers with her. They join a competitor who does build GPU clusters. Within 6 months, that competitor raises $200M and captures the market Orion could have owned. Analysts note Orion "missed the AI infrastructure wave." Valuation drops $40M.',
      },
    ],
  },
  {
    id: 5,
    title: 'THE ACTIVIST INVESTOR',
    quarter: 'Q5 — Month 30',
    email: {
      from: 'Titan Capital (Hedge Fund)',
      subject: 'Notice of Shareholder Demands — URGENT',
      body: `To the Board of Directors and CEO of Orion Technologies,\n\nTitan Capital has accumulated a 12% equity stake in Orion Technologies.\n\nAfter careful analysis, we believe the company is significantly underperforming its potential due to strategic mismanagement.\n\nWe formally demand the following:\n\n1. CEO total compensation reduced by 40%\n2. Immediate sale of the AI services division to unlock shareholder value\n3. Return $70M to shareholders via a special dividend\n4. Appointment of two Titan Capital nominees to the Board of Directors\n\nIf these demands are not met within 60 days, we will initiate a proxy fight to replace current board members and executive leadership.\n\nWe believe these changes are essential to protect shareholder value.\n\nJames Whitaker\nManaging Director, Titan Capital`,
    },
    context: [
      'Titan Capital owns 12% of Orion and is threatening a proxy fight.',
      'They want you to sell the AI division, cut your salary, and return $70M to shareholders.',
      'Fighting an activist costs money and management attention.',
      'Settling may stabilize the stock but gives away strategic assets.',
    ],
    options: [
      {
        id: 'fight',
        label: 'FIGHT THE ACTIVIST',
        description: 'Reject all demands. Hire top proxy advisors and prepare for a bruising public battle. Costs $8M in legal/PR fees.',
        effects: {
          cashDelta: -8_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 2_000_000,
          valuationDelta: -20_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You reject Titan Capital\'s demands and prepare for war. $8M goes to legal and PR teams. The proxy fight dominates tech headlines for 3 months. Management is distracted — no strategic decisions are made during the battle. You win the proxy vote 57%-43%, keeping your board intact. But the fight cost $8M, increased ongoing legal expenses by $2M/quarter, and the public conflict eroded $20M in valuation. You held the line, but at a steep price.',
      },
      {
        id: 'negotiate',
        label: 'NEGOTIATE A SETTLEMENT',
        description: 'Offer them one board seat and a $30M share buyback. Keep the AI division. Find middle ground.',
        effects: {
          cashDelta: -30_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 0,
          valuationDelta: 20_000_000,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You negotiate a settlement: Titan Capital gets one board seat and you execute a $30M share buyback. The buyback signal boosts share price — valuation increases by $20M. Titan\'s representative provides surprisingly useful operational insights. The crisis is resolved quickly with minimal distraction. You keep the AI division, your salary, and strategic control.',
      },
      {
        id: 'sell',
        label: 'SELL THE AI DIVISION',
        description: 'Comply with their demands. Sell the AI services division for $180M. It\'s painful but unlocks immediate cash.',
        effects: {
          cashDelta: 180_000_000,
          quarterlyRevenueDelta: -12_000_000,
          quarterlyExpensesDelta: -8_000_000,
          valuationDelta: -60_000_000,
          dilutionDelta: 0,
          employeeDelta: -90,
        },
        narrative: 'You cave to pressure and sell the AI services division for $180M. 90 employees transfer to the buyer. Revenue drops by $12M/quarter, but expenses also fall by $8M/quarter. The $180M in cash is massive — but you\'ve sold what many analysts considered Orion\'s most valuable growth engine. Valuation drops $60M as the market sees this as a sign of weakness. Titan Capital is satisfied. But you\'ve amputated a limb to stop the bleeding.',
      },
    ],
  },
  {
    id: 6,
    title: 'THE ACQUISITION OFFER',
    quarter: 'Q6 — Month 42',
    email: {
      from: 'Macrosoft Corporation',
      subject: 'Confidential: Acquisition Proposal for Orion Technologies',
      body: `STRICTLY CONFIDENTIAL\n\nDear CEO,\n\nMacrosoft Corporation would like to propose the acquisition of Orion Technologies.\n\nWe believe Orion\'s AI infrastructure platform is a perfect complement to our Azure AI division.\n\nOur offer:\n• Total consideration: $850M\n• Structure: $600M in cash + $250M in Macrosoft stock (4-year lockup)\n• All employees retained with matching compensation\n• CEO to lead the Macrosoft AI Infrastructure division for 3 years\n\nThis offer represents a significant premium over Orion\'s current standalone valuation.\n\nWe would appreciate your response within 30 days.\n\nSatish Nadella\nCEO, Macrosoft Corporation`,
    },
    context: [
      'Macrosoft offers $850M total ($600M cash + $250M stock).',
      'This is likely a 2–3x premium over current valuation.',
      'Accepting means giving up Orion\'s independence entirely.',
      'Rejecting and pursuing an IPO is risky but could yield even more value.',
    ],
    options: [
      {
        id: 'accept',
        label: 'ACCEPT THE ACQUISITION',
        description: 'Sell Orion to Macrosoft for $850M. Secure a guaranteed outcome for all shareholders and employees.',
        effects: {
          cashDelta: 600_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 0,
          valuationDelta: 0,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You accept the acquisition. The deal closes in 4 months after regulatory review. Every employee keeps their job. You receive $600M in cash and $250M in Macrosoft stock. You lead the Macrosoft AI Infrastructure division. The Orion brand eventually disappears, absorbed into Azure AI. It\'s bittersweet — you built something incredible, but it now belongs to someone else.',
        isExit: true,
        exitType: 'acquired',
        exitValue: 850_000_000,
      },
      {
        id: 'negotiate',
        label: 'NEGOTIATE — PUSH FOR $1.2B',
        description: 'Counter at $1.2B with more favorable stock terms. Macrosoft may walk, but the upside is massive.',
        effects: {
          cashDelta: 800_000_000,
          quarterlyRevenueDelta: 0,
          quarterlyExpensesDelta: 0,
          valuationDelta: 0,
          dilutionDelta: 0,
          employeeDelta: 0,
        },
        narrative: 'You counter at $1.2B. Macrosoft comes back at $1.05B — $800M cash and $250M stock with a 2-year lockup instead of 4. You accept the revised offer. The deal is hailed as one of the best AI infrastructure exits of the year. Your negotiation skills added $200M in value for shareholders.',
        isExit: true,
        exitType: 'acquired',
        exitValue: 1_050_000_000,
      },
      {
        id: 'reject',
        label: 'REJECT — PURSUE IPO',
        description: 'Decline the acquisition and take Orion public. The IPO market is hot. High ceiling, high risk.',
        effects: {
          cashDelta: 150_000_000,
          quarterlyRevenueDelta: 5_000_000,
          quarterlyExpensesDelta: 3_000_000,
          valuationDelta: 400_000_000,
          dilutionDelta: 8,
          employeeDelta: 20,
        },
        narrative: 'You reject the acquisition and announce IPO plans. The announcement creates enormous buzz. You hire Goldman Sachs as your underwriter. Investor roadshows across NY, London, and Singapore generate massive demand. The IPO raises $150M at a $1.4B valuation. Your first day of trading sees shares jump 40%. Orion is now a public company. The pressure of quarterly earnings reports begins, but you\'ve built something that now trades on the NYSE.',
        isExit: true,
        exitType: 'ipo',
        exitValue: 1_400_000_000,
      },
    ],
  },
];

export const randomEvents = [
  {
    id: 'data_breach',
    title: 'DATA BREACH',
    icon: '🔓',
    description: 'A security vulnerability in Orion\'s authentication system is exploited. Customer data for 12,000 accounts is leaked. Crisis response, legal fees, and regulatory fines cost $15M. Customer trust drops and two mid-tier clients pause their contracts.',
    effects: {
      cashDelta: -15_000_000,
      quarterlyRevenueDelta: -2_000_000,
      quarterlyExpensesDelta: 1_000_000,
      valuationDelta: -25_000_000,
      dilutionDelta: 0,
      employeeDelta: 0,
    },
  },
  {
    id: 'competitor_funding',
    title: 'COMPETITOR RAISES $500M',
    icon: '⚔️',
    description: 'Your biggest competitor, NebulAI, closes a $500M Series D round led by SoftBank. They announce plans to undercut Orion\'s pricing by 30% and expand into all of your key markets. The media calls it "an existential threat to Orion." Your sales team reports increased pressure from prospects asking about NebulAI.',
    effects: {
      cashDelta: 0,
      quarterlyRevenueDelta: -3_000_000,
      quarterlyExpensesDelta: 0,
      valuationDelta: -35_000_000,
      dilutionDelta: 0,
      employeeDelta: 0,
    },
  },
  {
    id: 'gpu_shortage',
    title: 'GLOBAL GPU SHORTAGE',
    icon: '🔥',
    description: 'NVIDIA announces a 6-month delay on next-gen GPU shipments due to TSMC fabrication bottlenecks. GPU prices spike 40% overnight. Your infrastructure costs increase by $3.3M per quarter. Cloud customers are furious about degraded performance.',
    effects: {
      cashDelta: 0,
      quarterlyRevenueDelta: 0,
      quarterlyExpensesDelta: 3_300_000,
      valuationDelta: -15_000_000,
      dilutionDelta: 0,
      employeeDelta: 0,
    },
  },
  {
    id: 'regulation',
    title: 'GOVERNMENT AI REGULATION',
    icon: '⚖️',
    description: 'The EU passes strict new AI infrastructure regulations requiring mandatory compliance audits, data sovereignty guarantees, and quarterly reporting. Compliance costs: $8M upfront plus $2M/quarter in ongoing regulatory expenses. Your EU expansion timeline is delayed by 6 months.',
    effects: {
      cashDelta: -8_000_000,
      quarterlyRevenueDelta: 0,
      quarterlyExpensesDelta: 2_000_000,
      valuationDelta: -10_000_000,
      dilutionDelta: 0,
      employeeDelta: 5,
    },
  },
  {
    id: 'viral_adoption',
    title: 'VIRAL PRODUCT ADOPTION',
    icon: '🚀',
    description: 'A popular AI startup built on Orion\'s platform goes viral globally, getting featured on TechCrunch, Hacker News, and The Verge. Their CEO tweets "Built on @OrionTech — the best AI infrastructure on the planet." Orion\'s signups triple overnight. Revenue jumps by $12M/quarter from new customers flooding in.',
    effects: {
      cashDelta: 5_000_000,
      quarterlyRevenueDelta: 12_000_000,
      quarterlyExpensesDelta: 2_000_000,
      valuationDelta: 50_000_000,
      dilutionDelta: 0,
      employeeDelta: 10,
    },
  },
];

export function calculateScore(financials, decisions, initialFinancials) {
  let score = 0;
  
  // Profitability (0-25 points)
  const quarterlyPL = financials.quarterlyRevenue - financials.quarterlyExpenses;
  if (quarterlyPL > 0) score += 25;
  else if (quarterlyPL > -5_000_000) score += 15;
  else if (quarterlyPL > -10_000_000) score += 5;
  
  // Cash position (0-25 points)
  if (financials.cash > 500_000_000) score += 25;
  else if (financials.cash > 200_000_000) score += 20;
  else if (financials.cash > 100_000_000) score += 15;
  else if (financials.cash > 50_000_000) score += 10;
  else if (financials.cash > 0) score += 5;
  
  // Valuation growth (0-25 points)
  const valGrowth = (financials.valuation - initialFinancials.valuation) / initialFinancials.valuation;
  if (valGrowth > 3) score += 25;
  else if (valGrowth > 2) score += 20;
  else if (valGrowth > 1) score += 15;
  else if (valGrowth > 0.5) score += 10;
  else if (valGrowth > 0) score += 5;
  
  // Dilution penalty (0-15 points, less dilution = more points)
  if (financials.dilution <= 10) score += 15;
  else if (financials.dilution <= 20) score += 10;
  else if (financials.dilution <= 30) score += 5;
  
  // Employee survival (0-10 points)
  const empRatio = financials.employees / initialFinancials.employees;
  if (empRatio >= 1.5) score += 10;
  else if (empRatio >= 1.0) score += 8;
  else if (empRatio >= 0.7) score += 4;
  
  return score;
}

export function getCEORating(score) {
  if (score >= 85) return { title: 'LEGENDARY CEO', emoji: '👑', description: 'You built an empire. History will remember your name.', color: '#ffd700' };
  if (score >= 70) return { title: 'GREAT CEO', emoji: '⭐', description: 'Excellent leadership. The company thrives under your watch.', color: '#4ade80' };
  if (score >= 50) return { title: 'AVERAGE CEO', emoji: '📊', description: 'Decent work. You kept the lights on, but nothing extraordinary.', color: '#fbbf24' };
  if (score >= 30) return { title: 'STRUGGLING CEO', emoji: '⚠️', description: 'The board is unhappy. Shareholders are calling for your resignation.', color: '#f97316' };
  return { title: 'FAILED CEO', emoji: '💀', description: 'The company collapsed under your leadership. Bankruptcy filing imminent.', color: '#f87171' };
}
