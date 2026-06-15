const emails = [
      {
        id: 1,
        sender: 'finance@trustedledger.com',
        senderName: 'Trusted Ledger Finance',
        subject: 'Quarterly review packet',
        preview: 'Here is the updated board summary and the signed PDF packet for review.',
        body: [
          'Hello team, attached is the signed quarterly review packet prepared for tomorrow\'s meeting.',
          'The figures match the secure dashboard and no external action is required from you today.'
        ],
        attachment: 'PDF',
        confidence: 91,
        factors: { domain: 1.4, links: 0.4, attachment: 0.8, language: 0.5, impersonation: 0.5 },
        tags: ['Signed PDF', 'Known sender', 'Internal review']
      },
      {
        id: 2,
        sender: 'courier-update@track-shift-delivery.net',
        senderName: 'Parcel Shift',
        subject: 'Delivery held: confirm address now',
        preview: 'A courier issue requires urgent confirmation to avoid shipment cancellation tonight.',
        body: [
          'We tried to complete your shipment but your address failed verification.',
          'Confirm immediately through the secure link or the parcel will be destroyed within 12 hours.'
        ],
        attachment: 'HTML link',
        confidence: 84,
        factors: { domain: 1.8, links: 2.0, attachment: 0.9, language: 1.7, impersonation: 0.9 },
        tags: ['Urgent', 'Link present', 'Courier brand']
      },
      {
        id: 3,
        sender: 'hr-payroll@org-payroll-secure.co',
        senderName: 'Payroll Operations',
        subject: 'Salary correction form',
        preview: 'Open the attached macro sheet to avoid delays in this month\'s processing.',
        body: [
          'Your payroll file contains a mismatch in tax residency data.',
          'Enable editing and macros in the attached workbook so the correction can be submitted today.'
        ],
        attachment: 'XLSM',
        confidence: 96,
        factors: { domain: 2.0, links: 1.1, attachment: 2.5, language: 1.9, impersonation: 2.0 },
        tags: ['Macro file', 'Urgent', 'Payroll mimicry']
      },
      {
        id: 4,
        sender: 'security@workspace-notify.ai',
        senderName: 'Workspace Security',
        subject: 'New sign-in from Punjab',
        preview: 'We detected a new device sign-in. Review the activity center if this was not you.',
        body: [
          'A new browser session was detected from Ludhiana, Punjab.',
          'If this was not you, visit your known security dashboard directly rather than using email links.'
        ],
        attachment: 'None',
        confidence: 79,
        factors: { domain: 0.8, links: 1.2, attachment: 0.2, language: 0.9, impersonation: 0.8 },
        tags: ['Security notice', 'Location mention', 'No attachment']
      },
      {
        id: 5,
        sender: 'accounts@vendor-clearing-mail.com',
        senderName: 'Vendor Clearing',
        subject: 'Invoice 88421 overdue — action required',
        preview: 'A payment dispute notice includes a compressed archive and alternate settlement link.',
        body: [
          'Your account is under review because invoice 88421 remains unpaid after repeated notices.',
          'Open the archive and complete the alternate transfer within four hours to prevent legal escalation.'
        ],
        attachment: 'ZIP archive',
        confidence: 94,
        factors: { domain: 2.1, links: 1.7, attachment: 2.2, language: 1.8, impersonation: 1.5 },
        tags: ['Archive', 'Payment pressure', 'Threat language']
      }
    ];
