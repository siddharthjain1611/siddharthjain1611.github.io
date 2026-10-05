import {account,decide} from './kam-engine.mjs';
import {CASES,runEvaluations} from './kam-fixtures.mjs';
const form=document.getElementById('account-form');
const scenario=document.getElementById('scenario');
const byId=id=>document.getElementById(id);
let current;
const booleanKeys=['business','incident','humanRequest','severeIssue','kamOwned','openTicket','reordered','cooldown','holdout','inWindow','duplicate','unresolvedCommitment'];
function readAccount(){
  const result=account();
  for(const key of booleanKeys) result[key]=form.elements.namedItem(key).checked;
  for(const key of ['consent','feeds','experience']) result[key]=form.elements.namedItem(key).value;
  for(const key of ['silentDays','normalGap','deliveredOrders']){
    const value=form.elements.namedItem(key).value;
    result[key]=value.trim()===''?NaN:Number(value);
  }
  return result;
}
function fillAccount(value){
  for(const key of booleanKeys) form.elements.namedItem(key).checked=value[key];
  for(const key of ['consent','feeds','experience','silentDays','normalGap','deliveredOrders']) form.elements.namedItem(key).value=value[key];
}
function list(id,values){byId(id).replaceChildren(...values.map(value=>{
  const li=document.createElement('li');li.textContent=value;return li;
}));}
function update(){
  const input=readAccount();
  byId('silence-value').textContent=input.silentDays;
  current={input,decision:decide(input)};
  const d=current.decision;
  byId('route-code').textContent=d.route.replaceAll('_',' ');
  byId('decision-title').textContent=d.title;
  byId('decision-description').textContent=d.description;
  byId('decision-reason').textContent=d.reason;
  byId('trace').replaceChildren(...d.trace.map((step,i)=>{
    const li=document.createElement('li');
    const number=document.createElement('span');number.className='trace-index';number.textContent=String(i+1).padStart(2,'0');
    const label=document.createElement('span');label.textContent=step.label;
    const status=document.createElement('span');status.className='trace-label'+(step.status==='Decision'?' stop':'');status.textContent=step.status;
    li.append(number,label,status);return li;
  }));
  list('facts',d.facts);list('unknowns',d.unknowns);list('allowed',d.allowedActions);list('forbidden',d.forbiddenActions);
  byId('opening').textContent=d.opening;
}
form.addEventListener('submit',event=>event.preventDefault());
form.addEventListener('input',event=>{if(event.target===scenario)return;scenario.value='custom';update();});
scenario.addEventListener('change',()=>{
  const preset=CASES.find(item=>item.id===scenario.value);
  if(preset)fillAccount(preset.input);update();
});
byId('reset-account').addEventListener('click',()=>{fillAccount(account());scenario.value='eligible';update();});
byId('download-decision').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify({...current,notice:'Synthetic portfolio decision. No call or model inference performed.'},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='growth-kam-decision.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
byId('fixture-count').textContent=CASES.length;
byId('run-evals').addEventListener('click',()=>{
  const report=runEvaluations(decide);
  byId('eval-summary').textContent=`${report.passed} / ${report.total} synthetic scenario checks passed · ${report.total-report.passed} failed. Policy: ${report.policy}.`;
  byId('eval-results').replaceChildren(...report.results.map(result=>{
    const tr=document.createElement('tr');
    for(const text of [result.name,result.expected,result.actual,result.pass?'Pass':'Fail']){
      const td=document.createElement('td');td.textContent=text;tr.append(td);
    }
    tr.lastElementChild.className=result.pass?'pass':'fail';return tr;
  }));
  byId('eval-details').open=true;
  byId('run-evals').textContent='Run checks again ↗';
});
const initialId=new URLSearchParams(location.search).get('scenario');
const initial=CASES.find(item=>item.id===initialId);
if(initial && Array.from(scenario.options).some(option=>option.value===initialId)){fillAccount(initial.input);scenario.value=initialId;}else fillAccount(account());
update();
