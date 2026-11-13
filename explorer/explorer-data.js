/* =====================================================================
   Automation Explorer: all content lives in this file.
   ---------------------------------------------------------------------
   STAGES  : the four columns of every flowchart.
   LEVELS  : how much AI does on a step (the coloured label).
   INDUSTRIES: one entry per business type. Each has:
     id        short name used in links, e.g. mrmadani.github.io/explorer/#dental
     name, icon, intro
     keywords  extra words people might search for ("dentist", "hvac"...)
     stages    four lists of steps, in the same order as STAGES
     data      documents we organise + questions they could ask their data

   A step with AI help looks like:
     { name, level: 'auto' | 'draft' | 'alert', area: 'sales' | 'ops' | 'finance' | 'service',
       when:  what kicks it off
       today: how it's done by hand now
       ai:    what the AI does
       you:   what a person still does
       result: the outcome
       tools: [...]
       minutes, per: estimated minutes saved, and per what ("order", "week")
       effort: 'quick' | 'medium' | 'project'   (how big the setup is) }

   A step that stays with people:
     { name, level: 'human', note }

   Minutes saved are rough estimates for illustration. Adjust them to what
   your team has actually measured.
   ===================================================================== */

const STAGES = ['Win the customer', 'Deliver', 'Get paid', 'Keep them'];

const LEVELS = {
  auto:  { label: 'AI handles it',          short: 'Automated' },
  draft: { label: 'AI drafts, you approve', short: 'AI drafts' },
  alert: { label: 'AI alerts you',          short: 'AI alerts' },
  human: { label: 'Stays human',            short: 'Human' }
};

const EFFORT = {
  quick:   'Quick win (days)',
  medium:  'Medium (1–3 weeks)',
  project: 'Project (4+ weeks)'
};

const INDUSTRIES = [
  /* ------------------------------------------------------------------ */
  {
    id: 'ecommerce', name: 'E-commerce', icon: '🛒',
    intro: 'Online stores selling direct to customers on their own site or marketplaces.',
    keywords: ['shopify', 'amazon', 'online store', 'dtc', 'etsy', 'woocommerce', 'online shop', 'marketplace'],
    stages: [
      [
        { name: 'Pre-sale questions', level: 'draft', area: 'service',
          when: 'A shopper asks about sizing, stock or shipping',
          today: 'Someone answers chat and email between other tasks, often hours later.',
          ai: 'Answers from your product catalog and policies in seconds and hands tricky questions to a person.',
          you: 'Review the answers it isn\'t sure about.',
          result: 'Faster replies and fewer lost sales.',
          tools: ['Shopify', 'Gorgias', 'AI assistant'], minutes: 4, per: 'question', effort: 'medium' },
        { name: 'Abandoned cart emails', level: 'auto', area: 'sales',
          when: 'A shopper leaves items in the cart',
          today: 'Carts are forgotten, or someone exports a list and emails by hand.',
          ai: 'Sends a timed 2–3 email sequence showing the exact items left behind.',
          you: 'Approve the templates and discount rules once.',
          result: 'Recovered sales without anyone lifting a finger.',
          tools: ['Shopify', 'Klaviyo'], minutes: 5, per: 'abandoned cart', effort: 'quick' }
      ],
      [
        { name: 'Order confirmation + inventory sync', level: 'auto', area: 'ops',
          when: 'An order is paid',
          today: 'Stock is updated by hand across the store, marketplaces and a spreadsheet.',
          ai: 'Sends a branded confirmation and updates stock everywhere in real time.',
          you: 'Get an alert only when stock runs low.',
          result: 'No overselling, no manual stock counts.',
          tools: ['Shopify', 'Amazon', 'Google Sheets'], minutes: 3, per: 'order', effort: 'quick' },
        { name: 'Pick, pack & ship', level: 'human',
          note: 'Your team packs the order. AI makes sure the label and paperwork are ready.' },
        { name: 'Shipping label + tracking email', level: 'auto', area: 'ops',
          when: 'An order is ready to ship',
          today: 'Labels are created one by one and tracking is copied into emails.',
          ai: 'Creates the label and emails tracking to the customer automatically.',
          you: 'Step in only if an address fails validation.',
          result: 'Customers always know where their order is.',
          tools: ['ShipStation', 'Shopify'], minutes: 4, per: 'order', effort: 'quick' },
        { name: '"Where\'s my order?" replies', level: 'auto', area: 'service',
          when: 'A customer asks for an update',
          today: 'Look up the order, find tracking, write a reply. Repeat all day.',
          ai: 'Finds the order and live tracking and replies in seconds.',
          you: 'Handle the delays it flags.',
          result: 'A much quieter support inbox.',
          tools: ['Gorgias / Zendesk', 'ShipStation'], minutes: 5, per: 'ticket', effort: 'quick' }
      ],
      [
        { name: 'Payout & refund reconciliation', level: 'alert', area: 'finance',
          when: 'Payouts land from Shopify, Amazon or PayPal',
          today: 'Payouts, fees and refunds are matched in spreadsheets at month end.',
          ai: 'Matches every payout to its orders, fees and refunds and books it to your accounts.',
          you: 'Check the mismatches it flags.',
          result: 'Clean books every week, not every quarter.',
          tools: ['Shopify Payments', 'QuickBooks / Xero'], minutes: 60, per: 'week', effort: 'medium' }
      ],
      [
        { name: 'Review requests', level: 'auto', area: 'service',
          when: 'An order is delivered',
          today: 'Rarely done, or one generic email to everyone.',
          ai: 'Asks happy customers for a review and sends unhappy replies to a person first.',
          you: 'Respond to the unhappy ones.',
          result: 'More reviews, fewer public complaints.',
          tools: ['Klaviyo', 'Judge.me'], minutes: 2, per: 'order', effort: 'quick' },
        { name: 'Reorder / upsell campaigns', level: 'draft', area: 'sales',
          when: 'A customer is due to reorder',
          today: 'The same newsletter goes to everyone.',
          ai: 'Predicts when each customer will run out and drafts personal product suggestions.',
          you: 'Approve the campaign.',
          result: 'More repeat orders from customers you already have.',
          tools: ['Klaviyo', 'Shopify'], minutes: 60, per: 'week', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Order exports', 'Supplier invoices', 'Product spreadsheets', 'Customer emails', 'Return requests', 'Payout reports'],
      questions: ['Which products sold best this quarter?', 'Which customers haven\'t reordered in 90 days?', 'What do customers complain about most?', 'Which supplier invoices don\'t match what we received?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'wholesale', name: 'Wholesale & distribution', icon: '📦',
    intro: 'B2B businesses buying in bulk and selling to retailers, resellers or contractors.',
    keywords: ['distributor', 'wholesale', 'b2b', 'supplier', 'reseller', 'inventory', 'warehouse', 'import', 'export'],
    stages: [
      [
        { name: 'New account inquiries', level: 'draft', area: 'sales',
          when: 'A retailer asks for a price list or terms',
          today: 'A sales rep hunts for the right price sheet and writes back.',
          ai: 'Qualifies the account and replies with the right price list and terms.',
          you: 'Approve new credit terms.',
          result: 'New accounts answered the same day.',
          tools: ['Gmail / Outlook', 'CRM'], minutes: 15, per: 'inquiry', effort: 'quick' },
        { name: 'Quotes & price checks', level: 'draft', area: 'sales',
          when: 'A customer sends a list of items for pricing',
          today: 'Prices are looked up line by line across spreadsheets.',
          ai: 'Builds the quote from your price tiers and current stock.',
          you: 'Approve margins on large quotes.',
          result: 'Quotes out in minutes, not hours.',
          tools: ['Excel / Sheets', 'ERP'], minutes: 20, per: 'quote', effort: 'medium' }
      ],
      [
        { name: 'Order entry from email / PDF', level: 'draft', area: 'ops',
          when: 'A purchase order arrives by email',
          today: 'Every line item is re-typed into the system.',
          ai: 'Reads the PO and enters each line into your ERP.',
          you: 'Approve orders that don\'t match price or stock.',
          result: 'Orders entered the same day, without typos.',
          tools: ['Outlook', 'NetSuite / Business Central', 'AI document reading'], minutes: 12, per: 'order', effort: 'medium' },
        { name: 'Stock & reorder alerts', level: 'alert', area: 'ops',
          when: 'Stock drops below the reorder point',
          today: 'Someone checks reports weekly, often too late.',
          ai: 'Watches stock and sales speed and drafts purchase orders to suppliers.',
          you: 'Approve the purchase order.',
          result: 'Fewer stockouts and less dead stock.',
          tools: ['ERP', 'Supplier portals'], minutes: 90, per: 'week', effort: 'medium' },
        { name: 'Pick, pack & dispatch', level: 'human',
          note: 'Your warehouse team ships. AI prepares pick lists and paperwork.' },
        { name: 'Shipment updates', level: 'auto', area: 'service',
          when: 'An order ships or is delayed',
          today: 'Customers call to ask where their order is.',
          ai: 'Sends tracking and delay notices automatically.',
          you: 'Call key accounts about big delays.',
          result: 'Fewer "where\'s my order?" calls.',
          tools: ['ERP', 'Carrier tracking', 'Email'], minutes: 5, per: 'order', effort: 'quick' }
      ],
      [
        { name: 'Invoices + payment reminders', level: 'auto', area: 'finance',
          when: 'An order ships',
          today: 'Invoices go out in batches and overdue accounts are chased by phone.',
          ai: 'Invoices on shipment and sends polite reminders until paid.',
          you: 'Handle disputes.',
          result: 'Paid faster with less chasing.',
          tools: ['QuickBooks / NetSuite'], minutes: 10, per: 'invoice', effort: 'quick' },
        { name: 'Supplier invoice matching', level: 'alert', area: 'finance',
          when: 'A supplier invoice arrives',
          today: 'Matched to the PO and delivery note by hand.',
          ai: 'Matches invoice, PO and receipt line by line and flags differences.',
          you: 'Approve the exceptions.',
          result: 'You never overpay a supplier.',
          tools: ['ERP', 'AP inbox'], minutes: 10, per: 'invoice', effort: 'medium' }
      ],
      [
        { name: 'Slipping-account check-ins', level: 'draft', area: 'sales',
          when: 'An account starts ordering less',
          today: 'Noticed months later, if at all.',
          ai: 'Spots accounts ordering less and drafts a personal check-in with suggested items.',
          you: 'Send or tweak the email.',
          result: 'Win back accounts before they leave.',
          tools: ['CRM', 'ERP order history'], minutes: 20, per: 'account', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Purchase orders', 'Supplier invoices', 'Price lists', 'Delivery notes', 'Customer emails', 'Credit applications'],
      questions: ['Which accounts are ordering less than last year?', 'Which items are about to run out?', 'Which supplier invoices have price differences?', 'Who owes us money over 60 days?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'manufacturing', name: 'Manufacturing', icon: '🏭',
    intro: 'Make-to-order and make-to-stock manufacturers, fabricators and machine shops.',
    keywords: ['factory', 'fabrication', 'machine shop', 'cnc', 'plant', 'industrial', 'oem', 'production'],
    stages: [
      [
        { name: 'RFQ intake', level: 'draft', area: 'sales',
          when: 'An RFQ arrives with drawings or specs',
          today: 'An engineer reads it and re-types specs into a spreadsheet.',
          ai: 'Pulls specs, quantities and due dates into a structured RFQ record.',
          you: 'Check unusual specs.',
          result: 'No RFQ lost in an inbox.',
          tools: ['Outlook', 'AI document reading', 'CRM'], minutes: 20, per: 'RFQ', effort: 'medium' },
        { name: 'Quote generation', level: 'draft', area: 'sales',
          when: 'The RFQ is logged',
          today: 'Costing is rebuilt by hand for every quote.',
          ai: 'Builds the quote from your cost, margin and lead-time rules.',
          you: 'Approve price and lead time.',
          result: 'Quotes out in hours, not days.',
          tools: ['Excel / Sheets', 'ERP'], minutes: 45, per: 'quote', effort: 'project' }
      ],
      [
        { name: 'PO email parsed into ERP', level: 'draft', area: 'ops',
          when: 'A customer PO arrives',
          today: 'Typed in line by line.',
          ai: 'Reads the PO, enters it in the ERP and flags anything that differs from the quote.',
          you: 'Approve mismatches.',
          result: 'Accurate orders, entered the same day.',
          tools: ['Outlook', 'Business Central / NetSuite'], minutes: 12, per: 'PO', effort: 'medium' },
        { name: 'Material & inventory check', level: 'alert', area: 'ops',
          when: 'An order is entered',
          today: 'A planner checks the bill of materials against stock by hand.',
          ai: 'Checks the bill of materials against stock and raises purchase requests for shortages.',
          you: 'Approve purchases.',
          result: 'No surprise shortages mid-job.',
          tools: ['ERP', 'Supplier portals'], minutes: 30, per: 'order', effort: 'medium' },
        { name: 'Production', level: 'human',
          note: 'Your team builds it. AI tracks status from the shop floor.' },
        { name: 'Status updates to client', level: 'auto', area: 'service',
          when: 'A job hits a milestone',
          today: 'Customers call for updates and someone walks the floor to find out.',
          ai: 'Sends milestone updates: scheduled, in production, shipped.',
          you: 'Call the customer about delays.',
          result: 'Far fewer status calls.',
          tools: ['ERP', 'Email'], minutes: 10, per: 'order', effort: 'quick' },
        { name: 'Quality & shipping documents', level: 'draft', area: 'ops',
          when: 'A job passes inspection',
          today: 'Certificates, inspection reports and packing lists are assembled by hand.',
          ai: 'Assembles certificates, inspection reports and packing lists for each shipment.',
          you: 'Sign off.',
          result: 'Paperwork ready when the truck is.',
          tools: ['ERP', 'Word / Google Docs'], minutes: 25, per: 'shipment', effort: 'medium' }
      ],
      [
        { name: 'Invoice + follow-up', level: 'auto', area: 'finance',
          when: 'An order ships',
          today: 'Invoices are created in batches and late payers are chased by hand.',
          ai: 'Invoices on shipment, matches it to the PO and follows up on overdue payments.',
          you: 'Handle disputes.',
          result: 'Cash in faster.',
          tools: ['QuickBooks / NetSuite'], minutes: 10, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Repeat-order forecasting', level: 'alert', area: 'sales',
          when: 'A customer\'s usual reorder window approaches',
          today: 'Wait for them to call.',
          ai: 'Predicts reorders from order history and prompts sales to reach out.',
          you: 'Make the call.',
          result: 'Better capacity planning and more repeat work.',
          tools: ['ERP', 'CRM'], minutes: 30, per: 'week', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['RFQs & drawings', 'Purchase orders', 'Spec sheets', 'Inspection reports', 'Certificates', 'Supplier quotes'],
      questions: ['Which quotes are still waiting on an answer?', 'Which customers order the same parts every quarter?', 'Which jobs are behind schedule?', 'Where are our margins lowest?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'textile', name: 'Textile & apparel', icon: '🧵',
    intro: 'Garment and fabric makers, sourcing offices and apparel brands working with factories.',
    keywords: ['garment', 'apparel', 'fabric', 'clothing', 'knitting', 'knitwear', 'fashion', 'sourcing', 'mill'],
    stages: [
      [
        { name: 'Buyer inquiry & tech pack', level: 'draft', area: 'sales',
          when: 'A buyer sends an inquiry or tech pack',
          today: 'A merchandiser reads it and asks follow-up questions over several days.',
          ai: 'Extracts style, fabric, GSM, quantity and trims, and lists what\'s missing.',
          you: 'Confirm the details with the buyer.',
          result: 'Complete inquiries from day one.',
          tools: ['Gmail / Outlook', 'AI document reading'], minutes: 20, per: 'inquiry', effort: 'medium' },
        { name: 'AI quote from price sheet', level: 'draft', area: 'sales',
          when: 'The inquiry is complete',
          today: 'Costing is done by hand from fabric, trim and CM rates.',
          ai: 'Drafts a quote from your fabric, trim and CM price sheet.',
          you: 'Approve the price.',
          result: 'Quotes back the same day.',
          tools: ['Google Sheets', 'AI'], minutes: 30, per: 'quote', effort: 'medium' },
        { name: 'Sample approval', level: 'human',
          note: 'Your team makes and sends samples. AI tracks comments and approvals.' }
      ],
      [
        { name: 'Production order to factory', level: 'auto', area: 'ops',
          when: 'The sample is approved and the PO received',
          today: 'The order sheet is rebuilt and emailed to the factory.',
          ai: 'Turns the approved sample and PO into a production order and sends it.',
          you: 'Confirm the delivery date.',
          result: 'No details lost between buyer and factory.',
          tools: ['ERP', 'Google Sheets', 'Email / WhatsApp'], minutes: 60, per: 'order', effort: 'medium' },
        { name: 'Production', level: 'human',
          note: 'Your factory runs it. AI collects daily progress updates.' },
        { name: 'QC checklist + photo log', level: 'auto', area: 'ops',
          when: 'An inspection takes place',
          today: 'Paper checklists, with photos scattered across phones.',
          ai: 'Runs a mobile checklist, files photos and results per order, and alerts the team on failures.',
          you: 'Decide on rework.',
          result: 'Proof of quality for every shipment.',
          tools: ['AppSheet / Google Forms', 'Google Drive'], minutes: 20, per: 'inspection', effort: 'quick' },
        { name: 'Shipping docs + tracking', level: 'draft', area: 'ops',
          when: 'Goods are packed',
          today: 'Packing list, invoice and shipping documents are typed again.',
          ai: 'Generates the packing list, commercial invoice and shipping documents, then shares tracking.',
          you: 'Check before sending to the forwarder.',
          result: 'Documents ready on time, every time.',
          tools: ['ERP', 'Google Docs', 'Carrier tracking'], minutes: 60, per: 'shipment', effort: 'medium' }
      ],
      [
        { name: 'Invoice + payment reminders', level: 'auto', area: 'finance',
          when: 'Goods ship',
          today: 'Payments are followed up when someone remembers.',
          ai: 'Issues the invoice on shipment and sends reminders until paid.',
          you: 'Handle disputes.',
          result: 'Faster cash flow.',
          tools: ['QuickBooks / Xero'], minutes: 15, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Next-season pitch', level: 'draft', area: 'sales',
          when: 'A new buying season approaches',
          today: 'Wait for buyers to reach out.',
          ai: 'Reviews each buyer\'s past orders and drafts a pitch for next season\'s styles.',
          you: 'Send it and follow up.',
          result: 'Repeat programs locked in early.',
          tools: ['CRM', 'Order history'], minutes: 30, per: 'buyer', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Tech packs', 'Buyer POs', 'Fabric price sheets', 'QC reports & photos', 'Shipping documents', 'Lab test reports'],
      questions: ['Which buyers placed repeat orders last season?', 'Which styles had the most QC failures?', 'Which shipments are at risk of missing their date?', 'What is our average margin by buyer?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'promo', name: 'Promotional products', icon: '🎁',
    intro: 'Distributors, suppliers and decorators of branded merchandise. This is the industry I work in every day.',
    keywords: ['promotional', 'promo', 'swag', 'branded merchandise', 'merch', 'asi', 'ppai', 'sage', 'decorator', 'screen printing', 'embroidery', 'printing'],
    stages: [
      [
        { name: 'Distributor inquiry', level: 'human',
          note: 'Your team owns the relationship. AI logs every inquiry so none slip through.' },
        { name: 'Product suggestions from catalog', level: 'draft', area: 'sales',
          when: 'An inquiry includes budget, quantity and in-hands date',
          today: 'Searching catalogs and supplier sites one by one.',
          ai: 'Matches budget, quantity, in-hands date and theme to the best-fit items.',
          you: 'Pick the final shortlist.',
          result: 'Ideas back to the client in minutes.',
          tools: ['Product catalog', 'ASI / SAGE', 'AI search'], minutes: 20, per: 'inquiry', effort: 'medium' },
        { name: 'Virtual mockups', level: 'draft', area: 'sales',
          when: 'Products are shortlisted',
          today: 'Mockups are made by hand or requested from suppliers.',
          ai: 'Places the logo on the product and returns a virtual sample.',
          you: 'Check logo placement.',
          result: 'A faster yes from the end client.',
          tools: ['Supplier mockup tools', 'AI image'], minutes: 15, per: 'mockup', effort: 'medium' },
        { name: 'Quote with decoration & setup charges', level: 'draft', area: 'sales',
          when: 'The client likes the mockup',
          today: 'Run charges, setups and quantity breaks are calculated by hand.',
          ai: 'Calculates unit, decoration, setup and run charges by method and quantity.',
          you: 'Approve the margin.',
          result: 'Accurate quotes with no missed charges.',
          tools: ['Price sheets', 'Syncore / CRM'], minutes: 20, per: 'quote', effort: 'medium' }
      ],
      [
        { name: 'Order entry from PO', level: 'draft', area: 'ops',
          when: 'A PO arrives',
          today: 'The PO is re-typed into the order system.',
          ai: 'Reads the PO, checks it against the quote and enters the order.',
          you: 'Approve mismatches before the order is committed.',
          result: 'Clean orders with fewer errors.',
          tools: ['Email', 'ERP / Business Central'], minutes: 12, per: 'order', effort: 'medium' },
        { name: 'Proof approval reminders', level: 'auto', area: 'ops',
          when: 'A proof is sent',
          today: 'Unapproved proofs are chased by email and phone.',
          ai: 'Sends reminders on a schedule and moves the job forward the moment it\'s approved.',
          you: 'Call if a proof stalls.',
          result: 'In-hands dates protected.',
          tools: ['Order system', 'Gmail', 'Slack'], minutes: 10, per: 'order', effort: 'quick' },
        { name: 'Tracking emails', level: 'auto', area: 'service',
          when: 'An order ships',
          today: 'Tracking numbers are copied into emails by hand.',
          ai: 'Emails tracking and order status to the distributor as soon as it ships.',
          you: 'Nothing.',
          result: 'Fewer status calls.',
          tools: ['Google Sheets', 'Apps Script', 'Carrier tracking'], minutes: 5, per: 'order', effort: 'quick' }
      ],
      [
        { name: 'Invoices & statements', level: 'auto', area: 'finance',
          when: 'An order ships',
          today: 'Statements are sent manually and late payers chased by hand.',
          ai: 'Sends the invoice, monthly statements and polite reminders.',
          you: 'Handle disputes.',
          result: 'Paid faster.',
          tools: ['QuickBooks / ERP'], minutes: 10, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Reorder reminders', level: 'draft', area: 'sales',
          when: 'A repeat event or program is coming up',
          today: 'Hoping the client remembers in time.',
          ai: 'Spots recurring programs and prompts the distributor before the date.',
          you: 'Send or tweak the note.',
          result: 'Repeat orders placed on time.',
          tools: ['CRM', 'Order history'], minutes: 15, per: 'reminder', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Distributor POs', 'Art files & proofs', 'Supplier price sheets', 'Order confirmations', 'Tracking spreadsheets', 'Invoices'],
      questions: ['Which distributors haven\'t ordered in 90 days?', 'Which orders are waiting on proof approval?', 'What were our top products last quarter?', 'Which repeat events are coming up?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'services', name: 'Professional services', icon: '💼',
    intro: 'Agencies, consultants, IT providers, coaches and other client-service firms.',
    keywords: ['agency', 'consultant', 'consulting', 'marketing agency', 'it services', 'msp', 'coach', 'freelancer', 'architect', 'design studio'],
    stages: [
      [
        { name: 'Lead scoring + auto-reply', level: 'auto', area: 'sales',
          when: 'Someone fills in your lead form',
          today: 'Leads wait until someone checks the inbox.',
          ai: 'Scores each lead on fit and urgency, replies instantly and routes hot leads to the right person.',
          you: 'Take the call with good-fit leads.',
          result: 'No lead goes cold.',
          tools: ['Website form', 'HubSpot', 'AI scoring'], minutes: 10, per: 'lead', effort: 'quick' },
        { name: 'Call booking', level: 'auto', area: 'sales',
          when: 'A lead qualifies',
          today: 'Back-and-forth emails to find a time.',
          ai: 'Sends a booking link and handles confirmations, reminders and reschedules.',
          you: 'Show up prepared.',
          result: 'Calls booked without the email ping-pong.',
          tools: ['Calendly', 'Google Calendar', 'Zoom'], minutes: 10, per: 'booking', effort: 'quick' },
        { name: 'Consultation', level: 'human',
          note: 'Your expertise. AI prepares a one-page brief on the lead before the call.' },
        { name: 'Proposal draft', level: 'draft', area: 'sales',
          when: 'The consultation ends',
          today: 'Proposals are written from scratch at night.',
          ai: 'Turns call notes into a first-draft proposal using your templates, scope and pricing.',
          you: 'Edit and send.',
          result: 'Proposals out while the client is still excited.',
          tools: ['Meeting notes', 'Google Docs', 'AI drafting'], minutes: 90, per: 'proposal', effort: 'medium' },
        { name: 'Contract + e-signature', level: 'auto', area: 'sales',
          when: 'The proposal is accepted',
          today: 'The contract is copied, filled in and emailed for signature.',
          ai: 'Fills the contract from the accepted proposal and sends it for e-signature with reminders.',
          you: 'Countersign.',
          result: 'Signed faster, with no copy-paste errors.',
          tools: ['DocuSign / PandaDoc', 'CRM'], minutes: 30, per: 'client', effort: 'quick' }
      ],
      [
        { name: 'Client onboarding', level: 'auto', area: 'service',
          when: 'The contract is signed',
          today: 'Welcome emails, document requests and folder setup are done by hand.',
          ai: 'Sends a welcome sequence, collects documents and sets up the client folder and project.',
          you: 'Run the kickoff call.',
          result: 'A great first impression every time.',
          tools: ['Gmail', 'Google Drive', 'Asana / ClickUp'], minutes: 90, per: 'client', effort: 'quick' },
        { name: 'Project status updates', level: 'draft', area: 'service',
          when: 'Each week',
          today: 'Project managers write update emails by hand.',
          ai: 'Drafts a weekly update from your project tool.',
          you: 'Review and send.',
          result: 'Clients always know where things stand.',
          tools: ['Asana / ClickUp', 'Gmail'], minutes: 30, per: 'client update', effort: 'quick' },
        { name: 'Doing the work', level: 'human',
          note: 'Your team delivers. AI handles the admin around it.' }
      ],
      [
        { name: 'Invoicing + monthly report', level: 'auto', area: 'finance',
          when: 'The billing date arrives',
          today: 'Invoices and reports are built from timesheets at month end.',
          ai: 'Bills on schedule and sends each client a monthly summary of work done and results.',
          you: 'Add a personal note if you want.',
          result: 'Paid on time, and clients see your value.',
          tools: ['QuickBooks / Stripe', 'Google Sheets', 'AI summaries'], minutes: 45, per: 'client', effort: 'medium' }
      ],
      [
        { name: 'Renewal & upsell prompts', level: 'draft', area: 'sales',
          when: 'A contract is 60 days from renewal',
          today: 'Renewals are noticed at the last minute.',
          ai: 'Flags renewals early and drafts a results summary with next-step ideas.',
          you: 'Have the conversation.',
          result: 'Higher retention and bigger accounts.',
          tools: ['CRM', 'Google Docs'], minutes: 45, per: 'client', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Proposals', 'Contracts', 'Meeting notes', 'Timesheets', 'Invoices', 'Client emails'],
      questions: ['Which proposals haven\'t been answered?', 'Which clients renew in the next 60 days?', 'Which projects are over budget?', 'Who are our most profitable clients?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'accounting', name: 'Accounting & bookkeeping', icon: '🧾',
    intro: 'CPAs, bookkeepers, tax preparers and payroll providers.',
    keywords: ['cpa', 'bookkeeper', 'bookkeeping', 'tax', 'accountant', 'payroll', 'tax preparer'],
    stages: [
      [
        { name: 'Lead intake & engagement letter', level: 'auto', area: 'sales',
          when: 'A prospect fills in your form',
          today: 'Back-and-forth emails to scope the work.',
          ai: 'Replies, collects business details and drafts the engagement letter.',
          you: 'Approve scope and fee.',
          result: 'Signed clients, faster.',
          tools: ['Website form', 'TaxDome / Karbon', 'E-signature'], minutes: 30, per: 'client', effort: 'quick' },
        { name: 'Discovery call', level: 'human',
          note: 'Your expertise. AI summarises the prospect\'s situation beforehand.' }
      ],
      [
        { name: 'Document collection', level: 'auto', area: 'service',
          when: 'Tax season or month end',
          today: 'Chasing clients for statements and receipts by email.',
          ai: 'Sends personalised checklists and reminders until every document is in.',
          you: 'Call the stragglers.',
          result: 'Complete files, on time.',
          tools: ['TaxDome / Karbon', 'Email'], minutes: 20, per: 'client', effort: 'quick' },
        { name: 'Receipt & statement sorting', level: 'auto', area: 'ops',
          when: 'Documents arrive',
          today: 'Files are renamed and sorted by hand.',
          ai: 'Reads each document, names it, files it and pulls out the amounts.',
          you: 'Check the items it\'s unsure about.',
          result: 'Organised client folders without the busywork.',
          tools: ['Dext / Hubdoc', 'Google Drive'], minutes: 15, per: 'client', effort: 'medium' },
        { name: 'Transaction categorisation', level: 'draft', area: 'finance',
          when: 'Bank feeds update',
          today: 'Transactions are categorised line by line.',
          ai: 'Categorises transactions from history and flags unusual ones.',
          you: 'Review the flagged items.',
          result: 'Books closed days faster.',
          tools: ['QuickBooks / Xero'], minutes: 60, per: 'client', effort: 'medium' },
        { name: 'Review & advice', level: 'human',
          note: 'Your judgement. AI prepares the numbers and a summary.' }
      ],
      [
        { name: 'Billing & reminders', level: 'auto', area: 'finance',
          when: 'Work is complete or the month ends',
          today: 'Invoices are sent late and rarely chased.',
          ai: 'Bills on schedule and sends polite reminders.',
          you: 'Nothing.',
          result: 'Less unpaid work.',
          tools: ['QuickBooks', 'Stripe'], minutes: 10, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Monthly client summary', level: 'draft', area: 'service',
          when: 'The month closes',
          today: 'Reports go out without explanation, or not at all.',
          ai: 'Drafts a plain-English summary of each client\'s month with the key numbers.',
          you: 'Add your advice and send.',
          result: 'Clients see your value every month.',
          tools: ['QuickBooks / Xero', 'AI summaries'], minutes: 30, per: 'client', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Bank statements', 'Receipts', 'Tax forms (W-2, 1099)', 'Engagement letters', 'Payroll reports', 'Client emails'],
      questions: ['Which clients are still missing documents?', 'Which clients had unusual spending this month?', 'Whose engagement renews next quarter?', 'Which clients could use advisory services?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'law', name: 'Law firms', icon: '⚖️',
    intro: 'Small and mid-size firms in family, immigration, personal injury, business and real estate law.',
    keywords: ['lawyer', 'attorney', 'legal', 'paralegal', 'immigration', 'personal injury', 'law office', 'solicitor'],
    stages: [
      [
        { name: 'Intake & conflict check', level: 'draft', area: 'sales',
          when: 'A potential client contacts the firm',
          today: 'Long intake calls and manual conflict searches.',
          ai: 'Collects case details, checks for conflicts against past matters and summarises the case.',
          you: 'Decide whether to take it.',
          result: 'Faster, consistent intake.',
          tools: ['Clio / MyCase', 'Intake form'], minutes: 30, per: 'lead', effort: 'medium' },
        { name: 'Consultation', level: 'human',
          note: 'Your legal judgement. AI prepares the case summary beforehand.' },
        { name: 'Engagement letter & e-sign', level: 'auto', area: 'sales',
          when: 'The client decides to proceed',
          today: 'Engagement letters are drafted and sent by hand.',
          ai: 'Fills the engagement letter and sends it for e-signature with reminders.',
          you: 'Approve the terms.',
          result: 'Retained the same day.',
          tools: ['Clio', 'DocuSign'], minutes: 20, per: 'client', effort: 'quick' }
      ],
      [
        { name: 'Document review & summaries', level: 'draft', area: 'ops',
          when: 'Client or discovery documents arrive',
          today: 'Paralegals read and summarise hundreds of pages.',
          ai: 'Summarises documents and pulls key dates, names and clauses into a searchable index.',
          you: 'An attorney reviews before relying on it.',
          result: 'Hours of reading cut to minutes.',
          tools: ['Document management', 'AI summaries'], minutes: 120, per: 'document set', effort: 'project' },
        { name: 'Deadline & court date tracking', level: 'alert', area: 'ops',
          when: 'A filing or court date is set',
          today: 'Dates are entered by hand into several calendars.',
          ai: 'Adds deadlines to calendars and reminds the team and the client.',
          you: 'Confirm the dates.',
          result: 'No missed deadlines.',
          tools: ['Clio', 'Outlook calendar'], minutes: 10, per: 'deadline', effort: 'quick' },
        { name: 'Client status updates', level: 'draft', area: 'service',
          when: 'A case reaches a milestone',
          today: 'Clients call asking what\'s happening.',
          ai: 'Drafts plain-English case updates.',
          you: 'Approve and send.',
          result: 'Calmer clients and fewer calls.',
          tools: ['Clio', 'Email'], minutes: 15, per: 'update', effort: 'quick' },
        { name: 'Legal work & court', level: 'human',
          note: 'Always yours. AI never gives legal advice.' }
      ],
      [
        { name: 'Time capture & billing', level: 'draft', area: 'finance',
          when: 'Work is done',
          today: 'Time is reconstructed from memory at month end.',
          ai: 'Suggests time entries from emails, calls and documents and builds the invoice.',
          you: 'Approve the entries.',
          result: 'Less unbilled time.',
          tools: ['Clio', 'Outlook'], minutes: 60, per: 'week', effort: 'medium' }
      ],
      [
        { name: 'Referral & review requests', level: 'auto', area: 'sales',
          when: 'A matter closes',
          today: 'Rarely asked.',
          ai: 'Sends a thank-you and a review request, then checks in later.',
          you: 'Nothing.',
          result: 'More referrals.',
          tools: ['Clio', 'Google reviews'], minutes: 10, per: 'matter', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Intake forms', 'Contracts', 'Discovery documents', 'Court filings', 'Correspondence', 'Billing records'],
      questions: ['Which deadlines fall in the next 14 days?', 'Which matters haven\'t been updated in 30 days?', 'Which past clients could refer new business?', 'How much unbilled time is outstanding?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'healthcare', name: 'Healthcare & dental clinics', icon: '🩺',
    intro: 'Medical, dental, physio, chiropractic and therapy practices. Patient data needs extra care, so we build with privacy rules like HIPAA in mind.',
    keywords: ['doctor', 'dentist', 'dental', 'clinic', 'medical', 'physio', 'physiotherapy', 'chiropractor', 'therapy', 'med spa', 'veterinary', 'vet', 'practice'],
    stages: [
      [
        { name: 'New patient inquiries', level: 'auto', area: 'sales',
          when: 'A new patient calls, messages or fills in a form',
          today: 'Missed calls and slow replies lose patients.',
          ai: 'Replies instantly, answers common questions and offers booking times.',
          you: 'Handle clinical questions.',
          result: 'More new patients booked.',
          tools: ['Website chat', 'Practice software'], minutes: 5, per: 'inquiry', effort: 'quick' },
        { name: 'Online booking & intake forms', level: 'auto', area: 'service',
          when: 'An appointment is booked',
          today: 'Paper forms at the front desk.',
          ai: 'Sends digital intake forms and asks for insurance details before the visit.',
          you: 'Review flagged answers.',
          result: 'Shorter check-in.',
          tools: ['Practice software', 'Online forms'], minutes: 10, per: 'patient', effort: 'quick' }
      ],
      [
        { name: 'Appointment reminders', level: 'auto', area: 'service',
          when: '48 hours and 2 hours before each appointment',
          today: 'The front desk calls tomorrow\'s patients one by one.',
          ai: 'Texts and emails reminders. Patients confirm or reschedule by reply, and cancellations go to the waitlist.',
          you: 'Nothing.',
          result: 'Fewer no-shows and fuller days.',
          tools: ['Practice software', 'SMS'], minutes: 4, per: 'appointment', effort: 'quick' },
        { name: 'Insurance eligibility check', level: 'auto', area: 'ops',
          when: 'The day before a visit',
          today: 'Staff check insurer portals or call.',
          ai: 'Checks eligibility and flags coverage issues.',
          you: 'Call patients with issues.',
          result: 'No surprises at checkout.',
          tools: ['Insurance portals', 'Practice software'], minutes: 8, per: 'patient', effort: 'medium' },
        { name: 'Treatment', level: 'human',
          note: 'Clinical care stays 100% with your team.' },
        { name: 'Visit note drafts', level: 'draft', area: 'ops',
          when: 'A visit ends',
          today: 'Notes are typed up after hours.',
          ai: 'Drafts the visit summary from the clinician\'s dictation.',
          you: 'The clinician reviews and signs.',
          result: 'Less after-hours charting.',
          tools: ['Dictation', 'EHR'], minutes: 10, per: 'visit', effort: 'project' }
      ],
      [
        { name: 'Claims follow-up', level: 'alert', area: 'finance',
          when: 'A claim is unpaid after 30 days',
          today: 'Aging reports are worked by hand.',
          ai: 'Tracks claim status, flags denials and drafts appeal letters.',
          you: 'Approve the appeals.',
          result: 'Fewer write-offs.',
          tools: ['Clearinghouse', 'Practice software'], minutes: 15, per: 'claim', effort: 'medium' },
        { name: 'Patient balance reminders', level: 'auto', area: 'finance',
          when: 'A balance is due',
          today: 'Paper statements and phone calls.',
          ai: 'Sends friendly text and email reminders with a pay link.',
          you: 'Nothing.',
          result: 'Balances paid sooner.',
          tools: ['Practice software', 'Text-to-pay'], minutes: 5, per: 'statement', effort: 'quick' }
      ],
      [
        { name: 'Recall & review requests', level: 'auto', area: 'service',
          when: 'A patient is due for a check-up, or after a visit',
          today: 'Recall lists are printed and called.',
          ai: 'Sends recall reminders with a booking link and asks happy patients for a review.',
          you: 'Nothing.',
          result: 'A full schedule and better reviews.',
          tools: ['Practice software', 'Google reviews'], minutes: 5, per: 'patient', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Intake forms', 'Insurance EOBs', 'Referral letters', 'Lab results', 'Treatment plans', 'Patient messages'],
      questions: ['Which patients are overdue for a recall visit?', 'Which insurance claims are unpaid after 30 days?', 'Which treatment plans were accepted but never scheduled?', 'What do patients ask about most?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'realestate', name: 'Real estate', icon: '🏠',
    intro: 'Agents, brokerages and property managers.',
    keywords: ['realtor', 'broker', 'brokerage', 'property management', 'agent', 'leasing', 'mortgage', 'property', 'landlord'],
    stages: [
      [
        { name: 'Instant lead response', level: 'auto', area: 'sales',
          when: 'A lead comes in from Zillow, your website or an ad',
          today: 'Leads wait hours for a call back.',
          ai: 'Replies in seconds, asks about budget, area and timeline, and books a call.',
          you: 'Take the qualified call.',
          result: 'More leads turned into clients.',
          tools: ['Follow Up Boss / CRM', 'SMS'], minutes: 10, per: 'lead', effort: 'quick' },
        { name: 'Listing copy & marketing', level: 'draft', area: 'sales',
          when: 'A new listing is signed',
          today: 'Descriptions and social posts are written from scratch.',
          ai: 'Drafts listing copy, social posts and email blasts from property details and photos.',
          you: 'Edit and approve.',
          result: 'Listings live faster.',
          tools: ['MLS', 'Canva', 'AI writing'], minutes: 60, per: 'listing', effort: 'quick' },
        { name: 'Showings', level: 'human',
          note: 'You sell the home. AI handles the scheduling around it.' }
      ],
      [
        { name: 'Showing scheduling & feedback', level: 'auto', area: 'service',
          when: 'A showing is requested',
          today: 'Texts back and forth with agents and sellers.',
          ai: 'Coordinates showing times and collects feedback from buyers\' agents.',
          you: 'Share the feedback with your seller.',
          result: 'Less admin, happier sellers.',
          tools: ['ShowingTime', 'SMS'], minutes: 15, per: 'showing', effort: 'quick' },
        { name: 'Transaction checklist & documents', level: 'alert', area: 'ops',
          when: 'An offer is accepted',
          today: 'Deadlines and documents are tracked in spreadsheets.',
          ai: 'Tracks every deadline and missing document and reminds all parties.',
          you: 'Handle the negotiations.',
          result: 'Smooth closings.',
          tools: ['Dotloop / SkySlope', 'Email'], minutes: 120, per: 'transaction', effort: 'medium' },
        { name: 'Negotiation & closing', level: 'human',
          note: 'Always yours.' }
      ],
      [
        { name: 'Commission & expense tracking', level: 'auto', area: 'finance',
          when: 'A deal closes',
          today: 'Commission statements are reconciled by hand.',
          ai: 'Records commission, splits and expenses and prepares statements.',
          you: 'Approve.',
          result: 'Clean numbers at tax time.',
          tools: ['QuickBooks', 'Brokerage software'], minutes: 30, per: 'deal', effort: 'medium' }
      ],
      [
        { name: 'Past-client nurture', level: 'draft', area: 'sales',
          when: 'A home anniversary or a market change',
          today: 'A generic newsletter, if anything.',
          ai: 'Sends personal anniversary notes and home value updates, and flags clients likely to move.',
          you: 'Make the call.',
          result: 'More repeat and referral business.',
          tools: ['CRM', 'Market data'], minutes: 60, per: 'week', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Listing agreements', 'Purchase contracts', 'Disclosures', 'Inspection reports', 'Lead lists', 'Closing statements'],
      questions: ['Which leads haven\'t been contacted in 7 days?', 'Which deals have deadlines this week?', 'Which past clients bought 5+ years ago?', 'Which neighbourhoods bring the most leads?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'trades', name: 'Home services & trades', icon: '🔧',
    intro: 'HVAC, plumbing, electrical, cleaning, landscaping, roofing and other service businesses.',
    keywords: ['hvac', 'plumber', 'plumbing', 'electrician', 'electrical', 'cleaning', 'landscaping', 'roofing', 'pest control', 'handyman', 'painting', 'pool'],
    stages: [
      [
        { name: 'Missed-call text back', level: 'auto', area: 'sales',
          when: 'A call is missed',
          today: 'The caller hits voicemail and calls a competitor.',
          ai: 'Texts back instantly, gets the job details and offers booking times.',
          you: 'Confirm big jobs.',
          result: 'Fewer lost jobs.',
          tools: ['Phone system', 'Jobber / ServiceTitan', 'SMS'], minutes: 10, per: 'lead', effort: 'quick' },
        { name: 'Estimates', level: 'draft', area: 'sales',
          when: 'A site visit is done',
          today: 'Estimates are typed up at night.',
          ai: 'Builds the estimate from photos, notes and your price book.',
          you: 'Approve the price.',
          result: 'Estimates sent the same day.',
          tools: ['Jobber / ServiceTitan', 'Price book'], minutes: 30, per: 'estimate', effort: 'medium' },
        { name: 'Estimate follow-up', level: 'auto', area: 'sales',
          when: 'An estimate isn\'t accepted after 3 days',
          today: 'Rarely followed up.',
          ai: 'Sends friendly follow-ups and answers simple questions.',
          you: 'Call about the big jobs.',
          result: 'More estimates won.',
          tools: ['Jobber', 'SMS / email'], minutes: 10, per: 'estimate', effort: 'quick' }
      ],
      [
        { name: 'Scheduling & on-my-way texts', level: 'auto', area: 'service',
          when: 'A job is booked, and when the tech leaves',
          today: 'The office calls customers to confirm and update.',
          ai: 'Confirms the booking and texts the customer when the tech is on the way.',
          you: 'Nothing.',
          result: 'Customers home and ready.',
          tools: ['Jobber', 'SMS'], minutes: 5, per: 'job', effort: 'quick' },
        { name: 'The job', level: 'human',
          note: 'Your crew does the work.' },
        { name: 'Job photos & notes → report', level: 'auto', area: 'ops',
          when: 'A job is completed',
          today: 'Photos sit on phones and notes on scraps of paper.',
          ai: 'Turns photos and tech notes into a clean job report for the customer.',
          you: 'The tech checks it.',
          result: 'Professional reports and fewer disputes.',
          tools: ['Jobber', 'AI summaries'], minutes: 15, per: 'job', effort: 'medium' }
      ],
      [
        { name: 'Invoice & payment reminders', level: 'auto', area: 'finance',
          when: 'A job is completed',
          today: 'Invoices are sent days later.',
          ai: 'Invoices on completion with a pay link and sends reminders.',
          you: 'Nothing.',
          result: 'Paid on the spot or within days.',
          tools: ['QuickBooks', 'Stripe / text-to-pay'], minutes: 10, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Maintenance reminders & reviews', level: 'auto', area: 'sales',
          when: 'Service is due, or a job is done',
          today: 'Customers are forgotten until something breaks.',
          ai: 'Sends seasonal maintenance reminders and review requests.',
          you: 'Nothing.',
          result: 'Steady repeat work and more 5-star reviews.',
          tools: ['Jobber', 'Google reviews'], minutes: 5, per: 'customer', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Work orders', 'Estimates', 'Job photos', 'Invoices', 'Customer records', 'Warranty documents'],
      questions: ['Which estimates were never accepted?', 'Which customers are due for seasonal maintenance?', 'Which job types are most profitable?', 'Which techs get the best reviews?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'construction', name: 'Construction', icon: '🏗️',
    intro: 'General contractors, subcontractors, builders and remodelers.',
    keywords: ['contractor', 'general contractor', 'builder', 'remodeling', 'remodel', 'subcontractor', 'renovation', 'gc'],
    stages: [
      [
        { name: 'Bid invite review', level: 'draft', area: 'sales',
          when: 'A bid invitation arrives',
          today: 'Plans and specs are read by hand to decide whether to bid.',
          ai: 'Summarises scope, due dates and requirements so you can decide fast.',
          you: 'Decide whether to bid.',
          result: 'You bid on the right jobs.',
          tools: ['Email', 'Plan rooms', 'AI document reading'], minutes: 60, per: 'bid', effort: 'medium' },
        { name: 'Estimate & proposal', level: 'draft', area: 'sales',
          when: 'You decide to bid',
          today: 'Proposals are assembled from old templates.',
          ai: 'Drafts the proposal and scope from your estimate and templates.',
          you: 'Approve.',
          result: 'Polished proposals in less time.',
          tools: ['Excel', 'Google Docs'], minutes: 60, per: 'proposal', effort: 'medium' }
      ],
      [
        { name: 'Sub & supplier coordination', level: 'alert', area: 'ops',
          when: 'The schedule changes',
          today: 'Phone calls and texts all day.',
          ai: 'Notifies subs and suppliers of changes and confirms new dates.',
          you: 'Resolve conflicts.',
          result: 'Fewer no-shows on site.',
          tools: ['Procore / Buildertrend', 'SMS'], minutes: 60, per: 'week', effort: 'medium' },
        { name: 'Daily logs & photo reports', level: 'auto', area: 'ops',
          when: 'The end of each day',
          today: 'The foreman writes logs at night.',
          ai: 'Turns voice notes and photos into daily logs and owner updates.',
          you: 'The foreman reviews.',
          result: 'A complete record, with no late nights.',
          tools: ['Procore / Buildertrend', 'AI summaries'], minutes: 20, per: 'day', effort: 'quick' },
        { name: 'Building the job', level: 'human',
          note: 'Your crews build it.' },
        { name: 'RFIs & change orders', level: 'alert', area: 'ops',
          when: 'An RFI or change is requested',
          today: 'Tracked in spreadsheets and easy to lose.',
          ai: 'Logs every RFI and change order, tracks responses and flags the cost impact.',
          you: 'Approve changes.',
          result: 'Changes get paid for.',
          tools: ['Procore', 'Email'], minutes: 30, per: 'change', effort: 'medium' }
      ],
      [
        { name: 'Pay applications & lien waivers', level: 'draft', area: 'finance',
          when: 'A billing period ends',
          today: 'Pay apps are built by hand and waivers are chased.',
          ai: 'Drafts pay applications from progress and tracks lien waivers.',
          you: 'Approve.',
          result: 'Billed on time, every time.',
          tools: ['Procore', 'QuickBooks'], minutes: 120, per: 'pay app', effort: 'project' }
      ],
      [
        { name: 'Closeout & referrals', level: 'auto', area: 'service',
          when: 'The project is complete',
          today: 'Closeout drags on for weeks.',
          ai: 'Assembles warranty documents and the closeout package, then asks for reviews and referrals.',
          you: 'Do the final walkthrough.',
          result: 'Faster final payment and more referrals.',
          tools: ['Google Drive', 'Email'], minutes: 120, per: 'project', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Plans & specs', 'Bids', 'Contracts', 'Change orders', 'Daily logs', 'Lien waivers'],
      questions: ['Which change orders haven\'t been billed?', 'Which RFIs are waiting on an answer?', 'Which lien waivers are missing?', 'Which types of bids do we win most?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'logistics', name: 'Logistics & 3PL', icon: '🚚',
    intro: 'Freight brokers, trucking companies, forwarders, warehouses and fulfilment centres.',
    keywords: ['freight', 'trucking', '3pl', 'warehouse', 'fulfillment', 'fulfilment', 'forwarder', 'courier', 'carrier', 'shipping', 'broker'],
    stages: [
      [
        { name: 'Rate requests & quotes', level: 'draft', area: 'sales',
          when: 'A customer asks for a rate',
          today: 'Rates are looked up across carriers and tariffs.',
          ai: 'Pulls lane, weight and dates from the request and drafts a quote from your rates.',
          you: 'Approve the margin.',
          result: 'Quotes in minutes.',
          tools: ['Email', 'TMS', 'Rate sheets'], minutes: 15, per: 'quote', effort: 'medium' }
      ],
      [
        { name: 'Booking & order entry', level: 'draft', area: 'ops',
          when: 'A booking or shipping order arrives',
          today: 'Re-typed into the TMS or WMS.',
          ai: 'Reads the booking and creates the load or order.',
          you: 'Check exceptions.',
          result: 'Loads entered in seconds.',
          tools: ['TMS / WMS', 'Email'], minutes: 10, per: 'shipment', effort: 'medium' },
        { name: 'Dispatch & pickup', level: 'human',
          note: 'Your dispatchers make the call. AI suggests carriers.' },
        { name: 'Track & trace updates', level: 'auto', area: 'service',
          when: 'A shipment is in transit',
          today: 'Calling drivers and emailing updates.',
          ai: 'Pulls live tracking and updates customers automatically, with delay alerts.',
          you: 'Handle exceptions.',
          result: 'Customers stop calling for updates.',
          tools: ['TMS', 'Carrier APIs', 'Email'], minutes: 10, per: 'shipment', effort: 'medium' },
        { name: 'Proof of delivery & documents', level: 'auto', area: 'ops',
          when: 'A shipment is delivered',
          today: 'PODs and BOLs are scanned and filed by hand.',
          ai: 'Reads PODs, BOLs and customs documents and files them to the shipment.',
          you: 'Nothing.',
          result: 'Every document findable in seconds.',
          tools: ['Document scanning', 'TMS'], minutes: 5, per: 'shipment', effort: 'quick' }
      ],
      [
        { name: 'Freight invoice audit', level: 'alert', area: 'finance',
          when: 'A carrier invoice arrives',
          today: 'Invoices are checked against rates by hand, or not at all.',
          ai: 'Checks every invoice against agreed rates and extra charges, and flags overcharges.',
          you: 'Dispute the flagged ones.',
          result: 'Overcharges caught, not paid.',
          tools: ['TMS', 'AP inbox'], minutes: 10, per: 'invoice', effort: 'medium' },
        { name: 'Customer invoicing', level: 'auto', area: 'finance',
          when: 'A POD is received',
          today: 'Invoices wait until someone matches the paperwork.',
          ai: 'Invoices with the POD attached and follows up.',
          you: 'Nothing.',
          result: 'Paid days sooner.',
          tools: ['QuickBooks', 'TMS'], minutes: 10, per: 'invoice', effort: 'quick' }
      ],
      [
        { name: 'Customer performance reports', level: 'auto', area: 'service',
          when: 'Every month',
          today: 'Built in Excel, if at all.',
          ai: 'Sends each customer an on-time, cost and volume report.',
          you: 'Use it in your review meetings.',
          result: 'Customers see the value you deliver.',
          tools: ['TMS', 'Google Sheets'], minutes: 60, per: 'customer', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Bills of lading', 'Proofs of delivery', 'Rate confirmations', 'Carrier invoices', 'Customs documents', 'Booking emails'],
      questions: ['Which carrier invoices have overcharges?', 'Which shipments are late this week?', 'Which customers\' volume is dropping?', 'Which lanes are most profitable?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'restaurants', name: 'Restaurants & hospitality', icon: '🍽️',
    intro: 'Restaurants, cafés, caterers, hotels and event venues.',
    keywords: ['restaurant', 'cafe', 'café', 'hotel', 'catering', 'caterer', 'bar', 'bakery', 'food truck', 'venue', 'events', 'food'],
    stages: [
      [
        { name: 'Reservations & inquiry replies', level: 'auto', area: 'service',
          when: 'A booking request, call or DM comes in',
          today: 'Staff answer phones and DMs in the middle of service.',
          ai: 'Answers questions, takes bookings and handles changes.',
          you: 'Approve large parties.',
          result: 'No missed bookings during the rush.',
          tools: ['Reservation system', 'Instagram / Google', 'SMS'], minutes: 3, per: 'inquiry', effort: 'quick' },
        { name: 'Catering & event quotes', level: 'draft', area: 'sales',
          when: 'An event or catering request arrives',
          today: 'Menus and quotes are put together by hand.',
          ai: 'Builds a quote from your menu, headcount and date.',
          you: 'Approve.',
          result: 'Quotes out while the client is still shopping around.',
          tools: ['Google Docs', 'Email'], minutes: 30, per: 'quote', effort: 'quick' }
      ],
      [
        { name: 'Inventory & supplier orders', level: 'alert', area: 'ops',
          when: 'Stock runs low',
          today: 'Counts on paper, orders by phone.',
          ai: 'Tracks usage from sales and drafts supplier orders.',
          you: 'Approve the orders.',
          result: 'Less waste, fewer 86\'d dishes.',
          tools: ['POS', 'Supplier email'], minutes: 60, per: 'week', effort: 'medium' },
        { name: 'Staff scheduling', level: 'draft', area: 'ops',
          when: 'Each week',
          today: 'Built in a spreadsheet every week.',
          ai: 'Drafts the schedule from forecast covers and staff availability.',
          you: 'Adjust and publish.',
          result: 'Right-sized shifts and lower labour cost.',
          tools: ['7shifts', 'POS'], minutes: 90, per: 'week', effort: 'medium' },
        { name: 'Service', level: 'human',
          note: 'Hospitality stays human.' }
      ],
      [
        { name: 'Supplier invoice checks', level: 'alert', area: 'finance',
          when: 'A supplier invoice arrives',
          today: 'Invoices pile up until month end.',
          ai: 'Reads supplier invoices, checks them against orders and flags price increases.',
          you: 'Query the increases.',
          result: 'Food costs under control.',
          tools: ['QuickBooks / Xero', 'Email'], minutes: 10, per: 'invoice', effort: 'medium' }
      ],
      [
        { name: 'Review replies', level: 'draft', area: 'service',
          when: 'A new review is posted',
          today: 'Reviews go unanswered.',
          ai: 'Drafts on-brand replies and alerts you to bad reviews.',
          you: 'Approve the replies.',
          result: 'Every guest feels heard.',
          tools: ['Google', 'Yelp'], minutes: 5, per: 'review', effort: 'quick' },
        { name: 'Guest marketing', level: 'auto', area: 'sales',
          when: 'A birthday, or a regular stops visiting',
          today: 'No follow-up after the visit.',
          ai: 'Sends birthday offers and win-back messages to past guests.',
          you: 'Approve the offers.',
          result: 'More repeat visits.',
          tools: ['Email / SMS marketing', 'POS'], minutes: 60, per: 'week', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Supplier invoices', 'Sales reports', 'Recipes & costings', 'Reservations', 'Reviews', 'Staff schedules'],
      questions: ['Which dishes have the lowest margin?', 'Which supplier prices went up this month?', 'Which regulars haven\'t visited in 60 days?', 'What do reviews complain about most?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'insurance', name: 'Insurance agencies', icon: '🛡️',
    intro: 'Independent agencies and brokers for personal, commercial and benefits lines.',
    keywords: ['insurance', 'insurance agent', 'broker', 'benefits', 'p&c', 'life insurance', 'health insurance'],
    stages: [
      [
        { name: 'Quote request intake', level: 'auto', area: 'sales',
          when: 'A quote request comes in',
          today: 'Re-asking for missing details over email.',
          ai: 'Collects every detail needed and pre-fills carrier applications.',
          you: 'Review before submitting.',
          result: 'Complete submissions the first time.',
          tools: ['Agency system', 'Online forms'], minutes: 20, per: 'quote', effort: 'medium' },
        { name: 'Quote comparison', level: 'draft', area: 'sales',
          when: 'Carrier quotes come back',
          today: 'Comparisons are built by hand.',
          ai: 'Summarises carrier quotes side by side in plain English.',
          you: 'Recommend the policy.',
          result: 'Clients decide faster.',
          tools: ['Carrier portals', 'AI summaries'], minutes: 30, per: 'quote', effort: 'medium' },
        { name: 'Client meeting', level: 'human',
          note: 'Trust is built in person.' }
      ],
      [
        { name: 'Policy documents & certificates', level: 'auto', area: 'ops',
          when: 'A policy is bound or a certificate is requested',
          today: 'Certificates are issued by hand.',
          ai: 'Files policy documents and issues certificates of insurance on request.',
          you: 'Check unusual requests.',
          result: 'Certificates out in minutes.',
          tools: ['Applied / HawkSoft'], minutes: 10, per: 'certificate', effort: 'quick' },
        { name: 'Claims support updates', level: 'draft', area: 'service',
          when: 'A client files a claim',
          today: 'Clients call to ask about their claim.',
          ai: 'Logs the claim and drafts status updates to the client.',
          you: 'Advocate with the carrier.',
          result: 'Clients feel looked after.',
          tools: ['Agency system', 'Email'], minutes: 15, per: 'claim', effort: 'medium' }
      ],
      [
        { name: 'Commission reconciliation', level: 'alert', area: 'finance',
          when: 'Carrier statements arrive',
          today: 'Statements are matched to policies by hand.',
          ai: 'Matches commission statements to policies and flags missing commissions.',
          you: 'Chase the carrier.',
          result: 'No commission left unpaid.',
          tools: ['Agency system', 'Spreadsheets'], minutes: 120, per: 'month', effort: 'medium' }
      ],
      [
        { name: 'Renewal reviews', level: 'draft', area: 'sales',
          when: '60 days before renewal',
          today: 'Renewals are processed at the last minute.',
          ai: 'Prepares a renewal summary, re-shops if the premium jumps and drafts outreach.',
          you: 'Call the client.',
          result: 'Higher retention.',
          tools: ['Agency system', 'CRM'], minutes: 30, per: 'renewal', effort: 'medium' },
        { name: 'Cross-sell prompts', level: 'alert', area: 'sales',
          when: 'A client is missing coverage',
          today: 'Opportunities are missed.',
          ai: 'Spots gaps (for example auto but no home) and suggests outreach.',
          you: 'Have the conversation.',
          result: 'More policies per client.',
          tools: ['CRM'], minutes: 15, per: 'client', effort: 'quick' }
      ]
    ],
    data: {
      docs: ['Policies', 'Applications', 'Certificates of insurance', 'Claims files', 'Carrier statements', 'Client emails'],
      questions: ['Which policies renew in the next 60 days?', 'Which clients have only one policy with us?', 'Which commissions are missing?', 'Which claims are still open?']
    }
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'general', name: 'Other small business', icon: '🏪',
    intro: 'Don\'t see your industry? Most small businesses share these same steps.',
    keywords: ['small business', 'startup', 'other', 'nonprofit', 'non-profit', 'retail store', 'shop', 'my business', 'local business', 'gym', 'salon', 'school', 'training'],
    stages: [
      [
        { name: 'Lead replies & follow-up', level: 'auto', area: 'sales',
          when: 'Someone contacts you',
          today: 'Replies come when someone has time.',
          ai: 'Replies instantly, answers common questions and follows up until they book or buy.',
          you: 'Take the serious conversations.',
          result: 'No lead slips through.',
          tools: ['Website form', 'CRM', 'Email'], minutes: 10, per: 'lead', effort: 'quick' },
        { name: 'Appointment booking', level: 'auto', area: 'sales',
          when: 'A lead is ready to talk',
          today: 'Back-and-forth messages to find a time.',
          ai: 'Sends a booking link and handles reminders and reschedules.',
          you: 'Show up.',
          result: 'A full calendar without the admin.',
          tools: ['Calendly', 'Google Calendar'], minutes: 10, per: 'booking', effort: 'quick' },
        { name: 'Sales conversation', level: 'human',
          note: 'People buy from people.' }
      ],
      [
        { name: 'Order or job intake', level: 'draft', area: 'ops',
          when: 'An order or request arrives by email or form',
          today: 'Details are copied into a spreadsheet or system.',
          ai: 'Reads the request and creates the order or job.',
          you: 'Check anything unusual.',
          result: 'Nothing gets lost.',
          tools: ['Email', 'Spreadsheet / CRM'], minutes: 10, per: 'order', effort: 'medium' },
        { name: 'Customer updates', level: 'auto', area: 'service',
          when: 'Work starts, progresses or ships',
          today: 'Customers call to ask.',
          ai: 'Sends status updates automatically.',
          you: 'Nothing.',
          result: 'Customers feel looked after.',
          tools: ['Email / SMS'], minutes: 5, per: 'order', effort: 'quick' },
        { name: 'Delivering the work', level: 'human',
          note: 'What you do best.' }
      ],
      [
        { name: 'Invoicing & reminders', level: 'auto', area: 'finance',
          when: 'Work is complete',
          today: 'Invoices are sent late and rarely chased.',
          ai: 'Invoices automatically with a pay link and sends polite reminders.',
          you: 'Nothing.',
          result: 'Paid faster.',
          tools: ['QuickBooks', 'Stripe'], minutes: 10, per: 'invoice', effort: 'quick' },
        { name: 'Bookkeeping categorisation', level: 'draft', area: 'finance',
          when: 'Transactions come in',
          today: 'Done in a panic before tax time.',
          ai: 'Categorises transactions and flags anything odd.',
          you: 'Review the flags.',
          result: 'Books always up to date.',
          tools: ['QuickBooks / Xero'], minutes: 60, per: 'week', effort: 'medium' }
      ],
      [
        { name: 'Reviews, referrals & win-back', level: 'auto', area: 'sales',
          when: 'A job is done, or a customer goes quiet',
          today: 'Happy customers are never asked; quiet ones are forgotten.',
          ai: 'Asks for reviews and referrals and sends win-back offers.',
          you: 'Nothing.',
          result: 'More repeat business.',
          tools: ['Google reviews', 'Email'], minutes: 5, per: 'customer', effort: 'quick' },
        { name: 'Weekly business summary', level: 'auto', area: 'ops',
          when: 'Every Monday morning',
          today: 'Numbers are scattered across tools.',
          ai: 'Emails you a one-page summary of sales, open jobs and money owed.',
          you: 'Read it with your coffee.',
          result: 'You always know where the business stands.',
          tools: ['Google Sheets', 'AI summaries'], minutes: 60, per: 'week', effort: 'medium' }
      ]
    ],
    data: {
      docs: ['Invoices', 'Receipts', 'Customer emails', 'Contracts', 'Spreadsheets', 'Price lists'],
      questions: ['Who owes me money?', 'Which customers haven\'t come back?', 'What sold best last month?', 'Which leads did we never follow up?']
    }
  }
];
