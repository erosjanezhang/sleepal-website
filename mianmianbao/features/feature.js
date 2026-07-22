const PAGES={
 sound:{eyebrow:'AI · 情绪感知',title:'AI 定制白噪音',lead:'告诉眠眠你此刻的心情，让雨声、海浪与篝火为今夜重新编织。每一次生成，都只属于此刻的你。',tags:['实时生成','环境混音','睡眠定时'],kind:'sound'},
 music:{eyebrow:'MUSIC · 今夜电台',title:'眠眠音乐小窝',lead:'轻钢琴、竖琴与白噪音在这里缓慢相遇。选一首歌，把剩下的夜交给眠眠。',tags:['AI 编曲','收藏歌单','无缝播放'],kind:'music'},
 chat:{eyebrow:'COMPANION · 仅你可见',title:'深夜私密对话',lead:'不用把情绪整理好再开口。眠眠会记得你的名字，也会认真接住每一句没有说完的话。',tags:['情绪回应','长期记忆','隐私保护'],kind:'chat'},
 breathe:{eyebrow:'MEDITATE · 呼吸引导',title:'入睡呼吸练习',lead:'跟随光的扩散吸气，跟随光的收拢呼气。三分钟，让身体先替大脑安静下来。',tags:['4-7-8 呼吸','柔光引导','3/5/10 分钟'],kind:'breathe'},
 report:{eyebrow:'SLEEP GUARD · 今晨报告',title:'整夜睡眠守护',lead:'把整夜的睡眠翻译成容易理解的温柔建议。这里没有评判，只有一点点变好的方向。',tags:['睡眠评分','趋势分析','AI 建议'],kind:'report'},
 shop:{eyebrow:'COZY STORE · 眠眠好物',title:'眠眠好物商城',lead:'从声音到触感，把安心带回卧室。每件好物都经过眠眠的睡前场景筛选。',tags:['助眠精选','IP 联名','7 天无忧'],kind:'shop'}
};
const page=PAGES[document.body.dataset.page]||PAGES.sound;
document.querySelector('[data-eyebrow]').textContent=page.eyebrow;
document.querySelector('[data-title]').textContent=page.title;
document.querySelector('[data-lead]').textContent=page.lead;
document.querySelector('[data-tags]').innerHTML=page.tags.map(x=>`<span class="tag">${x}</span>`).join('');
const stage=document.querySelector('[data-stage]');
function wave(n=33){return `<div class="wave">${Array.from({length:n},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div>`}
const views={
 sound:`<div class="panel-title"><h2>今晚的声音</h2><span class="status">AI 已连接</span></div><div class="track"><p>为「有一点疲惫」实时生成</p><h3>雨落在黎明前的纸上</h3>${wave()}<div class="progress"><span></span></div><p>01:38 / 04:12</p></div><div class="controls"><button class="pill active">雨夜</button><button class="pill">海岸</button><button class="pill">森林</button><button class="pill">篝火</button><button class="action" data-play>暂停</button></div>`,
 music:`<div class="panel-title"><h2>雨夜絮语</h2><span class="status">正在播放</span></div><div class="track"><p>眠眠专属 · 深夜钢琴</p><h3>把今天轻轻放下</h3>${wave(27)}<div class="progress"><span></span></div><p>02:16 / 05:08</p></div><div class="playlist"><div class="track-row active"><b>01</b><span>雨夜絮语</span><small>05:08</small></div><div class="track-row"><b>02</b><span>月光落在枕边</span><small>04:32</small></div><div class="track-row"><b>03</b><span>慢一点呼吸</span><small>06:20</small></div></div><div class="controls"><button class="action" data-play>暂停播放</button></div>`,
 chat:`<div class="panel-title"><h2>和眠眠说说话</h2><span class="status">私密对话</span></div><div class="chat" data-chat><div class="msg ai">晚上好，我在。今天是不是有一点难熬？你不需要马上回答，先慢慢呼吸。</div><div class="msg me">脑子停不下来，一直在想白天的事。</div><div class="msg ai">那我们先不赶走这些想法。把它们想成窗外经过的车灯，看见了，再让它慢慢走远。要不要我陪你做三次呼吸？</div></div><form class="chat-form"><input aria-label="输入消息" placeholder="想和眠眠说什么……"><button class="action">发送</button></form>`,
 breathe:`<div class="panel-title"><h2>跟着光，慢慢呼吸</h2><span class="status">3 分钟练习</span></div><div class="orb"><div class="orb-inner"><div><strong data-breath>吸气</strong><small>让月光慢慢靠近</small></div></div></div><div class="controls"><button class="pill active">放松呼吸</button><button class="pill">4-7-8</button><button class="pill">身体扫描</button><button class="action" data-breath-toggle>暂停</button></div>`,
 report:`<div class="panel-title"><h2>昨夜睡眠报告</h2><span class="status">已同步</span></div><div class="report-score"><div class="score-ring"><div><strong>87</strong><small>睡眠评分 · 很好</small></div></div><div class="metric-grid"><div class="metric"><span>总睡眠</span><strong>7h 42m</strong></div><div class="metric"><span>深睡比例</span><strong>28%</strong></div><div class="metric"><span>入睡用时</span><strong>18m</strong></div><div class="metric"><span>夜间醒来</span><strong>1 次</strong></div></div></div><div class="bars">${[['一',52],['二',65],['三',73],['四',58],['五',82],['六',91],['日',87]].map(x=>`<div class="bar" style="--h:${x[1]}%" data-day="周${x[0]}"></div>`).join('')}</div>`,
 shop:`<div class="panel-title"><h2>今晚好眠精选</h2><span class="cart">购物袋 <b data-cart>0</b></span></div><div class="products">${[['🌙','月光香薰灯','¥ 239'],['☁️','眠眠云朵抱枕','¥ 169'],['🪻','晚安薰衣草礼盒','¥ 128'],['😴','零压柔光眼罩','¥ 89']].map(x=>`<article class="product"><div class="product-art">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><button aria-label="加入购物袋" data-add>＋</button></article>`).join('')}</div>`
};
stage.innerHTML=views[page.kind];
document.querySelectorAll('.pill').forEach(b=>b.addEventListener('click',()=>{b.parentElement.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));
document.querySelectorAll('[data-play]').forEach(b=>b.addEventListener('click',()=>{stage.classList.toggle('paused');b.textContent=stage.classList.contains('paused')?'继续播放':'暂停播放'}));
const form=document.querySelector('.chat-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();const input=form.querySelector('input');if(!input.value.trim())return;document.querySelector('[data-chat]').insertAdjacentHTML('beforeend',`<div class="msg me">${input.value.replace(/[<>]/g,'')}</div><div class="msg ai">我听见了。今晚先不用解决所有事情，我陪你把这一个念头轻轻放下。</div>`);input.value='';document.querySelector('[data-chat]').scrollTop=9999});
let breathTimer;const breath=document.querySelector('[data-breath]');if(breath){let inhale=true;breathTimer=setInterval(()=>{inhale=!inhale;breath.textContent=inhale?'吸气':'呼气'},3000);document.querySelector('[data-breath-toggle]').addEventListener('click',e=>{document.querySelector('.orb').style.animationPlayState=document.querySelector('.orb').style.animationPlayState==='paused'?'running':'paused';e.currentTarget.textContent=e.currentTarget.textContent==='暂停'?'继续':'暂停'})}
let cart=0;document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{cart++;document.querySelector('[data-cart]').textContent=cart;b.textContent='✓';setTimeout(()=>b.textContent='＋',900)}));
