export const scenarios = [
  {
    id: 1,
    title: 'Accounting Fraud Suspicion',
    description: 'Investigate suspicious revenue entries amidst high market expectations. Do you report it or fix it quietly?',
    tag: 'Breakdown',
    difficulty: 'Hard',
    status: 'unsolved',
    content: {
      role: 'You are the CFO of a fast-growing IT company.',
      context: [
        'Revenue has been increasing 40% YoY.',
        'Investors love the company.',
        'Stock price is at an all-time high.'
      ],
      problem: [
        'During an internal audit you discover some revenue entries have no real clients.',
        'A senior executive says: "Everyone does this to smooth earnings. If this comes out, the company collapses."',
        'You estimate real revenue may be 20–25% lower than reported.'
      ],
      options: [
        {
          text: 'A) Quietly fix it over the next few quarters.',
          isCorrect: false,
          feedback: 'Covering up fraud makes you a co-conspirator. As CFO, you will be held completely liable for the continued deception.'
        },
        {
          text: 'B) Inform the board immediately.',
          isCorrect: true,
          feedback: 'CORRECT. The Board (specifically the Audit Committee) must be informed so an independent forensic investigation can begin immediately.'
        },
        {
          text: 'C) Resign and distance yourself.',
          isCorrect: false,
          feedback: 'Resigning without reporting ignores your fiduciary duty. You can still face criminal liability for "looking the other way."'
        },
        {
          text: 'D) Report to regulators.',
          isCorrect: false,
          feedback: 'You must first report to the Board or Audit Committee. Bypassing internal governance immediately is not the correct procedural priority, though whistleblowing is a last resort.'
        }
      ],
      realCase: {
        inspiredBy: 'Satyam Computer Services',
        cfo: 'Vadlamani Srinivas',
        whatHappened: [
          'Founder Ramalinga Raju inflated profits for years.',
          'Fake revenue and fake cash balances were reported.',
          'The CFO signed off on these financial statements.'
        ],
        outcome: [
          '$1 billion accounting fraud exposed.',
          'Stock collapsed 80% in days.',
          'CFO was arrested and the company nearly collapsed.'
        ],
        lesson: 'CFO signatures make them legally responsible for financial truth.'
      }
    }
  },
  {
    id: 2,
    title: 'Massive Debt Crisis',
    description: 'Your airline is drowning in debt. Banks are refusing loans. How do you handle the bleed?',
    tag: 'Breakdown',
    difficulty: 'Medium',
    status: 'unsolved',
    content: {
      role: 'You are CFO of a large airline.',
      context: [
        'Debt: $10 billion.',
        'Fuel prices are rising rapidly.',
        'Planes are sitting idle and employees have been unpaid for months.'
      ],
      problem: [
        'Banks refuse to provide any more loans.',
        'The operational bleed is completely unsustainable.'
      ],
      options: [
        {
          text: 'A) Continue operations and hope revenue recovers.',
          isCorrect: false,
          feedback: 'Continuing to operate while insolvent forces suppliers and employees to bear the risk. It destroys remaining enterprise value.'
        },
        {
          text: 'B) File bankruptcy and restructure.',
          isCorrect: true,
          feedback: 'CORRECT. Filing for bankruptcy protection stops the bleeding, protects remaining assets, and allows for an orderly restructuring or liquidation.'
        },
        {
          text: 'C) Sell assets aggressively.',
          isCorrect: false,
          feedback: 'Fire sales without a restructuring plan often lead to selling core assets below value, legally risking "fraudulent conveyance" to certain creditors.'
        },
        {
          text: 'D) Ask the government for a bailout.',
          isCorrect: false,
          feedback: 'Bailouts are highly uncertain and politically fraught. You cannot base short-term survival on hoping for a government check.'
        }
      ],
      realCase: {
        inspiredBy: 'Kingfisher Airlines',
        cfo: 'A. Raghunathan',
        whatHappened: [
          'The company kept borrowing despite massive losses.',
          'Debt piled up and operations continued even as the financial situation became irrecoverable.'
        ],
        outcome: [
          'The airline shut down completely in 2012.',
          'Left with ₹9,000+ crore in unpaid loans.',
          'Banks suffered huge, unrecoverable losses.'
        ],
        lesson: 'A CFO must sometimes kill the company early to save value rather than prolonging the inevitable.'
      }
    }
  },
  {
    id: 3,
    title: 'Stock Price Manipulation Pressure',
    description: 'The CEO wants you to shift revenue to hit earnings expectations. It\'s technically possible but violates standards.',
    tag: 'Breakdown',
    difficulty: 'Hard',
    status: 'unsolved',
    content: {
      role: 'You are CFO of a tech company preparing for earnings.',
      context: [
        'The CEO tells you: "If we miss earnings expectations, the stock will crash. Just move some revenue from next quarter."',
        'This would increase current profit by $150 million.'
      ],
      problem: [
        'It’s technically possible to move the numbers in the system.',
        'However, it directly violates accounting standards (GAAP/IFRS).'
      ],
      options: [
        {
          text: 'A) Execute the move to save the stock price this quarter.',
          isCorrect: false,
          feedback: 'This is textbook securities fraud. "Smoothing earnings" illegally violates accounting standards and is a criminal offense.'
        },
        {
          text: 'B) Refuse and report the CEO to the board.',
          isCorrect: true,
          feedback: 'CORRECT. You cannot participate in fraud. If the CEO orders illegal accounting, you must escalate to the Audit Committee of the Board.'
        },
        {
          text: 'C) Look for a legal grey area to partially satisfy the CEO.',
          isCorrect: false,
          feedback: 'Grey areas easily slide into fraud when under pressure. A CFO must protect the integrity of the financials, not bend them.'
        },
        {
          text: 'D) Resign immediately.',
          isCorrect: false,
          feedback: 'While you may eventually need to resign, your first duty is to report the attempted manipulation to the Board.'
        }
      ],
      realCase: {
        inspiredBy: 'WorldCom',
        cfo: 'Scott Sullivan',
        whatHappened: [
          'The CFO shifted expenses into capital assets.',
          'Effectively artificially inflated profits by $3.8 Billion.'
        ],
        outcome: [
          'Became one of the biggest accounting scandals in history.',
          'The company went bankrupt.',
          'The CFO was sentenced to prison.'
        ],
        lesson: 'CFOs are the last line of defense preventing accounting fraud.'
      }
    }
  },
  {
    id: 4,
    title: 'Startup Burning Cash',
    description: 'Your highly-valued startup is burning $300M a year. The CEO wants to double expansion. You see a cliff.',
    tag: 'Breakdown',
    difficulty: 'Medium',
    status: 'unsolved',
    content: {
      role: 'You are CFO of a startup valued at $5 Billion.',
      context: [
        'Metrics: Revenue is $50M, but Losses are $300M/year.',
        'Investors remain highly optimistic about growth.'
      ],
      problem: [
        'The CEO wants to expand to 10 new countries and hire 1,000 more employees.',
        'Your financial analysis shows the company will run completely out of cash in 18 months at this burn rate.'
      ],
      options: [
        {
          text: 'A) Approve the budget to maintain investor hype.',
          isCorrect: false,
          feedback: 'Reckless expansion without a path to profitability destroys capital. The CFO is supposed to be the financial anchor to reality.'
        },
        {
          text: 'B) Block the expansion and demand cost-cutting immediately.',
          isCorrect: true,
          feedback: 'CORRECT. The CFO must intervene to extend the runway. Without cost discipline, the company will hit a wall and collapse when the hype fades.'
        },
        {
          text: 'C) Try to raise more funding before the cash runs out.',
          isCorrect: false,
          feedback: 'Raising funds at a massive burn rate is incredibly difficult in a down market. You cannot rely on future rounds to solve fundamental unit economics.'
        },
        {
          text: 'D) Quietly start looking for a new job.',
          isCorrect: false,
          feedback: 'Running away doesn\'t fulfill your executive duties. You must attempt to steer the ship and force hard conversations.'
        }
      ],
      realCase: {
        inspiredBy: 'WeWork',
        cfo: 'Artie Minson',
        whatHappened: [
          'The company engaged in hyper-aggressive expansion despite massive, unsustainable losses.',
          'The IPO process eventually revealed the terrifying financial reality to the public.'
        ],
        outcome: [
          'Valuation dropped catastrophically from $47 Billion down to $8 Billion.',
          'The CEO/Founder was removed.'
        ],
        lesson: 'The CFO must sometimes be the one to oppose the founder and protect the business from itself.'
      }
    }
  },
  {
    id: 5,
    title: 'Insider Trading Risk',
    description: 'You know earnings will be terrible tomorrow. A close friend asks if they should dump their stock. What do you do?',
    tag: 'Breakdown',
    difficulty: 'Easy',
    status: 'unsolved',
    content: {
      role: 'You are the CFO.',
      context: [
        'You know your company will announce terrible earnings tomorrow morning.',
        'The stock will likely drop by at least 30%.'
      ],
      problem: [
        'Your close friend calls and asks: "Should I sell my shares before tomorrow?"'
      ],
      options: [
        {
          text: 'A) Warn him quietly so he doesn\'t lose money.',
          isCorrect: false,
          feedback: 'This is criminal insider trading (tipping). You and your friend can both go to federal prison.'
        },
        {
          text: 'B) Say nothing and refuse to answer the question.',
          isCorrect: false,
          feedback: 'While refusing to answer stops the tip, his question indicates he may trade anyway, exposing the firm to an SEC investigation.'
        },
        {
          text: 'C) Report the conversation to compliance.',
          isCorrect: true,
          feedback: 'CORRECT. You must refuse to answer AND report to the General Counsel/Compliance to ensure a trading blackout is enforced and documented to protect the company.'
        },
        {
          text: 'D) Delay the earnings release.',
          isCorrect: false,
          feedback: 'You cannot arbitrarily delay public company earnings releases to manage personal conflicts.'
        }
      ],
      realCase: {
        inspiredBy: 'Enron',
        cfo: 'Andrew Fastow',
        whatHappened: [
          'The CFO secretly profited from insider knowledge and complex financial structuring.',
          'Created off-balance-sheet entities to hide debt and inflate profits.'
        ],
        outcome: [
          'Enron completely collapsed in a spectacular fashion.',
          'The CFO was jailed.'
        ],
        lesson: 'The CFO is subject to and must follow strict insider-trading and disclosure rules without exception.'
      }
    }
  }
];
