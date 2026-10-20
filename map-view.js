import {MEXICO_MAP} from './mexico-map.js';
import {STATES,classify} from './model.js';

export function drawMexicoMap(svg,{items,thresholds,selection,onSelect,formatValue,colors}){
 const ns='http://www.w3.org/2000/svg';
 const make=(tag,attributes={})=>{const el=document.createElementNS(ns,tag);for(const [key,value]of Object.entries(attributes))el.setAttribute(key,value);return el;};
 svg.replaceChildren();
 for(const [label,x,y,rotation]of [['OCÉANO PACÍFICO',220,350,-15],['GOLFO DE MÉXICO',640,225,0]]){
  const text=make('text',{x,y,class:'map-sea',transform:`rotate(${rotation} ${x} ${y})`});text.textContent=label;svg.append(text);
 }
 const paths=make('g'),labels=make('g',{'aria-hidden':'true'});svg.append(paths,labels);
 const tooltip=make('g',{class:'map-tooltip',display:'none','aria-hidden':'true','pointer-events':'none'});
 const background=make('rect',{rx:6,height:30,fill:'#262238'}),caption=make('text',{'text-anchor':'middle',y:19,fill:'#fff','font-size':11});tooltip.append(background,caption);
 const show=(item,geometry)=>{
  caption.textContent=`${item.name} · ${formatValue(item.abstention)} %`;
  const width=Math.max(130,caption.textContent.length*6.2+24),x=Math.max(width/2+8,Math.min(792-width/2,geometry.x)),y=Math.max(3,geometry.y-49);
  tooltip.setAttribute('transform',`translate(${x} ${y})`);background.setAttribute('x',-width/2);background.setAttribute('width',width);tooltip.setAttribute('display','block');
 };
 const sorted=[...MEXICO_MAP].sort((a,b)=>(a.id===selection?1:0)-(b.id===selection?1:0));
 for(const geometry of sorted){
  const item=items.find(x=>x.id===geometry.id),risk=classify(item.abstention,thresholds),selected=selection===item.id;
  const path=make('path',{d:geometry.d,fill:colors[risk],class:'state-path'+(selected?' selected':''),'fill-rule':'evenodd',role:'button',tabindex:'0','data-state':item.id,'aria-label':`${item.name}, ${item.abstention===null?'sin estimación':formatValue(item.abstention)+' por ciento, nivel '+risk}`,'aria-pressed':String(selected)});
  const title=make('title');title.textContent=`${item.name} · ${formatValue(item.abstention)} % · ${risk}`;path.append(title);
  path.onpointerenter=()=>show(item,geometry);path.onpointerleave=()=>tooltip.setAttribute('display','none');path.onfocus=()=>show(item,geometry);path.onblur=()=>tooltip.setAttribute('display','none');
  path.onclick=()=>onSelect(item.id);path.onkeydown=event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect(item.id);svg.querySelector(`[data-state="${item.id}"]`)?.focus();}};
  paths.append(path);
  if(geometry.area>=650){const text=make('text',{x:geometry.x,y:geometry.y,class:'state-label'});text.textContent=STATES.find(s=>s[0]===item.id)[2];labels.append(text);}
 }
 const north=make('text',{x:754,y:43,class:'map-north','text-anchor':'middle'});north.textContent='↑ N';svg.append(north,tooltip);
}
