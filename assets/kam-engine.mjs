// Portfolio prototype. Synthetic policy only; not a production dispatch system.
export const POLICY_VERSION = 'portfolio-reactivation-v1';
export const DEFAULT_ACCOUNT = Object.freeze({
  business: true, consent: 'yes', feeds: 'fresh', incident: false,
  humanRequest: false, severeIssue: false, kamOwned: false, openTicket: false,
  reordered: false, cooldown: false, holdout: false, inWindow: true,
  duplicate: false, unresolvedCommitment: false, deliveredOrders: 8,
  normalGap: 4, silentDays: 16, experience: 'healthy', notes: ''
});

const ROUTES = {
  SUPPRESS: ['Do not contact', 'Routine outreach is not permitted for this account.'],
  WAIT_DATA: ['Wait for reliable data', 'A safe decision needs current order, incident, and contact-control state.'],
  OPS: ['Route to Operations', 'Resolve the known supply issue before considering a retention conversation.'],
  HUMAN: ['A person owns the next step', 'Prepare a factual handoff. Do not launch an autonomous retention call.'],
  KAM: ['Prepare a brief for the KAM', 'Keep the existing account manager in control of the relationship.'],
  RECOVERY: ['Resolve the service issue first', 'An open support case takes priority over a growth or retention pitch.'],
  CANCEL: ['Cancel the reactivation plan', 'The account has already reordered. The queued retention reason is stale.'],
  WAIT: ['Wait before contacting', 'Respect the contact limit, calling window, or existing attempt.'],
  HOLDOUT: ['Keep the account in holdout', 'No reactivation outreach. Preserve the comparison needed to measure incremental effect.'],
  OBSERVE: ['Keep observing', 'There is not enough evidence of a break in the account’s normal ordering cadence.'],
  AI_BRIEF: ['Prepare a reactivation brief', 'One objective: understand the changed need and agree on an allowed next step.']
};

export function decide(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) input = {};
  const a = {...DEFAULT_ACCOUNT, ...input, experience: Object.hasOwn(input, 'experience') ? input.experience : 'unknown'};
  const trace = [];
  const hasInput = key => Object.hasOwn(input, key);
  // Missing safety-critical fields fail closed, including when a caller skips validation.
  const controlsMissing = ['business','consent','feeds','incident','humanRequest','severeIssue','kamOwned','openTicket','reordered','cooldown','holdout','inWindow','duplicate','unresolvedCommitment'].some(key=>!hasInput(key));
  const invalidBooleans = ['business','incident','humanRequest','severeIssue','kamOwned','openTicket','reordered','cooldown','holdout','inWindow','duplicate','unresolvedCommitment'].some(key=>typeof a[key] !== 'boolean');
  const invalidEnums = !['yes','no','unknown'].includes(a.consent) || !['fresh','stale','unavailable'].includes(a.feeds) || !['healthy','unknown'].includes(a.experience);
  const invalidNumbers = ['normalGap','silentDays','deliveredOrders'].some(key=>!hasInput(key) || typeof a[key] !== 'number' || !Number.isFinite(a[key]) || a[key] < 0) || a.normalGap === 0;
  const dueAt = Math.max(7, a.normalGap * 2);
  function gate(label, condition, route, reason) {
    trace.push({label, status:condition ? 'Decision' : 'Passed', reason:condition ? reason : 'No blocking condition'});
    return condition ? finish(route, reason) : null;
  }
  function finish(route, reason) {
    const [title, description] = ROUTES[route];
    const eligible = route === 'AI_BRIEF';
    const neutral = a.experience === 'unknown';
    const facts = [
      ...(Number.isFinite(a.silentDays) ? [`No eligible order for ${a.silentDays} days.`] : []),
      ...(Number.isFinite(a.normalGap) ? [`Typical order interval: ${a.normalGap} days.`] : []),
      ...(a.incident === true ? ['A supply incident is recorded.'] : []),
      ...(a.reordered === true ? ['A newer order exists at the pre-call check.'] : []),
      ...(a.openTicket === true ? ['A support issue remains open.'] : [])
    ];
    return {
      policy: POLICY_VERSION, route, title, description, reason, dueAt,
      trace, facts, allowedActions: eligible ? ['Prepare a diagnostic question','Record the customer’s stated reason','Draft one next step for review'] : ['Record the route and reason'],
      forbiddenActions: ['Place a call from this demo','Grant a refund or incentive','Invent a churn reason','Change account data'],
      unknowns: [neutral ? 'Recent service experience is unknown.' : 'The reason for the change in ordering is not established.', 'Future delivery demand has not been confirmed.'],
      opening: eligible ? (neutral
        ? 'Hello, I’m an AI assistant calling about your Local deliveries. Is now a good time? Has your delivery requirement changed recently?'
        : 'Hello, I’m an AI assistant calling about your Local deliveries. Is now a good time? I wanted to understand whether your delivery needs have changed since your last order.')
        : 'No automated retention opening is prepared for this route.',
      canContact: false // Deliberately never dispatch; browser prototype has no contact tools.
    };
  }
  let result;
  if ((result=gate('Validate required state', controlsMissing || invalidBooleans || invalidEnums || invalidNumbers, 'WAIT_DATA','Required fields are missing or invalid.'))) return result;
  if ((result=gate('Check scope and contact permission', !a.business || a.consent !== 'yes', 'SUPPRESS', !a.business ? 'Outside business-shipper scope.' : 'Contact permission is absent or unknown.'))) return result;
  if ((result=gate('Check live data freshness', a.feeds !== 'fresh', 'WAIT_DATA','Order, incident, or contact state is not reliable enough.'))) return result;
  if ((result=gate('Check systemic service failure', a.incident, 'OPS','Known supply incident: a call cannot repair the network.'))) return result;
  if ((result=gate('Protect sensitive interactions', a.humanRequest || a.severeIssue || a.unresolvedCommitment, 'HUMAN','Human request, sensitive issue, or unresolved commitment requires a person.'))) return result;
  if ((result=gate('Respect account ownership', a.kamOwned, 'KAM','An account manager owns this relationship.'))) return result;
  if ((result=gate('Check unresolved service issues', a.openTicket, 'RECOVERY','An open support issue takes priority.'))) return result;
  if ((result=gate('Recheck ordering at contact time', a.reordered, 'CANCEL','The customer has already placed another order.'))) return result;
  if ((result=gate('Respect contact and replay controls', a.cooldown || a.duplicate || !a.inWindow, 'WAIT', a.duplicate ? 'This attempt has already been processed.' : a.cooldown ? 'A recent contact is still inside its cooldown.' : 'Outside the permitted contact window.'))) return result;
  if ((result=gate('Preserve experiment assignment', a.holdout, 'HOLDOUT','This account belongs to the no-reactivation-outreach comparison group.'))) return result;
  if ((result=gate('Check evidence and cadence', a.deliveredOrders < 2 || a.silentDays < dueAt, 'OBSERVE',a.deliveredOrders < 2 ? 'Insufficient delivered-order history for this prototype.' : `The illustrative trigger is ${dueAt} days; this account is not yet due.`))) return result;
  trace.push({label:'Prepare a bounded brief',status:'Decision',reason:'All prototype reactivation checks passed.'});
  return finish('AI_BRIEF', `Eligible under an illustrative ${dueAt}-day cadence trigger.`);
}

export function account(patch = {}) { return {...DEFAULT_ACCOUNT, ...patch}; }
